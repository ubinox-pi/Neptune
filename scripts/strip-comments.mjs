import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import fg from 'fast-glob';
import strip from 'strip-comments';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');

/**
 * Preserve important directive comments (eslint/ts) by replacing them with placeholders
 * before stripping, then restore them afterward.
 */
function preserveDirectives(content) {
  const placeholders = [];

  // Match single-line eslint directives
  content = content.replace(/(^|\n)([ \t]*)\/\/\s*(eslint-[^\n]*)/g, (m, p1, indent, body) => {
    const idx = placeholders.push(`// ${body}`) - 1;
    return `${p1}${indent}__ESLINT_PLACEHOLDER_${idx}__`;
  });

  // Match block eslint directives (including multiline)
  content = content.replace(/\/\*\s*(eslint-[\s\S]*?)\s*\*\//g, (m, body) => {
    const idx = placeholders.push(`/* ${body} */`) - 1;
    return `__ESLINT_PLACEHOLDER_${idx}__`;
  });

  // TS directives
  content = content.replace(/(^|\n)([ \t]*)\/\/\s*@ts-[^\n]*/g, (m, p1, indent) => {
    const idx = placeholders.push(m.trim().replace(/^\n/, '')) - 1;
    return `${p1}${indent}__ESLINT_PLACEHOLDER_${idx}__`;
  });

  return { content, placeholders };
}

function restoreDirectives(content, placeholders) {
  return content.replace(/__ESLINT_PLACEHOLDER_(\d+)__/g, (m, n) => placeholders[Number(n)] || '');
}

function stripJsLike(code) {
  const { content: pre, placeholders } = preserveDirectives(code);
  let out = strip(pre, {
    // Keep important license comments that start with /*! ... */
    preserve: /!|@preserve|@license|@copyright/,
  });
  out = restoreDirectives(out, placeholders);
  return out;
}

function stripCss(code) {
  // Remove /* ... */ comments but keep /*! ... */ license comments
  return code.replace(/\/\*(?!\!)([\s\S]*?)\*\//g, '');
}

function stripHtml(code) {
  // Remove <!-- ... --> comments
  return code.replace(/<!--([\s\S]*?)-->/g, '');
}

async function main() {
  const patterns = [
    'src/**/*.{js,jsx,ts,tsx}',
    'src/**/*.{css}',
    'index.html',
  ];

  const files = await fg(patterns, { cwd: root, dot: false, onlyFiles: true, absolute: true, ignore: ['**/node_modules/**', '**/dist/**'] });

  let changed = 0;
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    const original = fs.readFileSync(file, 'utf8');
    let next = original;

    try {
      if (ext === '.js' || ext === '.jsx' || ext === '.ts' || ext === '.tsx') {
        next = stripJsLike(original);
      } else if (ext === '.css') {
        next = stripCss(original);
      } else if (ext === '.html') {
        next = stripHtml(original);
      }
    } catch (e) {
      console.error(`Error stripping comments in ${path.relative(root, file)}:`, e.message);
      continue;
    }

    // Normalize trailing whitespace on blank lines
    next = next.replace(/[ \t]+\n/g, '\n');

    if (next !== original) {
      fs.writeFileSync(file, next, 'utf8');
      changed++;
      console.log(`cleaned: ${path.relative(root, file)}`);
    }
  }

  console.log(`Done. Files updated: ${changed}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});


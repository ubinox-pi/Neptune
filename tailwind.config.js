/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neptune': {
          'primary': '#3B82F6',
          'secondary': '#1E40AF',
          'dark': '#1E3A8A',
          'light': '#EFF6FF',
          'accent': '#00BCD4',
        }
      },
      fontFamily: {
        'sans': ['Roboto', 'Arial', 'sans-serif']
      }
    },
  },
  plugins: [],
}

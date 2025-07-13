import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/Neptune Bank.png';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'About Us', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.header
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="header-container glassy-header modern-header"
    >
      <div className="header-content beautiful-header">
        <div className="logo" style={{ display: 'flex', alignItems: 'center'}}>
          <img src={logo} alt="Neptune Bank Logo" className="header-logo" style={{ height: 'auto', width: '120px', marginLeft: '2px' }} />
        </div>
        <nav>
          <ul className="navbar desktop-nav pill-nav">
            {navLinks.map((link) => (
              <li key={link.href}><a href={link.href}>{link.label}</a></li>
            ))}
          </ul>
          <button className={menuOpen ? "hamburger open" : "hamburger"} aria-label="Open menu" onClick={() => setMenuOpen((v) => !v)}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
          <AnimatePresence>
            {menuOpen && (
              <motion.ul
                className="navbar mobile-nav pill-nav"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {navLinks.map((link) => (
                  <li key={link.href} onClick={() => setMenuOpen(false)}><a href={link.href}>{link.label}</a></li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </nav>
      </div>
      <div className="header-divider"></div>
    </motion.header>
  );
};

export default Header;

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/Neptune Bank.png";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "About Us", href: "#about" },
  { label: "Contact", href: "#contact" },
  { label: "Login", href: "/login" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.header
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="header-container glassy-header modern-header"
    >
      <div
        className="header-content beautiful-header"
        style={{
          padding: "6px 16px 4px 16px",
          maxWidth: "1200px",
          margin: "auto",
          width: "100%",
          minHeight: "56px",
        }}
      >
        <div className="logo" style={{ display: "flex", alignItems: "center" }}>
          <img
            src={logo}
            alt="Neptune Bank Logo"
            className="header-logo"
            style={{ height: "48px", width: "auto", marginLeft: "2px" }}
          />
        </div>
        <nav>
          <ul className="navbar desktop-nav pill-nav">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
          <button
            className={menuOpen ? "hamburger open" : "hamburger"}
            aria-label="Open menu"
            onClick={() => setMenuOpen((v) => !v)}
            style={{
              zIndex: 9999,
              border: "2px solid #fff",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              background: "#f8fafc",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 0,
              width: "40px",
              height: "40px",
            }}
          >
            <span
              className="bar"
              style={{
                display: "block",
                opacity: 1,
                width: "26px",
                height: "3px",
                background: "#2563eb",
                borderRadius: "2px",
                margin: "3px 0",
              }}
            ></span>
            <span
              className="bar"
              style={{
                display: "block",
                opacity: 1,
                width: "26px",
                height: "3px",
                background: "#2563eb",
                borderRadius: "2px",
                margin: "3px 0",
              }}
            ></span>
            <span
              className="bar"
              style={{
                display: "block",
                opacity: 1,
                width: "26px",
                height: "3px",
                background: "#2563eb",
                borderRadius: "2px",
                margin: "3px 0",
              }}
            ></span>
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
                  <li key={link.href} onClick={() => setMenuOpen(false)}>
                    <a href={link.href}>{link.label}</a>
                  </li>
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

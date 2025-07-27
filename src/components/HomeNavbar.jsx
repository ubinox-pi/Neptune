import React, { useState } from "react";
import logo from "../assets/Neptune Bank.png";

const navItems = [
  { name: "Home", href: "#home", icon: "🏠" },
  { name: "About", href: "#about", icon: "ℹ️" },
  { name: "Services", href: "#services", icon: "⚡" },
  { name: "Contact", href: "#contact", icon: "📞" },
  { name: "Login", href: "/login", icon: "🔑", special: true },
];

const HomeNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header
        style={{
          width: "100%",
          background: "#2563eb",
          color: "#fff",
          position: "sticky",
          top: 0,
          zIndex: 1000,
          margin: 0,
          padding: 0,
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
            }}
          >
            <img
              src={logo}
              alt="Neptune Bank"
              style={{ height: "40px", width: "auto" }}
            />
            <span
              style={{
                fontSize: "1.5rem",
                fontWeight: "700",
              }}
            >
              Neptune Bank
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav
            style={{
              display: "flex",
              gap: "0.5rem",
              marginLeft: "auto",
              marginRight: "1rem",
            }}
            className="desktop-nav"
          >
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.75rem 1rem",
                  borderRadius: "8px",
                  color: "#fff",
                  textDecoration: "none",
                  fontWeight: item.special ? "600" : "500",
                  fontSize: "0.95rem",
                  background: item.special ? "#1d4ed8" : "transparent",
                  border: "1px solid transparent",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                }}
                onMouseOver={(e) => {
                  if (!item.special) {
                    e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                  }
                }}
                onMouseOut={(e) => {
                  if (!item.special) {
                    e.target.style.backgroundColor = "transparent";
                  }
                }}
              >
                <span style={{ fontSize: "1rem" }}>{item.icon}</span>
                <span>{item.name}</span>
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            onMouseEnter={(e) => {
              e.target.style.transform = "scale(1.1)";
              e.target.style.backgroundColor = "#cc0000";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.backgroundColor = "#ff0000";
            }}
            style={{
              background: "#ff0000",
              border: "4px solid #ffffff",
              borderRadius: "10px",
              color: "#ffffff",
              fontSize: "1.4rem",
              cursor: "pointer",
              display: "flex",
              width: "56px",
              height: "56px",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s ease",
              fontWeight: "bold",
              boxShadow: "0 8px 20px rgba(0, 0, 0, 0.6)",
              position: "relative",
            }}
          >
            {isMobileMenuOpen ? (
              <span
                style={{
                  fontSize: "2rem",
                  color: "#ff4444",
                  fontWeight: "bold",
                }}
              >
                ✕
              </span>
            ) : (
              <span
                style={{
                  fontSize: "2rem",
                  color: "#ffffff",
                  fontWeight: "900",
                  textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
                }}
              >
                ≡
              </span>
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div
            className="mobile-nav"
            style={{
              background: "#1d4ed8",
              padding: "1rem",
              borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  padding: "1rem",
                  borderRadius: "8px",
                  color: "#fff",
                  textDecoration: "none",
                  fontSize: "1.1rem",
                  fontWeight: item.special ? "600" : "500",
                  background: item.special ? "#3b82f6" : "transparent",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  marginBottom: "0.5rem",
                }}
                onClick={() => setIsMobileMenuOpen(false)}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                }}
                onMouseOut={(e) => {
                  if (!item.special) {
                    e.target.style.backgroundColor = "transparent";
                  } else {
                    e.target.style.backgroundColor = "#3b82f6";
                  }
                }}
              >
                <span style={{ fontSize: "1.2rem" }}>{item.icon}</span>
                <span>{item.name}</span>
                <span style={{ marginLeft: "auto", fontSize: "0.8rem" }}>
                  →
                </span>
              </a>
            ))}
          </div>
        )}
      </header>

      <style>{`
        .mobile-menu-btn {
          display: flex !important;
        }
        
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
        }

        @media (min-width: 769px) {
          .mobile-nav {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default HomeNavbar;

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    if (id === "home") {
      navigate("/");
    } else if (id === "demo") {
      navigate("/demo");
    } else {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
    setIsMobileMenuOpen(false); // Close menu after navigation
  };

  return (
    <div
      style={{
        width: "100%",
        height: "80px",
        backgroundColor: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 5%",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        position: "fixed",
        top: "0",
        left: "0",
        zIndex: "1000",
        boxSizing: "border-box",
      }}
    >
      {/* Logo */}
      <Link
        to="/"
        style={{
          color: "black",
          fontSize: "28px",
          fontWeight: "bold",
          fontFamily: "'Roboto Slab', serif",
          textDecoration: "none",
        }}
      >
        ReturnSage
      </Link>

      {/* Hamburger Menu for Mobile */}
      <div
        className="hamburger-menu"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        style={{
          display: "none", // Will be visible only in mobile view
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          width: "30px",
          height: "25px",
          cursor: "pointer",
        }}
      >
        <div style={{ width: "100%", height: "4px", backgroundColor: "black" }} />
        <div style={{ width: "100%", height: "4px", backgroundColor: "black" }} />
        <div style={{ width: "100%", height: "4px", backgroundColor: "black" }} />
      </div>

      {/* Desktop Links */}
      <div
        className="desktop-links"
        style={{
          display: "flex",
          gap: "20px",
          alignItems: "center",
          justifyContent: "flex-end",
          maxWidth: "600px",
          flexGrow: 1,
        }}
      >
        <a
          href="#features"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("features");
          }}
          style={{ color: "black", textDecoration: "none" }}
        >
          Features
        </a>
        <a
          href="#pricing"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("pricing");
          }}
          style={{ color: "black", textDecoration: "none" }}
        >
          Pricing
        </a>
      </div>

      {/* Mobile Dropdown */}
      {isMobileMenuOpen && (
        <div
          className="mobile-dropdown"
          style={{
            position: "absolute",
            top: "80px",
            right: 0,
            width: "100%",
            backgroundColor: "#f7f7f7",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            padding: "10px 0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            zIndex: "1001",
          }}
        >
          <a
            href="#features"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("features");
            }}
            style={{
              color: "black",
              textDecoration: "none",
              padding: "10px",
              width: "100%",
              textAlign: "center",
            }}
          >
            Features
          </a>
          <a
            href="#pricing"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("pricing");
            }}
            style={{
              color: "black",
              textDecoration: "none",
              padding: "10px",
              width: "100%",
              textAlign: "center",
            }}
          >
            Pricing
          </a>
        </div>
      )}

      {/* Responsive Styles */}
      <style>
        {`
          @media (max-width: 768px) {
            .hamburger-menu {
              display: flex;
            }
            .desktop-links {
              display: none;
            }
            .mobile-dropdown {
              padding: 0 5%;
            }
          }

          @media (max-width: 480px) {
            .hamburger-menu {
              display: flex;
            }
            .desktop-links {
              display: none;
            }
            .mobile-dropdown {
              padding: 0 5%;
            }
            .mobile-dropdown a {
              font-size: 14px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Navbar;

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    if (id === "home") {
      navigate("/"); // Redirect to the home page
    } else if (id === "demo") {
      navigate("/demo"); // Navigate to the /demo page
    } else {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({
          behavior: "smooth", // Smooth scroll behavior
          block: "start", // Aligns the section to the top of the viewport
        });
      }
    }
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
        padding: "0 20px",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        position: "fixed",
        top: "0",
        left: "0",
        zIndex: "1000",
        paddingLeft: "50px",
        transition: "all 0.3s ease",
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

      {/* Hamburger Menu (visible only on mobile) */}
      <div
        className="hamburger-menu"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        style={{
          display: "none", // Hidden by default for larger screens
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

      {/* Links (for desktop and mobile) */}
      <div
        style={{
          display: "flex",
          gap: "30px",
          paddingRight: "100px",
          alignItems: "center",
          flex: "1",
          justifyContent: "flex-end",
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
        <a
          href="#demo"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("demo");
          }}
          style={{ color: "black", textDecoration: "none" }}
        >
          Book a Demo
        </a>
      </div>

      {/* Mobile Menu (visible when the hamburger menu is clicked) */}
      {isMobileMenuOpen && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            position: "absolute",
            top: "80px", // Below the navbar
            right: "20px",
            backgroundColor: "white",
            padding: "20px",
            width: "200px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
            zIndex: "999",
          }}
        >
          <a
            href="#features"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("features");
              setIsMobileMenuOpen(false); // Close the menu after clicking
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
              setIsMobileMenuOpen(false); // Close the menu after clicking
            }}
            style={{ color: "black", textDecoration: "none" }}
          >
            Pricing
          </a>
          <a
            href="#demo"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("demo");
              setIsMobileMenuOpen(false); // Close the menu after clicking
            }}
            style={{ color: "black", textDecoration: "none" }}
          >
            Book a Demo
          </a>
        </div>
      )}
    </div>
  );
};

export default Navbar;

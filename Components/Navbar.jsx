import React from "react";

const Navbar = () => {
  return (
    <div
      style={{
        width: "100%", // Ensures the navbar spans the full width
        height: "80px", // Fixed height
        backgroundColor: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        position: "fixed", // Fixes the navbar at the top
        top: "0", // Aligns it to the top of the viewport
        left: "0", // Ensures the navbar starts from the left edge
        zIndex: "1000", // Ensures the navbar stays above other content
        paddingLeft:"50px"
      }}
    >
      {/* Logo */}
      <div style={{ color: "black", fontSize: "24px", fontWeight: "bold",fontFamily: "'Yorkten Slab', serif", }}>
        ReturnSage
      </div>

      {/* Links */}
      <div style={{ display: "flex", gap: "30px",paddingRight:"100px" }}>
        <a href="#features" style={{ color: "black", textDecoration: "none" }}>
          Features
        </a>
        <a href="#pricing" style={{ color: "black", textDecoration: "none" }}>
          Pricing
        </a>
        <a href="#demo" style={{ color: "black", textDecoration: "none" }}>
          Book a Demo
        </a>
      </div>
    </div>
  );
};

export default Navbar;

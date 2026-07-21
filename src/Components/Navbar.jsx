import React from "react";
import "../App.css";

function Navbar() {
  return (
    <nav className="navbar">

      {/* Logo */}
      <div className="logo">
        <span className="student">Sardar Doon </span>
        <span className="learning">Public School</span>
      </div>

      {/* Navigation Links */}
      <div className="nav-links">
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#service">Service</a>
        <a href="#contact">Contact</a>
      </div>

    </nav>
  );
}

export default Navbar;
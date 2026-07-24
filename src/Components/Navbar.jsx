import React from "react";
import "../App.css";

function Navbar() {
  return (
    <nav className="navbar">

      {/* Logo */}
      <div className="logo">
        <p className="student"> 🎓Sardar Doon <br/> <span>Public School</span> </p>
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
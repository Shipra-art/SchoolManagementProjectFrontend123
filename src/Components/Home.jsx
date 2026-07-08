import React from "react";
import { useNavigate } from "react-router-dom";
import School from "../assets/school.jpg";      // Background Image
import SchoolBoy from "../assets/schoolboy.png"; // Boy PNG
import "../App.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div
      className="hero"
      style={{ backgroundImage: `url(${School})` }}
    >
      {/* Dark Overlay */}
      <div className="overlay"></div>

      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          🎓 <span>Edu School</span>
        </div>

        <div className="nav-links">
          <a href="/">Home</a>
          <a href="/">Courses</a>
          <a href="/">About</a>
          <a href="/">Contact</a>

          <button
            className="login-btn"
            onClick={() => navigate("/login")}
          >
            Login
          </button>

          <button
            className="register-btn"
            onClick={() => navigate("/Register")}
          >
            Register
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="hero-content">

        {/* Left Side */}
        <div className="hero-left">

          <span className="tag">
            School Management System
          </span>

          <h1>
            Your Kids <br />
            Deserve The <br />
            <span>Best Education</span>
          </h1>

          <p>
            Manage Students, Teachers, Attendance,
            Homework, Results, Parents and more with
            one powerful school management platform.
          </p>

          <button
            className="admission-btn"
            onClick={() => navigate("/login")}
          >
            Get Started
          </button>

        </div>

        {/* Right Side */}
        <div className="hero-right">

          <div className="circle"></div>

          <img
            src={SchoolBoy}
            alt="Student"
            className="hero-image"
          />

        </div>

      </div>

    </div>
  );
}

export default Home;
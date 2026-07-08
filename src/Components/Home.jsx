import React from "react";
import { useNavigate } from "react-router-dom";
import School from "../assets/school.jpg";
import Schoolboy from "../assets/Schoolboy.png";
import "../App.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="hero">

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
            Homework, Results and Parent Portal in one place.
          </p>

          <button
            className="admission-btn"
            onClick={() => navigate("/login")}
          >
            Get Started
          </button>
        </div>

        <div className="hero-right">
          <div className="circle"></div>

          <img
            src={Schoolboy}
            alt="School"
            className="hero-image"
          />
        </div>

      </div>

    </div>
  );
}

export default Home;
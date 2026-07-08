import React from "react";
import { useNavigate } from "react-router-dom";
import Schoolboy from "../assets/Schoolboy.png";
import Teacher from "../assets/Teacher.png";
import "../App.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="hero">
      {/* ================= NAVBAR ================= */}

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
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </div>
      </nav>

      {/* ================= HERO ================= */}

      <div className="hero-content">

        {/* Left Side */}

        <div className="hero-left">

          <span className="tag">
            School Management System
          </span>

          <h1>
            Your Kids
            <br />
            Deserve The
            <br />
            <span>Best Education</span>
          </h1>

          <p>
            Manage Students, Teachers, Attendance,
            Homework, Results and Parent Portal
            in one place.
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
            src={Schoolboy}
            alt="School Boy"
            className="student-img"
          /> 

        </div>

      </div>

    </div>
  );
}

export default Home;
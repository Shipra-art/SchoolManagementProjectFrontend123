import React from "react";
import { useNavigate } from "react-router-dom";
import School from "../assets/school.jpg";
import "../App.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-wrapper">

      {/* Header */}
      <header className="home-header">
        <h1 className="home-header-title">School Management</h1>
      </header>

      {/* Main Section */}
      <main className="home-main">
        <img
          src={School}
          alt="School"
          className="home-image"
        />

        <h1 className="home-title">
          Welcome to School Management System
        </h1>

        <p className="home-description">
          Manage students, teachers, attendance and more in a simple way.
        </p>

        <div className="button-container">
          <button onClick={() => navigate("/login")}  className="home-btn">Login</button>
          <button onClick={() => navigate("/Register")} className="home-btn">Register</button>
        </div>

      </main>

      {/* Footer */}
      <footer className="home-footer">
        © 2026 School Management System
      </footer>

    </div>
  );
}

export default Home;
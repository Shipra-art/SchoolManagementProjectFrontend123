import { Link } from "react-router-dom";

import "../App.css";

function Services() {
  return (
    <div className="home">


      <nav className="navbar">

        <div className="logo">
          STUDENT
          <br />
          <span>LEARNING</span>
        </div>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/services" className="active">Service</Link>
          <Link to="/contact">Contact</Link>
        </div>

      </nav>

      <div className="hero-content">

        <div className="hero-left">

          <h1>
            <span className="About">OUR</span>
            <br />
            <span className="dark">SERVICES</span>
          </h1>

          <div className="feature-list">

            <div>📘 Student Management</div>
            <div>👨‍🏫 Teacher Management</div>
            <div>📅 Attendance</div>
            <div>📝 Homework</div>
            <div>📊 Report Cards</div>
            <div>🔔 Notifications</div>

          </div>

        </div>

        <div className="hero-right">
           <img src="https://img.magnific.com/premium-vector/service-filled-outline-doodle-design-illustration-symbol-white-background-eps-10-file_848977-350.jpg?semt=ais_hybrid&w=740&q=80" alt="Services" /> 
        </div>

      </div>

    </div>
  );
}

export default Services;
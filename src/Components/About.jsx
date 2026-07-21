import { Link } from "react-router-dom";
import aboutImage from "../assets/about.png";
import "../App.css";

function About() {
  return (
    <div className="home">

      {/* Navbar */}
      <nav className="navbar">

        <div className="logo">
          STUDENT
          <br />
          <span>LEARNING</span>
        </div>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/about" className="active">About</Link>
          <Link to="/services">Service</Link>
          <Link to="/contact">Contact</Link>
        </div>

      </nav>

      {/* Hero */}

      <div className="hero">

        <div className="hero-left">

          <h1>
            <span className="blue">ABOUT</span>
            <br />
            <span className="dark">OUR SCHOOL</span>
          </h1>

          <p>
            School Management System is an all-in-one platform
            that helps students, teachers, parents and
            administrators manage academic activities easily.
          </p>

          <div className="feature-list">

            <div>✔ Student Management</div>
            <div>✔ Teacher Management</div>
            <div>✔ Attendance</div>
            <div>✔ Report Cards</div>

          </div>

        </div>

        <div className="hero-right">
          <img src={aboutImage} alt="About" />
        </div>

      </div>

    </div>
  );
}

export default About;
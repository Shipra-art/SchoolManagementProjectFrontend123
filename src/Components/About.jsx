import { Link } from "react-router-dom";
import AboutImg from "../assets/About.png"
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

      <div className="hero-content">

        <div className="hero-left">

          <h1>
            <span className="About">ABOUT</span>
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
           <img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSY-JgvMG-1zYL1HXmRx3Ji5OCbkfN3rw7Ddg946CEiIQ&s=10"}
            alt="About" /> 
        </div>

      </div>

    </div>
  );
}

export default About;
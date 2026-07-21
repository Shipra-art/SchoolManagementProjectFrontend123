import { Link } from "react-router-dom";

import "../App.css";

function Contact() {
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
          <Link to="/services">Service</Link>
          <Link to="/contact" className="active">Contact</Link>
        </div>

      </nav>

      <div className="hero-content">

        <div className="hero-left">

          <h1>
            <span className="About">CONTACT</span>
            <br />
            <span className="dark">US</span>
          </h1>

          <p>📍 Jodhpur, Rajasthan</p>
          <p>📞 +91 9876543210</p>
          <p>📧 support@school.com</p>
          <p>🕒 Monday - Saturday (9 AM - 5 PM)</p>

          <button className="register-btn">
            Contact Now
          </button>

        </div>

        <div className="hero-right">
           <img src="https://cdn.vectorstock.com/i/500p/89/87/six-simple-contact-icons-vector-60988987.jpg" alt="Contact" /> 
        </div>

      </div>

    </div>
  );
}

export default Contact;
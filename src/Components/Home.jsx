import { Link } from "react-router-dom";
import heroImage from "../assets/Hero.png";
import "../App.css";

function Home() {
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
          <a href="/">Home</a>
          <a href="/">Tutorials</a>
          <a href="/">Portfolio</a>
          <a href="/">Work</a>
          <a href="/">Contact</a>

          {/* <Link to="/login" className="login-btn">
            Login
          </Link> */}

          {/* <Link to="/register" className="register-btn">
            Register
          </Link> */}

        </div>

      </nav>

      {/* Hero Section */}

      <div className="hero-content">

        <div className="hero-left">

          <h1>
            STUDENT
            <br />
            <span>GROWTH</span>


          </h1>

          <h3>
            School Management System helps students,
            teachers and parents manage academic
            activities in one place.
          </h3>

          <div className="hero-buttons">

            <a href="/login"><button className="try-btn">
              Login
            </button></a>



             <a href="/register">
              <button className="learn-btn">
              Register
            </button>
             </a>

          </div>

        </div>

        <div className="hero-right">
          <img src={heroImage} alt="Hero" />
        </div>

      </div>

    </div>
  );
}

export default Home;
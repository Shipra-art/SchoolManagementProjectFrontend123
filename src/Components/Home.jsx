import { Link } from "react-router-dom";
import heroImage from "../assets/Hero.png"; // illustration image

function Home() {
  return (
    <div className="home">

      <nav className="navbar">
        <div className="logo">
          STUDENT LEARNING
        </div>

        <div className="nav-links">
          <a href="/">Home</a>
          <a href="/">Tutorials</a>
          <a href="/">Portfolio</a>
          <a href="/">Work</a>
          <a href="/">Contact</a>

          <Link to="/login" className="login-btn">
            Login
          </Link>

          <Link to="/register" className="register-btn">
            Register
          </Link>
        </div>
      </nav>

      <div className="hero-content">

        <div className="hero-left">
          {/* <h1>
            STUDENT <br />
            <span>GROWTH</span>
          </h1> */}

          <h3>
            School Management System helps students,
            teachers and parents manage academic activities
            in one place.
          </h3>

          <div className="hero-buttons">
            <p className="try-btn">
              Try Now
            </p>

            <p className="learn-btn">
              Learn More
            </p>
          </div>
        </div>

        <div className="hero-right">
          <img src={heroImage} alt="Student Learning" />
        </div>

      </div>

    </div>
  );
}

export default Home;
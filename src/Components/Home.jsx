import heroImage from "../assets/Hero.png";
import "../App.css";
import About from "./About";
import Service from "./Service";
import Contact from "./Contact";
import Navbar from "./Navbar";

function Home() {
  return (
    <>
      <Navbar />
      {/* Home Section */}
      <section id="home" className="home">

        <div className="hero-content">

          <div className="hero-left">

            <h1>
              STUDENT
              <br />
              <span>GROWTH</span>
            </h1>

            <h3>
              Sardar Doon Public School  has Academic Excellence. The school celebrates a consistent track record of
              board exam success, including a perfect 100% pass rate across Science,
              Commerce, and Humanities streams in recent CBSE evaluations.
            </h3>
            
            <h3>
              Students benefit from a highly supportive, hardworking teaching staff that focuses on individual student progress
            </h3>

            <div className="hero-buttons">

              <a href="/login">
                <button className="try-btn">Login</button>
              </a>

              <a href="/register">
                <button className="learn-btn">Register</button>
              </a>

            </div>

          </div>

          <div className="hero-right">
            <img src={heroImage} alt="Hero" />
          </div>

        </div>

      </section>

      {/* About */}
      <section id="about">
        <About />
      </section>

      {/* Services */}
      <section id="service">
        <Service />
      </section>

      {/* Contact */}
      <section id="contact">
        <Contact />
      </section>

    </>
  );
}

export default Home;
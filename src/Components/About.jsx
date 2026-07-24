import AboutImg from "../assets/About.png";
import "../App.css";

function About() {
  return (
    <section className="about-section">
      <div className="about-container">

        {/* Left */}
        <div className="about-left">

          <span className="about-subtitle">WHO WE ARE</span>

          <h1 className="about-heading">
            ABOUT <br />
            OUR SCHOOL
          </h1>

          <p className="about-text">
            Our School Management System is an all-in-one digital platform
            that helps students, teachers, parents and administrators
            efficiently manage academic activities with ease.
          </p>

          <div className="about-grid">

            <div className="about-card">
              <span>✔</span>
              <div>
                <h3>Student Management</h3>
                <p>Manage student records.</p>
              </div>
            </div>

            <div className="about-card">
              <span>✔</span>
              <div>
                <h3>Teacher Management</h3>
                <p>Manage teacher information.</p>
              </div>
            </div>

            <div className="about-card">
              <span>✔</span>
              <div>
                <h3>Attendance</h3>
                <p>Track daily attendance.</p>
              </div>
            </div>

            <div className="about-card">
              <span>✔</span>
              <div>
                <h3>Report Cards</h3>
                <p>Generate academic reports.</p>
              </div>
            </div>

          </div>

        </div>

        {/* Right */}

        <div className="about-right">
          <img src={AboutImg} alt="About" />
        </div>

      </div>
    </section>
  );
}

export default About;
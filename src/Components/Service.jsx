import "../App.css";

function Services() {
  return (
    <section className="service-section">

      <div className="service-container">

        {/* Left Side */}
        <div className="service-left">

          <p className="service-subtitle">WHAT WE OFFER</p>

          <h1>
            <span className="About">OUR</span>
            <br />
            <span className="dark">SERVICES</span>
          </h1>

          <p className="service-text">
            We provide smart digital solutions to simplify school
            management for students, teachers and administrators.
          </p>

          <div className="service-grid">

            <div className="service-card">
              <span>📘</span>
              <h3>Student Management</h3>
              <p>Manage student records and profiles.</p>
            </div>

            <div className="service-card">
              <span>👨‍🏫</span>
              <h3>Teacher Management</h3>
              <p>Manage teachers and class schedules.</p>
            </div>

            <div className="service-card">
              <span>📅</span>
              <h3>Attendance</h3>
              <p>Track daily attendance quickly.</p>
            </div>

            <div className="service-card">
              <span>📝</span>
              <h3>Homework</h3>
              <p>Assign and review homework online.</p>
            </div>

            <div className="service-card">
              <span>📊</span>
              <h3>Report Cards</h3>
              <p>Generate student performance reports.</p>
            </div>

            <div className="service-card">
              <span>🔔</span>
              <h3>Notifications</h3>
              <p>Instant alerts for parents and students.</p>
            </div>

          </div>

        </div>

        {/* Right Side */}
        <div className="service-right">
          <img
            src="https://img.magnific.com/premium-vector/service-filled-outline-doodle-design-illustration-symbol-white-background-eps-10-file_848977-350.jpg?semt=ais_hybrid&w=740&q=80"
            alt="Services"
          />
        </div>

      </div>

    </section>
  );
}

export default Services;
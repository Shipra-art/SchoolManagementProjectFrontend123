import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function TeacherProfile() {
  const navigate = useNavigate();

  const teacher = {
    name: "Mr. Sanjay Purohit",
    subject: "Computer Science",
    email: "purohit@gmail.com",
    phone: "9876543210",
    experience: "5 Years",
    qualification: "M.Sc in Computer Science",
  };

  return (
    <div className="teacher-dashboard">

      {/* Sidebar */}
      <aside className="teacher-sidebar">

        <div className="teacher-logo">
          <div className="teacher-logo-box">👩‍🏫</div>
          <h2>Teacher Panel</h2>
        </div>

        <ul className="teacher-menu">
          <li onClick={() => navigate("/teacher-dashboard")}>Dashboard</li>
          <li className="active">Profile  </li>
          <li onClick={() => navigate("/classes")}> Classes</li>
          <li onClick={() => navigate("/report-card")}>  Report Card</li>
          <li onClick={() => navigate("/view-marks")}>Marks</li>
          <li onClick={() => navigate("/attendance")}>Attendance</li>
          <li onClick={() => navigate("/query")}> Query </li>
          <li onClick={() => navigate("/login")}>Logout</li>

        </ul>

      </aside>

      {/* Main Content */}
      <div className="profile-container">

        <div className="profile-card">

          <div className="profile-left">

            <div className="profile-avatar">
              👨‍🏫
            </div>

            <h2>{teacher.name}</h2>

            <p className="subject">
              {teacher.subject}
            </p>

          </div>

          <div className="profile-details">

            <p><strong>Email:</strong> {teacher.email}</p>

            <p><strong>Phone:</strong> {teacher.phone}</p>

            <p><strong>Experience:</strong> {teacher.experience}</p>

            <p><strong>Qualification:</strong> {teacher.qualification}</p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default TeacherProfile;
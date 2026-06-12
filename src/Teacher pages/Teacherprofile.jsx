import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function TeacherProfile() {
  const navigate = useNavigate();
  const teacher = {
    name: "Mr. Sharma",
    subject: "Mathematics",
    email: "sharma@gmail.com",
    phone: "9876543210",
    experience: "5 Years",
    qualification: "M.Sc, B.Ed"
  };

  return (
    <div className="dashboard">
      <div className="sidebar">
        <h2>Teacher Dashboard</h2>
        <ul>
           <li onClick={()=>navigate("/teacher-dashboard")}> Dashboard</li>
         <li style={{ backgroundColor: "#007bff", color: "white" }}>Profile</li>
          <li onClick={() => navigate("/classes")}>Classes</li>
          <li onClick={() => navigate("/report-card")}>Report Card</li>
          <li onClick={() => navigate("/view-marks")}>Marks</li>
          <li onClick={() => navigate("/attendance")}>Attendance</li>
          <li onClick={() => navigate("/query")}>Query</li>
          <li onClick={() => navigate("/login")}>Logout</li>
        </ul>
      </div>
      <div className="profile-container">
        <div className="profile-card">

          <h2>{teacher.name}</h2>
          <p className="subject">{teacher.subject} Teacher</p>

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
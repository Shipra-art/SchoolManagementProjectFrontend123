import React, { useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import ProfileImg from "../assets/profile.jpg";

function StudentProfile() {
  const navigate = useNavigate();

  const [student] = useState({
    name: "Esha",
    roll: "12",
    className: "12th Grade",
    email: "Esha@gmail.com",
    phone: "9876543210",
    attendance: "91%",
    address: "Jodhpur, India",
    dob: "31/12/2007",
    gender: "Female",
    parent: "Anil Vyas",
    fees: "Paid",
  });

  return (
    <div className="student-dashboard">

      {/* Sidebar */}

      <aside className="student-sidebar">

        <div className="sidebar-logo">
          <div className="logo-box"></div>
          <h2>Student Dashboard</h2>
        </div>

        <ul className="student-menu">
          <li onClick={() => navigate("/student-dashboard")}>My Dashboard</li>
          <li className="active">My Profile</li>
          <li onClick={() => navigate("/courses")}>My Courses</li>
          <li onClick={() => navigate("/query-form")}>Queries</li>
          <li onClick={() => navigate("/Homework")}>Homework</li>
          <li onClick={() => navigate("/marks")}>Marks</li>
          <li onClick={() => navigate("/student-attendance")}>Attendance</li>
          <li onClick={() => navigate("/timetable")}>Timetable</li>
          <li className="logout" onClick={() => navigate("/login")}>
            Logout
          </li>
        </ul>

      </aside>

      {/* Main Content */}

      <div className="student-main">

        {/* Student ID Card */}

        <div className="student-card">

          <img
            src={ProfileImg}
            alt="Profile"
            className="profile-img"
          /> 

          <div className="student-card-content">
            <h2>{student.name}</h2>

            <p>Roll No : {student.roll}</p>

            <p>Class : {student.className}</p>

            <div className="student-status">
              <span>Attendance : {student.attendance}</span>
              <span>Fees : {student.fees}</span>
            </div>
          </div>

        </div>

        {/* Personal Information */}

        <div className="info-card">

          <div className="info-title">
            Personal Information
          </div>

          <div className="info-grid">

            <div className="info-item">
              <label>Email</label>
              <p>{student.email}</p>
            </div>

            <div className="info-item">
              <label>Phone</label>
              <p>{student.phone}</p>
            </div>

            <div className="info-item">
              <label>Date of Birth</label>
              <p>{student.dob}</p>
            </div>

            <div className="info-item">
              <label>Gender</label>
              <p>{student.gender}</p>
            </div>

            <div className="info-item">
              <label>Parent</label>
              <p>{student.parent}</p>
            </div>

            <div className="info-item">
              <label>Address</label>
              <p>{student.address}</p>
            </div>

          </div>

        </div>

      </div>
    </div>
  )
};
export default StudentProfile;
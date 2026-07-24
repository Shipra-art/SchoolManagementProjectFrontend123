import React, { useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import ProfileImg from "../assets/profile.jpg";

function StudentProfile() {
  const navigate = useNavigate();

  const [student] = useState({
    name: "Esha",
    roll: "112",
    className: "12th Grade",
    email: "Esha@email.com",
    phone: "9876543210",
    attendance: "91%",
    address: "Jodhpur, India",
    dob: "31/12/2008",
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

        <div className="profile-header">

          <img
            src={ProfileImg}
            alt="Profile"
            className="profile-img"
          />

          <h1>Student Profile</h1>

        </div>

        <div className="profile-grid">

          <div className="profile-card">
            <h4>Name</h4>
            <p>{student.name}</p>
          </div>

          <div className="profile-card">
            <h4>Roll Number</h4>
            <p>{student.roll}</p>
          </div>

          <div className="profile-card">
            <h4>Class</h4>
            <p>{student.className}</p>
          </div>

          <div className="profile-card">
            <h4>Email</h4>
            <p>{student.email}</p>
          </div>

          <div className="profile-card">
            <h4>Phone</h4>
            <p>{student.phone}</p>
          </div>

          <div className="profile-card">
            <h4>Attendance</h4>
            <p>{student.attendance}</p>
          </div>

          <div className="profile-card">
            <h4>Address</h4>
            <p>{student.address}</p>
          </div>

          <div className="profile-card">
            <h4>Date of Birth</h4>
            <p>{student.dob}</p>
          </div>

          <div className="profile-card">
            <h4>Gender</h4>
            <p>{student.gender}</p>
          </div>

          <div className="profile-card">
            <h4>Parent</h4>
            <p>{student.parent}</p>
          </div>

          <div className="profile-card">
            <h4>Fees</h4>
            <p>{student.fees}</p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default StudentProfile;
import React, { useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom"
import ProfileImg from "../assets/profile.jpg";

function StudentProfile() {
  const navigate = useNavigate();
  const [student, setStudent] = useState({
    name: "Esha",
    roll: "112",
    className: "12th Grade",
    email: "Esha@email.com",
    phone: "9876543210",
    attendance: "91%",
    address: "Jodhpur, India",
    dob: "31/12/2008",
    gender: "Female",
    parent: "Anil vyas",
    fees: "Paid"
  });

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="dashboard">
      <div className="sidebar">
        <h2>Student Dashboard</h2>


        <ul>
          <li onClick={() => navigate("/student-dashboard")}>My Dashboard</li>
          <li style={{ backgroundColor: "#007bff", color: "white" }}> Profile</li>
          <li onClick={() => navigate("/courses")}>My Courses</li>
          <li onClick={() => navigate("/query-form")}>Queries</li>
          <li onClick={() => navigate("/Homework")}>Homework</li>
          <li onClick={() => navigate("/marks")}>Marks</li>
          <li onClick={() => navigate("/student-attendance")}>Attendance</li>
          <li onClick={() => navigate("/timetable")}>Timetable</li>
          <li onClick={() => navigate("/login")}>Logout</li>
        </ul>

      </div>

      <div className="profile-card">

        <img
          src={ProfileImg}
          alt="profile"
          className="profile-img" />

        <div className="details">
          <p><b>Name:</b> {student.name}</p>
          <p><b>Roll No:</b> {student.roll}</p>
          <p><b>Class:</b> {student.className}</p>
          <p><b>Email:</b> {student.email}</p>
          <p><b>Phone:</b> {student.phone}</p>
          <p><b>Attendance:</b> {student.attendance}</p>
          <p><b>Address:</b> {student.address}</p>
          <p><b>DOB:</b> {student.dob}</p>
          <p><b>Gender:</b> {student.gender}</p>
          <p><b>Parent:</b> {student.parent}</p>
          <p><b>Fees:</b> {student.fees}</p>
        </div>
      </div>
    </div>
  );
}

export default StudentProfile;
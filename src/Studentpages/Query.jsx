import React, { useState } from "react";
import api from "../api/axios";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

import "primereact/resources/themes/lara-light-green/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

function Query() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    // studentId: "",
    studentName: "",
    subject: "",
    currentMarks: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const submitQuery = async () => {
    try {
      await api.post("/ResultQuery", formData);

      alert("Query Submitted Successfully!");

      setFormData({
        // studentId: "",
        studentName: "",
        subject: "",
        currentMarks: "",
        message: "",
      });
    } catch (error) {
      console.log(error);
      alert("Query Submit Failed!");
    }
  };

  return (
    <div className="dashboard">
      {/* Sidebar */}

      <div className="sidebar">
        <h2>Student Panel</h2>

        <ul>
          <li onClick={() => navigate("/student-dashboard")}>Dashboard</li>
          <li onClick={() => navigate("/profile")}>My Profile</li>
          <li onClick={() => navigate("/courses")}>My Courses</li>
          <li style={{ backgroundColor: "#007bff", color: "white" }}>Queries</li>
          <li onClick={() => navigate("/Homework")}>Homework</li>
          <li onClick={() => navigate("/marks")}>Marks</li>
          <li onClick={() => navigate("/student-attendance")}>Attendance</li>
          <li onClick={() => navigate("/timetable")}>Timetable</li>
          <li onClick={() => navigate("/login")}>Logout</li>
        </ul>
      </div>

      {/* Query Form */}

      <div className="query-container">
        <div className="query-card">
          <h1>Student Result Query</h1>

          <div className="form-box">
            <InputText
              placeholder="Student ID"
              name="studentId"
              value={formData.studentId}
              onChange={handleChange}
            />

            <InputText
              placeholder="Student Name"
              name="studentName"
              value={formData.studentName}
              onChange={handleChange}
            />

            <InputText
              placeholder="Subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
            />

            <InputText
              placeholder="Current Marks"
              name="currentMarks"
              value={formData.currentMarks}
              onChange={handleChange}
            />

            <InputTextarea
              placeholder="Write Your Query"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
            />

            <Button
              label="Submit Query"
              icon="pi pi-send"
              className="query-btn"
              onClick={submitQuery}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Query;
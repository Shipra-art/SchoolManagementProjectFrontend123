import React from 'react';
import { useNavigate } from "react-router-dom";
import "../App.css";
import CoursesImg from "../assets/courses.png";

function Courses() {

    const navigate = useNavigate();

    return (

        <div className="dashboard">

            {/* Sidebar */}
            <div className="sidebar">

                <h2>Student Dashboard</h2>

                <ul>
                    <li onClick={() => navigate("/student-dashboard")}>My Dashboard</li>
                    <li onClick={() => navigate("/profile")}>My Profile</li>
                    <li style={{ backgroundColor: "#007bff", color: "white" }}>Courses</li>
                    <li onClick={() => navigate("/query-form")}>Queries</li>
                    <li onClick={() => navigate("/Homework")}>Homework</li>
                    <li onClick={() => navigate("/marks")}>Marks</li>
                    <li onClick={() => navigate("/student-attendance")}>Attendance</li>
                    <li onClick={() => navigate("/timetable")}>Timetable</li>
                    <li onClick={() => navigate("/login")}>Logout</li>
                </ul>

            </div>

            {/* Main Content */}
            <div className="courses-container">

                <h1 className="courses-title"> My Subjects </h1>

                <div className="courses-card">

                    <img src={CoursesImg} alt="Courses" className="courses-image" />

                    <div className="courses-details">

                        <h2>Available Subjects</h2>

                        <div className="subject-list">
                            <div className="subject-item"> Mathematics</div>
                            <div className="subject-item"> Computer Science</div>
                            <div className="subject-item">  Social Studies </div>
                            <div className="subject-item"> Science </div>
                            <div className="subject-item"> English </div>
                            <div className="subject-item"> Hindi </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Courses;
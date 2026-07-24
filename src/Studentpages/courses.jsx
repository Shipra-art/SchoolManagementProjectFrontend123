import React from 'react';
import { useNavigate } from "react-router-dom";
import "../App.css";
import WidthImg from "../assets/Width.jpg";

function Courses() {

    const navigate = useNavigate();

    return (

        <div className="student-dashboard">

            {/* Sidebar */}

            <aside className="student-sidebar">

                <div className="sidebar-logo">

                    <div className="logo-box"></div>
                    <h2>Student Dashboard</h2>

                </div>

                <ul className="student-menu">

                    <li className="active">  My Dashboard</li>
                    <li onClick={() => navigate("/profile")}>  My Profile</li>
                    <li onClick={() => navigate("/courses")}>  My Courses</li>
                    <li onClick={() => navigate("/query-form")}>  Queries</li>
                    <li onClick={() => navigate("/Homework")}>Homework</li>
                    <li onClick={() => navigate("/marks")}>Marks</li>
                    <li onClick={() => navigate("/student-attendance")}> Attendance</li>
                    <li onClick={() => navigate("/timetable")}>Timetable </li>
                    <li className="logout" onClick={() => navigate("/login")}>  Logout</li>

                </ul>

            </aside>

            {/* Main Content */}
            <div className="courses-container">

                <h1 className="courses-title">My Subjects</h1>

                <div className="courses-main-card">

                    <div className="courses-left">

                        <img
                            src={WidthImg}
                            alt="Courses"
                            className="courses-image"
                        />

                    </div>

                    <div className="courses-right">

                        <h2>Available Subjects</h2>

                        <div className="subject-list">

                            <div className="subject-card">📘 Mathematics</div>
                            <div className="subject-card">💻 Computer Science</div>
                            <div className="subject-card">🌍 Social Studies</div>
                            <div className="subject-card">🔬 Science</div>
                            <div className="subject-card">📖 English</div>
                            <div className="subject-card">📝 Hindi</div>

                        </div>

                    </div>
                </div>
            </div>
        </div>

    );
}

export default Courses;
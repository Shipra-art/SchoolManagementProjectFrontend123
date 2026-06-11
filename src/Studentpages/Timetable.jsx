import React from "react";
import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import "../App.css"
import CoursesImg from "../assets/courses.png"

function Timetable() {
    const navigate = useNavigate()

    return (
        <div className='dashboard'>

            {/* Sidebar */}
            <div className='sidebar'>
                <h2>Student Panel</h2>

                <ul>
                    <li onClick={() => navigate("/student-dashboard")}>Dashboard</li>
                    <li onClick={() => navigate("/profile")}>My Profile</li>
                    <li onClick={() => navigate("/courses")}>My Courses</li>
                    <li onClick={() => navigate("/query-form")}>Queries</li>
                    <li onClick={() => navigate("/Homework")}>Homework</li>
                    <li onClick={() => navigate("/marks")}>Marks</li>
                    <li onClick={() => navigate("/student-attendance")}>Attendance</li>
                    <li style={{ backgroundColor: "#007bff", color: "white" }}>TimeTable</li>
                    <li onClick={() => navigate("/login")}>Logout</li>

                </ul>
            </div>

            {/* Main Content */}
            <div className='main-content'>

                <h1>Class Time Table</h1>

                <div className='table-box'>

                    <table border="1" cellPadding="15">

                        <thead>
                            <tr>
                                <th>Period</th>
                                <th>Monday</th>
                                <th>Tuesday</th>
                                <th>Wednesday</th>
                                <th>Thursday</th>
                                <th>Friday</th>
                                <th>Saturday</th>
                            </tr>
                        </thead>

                        <tbody>

                            <tr>
                                <td>1st Period</td>
                                <td>English</td>
                                <td>Hindi</td>
                                <td>Mathematics</td>
                                <td>Games Period</td>
                                <td>Science</td>
                                <td>Social Studies</td>
                            </tr>

                            <tr>
                                <td>2nd Period</td>
                                <td>English</td>
                                <td>Hindi</td>
                                <td>Mathematics</td>
                                <td>Science</td>
                                <td>Games Period</td>
                                <td>Social Studies</td>
                            </tr>

                            <tr>
                                <td>3rd Period</td>
                                <td>English</td>
                                <td>Games period</td>
                                <td>Hindi</td>
                                <td>Mathematics</td>
                                <td>Science</td>
                                <td>Social Studies</td>
                            </tr>

                            <tr>
                                <td>Lunch Break</td>
                                <td colSpan="5">12:00 PM - 12:30 PM</td>
                            </tr>

                            <tr>
                                <td>4th Period</td>
                                <td>English</td>
                                <td>Hindi</td>
                                <td>Mathematics</td>
                                <td>Computer Science</td>
                                <td>Science</td>
                                <td>Social Studies</td>
                            </tr>

                            <tr>
                                <td>5th Period</td>
                                <td>English</td>
                                <td>Hindi</td>
                                <td>Mathematics</td>
                                <td>Computer Science</td>
                                <td>Science</td>
                                <td>Social Studies</td>
                            </tr>

                            <tr>
                                <td>6th Period</td>
                                <td>Games Period</td>
                                <td>Hindi</td>
                                <td>Mathematics</td>
                                <td>Computer Science</td>
                                <td>Science</td>
                                <td>Social Studies</td>
                            </tr>

                        </tbody>

                    </table>

                </div>

            </div>


        </div>

    )
}

export default Timetable;
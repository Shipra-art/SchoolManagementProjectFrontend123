import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Timetable() {

    const navigate = useNavigate();

    return (

        <div className="dashboard">

            {/* Sidebar */}
            <div className="sidebar">

                <h2>Parent Panel</h2>

                <ul>
                    <li onClick={() => navigate("/parent-dashboard")}>
                        Dashboard
                    </li>

                    <li onClick={() => navigate("/parent-attendance")}>
                        Attendance
                    </li>

                    <li onClick={() => navigate("/parent-homework")}>
                        Homework
                    </li>

                    <li onClick={() => navigate("/parent-report-card")}>
                        Report Card
                    </li>

                    <li onClick={() => navigate("/parent-marks")}>
                        Marks
                    </li>

                    <li onClick={() => navigate("/login")}>
                        Logout
                    </li>
                </ul>

            </div>

            {/* Main Content */}
            <div className="tt-container">

                <h1 className="tt-title">
                    Class Time Table
                </h1>

                <div className="tt-card">

                    <table className="tt-table">

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
                                <td>Games</td>
                                <td>Science</td>
                                <td>Social Studies</td>
                            </tr>

                            <tr>
                                <td>2nd Period</td>
                                <td>English</td>
                                <td>Hindi</td>
                                <td>Mathematics</td>
                                <td>Science</td>
                                <td>Games</td>
                                <td>Social Studies</td>
                            </tr>

                            <tr>
                                <td>3rd Period</td>
                                <td>English</td>
                                <td>Games</td>
                                <td>Hindi</td>
                                <td>Mathematics</td>
                                <td>Science</td>
                                <td>Social Studies</td>
                            </tr>

                            <tr className="lunch-row">
                                <td>Lunch Break</td>
                                <td colSpan="6">
                                    12:00 PM - 12:30 PM
                                </td>
                            </tr>

                            <tr>
                                <td>4th Period</td>
                                <td>English</td>
                                <td>Hindi</td>
                                <td>Mathematics</td>
                                <td>Computer</td>
                                <td>Science</td>
                                <td>Social Studies</td>
                            </tr>

                            <tr>
                                <td>5th Period</td>
                                <td>English</td>
                                <td>Hindi</td>
                                <td>Mathematics</td>
                                <td>Computer</td>
                                <td>Science</td>
                                <td>Social Studies</td>
                            </tr>

                            <tr>
                                <td>6th Period</td>
                                <td>Games</td>
                                <td>Hindi</td>
                                <td>Mathematics</td>
                                <td>Computer</td>
                                <td>Science</td>
                                <td>Social Studies</td>
                            </tr>

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );
}

export default Timetable;
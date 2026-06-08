import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function ParentDashboard() {
    const navigate = useNavigate();

    return (
        <div>
        <div className="dashboard-container">

            {/* Sidebar */}
            <div className="sidebar">
                <h2>Parent Panel</h2>

                <ul>
                    <li onClick={() => navigate("/parent-attendance")}>Attendance</li>
                    <li onClick={() => navigate("/parent-report-card")}>Report Card</li>
                    <li onClick={() => navigate("/parent-homework")}>Homework</li>
                    <li onClick={() => navigate("/parent-time-table")}>Time Table</li>
                    <li onClick={() => navigate("/parent-marks")}>Marks</li>
                    <li onClick={() => navigate("/login")}>Logout</li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="main-content">
                <h1>Welcome Parent</h1>

                <div className="cards">

                    <div
                        className="card"
                        onClick={() => navigate("/parent-attendance")}
                        >
                        <h3>Attendance</h3>
                        <p>View your child's attendance record.</p>
                    </div>

                    <div
                        className="card"
                        onClick={() => navigate("/parent-report-card")}
                        >
                        <h3>Report Card</h3>
                        <p>Check report cards and grades.</p>
                    </div>

                    <div
                        className="card"
                        onClick={() => navigate("/parent-marks")}
                        >
                        <h3>Marks</h3>
                        <p>View subject-wise marks.</p>
                    </div>

                </div>
            </div>

            </div>
        </div>
    );
}

export default ParentDashboard;
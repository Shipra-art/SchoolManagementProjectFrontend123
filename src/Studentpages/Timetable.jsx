import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import "../App.css";

function Timetable() {
    const navigate = useNavigate();

    const [timetable, setTimetable] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getTimetable();
    }, []);

    const getTimetable = async () => {
        try {
            const res = await api.get("/Timetable");
            setTimetable(res.data);
        } catch (err) {
            console.log(err);
            alert("Unable to load timetable.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="dashboard">

            {/* Sidebar */}
            <div className="sidebar">

                <h2>Student Dashboard</h2>

                <ul>
                    <li onClick={() => navigate("/student-dashboard")}>Dashboard</li>
                    <li onClick={() => navigate("/profile")}>My Profile</li>
                    <li onClick={() => navigate("/courses")}>My Courses</li>
                    <li onClick={() => navigate("/query-form")}>Queries</li>
                    <li onClick={() => navigate("/Homework")}>Homework</li>
                    <li onClick={() => navigate("/marks")}>Marks</li>
                    <li onClick={() => navigate("/student-attendance")}>Attendance</li>
                    <li onClick={() => navigate("/timetable")} style={{backgroundColor:"#007bff"}}>Time Table</li>
                    <li onClick={() => navigate("/login")}>Logout</li>
                </ul>

            </div>

            {/* Main Content */}

            <div className="main-content">

                <h1>Class Time Table</h1>

                <div className="table-box">

                    {loading ? (
                        <h3>Loading...</h3>
                    ) : (
                        <table border="1" cellPadding="12">

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

                                {timetable.length > 0 ? (
                                    timetable.map((item) => (
                                        <tr key={item.id}>
                                            <td>{item.period}</td>
                                            <td>{item.monday}</td>
                                            <td>{item.tuesday}</td>
                                            <td>{item.wednesday}</td>
                                            <td>{item.thursday}</td>
                                            <td>{item.friday}</td>
                                            <td>{item.saturday}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" style={{ textAlign: "center" }}>
                                            No Timetable Available
                                        </td>
                                    </tr>
                                )}

                            </tbody>

                        </table>
                    )}

                </div>

            </div>

        </div>
    );
}

export default Timetable;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import "../App.css";

function ReportCard() {
    const navigate = useNavigate();

    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const studentId = "6a2180a7fa0a1e0a9ce474eb";

    useEffect(() => {
        fetchReportCard();
    }, []);

    const fetchReportCard = async () => {
        try {
            const res = await API.get(
                `/marks/reportcard/${studentId}`
            );

            setReport(res.data);

        } catch (err) {

            console.error(err);
            setError("Failed to load report card");

        } finally {

            setLoading(false);

        }
    };

    if (loading) {
        return (
            <div className="report-loading">
                <h2>Loading Report Card...</h2>
            </div>
        );
    }

    if (error) {
        return (
            <div className="report-loading">
                <h2>{error}</h2>
            </div>
        );
    }

    if (!report) {
        return (
            <div className="report-loading">
                <h2>No Report Found</h2>
            </div>
        );
    }

    return (
        <div className="dashboard">

            {/* Sidebar */}
            <div className="sidebar">

                <h2>Parent Panel</h2>

                <ul>

                    <li onClick={() => navigate("/parent-dashboard")}>My Dashboard</li>
                    <li onClick={() => navigate("/parent-attendance")}>Attendance</li>
                    <li style={{ backgroundColor: "#007bff", color: "white" }}>Report-Card</li>
                    <li onClick={() => navigate("/parent-homework")}>Homework</li>
                    <li onClick={() => navigate("/parent-time-table")}>Time Table</li>
                    <li onClick={() => navigate("/parent-marks")}>Marks</li>
                    <li onClick={() => navigate("/login")}>Logout</li>
                </ul>

            </div>

            {/* Main Content */}
            <div className="report-container">

                <h1 className="report-title">
                    Student Report Card
                </h1>

                {/* Student Information */}
                <div className="student-info-card">

                    <p>
                        <strong>Student ID:</strong>
                        {" "}
                        {report.studentId || "N/A"}
                    </p>

                    <p>
                        <strong>Student Name:</strong>
                        {" "}
                        {report.studentName || "N/A"}
                    </p>

                    <p>
                        <strong>Total Marks:</strong>
                        {" "}
                        {report.totalMarks || 0}
                    </p>

                    <p>
                        <strong>Percentage:</strong>
                        {" "}
                        {report.percentage || 0}%
                    </p>

                    <p>
                        <strong>Grade:</strong>
                        {" "}
                        {report.grade || "N/A"}
                    </p>

                </div>

                {/* Report Table */}
                <table className="report-table">

                    <thead>
                        <tr>
                            <th>Subject</th>
                            <th>Exam Type</th>
                            <th>Marks Obtained</th>
                        </tr>
                    </thead>

                    <tbody>

                        {report?.subjects?.length > 0 ? (

                            report.subjects.map((item, index) => (

                                <tr key={index}>

                                    <td>{item.subject}</td>

                                    <td>{item.examType}</td>

                                    <td>{item.marksObtained}</td>

                                </tr>

                            ))

                        ) : (

                            <tr>

                                <td
                                    colSpan="3"
                                    style={{
                                        textAlign: "center"
                                    }}
                                >
                                    No Subject Records Found
                                </td>

                            </tr>

                        )}

                    </tbody>

                </table>

                {/* Remarks */}
                <div className="remarks-section">

                    <h4>Remarks</h4>

                    <p>
                        Excellent Performance! You have
                        successfully completed this session.
                        Keep working hard and continue
                        achieving great results.
                    </p>

                </div>

            </div>

        </div>
    );
}

export default ReportCard;
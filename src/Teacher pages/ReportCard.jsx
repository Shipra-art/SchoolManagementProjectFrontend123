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

            console.log("Report Card Response:", res.data);

            setReport(res.data);
        } catch (err) {
            console.error("API Error:", err);
            setError("Failed to load report card");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="report-container">
                <h2>Loading Report Card...</h2>
            </div>
        );
    }

    if (error) {
        return (
            <div className="report-container">
                <h2>{error}</h2>
            </div>
        );
    }

    if (!report) {
        return (
            <div className="report-container">
                <h2>No Report Found</h2>
            </div>
        );
    }

    return (
        <div className="dashboard">
            {/* Sidebar */}
            <div className="sidebar">
                <h2>Teacher Dashboard</h2>

                <ul>
                    <li onClick={() => navigate("/teacher-dashboard")}> Dashboard</li>
                    <li onClick={() => navigate("/teacher-profile")}>Profile</li>
                    <li onClick={() => navigate("/classes")}>Classes</li>
                    <li style={{ backgroundColor: "#007bff", color: "white" }}>Report Card</li>
                    <li onClick={() => navigate("/view-marks")}>Marks</li>
                    <li onClick={() => navigate("/attendance")}>Attendance</li>
                    <li onClick={() => navigate("/query")}>Query</li>
                    <li onClick={() => navigate("/login")}>Logout</li>

                </ul>

            </div>

            {/* Report Card */}
            <div className="report-container">
                <h1>Student Report Card</h1>

                <div className="student-info">


                    <p>
                        <strong>Student Name:</strong>{" "}
                        {report.studentName}
                    </p>

                    <p>
                        <strong>Total Marks:</strong>{" "}
                        {report.totalMarks}
                    </p>

                    <p>
                        <strong>Percentage:</strong>{" "}
                        {report.percentage}%
                    </p>

                    <p>
                        <strong>Grade:</strong>{" "}
                        {report.grade}
                    </p>
                </div>

                <table border="1" cellPadding="10" cellSpacing="0">
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
                                    style={{ textAlign: "center" }}
                                >
                                    No Subject Records Found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div className="remarks-section">
                    <h4>Remarks</h4>
                    <p>
                        Excellent performance!
                        You have been promoted to the next class.
                        Keep up the good work.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ReportCard;
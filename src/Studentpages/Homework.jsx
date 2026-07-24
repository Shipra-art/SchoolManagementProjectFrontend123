import React, { useEffect, useState } from "react";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import "../App.css";

function StudentHomework() {

    const [homeworks, setHomeworks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getHomework();
    }, []);

    const getHomework = async () => {
        try {
            const res = await API.get("/Homework");
            setHomeworks(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const subjectTemplate = (rowData) => {
        return (
            <span className="subject-badge">
                {rowData.subject}
            </span>
        );
    };

    const dueDateTemplate = (rowData) => {
        return (
            <span className="due-date">
                {rowData.dueDate}
            </span>
        );
    };

    return (
        <div className="student-dashboard">

            {/* Sidebar */}
            <aside className="student-sidebar">
                <div className="sidebar-logo">
                    <div className="logo-box"></div>
                    <h2>Student Dashboard</h2>
                </div>

                <ul className="student-menu">
                    <li className="active">My Dashboard</li>
                    <li onClick={() => navigate("/profile")}>My Profile</li>
                    <li onClick={() => navigate("/courses")}>My Courses</li>
                    <li onClick={() => navigate("/query-form")}>Queries</li>
                    <li onClick={() => navigate("/Homework")}>Homework</li>
                    <li onClick={() => navigate("/marks")}>Marks</li>
                    <li onClick={() => navigate("/student-attendance")}>Attendance</li>
                    <li onClick={() => navigate("/timetable")}>Timetable</li>
                    <li className="logout" onClick={() => navigate("/login")}>Logout</li>
                </ul>
            </aside>

            {/* Main Content */}
            <div className="homework-container">

                <h1 className="homework-title">
                    Homework & Assignments
                </h1>

                <Card className="homework-card">

                    <DataTable
                        value={homeworks}
                        paginator
                        rows={5}
                        stripedRows
                        showGridlines
                        responsiveLayout="scroll"
                        className="homework-table"
                    >
                        <Column
                            field="subject"
                            header="Subject"
                            body={subjectTemplate}
                            style={{ width: "140px" }}
                        />

                        <Column
                            field="title"
                            header="Title"
                            style={{ width: "240px" }}
                        />

                        <Column
                            field="description"
                            header="Description"
                        />

                        <Column
                            field="dueDate"
                            header="Due Date"
                            body={dueDateTemplate}
                            style={{ width: "170px" }}
                        />
                    </DataTable>

                </Card>

            </div>

        </div>
    );
};
export default StudentHomework;
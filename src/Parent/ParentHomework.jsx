import React, { useEffect, useState } from "react";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import "../App.css";

function ParentHomework() {

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

    return (
        <div className="dashboard-container">

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

                    <li onClick={() => navigate("/parent-report-card")}>
                        Report Card
                    </li>

                    <li onClick={() => navigate("/parent-time-table")}>
                        Time Table
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
            <div className="ph-container">

                <Card
                    title="Homework & Assignments"
                    className="ph-card"
                >

                    <DataTable
                        value={homeworks}
                        paginator
                        rows={5}
                        stripedRows
                        responsiveLayout="scroll"
                        showGridlines
                        className="ph-table"
                        emptyMessage="No Homework Available"
                    >

                        <Column
                            field="subject"
                            header="Subject"
                            sortable
                        />

                        <Column
                            field="title"
                            header="Title"
                            sortable
                        />

                        <Column
                            field="description"
                            header="Description"
                        />

                        <Column
                            field="dueDate"
                            header="Due Date"
                            sortable
                        />

                    </DataTable>

                </Card>

            </div>

        </div>
    );
}

export default ParentHomework;
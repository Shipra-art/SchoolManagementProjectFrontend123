import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

function Attendance() {
    const navigate = useNavigate();

    const [attendance, setAttendance] = useState([]);
    const [studentId, setStudentId] = useState("");
    const [studentName, setStudentName] = useState("");
    const [studentClass, setStudentClass] = useState("");
    const [status, setStatus] = useState("Present");
    const [globalFilter, setGlobalFilter] = useState("");

    const fetchAttendance = async () => {
        try {
            const res = await API.get("/attendance");
            setAttendance(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchAttendance();
    }, []);

    const addAttendance = async (e) => {
        e.preventDefault();

        const data = {
            // studentId,
            studentName,
            class: studentClass,
            date: new Date(),
            status,
        };

        try {
            await API.post("/attendance", data);

            alert("Attendance Added Successfully");

            setStudentId("");
            setStudentName("");
            setStudentClass("");
            setStatus("Present");

            fetchAttendance();
        } catch (err) {
            console.log(err);
        }
    };

    const deleteAttendance = async (id) => {
        if (!window.confirm("Delete this attendance record?"))
            return;

        try {
            await API.delete(`/attendance/${id}`);
            fetchAttendance();
        } catch (err) {
            console.log(err);
        }
    };

    const dateBodyTemplate = (rowData) => {
        return new Date(rowData.date).toLocaleDateString();
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <Button
                icon="pi pi-trash"
                severity="danger"
                rounded
                onClick={() =>
                    deleteAttendance(rowData.id || rowData._id)
                }
            />
        );
    };

    const header = (
        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
            }}
        >
            <h3>Attendance Records</h3>

            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText
                    placeholder="Search..."
                    value={globalFilter}
                    onChange={(e) =>
                        setGlobalFilter(e.target.value)
                    }
                />
            </span>
        </div>
    );

    return (
        <div className="dashboard">
            {/* Sidebar */}
            <div className="sidebar">
                <h2>Teacher Dashboard</h2>

                <ul>
                    <li onClick={()=>navigate("/teacher-dashboard")}> Dashboard</li>
                    <li onClick={() => navigate("/teacher-profile")}>Profile</li>
                    <li onClick={() => navigate("/classes")}>Classes</li>
                    <li onClick={() => navigate("/report-card")}>Report Card</li>
                    <li onClick={() => navigate("/view-marks")}>Marks</li>
                    <li style={{backgroundColor:"#007bff", color:"white"}}>Attendance</li>
                    <li onClick={() => navigate("/query")}>Query</li>
                    <li onClick={() => navigate("/login")}>Logout</li>
                </ul>
            </div>

            {/* Main Content */}
            <div
                className="container"
                style={{ padding: "20px" }}
            >
                <h2>Attendance Management</h2>

                {/* DataTable */}
                <DataTable value={attendance} paginator rows={5} stripedRows showGridlines tableStyle={{ minWidth: "70rem", minHeight: "400px" }}>
                    {/* <Column field="studentId" header="Student ID"  /> */}
                    <Column field="studentName" header="Student Name"/>
                    <Column field="class" header="Class"/>
                    <Column field="date" header="Date" body={dateBodyTemplate}/>
                    <Column field="status" header="Status"/>
                    {/* <Column header="Action" body={actionBodyTemplate} /> */}
                </DataTable>
            </div>
        </div>
    );
}

export default Attendance;
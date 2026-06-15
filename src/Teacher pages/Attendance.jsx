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
import Input from "antd/es/input/Input";

function Attendance() {
    const navigate = useNavigate();

    const [attendance, setAttendance] = useState([]);
    const [studentId, setStudentId] = useState("");
    const [studentName, setStudentName] = useState("");
    const [studentClass, setStudentClass] = useState("");
    const [status, setStatus] = useState("Present");
    const [globalFilter, setGlobalFilter] = useState("");

    const [editId, setEditId] = useState(null);

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

    // CREATE
    const addAttendance = async (e) => {
        e.preventDefault();

        const data = {

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

    // UPDATE
    const updateAttendance = async (e) => {
        e.preventDefault();

        const data = {
            studentId,
            studentName,
            class: studentClass,
            date: new Date(),
            status,
        };

        try {
            await API.put(`/attendance/${editId}`, data);

            alert("Attendance Updated Successfully");

            setEditId(null);
            setStudentId("");
            setStudentName("");
            setStudentClass("");
            setStatus("Present");

            fetchAttendance();
        } catch (err) {
            console.log(err);
        }
    };

    // DELETE
    const deleteAttendance = async (id) => {
        if (!window.confirm("Delete this attendance record?")) return;

        try {
            await API.delete(`/attendance/${id}`);
            fetchAttendance();
        } catch (err) {
            console.log(err);
        }
    };

    // EDIT
    const editAttendance = (rowData) => {
        setEditId(rowData.id || rowData._id);
        setStudentName(rowData.studentName);
        setStudentClass(rowData.class);
        setStatus(rowData.status);
    };

    const dateBodyTemplate = (rowData) => {
        return new Date(rowData.date).toLocaleDateString();
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <div style={{ display: "flex", gap: "10px" }}>
                <Button
                    icon="pi pi-pencil"
                    severity="warning"
                    rounded
                    onClick={() => editAttendance(rowData)}
                />

                <Button
                    icon="pi pi-trash"
                    severity="danger"
                    rounded
                    onClick={() =>
                        deleteAttendance(rowData.id || rowData._id)
                    }
                />
            </div>
        );
    };




    return (
        <div className="dashboard">
            {/* Sidebar */}
            <div className="sidebar">
                <h2>Teacher Dashboard</h2>

                <ul>
                    <li onClick={() => navigate("/teacher-dashboard")}>Dashboard </li>
                    <li onClick={() => navigate("/teacher-profile")}>Profile</li>
                    <li onClick={() => navigate("/classes")}>Classes</li>
                    <li onClick={() => navigate("/report-card")}>Report Card</li>
                    <li onClick={() => navigate("/view-marks")}>Marks</li>
                    <li style={{ backgroundColor: "#007bff", color: "white", }}>Attendance</li>
                    <li onClick={() => navigate("/query")}>Query</li>
                    <li onClick={() => navigate("/login")}>Logout</li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="container" style={{ padding: "20px" }}>
                <h2>Attendance Management</h2>

                {/* Form */}
                <form
                    onSubmit={editId ? updateAttendance : addAttendance}
                    style={{
                        display: "flex",
                        gap: "10px",
                        marginBottom: "20px",
                        flexWrap: "wrap",
                        alignItems: "center",
                    }}
                >
                    <InputText placeholder="Student Id"
                        value={studentId}
                        onChange={(e) =>
                            setStudentId(e.target.value)} />

                    <InputText
                        placeholder="Student Name"
                        value={studentName}
                        onChange={(e) =>
                            setStudentName(e.target.value)
                        }
                    />

                    <InputText
                        placeholder="Class"
                        value={studentClass}
                        onChange={(e) =>
                            setStudentClass(e.target.value)
                        }
                    />

                    <select
                        value={status}
                        onChange={(e) =>
                            setStatus(e.target.value)
                        }
                        style={{
                            padding: "10px",
                            border: "1px solid #ccc",
                            borderRadius: "6px",
                        }}
                    >
                        <option value="Present">
                            Present
                        </option>

                        <option value="Absent">
                            Absent
                        </option>
                    </select>

                    <Button
                        type="submit"
                        label={
                            editId
                                ? "Update Attendance"
                                : "Add Attendance"
                        }
                        icon={
                            editId
                                ? "pi pi-check"
                                : "pi pi-plus"
                        }
                    />

                    {editId && (
                        <Button
                            type="button"
                            label="Cancel"
                            severity="secondary"
                            onClick={() => {
                                setEditId(null);
                                setStudentName("");
                                setStudentClass("");
                                setStatus("Present");
                            }}
                        />
                    )}
                </form>

                {/* DataTable */}
                <DataTable
                    value={attendance}
                    paginator
                    rows={5}
                    stripedRows
                    showGridlines
                    globalFilter={globalFilter}

                    tableStyle={{
                        minWidth: "70rem",
                        minHeight: "400px",
                    }}
                >
                    <Column
                        field="studentName"
                        header="Student Name"
                    />

                    <Column
                        field="class"
                        header="Class"
                    />

                    <Column
                        field="date"
                        header="Date"
                        body={dateBodyTemplate}
                    />

                    <Column
                        field="status"
                        header="Status"
                    />

                    <Column
                        header="Action"
                        body={actionBodyTemplate}
                    />
                </DataTable>
            </div>
        </div>
    );
}

export default Attendance;
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
    const [editId, setEditId] = useState(null);

    //GET 
    const fetchAttendance = async () => {
        try {
            const res = await API.get("/attendance");
            console.log("Attendance Data:", res.data);

            setAttendance(res.data);
        } catch (err) {
            console.log("GET Error:", err.response?.data);
            console.log(err);
        }
    };

    useEffect(() => {
        fetchAttendance();
    }, []);

    //ADD 
    const addAttendance = async (e) => {
        e.preventDefault();

        const data = {
            studentId,
            studentName,
            class: studentClass,
            date: new Date(),
            status,
        };

        try {
            const res = await API.post("/attendance", data);

            console.log(res.data);

            alert("Attendance Added Successfully");

            clearForm();

            fetchAttendance();
        } catch (err) {
            console.log("POST Error:", err.response?.data);
            console.log(err);

            alert("Failed to Add Attendance");
        }
    };

    //UPDATE 
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
            const res = await API.put(`/attendance/${editId}`, data);
            console.log(res.data);
            alert("Attendance Updated Successfully");
            clearForm();
            setEditId(null);
            fetchAttendance();
            
        } catch (err) {
            console.log("PUT Error:", err.response?.data);
            console.log(err);

            alert("Failed to Update Attendance");
        }
    };

    //DELETE 
    const deleteAttendance = async (id) => {
        if (!window.confirm("Delete this attendance record?"))
            return;

        try {
            await API.delete(`/attendance/${id}`);

            alert("Attendance Deleted Successfully");

            fetchAttendance();
        } catch (err) {
            console.log("DELETE Error:", err.response?.data);
            console.log(err);
        }
    };

    //EDIT 
    const editAttendance = (rowData) => {
        setEditId(rowData.id || rowData._id);
        setStudentId(rowData.studentId || "");
        setStudentName(rowData.studentName || "");
        setStudentClass(rowData.class || "");
        setStatus(rowData.status || "Present");
    };

    //CLEAR
    const clearForm = () => {
        setStudentId("");
        setStudentName("");
        setStudentClass("");
        setStatus("Present");
    };

    //DATE FORMAT
    const dateBodyTemplate = (rowData) => {
        return new Date(rowData.date).toLocaleDateString();
    };

    //ACTION BUTTONS
    const actionBodyTemplate = (rowData) => {
        return (
            <div style={{ display: "flex", gap: "10px" }}>
                <Button icon="pi pi-pencil" severity="warning" rounded onClick={() => editAttendance(rowData)}/>
                <Button icon="pi pi-trash" severity="danger" rounded onClick={() =>deleteAttendance(rowData._id)}/>
            </div>
        );
    };


    return (
        <div className="dashboard">
            {/* Sidebar */}
            <div className="sidebar">
                <h2>Teacher Dashboard</h2>

                <ul>
                    <li onClick={() => navigate("/teacher-dashboard")}>Dashboard</li>
                    <li onClick={() => navigate("/teacher-profile")}>Profile</li>
                    <li onClick={() => navigate("/classes")}>Classes</li>
                    <li onClick={() => navigate("/report-card")}>Report Card</li>
                    <li onClick={() => navigate("/view-marks")}>Marks</li>
                    <li style={{ backgroundColor: "#007bff", color: "#fff", }}>Attendance</li>
                    <li onClick={() => navigate("/query")}>Query</li>
                    <li onClick={() => navigate("/login")}>Logout</li>
                </ul>
            </div>

            {/* Main */}
            <div className="container" style={{ padding: "20px" }} >

                <h2>Attendance Management</h2>

                <form onSubmit={ editId ? updateAttendance : addAttendance } style={{ display: "flex", gap: "10px",flexWrap: "wrap", marginBottom: "20px",}}>

                    <InputText placeholder="Student ID" value={studentId} onChange={(e) =>setStudentId(e.target.value)}/>

                    <InputText placeholder="Student Name" value={studentName} onChange={(e) => setStudentName(e.target.value)}/>

                    <InputText placeholder="Class" value={studentClass} onChange={(e) =>setStudentClass(e.target.value)}/>


                    <select value={status}onChange={(e) => setStatus(e.target.value) }style={{padding: "10px",borderRadius: "6px",}}>

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
                        <Button type="button" label="Cancel" severity="secondary" onClick={() => { setEditId(null); clearForm(); }} />)} </form>

                <DataTable value={attendance} paginator rows={5} stripedRows showGridlines tableStyle={{ minWidth: "70rem" }}>
                    <Column field="studentId" header="Student ID" />
                    <Column field="studentName" header="Student Name" />
                    <Column field="class" header="Class" />
                    <Column field="date" header="Date" body={dateBodyTemplate} />
                    <Column field="status" header="Status" />
                    <Column header="Actions" body={actionBodyTemplate} />
                </DataTable>
            </div>
        </div>
    );
}

export default Attendance;
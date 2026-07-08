import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ConfirmDialog, confirmDialog, } from "primereact/confirmdialog";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "../App.css";

function ParentList({ toast }) {
    const [parents, setParents] = useState([]);
    const navigate = useNavigate();

    //Fetch Parents
    const fetchParents = async () => {
        try {
            const res = await api.get("/Parent");
            const withSerial = res.data.map((parent, index) => ({
                ...parent,
                serialNo: index + 1,
            }));
            setParents(withSerial);
        } catch (error) {
            console.error("Fetch Error:", error);
        }
    };

    useEffect(() => {
        fetchParents();
    }, []);

    //Delete Parents
    const deleteParent = (id) => {
        confirmDialog({
            message: "Are you sure you want to delete this parent?",
            header: "Delete Confirmation",
            icon: "pi pi-exclamation-triangle",

            accept: async () => {
                try {
                    await api.delete(`/Parent/${id}`);

                    toast.current.show({
                        severity: "success",
                        summary: "Deleted",
                        detail: "Parent deleted successfully",
                        life: 3000,
                    });
                } catch (error) {
                    console.error("Delete Error:", error);

                    toast.current.show({
                        severity: "error",
                        summary: "Error",
                        detail: "Unable to delete parent",
                        life: 3000,
                    });
                }
            }
        })
    }
    //Action Buttons
    const actionTemplate = (rowData) => {
        return (
            <div className="action-btns">
                <Button
                    icon="pi pi-pencil"
                    className="p-button-rounded p-button-warning"
                    tooltip="Edit"
                    onClick={() =>
                        navigate(`/edit-parent/${rowData.id}`)
                    }
                />

                <Button
                    icon="pi pi-trash"
                    className="p-button-rounded p-button-danger"
                    tooltip="Delete"
                    onClick={() => deleteParent(rowData.id)}
                />
            </div>
        );
    };
    return <div className="dashboard">

        <ConfirmDialog />

        {/* Sidebar */}
        <div className="sidebar">
            <div className="adm-sidebar">

                <h2 className="adm-sidebar-title">
                    School System
                </h2>

                <ul className="adm-nav">
                    <li onClick={() => navigate("/student-list")} className="adm-nav-item"> Student List </li>
                    <li onClick={() => navigate("/teacher")} className="adm-nav-item" > Teacher List</li>
                    <li style={{ backgroundColor: "#007bff", color: "white" }}>Parent List</li>
                    <li onClick={() => navigate("/AdminAttendance")} className="adm-nav-item">Attendance List</li>
                    <li onClick={() => navigate("/EditAddMarks")} className="adm-nav-item"> Edit Marks </li>
                    <li onClick={() => navigate("/")} className="adm-nav-item adm-logout">Logout </li>
                </ul>

            </div>
        </div>

        {/* Main Content */}
        <div className="main-content">

            {/* Header */}
            <div className="parent-header">

                <h2 className="parent-title">
                    Parent Management
                </h2>

                <Button
                    label="Add Parent"
                    icon=" pi pi-plus"
                    className="parent-add-btn"
                    onClick={() => navigate("/add-parent")}
                />

            </div>

            {/* Table */}
            <div className="parent-card">

                <DataTable
                    value={parents}
                    paginator
                    rows={5}
                    stripedRows
                    showGridlines
                    responsiveLayout="scroll"
                    emptyMessage="No Parents Found"
                >
                    <Column field="serialNo" header="Sr No" />
                    <Column field="parentname" header="ParentName" />
                    <Column field="email" header="Email" />
                    <Column field="Password" header="Password" />
                    <Column field="StudentId" header="Student ID" />
                    <Column header="Actions" body={actionTemplate} />
                </DataTable>

            </div>

        </div>

    </div>

}

export default ParentList

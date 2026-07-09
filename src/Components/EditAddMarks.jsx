import React, { useState, useEffect, useRef } from "react";
import "../App.css";
import api from "../api/axios";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

import "primereact/resources/themes/lara-light-green/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import { useNavigate } from "react-router-dom";

function EditAddMarks() {
    const navigate = useNavigate();
    const toast = useRef(null);

    const [students, setStudents] = useState([]);
    const [dialogVisible, setDialogVisible] = useState(false);

    const [formData, setFormData] = useState({
        id: "",
        studentName: "",
        class: "",
        subject: "",
        subjectTeacher: "",
        examType: "",
        marks: ""
    });

    // ================= GET =================

    const fetchStudents = async () => {
        try {
            const res = await api.get("/Studentmarks");
            setStudents(res.data);
        } catch (error) {
            console.log(error);

            toast.current.show({
                severity: "error",
                summary: "Error",
                detail: "Failed To Fetch Data",
                life: 3000
            });
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    // ================= ADD =================

    const addMarks = async () => {
        try {
            await api.post("/Studentmarks", formData);

            toast.current.show({
                severity: "success",
                summary: "Success",
                detail: "Marks Added Successfully",
                life: 3000
            });

            fetchStudents();
            resetForm();

        } catch (error) {
            console.log(error);
        }
    };

    // ================= UPDATE =================

    const updateMarks = async () => {
        try {

            await api.put(
                `/Studentmarks/${formData.id}`,
                formData
            );

            toast.current.show({
                severity: "success",
                summary: "Updated",
                detail: "Marks Updated Successfully",
                life: 3000
            });

            fetchStudents();
            resetForm();

        } catch (error) {
            console.log(error);
        }
    };

    // ================= DELETE =================

    const deleteMarks = async (id) => {
        try {

            await api.delete(`/Studentmarks/${id}`);

            toast.current.show({
                severity: "success",
                summary: "Deleted",
                detail: "Record Deleted",
                life: 3000
            });

            fetchStudents();

        } catch (error) {
            console.log(error);
        }
    };

    // ================= EDIT =================

    const editMarks = (rowData) => {

        setFormData({
            id: rowData.id,
            studentName: rowData.studentName,
            class: rowData.class,
            subject: rowData.subject,
            subjectTeacher: rowData.subjectTeacher,
            examType: rowData.examType,
            marks: rowData.marks
        });

        setDialogVisible(true);
    };

    // ================= RESET =================

    const resetForm = () => {

        setFormData({
            id: "",
            studentName: "",
            class: "",
            subject: "",
            subjectTeacher: "",
            examType: "",
            marks: ""
        });

        setDialogVisible(false);
    };

    // ================= TABLE DATA =================

    const tableData = students.flatMap((student) =>

        student.subjects.map((subject, index) => ({
            id: student._id,
            serialNo: index + 1,

            studentName: student.studentName,
            class: student.class,

            subject: subject.subject,
            subjectTeacher: subject.subjectTeacher,
            examType: subject.examType,
            marks: subject.marks
        }))
    );

    //  ACTION BUTTONS 

    const actionTemplate = (rowData) => {
        return (
            <div className="action-buttons">

                <Button
                    icon="pi pi-pencil"
                    severity="success"
                    onClick={() => editMarks(rowData)}
                />

                <Button
                    icon="pi pi-trash"
                    severity="danger"
                    onClick={() => deleteMarks(rowData.id)}
                />
            </div>
        );
    };

    return (
        <div className="dashboard">

            {/* Sidebar */}

            <div className="sidebar">

                <div className="adm-sidebar">

                    <h2 className="adm-sidebar-title">
                        School System
                    </h2>

                    <ul className="adm-nav">

                        <li onClick={() => navigate("/student-list")} className="adm-nav-item">Student List  </li>
                        <li onClick={() => navigate("/teacher")} className="adm-nav-item"> Teacher List</li>
                        <li onClick={() => navigate("/parent-list")} className="adm-nav-item"> Parent List</li>
                        <li onClick={() => navigate("/AdminAttendance")} className="adm-nav-item"> Attendance List</li>
                        <li style={{ backgroundColor: "#007bff", color: "white" }}>Edit Marks </li>
                        <li onClick={() => navigate("/TimetableAddEdit")} className="adm-nav-item">Time Table</li>
                        <li onClick={() => navigate("/")} className="adm-nav-item adm-logout"> Logout</li>
                    </ul>

                </div>

            </div>

            {/* Main Content */}

            <div className="viewmarks-container">

                <Toast ref={toast} />

                <h1 className="heading">
                    Student Result
                </h1>

                <Button
                    label="Add Marks"
                    icon="pi pi-plus"
                    onClick={() => {
                        resetForm();
                        setDialogVisible(true);
                    }}
                    style={{ marginBottom: "15px" }}
                />

                <div className="table-box">

                    <DataTable value={tableData} stripedRows showGridlines paginator rows={10}>
                        {/* 
                        <Column
                            field="serialNo"
                            header="S.No"
                        /> */}

                        <Column field="studentName" header="Student Name" />

                        <Column field="subjectTeacher" header="Teacher" />
                        <Column field="class" header="Class" />
                        <Column field="examType" header="Exam Type" />
                        <Column field="subject" header="Subject" />
                        <Column field="marks" header="Marks" />
                        <Column header="Action" body={actionTemplate} />

                    </DataTable>

                </div>

                {/* Dialog */}

                <Dialog
                    header={
                        formData.id
                            ? "Edit Marks"
                            : "Add Marks"
                    }
                    visible={dialogVisible}
                    style={{ width: "500px" }}
                    onHide={() => setDialogVisible(false)}
                >

                    <div className="p-fluid">

                        <InputText
                            placeholder="Student Name"
                            value={formData.studentName}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    studentName:
                                        e.target.value
                                })
                            }
                        />

                        <br />

                        <InputText
                            placeholder="Class"
                            value={formData.class}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    class: e.target.value
                                })
                            }
                        />

                        <br />

                        <InputText
                            placeholder="Subject"
                            value={formData.subject}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    subject: e.target.value
                                })
                            }
                        />

                        <br />

                        <InputText
                            placeholder="Subject Teacher"
                            value={formData.subjectTeacher}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    subjectTeacher:
                                        e.target.value
                                })
                            }
                        />

                        <br />

                        <InputText
                            placeholder="Exam Type"
                            value={formData.examType}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    examType:
                                        e.target.value
                                })
                            }
                        />

                        <br />

                        <InputText
                            placeholder="Marks"
                            value={formData.marks}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    marks: e.target.value
                                })
                            }
                        />

                        <br />

                        <Button
                            label={
                                formData.id
                                    ? "Update"
                                    : "Save"
                            }
                            onClick={() =>
                                formData.id
                                    ? updateMarks()
                                    : addMarks()
                            }
                        />

                    </div>

                </Dialog>

            </div>

        </div>
    );
}

export default EditAddMarks;
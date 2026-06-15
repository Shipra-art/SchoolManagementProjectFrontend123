import React, { useState, useEffect, useRef } from 'react'
import "../App.css"
import api from "../api/axios"
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Toast } from 'primereact/toast'
import 'primereact/resources/themes/lara-light-green/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import { useNavigate } from 'react-router-dom'


function ViewMarks() {

    const navigate = useNavigate()
    const toast = useRef(null)
    const [students, setStudents] = useState([])
    const [showForm, setShowForm] = useState(false)
    const [selectedStudent, setSelectedStudent] = useState(null)
    const [updatedMarks, setUpdatedMarks] = useState("")
    const [isAddMode, setIsAddMode] = useState(false);
    const [formData, setFormData] = useState({
        studentName: "",
        class: "",
        examType: "",
        subject: "",
        subjectTeacher: "",
        marksObtained: ""
    });

    // GET ALL MARKS

    const fetchStudents = async () => {

        try {

            const res = await api.get('/Marks')
            const withSerial = res.data.map((item, index) => ({ ...item, serialNo: index + 1 }))
            setStudents(withSerial)
        }

        catch (error) {
            console.log("GET API ERROR :", error)
        }
    }

    useEffect(() => {
        fetchStudents()
    }, [])

    //Add Marks Function(CREATE)
    const addMarks = async () => {
        try {

            await api.post("/Marks", formData);

            toast.current.show({
                severity: "success",
                summary: "Success",
                detail: "Marks Added Successfully",
                life: 3000
            });

            setShowForm(false);

            setFormData({
                studentName: "",
                class: "",
                examType: "",
                subject: "",
                subjectTeacher: "",
                marksObtained: ""
            });

            fetchStudents();

        } catch (error) {

            console.log("POST ERROR :", error);

            toast.current.show({
                severity: "error",
                summary: "Error",
                detail: "Add Failed",
                life: 3000
            });
        }
    };

    // OPEN UPDATE DIALOG

    const approveResult = (student) => {
        setSelectedStudent(student)
        setUpdatedMarks(student.marksObtained)
        setShowForm(true)
    }

    // UPDATE MARKS

    const updateMarks = async () => {

        try {
            const updatedData = {

                studentName: selectedStudent.studentName,
                class: selectedStudent.class,
                examType: selectedStudent.examType,
                subject: selectedStudent.subject,
                subjectTeacher: selectedStudent.subjectTeacher,
                marksObtained: updatedMarks
            }

            await api.put(
                `/Marks/${selectedStudent.id}`,
                updatedData
            )

            toast.current.show({
                severity: 'success',
                summary: 'Success',
                detail: 'Marks Updated Successfully',
                life: 3000
            })

            setShowForm(false)
            fetchStudents()

        }

        catch (error) {

            console.log("PUT ERROR :", error)

            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Update Failed',
                life: 3000
            })
        }

        //Delete Function
        const deleteMarks = async (id) => {

            if (!window.confirm("Delete this record?")) return;

            try {

                await api.delete(`/Marks/${id}`);

                toast.current.show({
                    severity: "success",
                    summary: "Deleted",
                    detail: "Marks Deleted Successfully",
                    life: 3000
                });

                fetchStudents();

            } catch (error) {

                console.log("DELETE ERROR :", error);

                toast.current.show({
                    severity: "error",
                    summary: "Error",
                    detail: "Delete Failed",
                    life: 3000
                });
            }
        };


        const actionTemplate = (rowData) => {
            return (
                <div style={{ display: "flex", gap: "10px" }}>

                    <Button
                        icon="pi pi-pencil"
                        severity="warning"
                        rounded
                        onClick={() => approveResult(rowData)}
                    />

                    <Button
                        icon="pi pi-trash"
                        severity="danger"
                        rounded
                        onClick={() =>
                            deleteMarks(rowData.id || rowData._id)
                        }
                    />

                </div>
            );
        };
    }

    return (

        <div className="dashboard">

            {/* SIDEBAR */}
            <div className="sidebar">

                <h2>Teacher Dashboard</h2>
                <ul>
                    <li onClick={() => navigate("/teacher-dashboard")}> Dashboard</li>
                    <li onClick={() => navigate("/teacher-profile")}>Profile</li>
                    <li onClick={() => navigate("/classes")}>Classes</li>
                    <li onClick={() => navigate("/report-card")}>Report Card</li>
                    <li style={{ backgroundColor: "#007bff", color: "white" }}>Marks</li>
                    <li onClick={() => navigate("/attendance")}>Attendance</li>
                    <li onClick={() => navigate("/query")}>Query</li>
                    <li onClick={() => navigate("/login")}>Logout</li>
                </ul>

            </div>

            {/* MAIN CONTENT */}
            <div className="viewmarks-container">
                <Toast ref={toast} />
                <h1 className="heading">Student Marks Dashboard</h1>

                <form>
                    {isAddMode ? (
                        <>
                            <InputText
                                placeholder="Student Name"
                                value={formData.studentName}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        studentName: e.target.value
                                    })
                                }
                            />

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

                            <InputText
                                placeholder="Exam Type"
                                value={formData.examType}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        examType: e.target.value
                                    })
                                }
                            />

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

                            <InputText
                                placeholder="Subject Teacher"
                                value={formData.subjectTeacher}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        subjectTeacher: e.target.value
                                    })
                                }
                            />

                            <InputText
                                placeholder="Marks"
                                value={formData.marksObtained}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        marksObtained: e.target.value
                                    })
                                }
                            />

                            <Button
                                label="Save"
                                icon="pi pi-plus"
                                onClick={addMarks}
                            />
                        </>
                    ) : (
                        <>
                            <InputText
                                value={selectedStudent?.studentName || ""}
                                disabled
                            />

                            <InputText
                                value={selectedStudent?.subject || ""}
                                disabled
                            />

                            <InputText
                                value={updatedMarks}
                                onChange={(e) =>
                                    setUpdatedMarks(e.target.value)
                                }
                            />

                            <Button
                                label="Update"
                                icon="pi pi-check"
                                onClick={updateMarks}
                            />
                        </>
                    )}
                </form>

                {/* TABLE */}
                <div className="table-box">

                    <DataTable value={students} stripedRows paginator rows={5} responsiveLayout="scroll">
                        <Column field="serialNo" header="S.No" />
                        {/* <Column field="studentId" header="Student ID" /> */}
                        <Column field="studentName" header="Student Name" />
                        <Column field="subjectTeacher" header="Subject Teacher" />
                        <Column field="class" header="Class" />
                        <Column field="examType" header="Exam Type" />
                        <Column field="subject" header="Subject" />
                        <Column field="marksObtained" header="Marks" />
                        {/* <Column header="Actions" body={actionTemplate} /> */}
                    </DataTable>
                </div>
            </div>

            {/* UPDATE DIALOG */}
            <Dialog
                header="Update Student Marks"
                visible={showForm}
                style={{ width: '30vw' }}
                onHide={() => setShowForm(false)}>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>

                    {/* STUDENT NAME */}
                    <div className="field">

                        <label>Student Name</label>

                        <InputText value={selectedStudent?.studentName || ""} disabled />

                    </div>

                    {/* SUBJECT */}
                    <div className="field">

                        <label>Subject</label>

                        <InputText value={selectedStudent?.subject || ""} disabled />

                    </div>

                    {/* UPDATE MARKS */}
                    <div className="field">
                        <label>Update Marks</label>

                        <InputText
                            value={updatedMarks}
                            onChange={(e) => setUpdatedMarks(e.target.value)}
                            placeholder="Enter Updated Marks" />
                    </div>

                    {/* UPDATE BUTTON */}
                    <Button
                        label="Update"
                        icon="pi pi-check"
                        className="p-button-success"
                        onClick={updateMarks}
                    />

                </div>

            </Dialog>

        </div>
    )
}

export default ViewMarks
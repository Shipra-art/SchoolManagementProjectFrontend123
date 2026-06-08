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


    // GET ALL MARKS
    
    const fetchStudents = async () => {

        try {

            const res = await api.get('/Marks')
            const withSerial = res.data.map((item, index) => ({...item,serialNo: index + 1}))
            setStudents(withSerial)
        }

        catch (error) {
            console.log("GET API ERROR :", error)
        }
    }

    useEffect(() => {
        fetchStudents()
    }, [])

    
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
                studentId: selectedStudent.studentId,
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
    }

    return (

        <div className="dashboard">

            {/* SIDEBAR */}
            <div className="sidebar">

                <h2>Teacher Panel</h2>
                <ul>
                    <li onClick={() => navigate("/teacher-dashboard")}>Teacher Dashboard</li>
                    <li onClick={() => navigate("/teacher-profile")}>Profile</li>
                    <li onClick={() => navigate("/classes")}>Classes</li>
                    <li onClick={() => navigate("/attendance")}>Attendance</li>
                    <li onClick={() => navigate("/report-card")}>Report Card</li>
                    <li onClick={() => navigate("/query")}>Query</li>
                    <li onClick={() => navigate("/login")}>Logout</li>
                </ul>

            </div>

            {/* MAIN CONTENT */}
            <div className="viewmarks-container">
                <Toast ref={toast} />
                <h1 className="heading">Student Dashboard</h1>

                {/* TABLE */}
                <div className="table-box">

                    <DataTable value={students} stripedRows paginator rows={5} responsiveLayout="scroll">
                        <Column field="serialNo" header="S.No" />
                        <Column field="studentId" header="Student ID" />
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
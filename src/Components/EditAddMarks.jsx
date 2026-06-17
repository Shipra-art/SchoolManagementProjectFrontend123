import React, { useState, useEffect, useRef } from 'react'
import "../App.css"
import api from "../api/axios"

import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Toast } from 'primereact/toast'

import 'primereact/resources/themes/lara-light-green/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'

import { useNavigate } from 'react-router-dom'

function EditAddMarks() {

    const navigate = useNavigate()

    const toast = useRef(null)

    const [students, setStudents] = useState([])

    // GET ALL MARKS API
    const fetchStudents = async () => {

        try {
            const res = await api.get('/Studentmarks')
            setStudents(res.data)
        }

        catch (error) {

            console.log("GET API ERROR :", error)

            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to Fetch Data',
                life: 3000
            })
        }
    }

    useEffect(() => {
        fetchStudents()
    }, [])

    // FLAT DATA FOR TABLE
    const tableData = students.flatMap((student, studentIndex) =>

        student.subjects.map((subject, subjectIndex) => ({

            serialNo: studentIndex + 1,

            // studentId: student.studentId,

            studentName: student.studentName,

            class: student.class,

            subject: subject.subject,

            subjectTeacher: subject.subjectTeacher,

            examType: subject.examType,

            marks: subject.marks

        }))
    )

    return (

        <div className="dashboard">

            {/* Sidebar */}
            <div className="sidebar">

                <div className="adm-sidebar">
                    <h2 className="adm-sidebar-title">School System</h2>

                    <ul className="adm-nav">
                        <li onClick={() => navigate("/student-list")} className="adm-nav-item">Student List</li>
                        <li onClick={() => navigate("/teacher")} className="adm-nav-item">Teacher List</li>
                        <li onClick={() => navigate("/AdminAttendance")} className="adm-nav-item"> Attendance List</li>
                        <li onClick={() => navigate("/EditAddMarks")} className="adm-nav-item">Edit Marks</li>
                        <li onClick={() => navigate("/")} className="adm-nav-item adm-logout">Logout</li>
                    </ul>
                </div>

            </div>

            {/* Main Content */}
            <div className="viewmarks-container">

                <Toast ref={toast} />

                <h1 className="heading">
                    Student Result
                </h1>

                {/* TABLE */}
                <div className="table-box">

                    <DataTable
                        value={tableData}
                        stripedRows
                        showGridlines
                    >

                        <Column
                            field="serialNo"
                            header="S.No"
                        />

                        {/* <Column
                            field="studentId"
                            header="Student ID"
                        /> */}

                        <Column
                            field="studentName"
                            header="Student Name"
                        />

                        <Column
                            field="subjectTeacher"
                            header="SubjectTeacher"
                        />

                        <Column
                            field="class"
                            header="Class"
                        />

                        <Column
                            field="examType"
                            header="Exam Type"
                        />

                        <Column
                            field="subject"
                            header="Subject"
                        />

                        <Column
                            field="marks"
                            header="Marks"
                        />
                    </DataTable>

                </div>

            </div>

        </div>
    )
}

export default EditAddMarks
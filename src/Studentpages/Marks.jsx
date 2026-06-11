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

function Marks() {

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

            serialNo: subjectIndex + 1,

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

                <h2>Student Panel</h2>

                <ul>
                    <li onClick={() => navigate("/student-dashboard")}>My Dashboard</li>
                    <li onClick={() => navigate("/profile")}> My profile</li>
                    <li onClick={() => navigate("/query-form")}>Queries</li>
                    <li onClick={() => navigate("/Homework")}>Homework</li>
                    <li onClick={() => navigate("/student-attendance")}>Attendance</li>
                    <li onClick={() => navigate("/timetable")}>Timetable</li>
                    <li onClick={() => navigate("/login")}>Logout</li>

                </ul>

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

export default Marks
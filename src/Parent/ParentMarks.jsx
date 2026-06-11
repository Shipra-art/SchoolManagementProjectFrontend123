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

                <h2>Parent Panel</h2>

                <ul>
                    <li onClick={() => navigate("/parent-dashboard")}>Dashboard</li>
                    <li onClick={() => navigate("/parent-attendance")}>Attendance</li>
                    <li onClick={() => navigate("/parent-report-card")}>Report Card</li>
                    <li onClick={() => navigate("/parent-homework")}>Homework</li>
                    <li onClick={() => navigate("/parent-time-table")}>Time Table</li>
                    <li style={{ backgroundColor: "#007bff", color: "white" }}>Marks</li>
                    <li onClick={() => navigate("/login")}>Logout</li>
                </ul>

            </div>

            {/* Main Content */}
            <div className="marks-container">

                <Toast ref={toast} />

                <div className="marks-header">
                    <h1 className="marks-title">
                        Student Result
                    </h1>
                </div>

                <div className="marks-card">

                    <DataTable
                        value={tableData}
                        paginator
                        rows={5}
                        stripedRows
                        showGridlines
                        responsiveLayout="scroll"
                        className="marks-table"
                        emptyMessage="No Marks Available"
                    >

                        <Column
                            field="serialNo"
                            header="S.No"
                        />

                        <Column
                            field="subjectTeacher"
                            header="Teacher"
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
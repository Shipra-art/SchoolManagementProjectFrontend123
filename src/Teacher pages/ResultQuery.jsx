import React, { useState, useEffect, useRef } from 'react'
import api from "../api/axios"
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Tag } from 'primereact/tag'
import { Toast } from 'primereact/toast'
import { Dialog } from 'primereact/dialog'
import { InputNumber } from 'primereact/inputnumber'
import { useNavigate } from 'react-router-dom'

import 'primereact/resources/themes/lara-light-green/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'

function StudentResultQuery() {

    const navigate = useNavigate()
    const toast = useRef(null)
    const [queries, setQueries] = useState([])
    const [approveDialog, setApproveDialog] = useState(false)
    const [selectedQuery, setSelectedQuery] = useState(null)
    const [updatedMarks, setUpdatedMarks] = useState(null)


    const fetchQueries = async () => {
        try {
            const res = await api.get("/ResultQuery")
            console.log("API DATA => ", res.data)
            setQueries(res.data)
        } catch (error) {
            console.log(error)
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to fetch queries',
                life: 3000
            })
        }
    }

    useEffect(() => {
        fetchQueries()
    }, [])

    const openApproveDialog = (rowData) => {
        setSelectedQuery(rowData)
        setUpdatedMarks(rowData.updatedMarks || 0)
        setApproveDialog(true)
    }


    const handleApprove = async () => {
        try {
            const queryId = selectedQuery._id || selectedQuery.id


            await api.put(
                `/ResultQuery/approve/${queryId}`,
                updatedMarks,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )

            toast.current.show({
                severity: 'success',
                summary: 'Approved',
                detail: 'Marks updated successfully',
                life: 3000
            })

            setApproveDialog(false)
            fetchQueries()

        } catch (error) {
            console.log(error)
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Approve failed',
                life: 3000
            })
        }
    }


    const handleReject = async (rowData) => {
        try {
            const queryId = rowData._id || rowData.id


            await api.put(`/ResultQuery/reject/${queryId}`)

            toast.current.show({
                severity: 'warn',
                summary: 'Rejected',
                detail: 'Query rejected',
                life: 3000
            })

            fetchQueries()

        } catch (error) {
            console.log(error)
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Reject failed',
                life: 3000
            })
        }
    }

    const statusBodyTemplate = (rowData) => {
        let severity = 'warning'
        if (rowData.status === "Approved") severity = 'success'
        else if (rowData.status === "Rejected") severity = 'danger'

        return (
            <Tag
                value={rowData.status || "Pending"}
                severity={severity}
            />
        )
    }

    const actionTemplate = (rowData) => {
        return (
            <div style={{ display: 'flex', gap: '10px' }}>
                <Button
                    icon="pi pi-check"
                    className="p-button-rounded p-button-success"
                    tooltip="Approve"
                    onClick={() => openApproveDialog(rowData)}
                />
                <Button
                    icon="pi pi-times"
                    className="p-button-rounded p-button-danger"
                    tooltip="Reject"
                    onClick={() => handleReject(rowData)}
                />
            </div>
        )
    }

    return (
        <div className="dashboard">

            <Toast ref={toast} />

            <Dialog
                header="Update Student Marks"
                visible={approveDialog}
                style={{ width: '400px' }}
                onHide={() => setApproveDialog(false)}
            >
                <div style={{ marginBottom: '20px' }}>
                    <label>Updated Marks</label>

                    <InputNumber
                        value={updatedMarks}
                        onValueChange={(e) => setUpdatedMarks(e.value)}
                        mode="decimal"
                        showButton
                        max={100}
                        style={{ width: '100%', marginTop: '10px' }}
                    />
                </div>
                <Button
                    label="Approve & Save"
                    icon="pi pi-check"
                    className="p-button-success"
                    onClick={handleApprove}
                />
                <Button label=""/>
            </Dialog>

            <div className="sidebar">
                <h2>Teacher Panel</h2>
                <ul>
                    <li onClick={() => navigate("/teacher-dashboard")}> Dashboard</li>
                    <li onClick={() => navigate("/teacher-profile")}>Profile</li>
                    <li onClick={() => navigate("/classes")}>Classes</li>
                    <li onClick={() => navigate("/report-card")}>Report Card</li>
                    <li onClick={() => navigate("/view-marks")}>Marks</li>
                    <li onClick={() => navigate("/attendance")}>Attendance</li>
                    <li style={{ backgroundColor: "#007bff", color: "white" }}>Query</li>
                    <li onClick={() => navigate("/login")}>Logout</li>
                </ul>
            </div>

            <div className="content" style={{ width: '100%', padding: '20px' }}>
                <h1>Student Result Queries</h1>
                <DataTable value={queries} stripedRows paginator rows={5}>
                    {/* <Column field="studentId" header="Student ID" /> */}
                    <Column field="studentName" header="Student Name" />
                    <Column field="subject" header="Subject" />
                    <Column field="currentMarks" header="Current Marks" />
                    <Column field="updatedMarks" header="Updated Marks" />
                    <Column field="message" header="Query Message" />
                    <Column body={statusBodyTemplate} header="Status" />
                    <Column body={actionTemplate} header="Actions" />
                </DataTable>
            </div>

        </div>
    )
}

export default StudentResultQuery
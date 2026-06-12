import React, { useState, useEffect, useRef } from 'react';
import api from "../api/axios";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { InputNumber } from 'primereact/inputnumber';
import { useNavigate } from 'react-router-dom';
import 'primereact/resources/themes/lara-light-green/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import '../App.css';

function StudentResultQuery() {
    const navigate = useNavigate();
    const toast = useRef(null);

    const [queries, setQueries] = useState([]);
    const [approveDialog, setApproveDialog] = useState(false);
    const [selectedQuery, setSelectedQuery] = useState(null);
    const [updatedMarks, setUpdatedMarks] = useState(0);

    const fetchQueries = async () => {
        try {
            const res = await api.get("/ResultQuery");
            setQueries(res.data);
        } catch (error) {
            console.log(error);

            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to fetch queries',
                life: 3000
            });
        }
    };

    useEffect(() => {
        fetchQueries();
    }, []);

    const openApproveDialog = (rowData) => {
        setSelectedQuery(rowData);
        setUpdatedMarks(rowData.updatedMarks || 0);
        setApproveDialog(true);
    };

    const handleApprove = async () => {
        try {
            const queryId = selectedQuery._id || selectedQuery.id;

            await api.put(
                `/ResultQuery/approve/${queryId}`,
                updatedMarks,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            toast.current.show({
                severity: 'success',
                summary: 'Approved',
                detail: 'Marks updated successfully',
                life: 3000
            });

            setApproveDialog(false);
            fetchQueries();
        } catch (error) {
            console.log(error);

            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Approve failed',
                life: 3000
            });
        }
    };

    const handleReject = async (rowData) => {
        try {
            const queryId = rowData._id || rowData.id;

            await api.put(`/ResultQuery/reject/${queryId}`);

            toast.current.show({
                severity: 'warn',
                summary: 'Rejected',
                detail: 'Query rejected',
                life: 3000
            });

            fetchQueries();
        } catch (error) {
            console.log(error);

            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Reject failed',
                life: 3000
            });
        }
    };

    const statusBodyTemplate = (rowData) => {
        let severity = 'warning';

        if (rowData.status === 'Approved')
            severity = 'success';
        else if (rowData.status === 'Rejected')
            severity = 'danger';

        return (
            <Tag
                value={rowData.status || 'Pending'}
                severity={severity}
            />
        );
    };

    const actionTemplate = (rowData) => {
        return (
            <div className="action-buttons">
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
        );
    };

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
                        showButtons
                        min={0}
                        max={100}
                        style={{
                            width: '100%',
                            marginTop: '10px'
                        }}
                    />
                </div>

                <div className="dialog-buttons">
                    <Button
                        label="Cancel"
                        className="p-button-secondary"
                        onClick={() => setApproveDialog(false)}
                    />

                    <Button
                        label="Approve & Save"
                        icon="pi pi-check"
                        className="p-button-success"
                        onClick={handleApprove}
                    />
                </div>
            </Dialog>

            <div className="sidebar">
                <h2>Teacher Dashboard</h2>

                <ul>
                      <li onClick={() => navigate("/teacher-dashboard")}> Dashboard</li>
                    <li onClick={() => navigate("/teacher-profile")}>Profile</li>
                    <li onClick={() => navigate("/classes")}>Classes</li>
                    <li onClick={() => navigate("/view-marks")}>Marks</li>
                    <li onClick={() => navigate("/attendance")}>Attendance</li>
                    <li onClick={() => navigate("/report-card")}>Report Card</li>
                    <li style={{ backgroundColor: "#007bff", color: "white" }}>Query</li>
                    <li onClick={() => navigate("/login")}>Logout</li>
                </ul>
            </div>

            <div className="content">
                <h1>Student Result Queries</h1>

                <div className="table-wrapper">
                    <DataTable
                        value={queries}
                        stripedRows
                        paginator
                        rows={5}
                        responsiveLayout="scroll"
                    >
                        <Column
                            field="studentName"
                            header="Student Name"
                        />

                        <Column
                            field="subject"
                            header="Subject"
                        />

                        <Column
                            field="currentMarks"
                            header="Current Marks"
                        />

                        <Column
                            field="updatedMarks"
                            header="Updated Marks"
                        />

                        <Column
                            field="message"
                            header="Query Message"
                            body={(rowData) => (
                                <div className="message-column">
                                    {rowData.message}
                                </div>
                            )}
                        />

                        <Column
                            body={statusBodyTemplate}
                            header="Status"
                        />

                        <Column
                            body={actionTemplate}
                            header="Actions"
                            style={{
                                minWidth: '170px',
                                textAlign: 'center'
                            }}
                        />
                    </DataTable>
                </div>
            </div>
        </div>
    );
}

export default StudentResultQuery;
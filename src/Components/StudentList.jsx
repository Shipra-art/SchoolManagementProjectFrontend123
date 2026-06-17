import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import {
  ConfirmDialog,
  confirmDialog,
} from "primereact/confirmdialog";

import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import "../App.css";

function StudentList({ toast }) {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  // Fetch Students
  const fetchStudents = async () => {
    try {
      const res = await api.get("/Student");

      const withSerial = res.data.map((student, index) => ({
        ...student,
        serialNo: index + 1,
      }));

      setStudents(withSerial);
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Delete Student
  const deleteStudent = (id) => {
    confirmDialog({
      message: "Are you sure you want to delete this student?",
      header: "Delete Confirmation",
      icon: "pi pi-exclamation-triangle",

      accept: async () => {
        try {
          await api.delete(`/Student/${id}`);

          toast.current.show({
            severity: "success",
            summary: "Deleted",
            detail: "Student deleted successfully",
            life: 3000,
          });

          fetchStudents();
        } catch (error) {
          console.error("Delete Error:", error);

          toast.current.show({
            severity: "error",
            summary: "Error",
            detail: "Unable to delete student",
            life: 3000,
          });
        }
      },
    });
  };

  // Action Buttons
  const actionTemplate = (rowData) => {
    return (
      <div className="action-btns">
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-warning"
          tooltip="Edit"
          onClick={() =>
            navigate(`/edit-student/${rowData.id}`)
          }
        />

        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-danger"
          tooltip="Delete"
          onClick={() => deleteStudent(rowData.id)}
        />
      </div>
    );
  };

  return (
    <div className="student-page">

      <ConfirmDialog />

      {/* Header */}
      <div className="student-header">

        <h2 className="student-title">
          Student Management
        </h2>

        <Button
          label="Add Student"
          icon="pi pi-plus"
          className="student-add-btn"
          onClick={() => navigate("/add-student")}
        />

      </div>

      {/* Table Card */}
      <div className="student-card">

        <DataTable
          value={students}
          paginator
          rows={5}
          stripedRows
          showGridlines
          responsiveLayout="scroll"
          emptyMessage="No Students Found"
        >

          <Column
            field="serialNo"
            header="Sr No"
          />

          <Column
            field="name"
            header="Name"
          />

          <Column
            field="age"
            header="Age"
          />

          <Column
            field="course"
            header="Course"
          />

          <Column
            field="marks"
            header="Marks"
          />

          <Column
            header="Actions"
            body={actionTemplate}
          />

        </DataTable>

      </div>

    </div>
  );
}

export default StudentList;
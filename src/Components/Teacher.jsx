import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from "../api/axios"
import "../App.css";

// PrimeReact Components
import { Button } from 'primereact/button' // Button
import { DataTable } from 'primereact/datatable' // Table
import { Column } from 'primereact/column' // Table column
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog' // Confirmation popup

// PrimeReact CSS
import 'primereact/resources/themes/lara-light-green/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'

// Custom CSS
import '../App.css'

// Component Start
function Teacher({ toast }) {

  // Teacher data store karne ke liye state
  const [teacher, setTeacher] = useState([])

  // Navigation function
  const navigate = useNavigate()

  // Teachers fetch function
  const fetchTeachers = async () => {

    try {

      // Backend se teacher data fetch
      const res = await api.get('/teacher')

      // Serial number add kar rahe hain
      const withSerial = res.data.map((s, i) => ({

        ...s, // Existing data copy
        serialNo: i + 1 // Serial number

      }))

      // State update
      setTeacher(withSerial)

    } catch (error) {

      // Error console me show
      console.error('Fetch error:', error)

    }
  }

  // Component load hone par data fetch
  useEffect(() => {

    fetchTeachers()

  }, [])

  // Delete teacher function
  const deleteTeacher = (id) => {

    // Confirmation popup
    confirmDialog({

      message: "Are you sure you want to delete this teacher?",
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',

      // YES click hone par
      accept: async () => {

        try {

          // Delete API call
          await api.delete(`/teacher/${id}`)

          // Success toast
          toast.current.show({

            severity: 'success',
            summary: 'Deleted',
            detail: 'Teacher deleted successfully',
            life: 3000,

          })

          // Table refresh
          fetchTeachers()

        } catch (error) {

          // Error console me
          console.error('Delete error:', error)

        }
      }
    })
  }

  // Action buttons template
  const actionTemplate = (rowData) => (

    <div className="tch-actions">

      {/* Edit Button */}
      <Button

        icon="pi pi-pencil"
        className="p-button-rounded p-button-warning"

        // Edit page navigate
        onClick={() => navigate(`/edit-teacher/${rowData.id}`)}

      />

      {/* Delete Button */}
      <Button

        icon="pi pi-trash"
        className="p-button-rounded p-button-danger"

        // Delete function call
        onClick={() => deleteTeacher(rowData.id)}

      />

    </div>
  )

  return (

    <div className="dashboard">

      <ConfirmDialog />

      {/* Sidebar */}
      <div className="sidebar">

        <div className="adm-sidebar">

          <h2 className="adm-sidebar-title">
            School System
          </h2>

          <ul className="adm-nav">
            <li onClick={() => navigate("/student-list")} className="adm-nav-item">Student List  </li>
            <li style={{ backgroundColor: "#007bff", color: "white" }}>Teacher List</li>
            <li onClick={() => navigate("/parent-list")} className="adm-nav-item"> Parent List</li>
            <li onClick={() => navigate("/AdminAttendance")} className="adm-nav-item"> Attendance List</li>
            <li onClick={() => navigate("/EditAddMarks")} className="adm-nav-item"> Edit Marks</li>
            <li onClick={() => navigate("/")} className="adm-nav-item adm-logout"> Logout</li>

          </ul>

        </div>

      </div>

      {/* Main Content */}
      <div className="main-content">

        {/* Header */}
        <div className="tch-header">

          <h2 className="tch-title">
            Teachers
          </h2>

          <Button
            label="Add Teacher"
            icon="pi pi-plus"
            className="p-button-success"
            onClick={() => navigate("/add-teacher")}
          />

        </div>

        {/* Table */}
        <div className="tch-table-wrapper">

          <DataTable
            value={teacher}
            paginator
            rows={5}
            stripedRows
            showGridlines
            className="tch-table"
          >

            <Column
              field="serialNo"
              header="Serial No."
            />

            <Column
              field="name"
              header="Name"
            />

            <Column
              field="subject"
              header="Subject"
            />

            <Column
              field="email"
              header="Email"
            />

            <Column
              header="Action"
              body={actionTemplate}
            />

          </DataTable>

        </div>

      </div>

    </div>

  );
}


// Component export
export default Teacher
// React hooks import
import React, { useEffect, useState } from 'react'

// Navigation ke liye
import { useNavigate } from 'react-router-dom'

// Axios API file
import api from "../api/axios"

// CSS file
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

    // Main page container
    <div className="tch-page">

      {/* Confirmation Dialog */}
      <ConfirmDialog />

      {/* Header Section */}
      <div className="tch-header">

        {/* Page Title */}
        <h2 className="tch-title">
          Teachers
        </h2>

        {/* Add Teacher Button */}
        <Button

          label="Add Teacher"
          icon="pi pi-plus"
          className="p-button-success"

          // Add teacher page navigate
          onClick={() => navigate('/add-teacher')}

        />

      </div>

      {/* Table Wrapper */}
      <div className="tch-table-wrapper">

        <DataTable

          // Table data
          value={teacher}

          // Pagination enable
          paginator

          // Per page rows
          rows={5}

          // Alternate row color
          stripedRows

          // Table borders
          showGridlines

          // Custom class
          className="tch-table"

        >

          {/* Serial Number Column */}
          <Column
            field='serialNo'
            header="Serial No."
            sortable
          />

          {/* Name Column */}
          <Column
            field="name"
            header="Name"
            sortable
          />

          {/* Subject Column */}
          <Column
            field="subject"
            header="Subject"
            sortable
          />

          {/* Email Column */}
          <Column
            field="email"
            header="Email"
            sortable
          />

          {/* Action Column */}
          <Column
            header="Action"
            body={actionTemplate}
          />

        </DataTable>

      </div>

    </div>
  )
}

// Component export
export default Teacher
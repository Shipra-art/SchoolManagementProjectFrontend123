import React from 'react'
import { useNavigate } from 'react-router-dom'
import "../App.css"

function Classes() {

  const navigate = useNavigate()

  return (
    <div className='dashboard'>

      {/* Sidebar */}
      <div className='sidebar'>
        <h2>Teacher Panel</h2>

        <ul>
          <li onClick={() => navigate("/teacher-dashboard")}>Teacher Dashboard</li>
          <li onClick={() => navigate("/teacher-profile")}>Profile</li>
          <li onClick={() => navigate("/view-marks")}>Marks</li>
          <li onClick={() => navigate("/report-card")}>Report Card</li>
          <li onClick={() => navigate("/query")}>Query</li>
          <li onClick={() => navigate("/attendance")}>Attendance</li>
          <li onClick={() => navigate("/login")}>Logout</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className='main-content'>

        <h1>Class Time Table</h1>

        <div className='table-box'>

          <table border="1" cellPadding="15">

            <thead>
              <tr>
                <th>Period</th>
                <th>Monday</th>
                <th>Tuesday</th>
                <th>Wednesday</th>
                <th>Thursday</th>
                <th>Friday</th>
              </tr>
            </thead>

            <tbody>

              <tr>
                <td>1st Period</td>
                <td>12th Grade</td>
                <td>10th Grade</td>
                <td>11th Grade</td>
                <td>9th Grade</td>
                <td>12th Grade</td>
              </tr>

              <tr>
                <td>2nd Period</td>
                <td>10th Grade</td>
                <td>12th Grade</td>
                <td>9th Grade</td>
                <td>11th Grade</td>
                <td>10th Grade</td>
              </tr>

              <tr>
                <td>3rd Period</td>
                <td>11th Grade</td>
                <td>9th Grade</td>
                <td>12th Grade</td>
                <td>10th Grade</td>
                <td>11th Grade</td>
              </tr>

              <tr>
                <td>Lunch Break</td>
                <td colSpan="5">12:00 PM - 12:30 PM</td>
              </tr>

              <tr>
                <td>4th Period</td>
                <td>9th Grade</td>
                <td>11th Grade</td>
                <td>10th Grade</td>
                <td>12th Grade</td>
                <td>9th Grade</td>
              </tr>

              <tr>
                <td>5th Period</td>
                <td>12th Grade</td>
                <td>10th Grade</td>
                <td>11th Grade</td>
                <td>9th Grade</td>
                <td>12th Grade</td>
              </tr>

            </tbody>

          </table>

        </div>

      </div>

    </div>
  )
}

export default Classes
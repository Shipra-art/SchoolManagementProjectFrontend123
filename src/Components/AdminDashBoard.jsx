import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard">

      {/* Sidebar */}

      <div className="sidebar">
        <h2 className="adm-sidebar-title">School System</h2>

        <ul className="adm-nav">
          <li onClick={() => navigate("/student-list")} className="adm-nav-item">Student List</li>
          <li onClick={() => navigate("/teacher")} className="adm-nav-item">Teacher List</li>
          <li onClick={() => navigate("/AdminAttendance")} className="adm-nav-item"> Attendance List</li>
          <li onClick={() => navigate("/EditAddMarks")} className="adm-nav-item">Edit Marks</li>
          <li onClick={() => navigate("/")} className="adm-nav-item adm-logout">Logout</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="adm-main">

        {/* Topbar */}
        <div className="adm-topbar">
          <h2 className="adm-topbar-title">Admin Dashboard</h2>
          <span className="adm-welcome">Welcome Admin</span>
        </div>

        {/* Cards */}
        <div className="adm-cards">

          {/* Student Card */}
          <div className="adm-card">
            <h3 className="adm-card-title">Student List</h3>
            <p className="adm-card-desc">
              Manage all students
            </p>
            <p style={{ fontSize: "14px", color: "#000" }}>
              The Student List enables administrators to efficiently manage all student records from a single location. <br></br>
              View student details, update information, monitor enrollment,  <br></br>
              and maintain accurate academic records to ensure smooth school administration. <br></br>
            </p>
          </div>

          {/* Teacher Card */}
          <div className="adm-card">
            <h3 className="adm-card-title">Teacher List</h3>
            <p className="adm-card-desc">
              Manage all teachers
            </p>
            <p style={{ fontSize: "14px", color: "#000" }}>
              The Teacher List enables administrators to efficiently manage all teacher records from a single location. <br></br>
              View teacher details, update information, monitor attendance,  <br></br>
              and maintain accurate professional records to ensure smooth school administration. <br></br>
            </p>

          </div>
          <div className="adm-card">
            <h3 className="adm-card-title">Parents List</h3>
            <p className="adm-card-desc">
              Manage all Parents
            </p>
            <p style={{ fontSize: "14px", color: "#000" }}>
              The Parents List enables administrators to efficiently manage all parent records from a single location. <br></br>
              View parent details, update information, monitor attendance,  <br></br>
              and maintain accurate professional records to ensure smooth school administration. <br></br>
            </p>

          </div>

          <div className="adm-card">
            <h3 className="adm-card-title">Attendance List</h3>
            <p className="adm-card-desc">
              Manage attendance records
            </p>
            <p style={{ fontSize: "14px", color: "#000" }}>
              The Attendance List enables administrators to efficiently manage all attendance records from a single location. <br></br>
              View attendance details, update information, monitor attendance,  <br></br>
              and maintain accurate professional records to ensure smooth school administration. <br></br>
            </p>

          </div>
            <div className="adm-card">
            <h3 className="adm-card-title">Edit Marks</h3>
            <p className="adm-card-desc">
              Manage exam results
            </p>
            <p style={{ fontSize: "14px", color: "#000"   }}>
              The Edit Marks feature allows administrators to efficiently update and manage student exam results from a single location. <br></br>
              View marks details, update information, monitor attendance,  <br></br>
              and maintain accurate professional records to ensure smooth school administration. <br></br>
            </p>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
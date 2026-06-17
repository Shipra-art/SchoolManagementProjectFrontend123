import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="adm-layout">

      {/* Sidebar */}
      <div className="adm-sidebar">
        <h2 className="adm-sidebar-title">School System</h2>

        <ul className="adm-nav">
          <li onClick={() => navigate("/student-list")}
            className="adm-nav-item">Student List</li>

          <li onClick={() => navigate("/teacher")} className="adm-nav-item">
            Teacher List
          </li>
          <li onClick={()=>navigate("/AdminAttendance")} className="adm-nav-item">
            Attendance List</li>

          <li onClick={() => navigate("/")} className="adm-nav-item adm-logout">
            Logout
          </li>
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
            <button
              onClick={() => navigate("/student-list")}
              className="adm-btn adm-btn-green"
            >
              View Students
            </button>
          </div>

          {/* Teacher Card */}
          <div className="adm-card">
            <h3 className="adm-card-title">Teacher List</h3>
            <p className="adm-card-desc">
              Manage all teachers
            </p>
            <button
              onClick={() => navigate("/teacher")}
              className="adm-btn adm-btn-blue"
            >
              View Teachers
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
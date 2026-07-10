import React from "react";


function Navbar() {
    <div className="dashboard">

        {/* Sidebar */}

        <div className="sidebar">

            <h2>School System</h2>
            <ul className="adm-nav">

                <li onClick={() => navigate("/student-list")} className="adm-nav-item">Student List  </li>
                <li onClick={() => navigate("/teacher")} className="adm-nav-item"> Teacher List</li>
                <li onClick={() => navigate("/parent-list")} className="adm-nav-item"> Parent List</li>
                <li onClick={() => navigate("/AdminAttendance")} className="adm-nav-item"> Attendance List</li>
                <li onClick={() => navigate("/EditAddMarks")} className="adm-nav-item">Edit Marks </li>
                <li style={{ backgroundColor: "#007bff", color: "white" }}> Time Table</li>
                <li onClick={() => navigate("/")} className="adm-nav-item adm-logout"> Logout</li>
            </ul>

        </div>
    </div>

}
export default Navbar;
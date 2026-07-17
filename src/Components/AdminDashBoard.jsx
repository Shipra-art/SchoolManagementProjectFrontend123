import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function AdminDashboard() {

  const navigate = useNavigate();

  const cards = [
    {
      title: "Student List",
      desc: "Manage all student records from one place.",
      route: "/student-list"
    },
    {
      title: "Teacher List",
      desc: "Manage all teacher records.",
      route: "/teacher"
    },
    {
      title: "Parents List",
      desc: "Manage parent information.",
      route: "/parent-list"
    },
    {
      title: "Attendance",
      desc: "Manage attendance records.",
      route: "/AdminAttendance"
    },
    {
      title: "Edit Marks",
      desc: "Manage examination results.",
      route: "/EditAddMarks"
    }
  ];

  return (

    <div className="dashboard">

      <div className="sidebar">

        <h2 className="adm-sidebar-title">
          School System
        </h2>

        <ul className="adm-nav">

          <li
            className="adm-nav-item"
            onClick={() => navigate("/student-list")}
          >
            Student List
          </li>

          <li
            className="adm-nav-item"
            onClick={() => navigate("/teacher")}
          >
            Teacher List
          </li>

          <li
            className="adm-nav-item"
            onClick={() => navigate("/AdminAttendance")}
          >
            Attendance
          </li>

          <li
            className="adm-nav-item"
            onClick={() => navigate("/EditAddMarks")}
          >
            Edit Marks
          </li>

          <li
            className="adm-nav-item adm-logout"
            onClick={() => navigate("/")}
          >
            Logout
          </li>

        </ul>

      </div>

      <div className="adm-main">

        <div className="adm-topbar">

          <h2 className="adm-topbar-title">
            Dashboard
          </h2>

          <span className="adm-welcome">
            Welcome Admin 👋
          </span>

        </div>

        <div className="adm-cards">

          {
            cards.map((card, index) => (

              <div className="adm-card" key={index}>

                <h3 className="adm-card-title">
                  {card.title}
                </h3>

                <p className="adm-card-desc">
                  {card.desc}
                </p>

                <button
                  className="adm-btn"
                  onClick={() => navigate(card.route)}
                >
                  Open
                </button>

              </div>

            ))
          }

        </div>

      </div>

    </div>

  );

}

export default AdminDashboard;
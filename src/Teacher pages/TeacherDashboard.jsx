import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge, Modal, Button } from "antd";
import { BellOutlined } from "@ant-design/icons";
import api from "../api/axios";
import "../App.css";

function TeacherDashboard() {

  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {

      const res = await api.get(
        "/Notification/teacher123"
      );

      setNotifications(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  const markAsRead = async (id) => {
    try {

      await api.put(
        `/Notification/${id}`
      );

      fetchNotifications();

    } catch (error) {

      console.log(error);

    }
  };

  const deleteNotification = async (id) => {
    try {

      await api.delete(
        `/Notification/${id}`
      );

      fetchNotifications();

    } catch (error) {

      console.log(error);

    }
  };
  return (

    <div className="teacher-profile-page">

      {/* Sidebar */}
      <aside className="sidebar">

        <div className="logo">
          <h2>Teacher Dashboard</h2>
        </div>

        <ul className="teacher-nav">

          <li className="active">Dashboard  </li>
          <li onClick={() => navigate("/profile")}>Profile</li>
          <li onClick={() => navigate("/classes")}> Classes</li>
          <li onClick={() => navigate("/report-card")}>  Report Card</li>
          <li onClick={() => navigate("/view-marks")}>Marks</li>
          <li onClick={() => navigate("/attendance")}>Attendance</li>
          <li onClick={() => navigate("/query")}> Query </li>
          <li onClick={() => navigate("/login")}>Logout</li>

        </ul>

      </aside>
      {/* Main */}
      <div className="teacher-main">

        {/* Header */}
        <div className="teacher-header">

          <Badge count={notifications.filter(n => !n.isRead).length}>
            <BellOutlined
              className="teacher-bell"
              onClick={() => setIsModalOpen(true)}
            />
          </Badge>

          <div className="teacher-profile">

            <img
              src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
              alt=""
            />

            <div>
              <h4>Mr. Sanjay Purohit</h4>
              <small>Computer Science</small>
            </div>

          </div>

        </div>

        {/* Welcome Banner */}

        <div className="teacher-banner">

          <div>

            <small>20 July 2026</small>

            <h1>Welcome Back, Teacher 👋</h1>

            <p>
              Manage your classes, students and academic activities.
            </p>

          </div>

          <img src="https://cdn-icons-png.flaticon.com/512/4207/4207249.png" alt="" />

        </div>

        {/* Statistics */}

        <div className="teacher-stats">

          <div className="teacher-card">
            <h3>Total Classes</h3>
            <h2>6</h2>
            <p>This Semester</p>
          </div>

          <div className="teacher-card active">
            <h3>Total Students</h3>
            <h2>42</h2>
            <p>Registered</p>
          </div>

          <div className="teacher-card">
            <h3>Assignments</h3>
            <h2>18</h2>
            <p>Submitted</p>
          </div>

          <div className="teacher-card">
            <h3>Queries</h3>
            <h2>5</h2>
            <p>Pending</p>
          </div>

        </div>

        {/* Bottom */}

        <div className="teacher-bottom">

          <div className="teacher-left">

            <div className="teacher-section-title">

              <h2>Today's Classes</h2>

              <span>View All</span>

            </div>

            <div className="class-card">

              <div>

                <h3>Object Oriented Programming</h3>

                <p>10:00 AM - 11:00 AM</p>

                <a href="/classes"><button>Open Class</button></a>

              </div>

              <div className="class-icon">💻</div>

            </div>

            <div className="class-card">

              <div>

                <h3>Database Management</h3>

                <p>12:00 PM - 1:00 PM</p>

                <a href="/classes"><button>Open Class</button></a>

              </div>

              <div className="class-icon">📘</div>

            </div>

          </div>

          <div className="teacher-right">

            <h3>Top Students</h3>

            <div className="teacher-student-list">

              <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="" />
              <img src="https://cdn-icons-png.flaticon.com/512/3135/3135768.png" alt="" />
              <img src="https://cdn-icons-png.flaticon.com/512/3135/3135789.png" alt="" />

            </div>

            <div className="teacher-notice">

              <h3>Today's Tasks</h3>

              <p>✔ Upload attendance</p>

              <p>✔ Verify marks</p>

              <p>✔ Reply student queries</p>

              <p>✔ Upload homework</p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default TeacherDashboard;
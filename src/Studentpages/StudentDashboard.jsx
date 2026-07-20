import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge, Modal, Button } from "antd";
import { BellOutlined } from "@ant-design/icons";
import api from "../api/axios";
import "../App.css";

function StudentDashboard() {

  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {

      const res = await api.get(
        "/Notification/student123"
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

    <div className="student-dashboard">

      {/* Sidebar */}

      <aside className="student-sidebar">

        <div className="sidebar-logo">

          <div className="logo-box">🎓</div>
          <h2>Student Dashboard</h2>

        </div>

        <ul className="student-menu">

          <li className="active">  My Dashboard</li>
          <li onClick={() => navigate("/profile")}>  My Profile</li>
          <li onClick={() => navigate("/courses")}>  My Courses</li>
          <li onClick={() => navigate("/query-form")}>  Queries</li>
          <li onClick={() => navigate("/Homework")}>Homework</li>
          <li onClick={() => navigate("/marks")}>Marks</li>
          <li onClick={() => navigate("/student-attendance")}> Attendance</li>
          <li onClick={() => navigate("/timetable")}>Timetable </li>
          <li className="logout" onClick={() => navigate("/login")}>  Logout</li>

        </ul>

      </aside>

      {/* Main */}

      <div className="student-main">

        {/* Header */}
        <div className="student-main">

          {/* Header */}
          <div className="top-header">

            <div className="header-right">
              <Badge count={notifications.filter(n => !n.isRead).length}>
                <BellOutlined
                  className="bell-icon"
                  onClick={() => setIsModalOpen(true)}
                />
              </Badge>

              <div className="profile-box">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1yDdUYsm3LBwRT-DGMLyTo610n_bTNmiLvkP8hH9Djg&s=10"
                  alt=""
                />

                <div>
                  <h4>Esha Singh</h4>
                  <small>12th</small>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Welcome Banner */}

        <div className="welcome-banner">

          <div>

            <small>July 20, 2026</small>

            <h1>Welcome back, Esha</h1>

            <p>
              Always stay updated in your student portal
            </p>

          </div>

          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135755.png"
            alt=""
          />

        </div>

        {/* Statistics */}

        <div className="stats-section">

          <div className="stat-card">

            <h3>Attendance</h3>

            <h2>95%</h2>

            <p>Excellent</p>

          </div>

          <div className="stat-card active-card">

            <h3>Current GPA</h3>

            <h2>8.9</h2>

            <p>Semester 5</p>

          </div>

          <div className="stat-card">

            <h3>Homework</h3>

            <h2>3</h2>

            <p>Pending</p>

          </div>

        </div>

        {/* Bottom */}

        <div className="bottom-layout">

          <div>

            <div className="section-heading">

              <h2>Enrolled Courses</h2>

              <span>See all</span>

            </div>

            <div className="course-card">

              <div>

                <h3>Object Oriented Programming</h3>

                <button>View</button>

              </div>

              <div className="course-icon">💻</div>

            </div>

            <div className="course-card">

              <div>

                <h3>Database Management System</h3>

                <button>View</button>

              </div>

              <div className="course-icon">📈</div>

            </div>

          </div>

          <div>

            <h3>Course Instructors</h3>

            <div className="teacher-list">

              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlbbdPqXU3wwsJQPwkgU42saoIIg22ct8rNcFV_RU6PA&s=10" alt="" />
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6YG-HpQPhKEydO2otBnSlWkoJ8PX_ps5DlLP8090Jbw&s=10" alt="" />
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRg9wIXAJGZwJ7u-hq6PMXoIbbctPQx95tyNWrIEx7F-Q&s=10" alt="" />

            </div>

            <div className="notice-card">

              <h3>Daily Notice</h3>

              <h4>School Fees payment </h4>

              <p>  Fees has been Submitted.</p>

              <hr />

              <h4>Exam Schedule</h4>

              <p> Practical examinations start next week.</p>

            </div>

          </div>

        </div>

      </div>

      {/* Keep your existing Notification Modal exactly as it is */}

      <Modal
        title="Notifications"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        {/* Your existing notification mapping code goes here unchanged */}
      </Modal>

    </div>
  );
}

export default StudentDashboard;

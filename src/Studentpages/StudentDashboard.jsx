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

    <div className="dashboard">

      {/* Sidebar */}
      <div className="sidebar">

        <h2>Student Dashboard</h2>

        <ul>
          <li style={{ backgroundColor: "#007bff", color: "white" }}>  My Dashboard</li>
          <li onClick={() => navigate("/profile")}>My Profile</li>
          <li onClick={() => navigate("/courses")}>My Courses</li>
          <li onClick={() => navigate("/query-form")}>Queries</li>
          <li onClick={() => navigate("/Homework")}>Homework</li>
          <li onClick={() => navigate("/marks")}>Marks</li>
          <li onClick={() => navigate("/student-attendance")}>Attendance</li>
          <li onClick={() => navigate("/timetable")}>Timetable</li>
          <li onClick={() => navigate("/login")}>Logout</li>
        </ul>

      </div>

      {/* Main Content */}
      <div className="main-content">

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "30px"
          }}
        >
          <div>
            <h1>Welcome Back 👋</h1>
            <p style={{ color: "#666" }}>
              Hope you're having a productive day!
            </p>
          </div>

          <Badge count={notifications.filter(n => !n.isRead).length}>
            <BellOutlined
              style={{
                fontSize: 30,
                cursor: "pointer",
                color: "#1565c0"
              }}
              onClick={() => setIsModalOpen(true)}
            />
          </Badge>
        </div>

        {/* Top Cards */}

        <div className="cards">

          <div className="card">
            <h3>Attendance</h3>
            <h2>95%</h2>
            <small>Excellent</small>
          </div>

          <div className="card">
            <h3>Current GPA</h3>
            <h2>8.9</h2>
            <small>Semester 5</small>
          </div>

          <div className="card">
            <h3>Homework</h3>
            <h2>3</h2>
            <small>Pending</small>
          </div>

          <div className="card">
            <h3>Subjects</h3>
            <h2>7</h2>
            <small>Registered</small>
          </div>

        </div>

        {/* Middle Section */}

        <div className="dashboard-grid">

          <div className="dashboard-box">

            <h2>Today's Classes</h2>

            <ul>

              <li>09:00 AM - Mathematics</li>
              <li>10:30 AM - English</li>
              <li>12:00 PM - Computer Science</li>
            </ul>

          </div>

          <div className="dashboard-box">

            <h2>Upcoming Assignments</h2>

            <ul>
              <li>English Essay - Friday</li>
            </ul>

          </div>

        </div>

      </div>

      {/* Notification Modal */}
      <Modal
        title="Notifications"
        open={isModalOpen}
        onCancel={() =>
          setIsModalOpen(false)
        }
        footer={null}
      >

        {
          notifications.length === 0 ?

            <p>No Notifications</p>

            :

            notifications.map((n) => (

              <div
                key={n.id}
                style={{
                  border: "1px solid #ddd",
                  padding: "10px",
                  marginBottom: "10px",
                  borderRadius: "8px"
                }}
              >

                <p>
                  <strong>
                    {n.message}
                  </strong>
                </p>

                <p>
                  {
                    new Date(
                      n.createdAt
                    ).toLocaleString()
                  }
                </p>

                <div
                  style={{
                    display: "flex",
                    gap: "10px"
                  }}
                >

                  {
                    !n.isRead &&

                    <Button
                      type="primary"
                      onClick={() =>
                        markAsRead(n.id)
                      }
                    >
                      Read
                    </Button>
                  }

                  <Button
                    danger
                    onClick={() =>
                      deleteNotification(n.id)
                    }
                  >
                    Delete
                  </Button>

                </div>

              </div>

            ))
        }
      </Modal>
    </div>

  );
}

export default StudentDashboard;

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
          <li style={{ backgroundColor: "#007bff", color: "white" }}> Dashboard</li>
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

        {/* Notification Bell */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "20px"
          }}
        >

          <Badge
            count={
              notifications.filter(
                n => !n.isRead
              ).length
            }
          >

            <BellOutlined
              style={{
                fontSize: "30px",
                cursor: "pointer"
              }}
              onClick={() =>
                setIsModalOpen(true)
              }
            />

          </Badge>

        </div>

        <h1>Welcome Back Student</h1>

        <div className="cards">

          <div className="card">
            <h3>Total Courses</h3>
            <p>5</p>
          </div>

          <div className="card">
            <h3>Attendance</h3>
            <p>85%</p>
          </div>

          <div className="card">
            <h3>Marks</h3>
            <p>A Grade</p>
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
    </div>
  );
}

export default StudentDashboard;
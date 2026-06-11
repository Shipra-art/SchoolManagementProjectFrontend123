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
    <div className="dashboard">

      {/* Sidebar */}
      <div className="sidebar">

        <h2>Teacher Dashboard</h2>

        <ul>
        <li style={{ backgroundColor: "#007bff", color: "white" }}> Dashboard</li>
          <li onClick={() => navigate("/teacher-profile")}>Profile</li>
          <li onClick={() => navigate("/classes")}>Classes</li>
          <li onClick={() => navigate("/report-card")}>Report Card</li>
          <li onClick={() => navigate("/view-marks")}>Marks</li>
          <li onClick={() => navigate("/attendance")}>Attendance</li>
          <li onClick={() => navigate("/query")}>Query</li>
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
            showZero={false}
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

        <h1>Welcome Back Teacher</h1>

        <p className="subtitle">
          Manage students, classes,
          and marks easily.
        </p>

        <div className="card-container">

          <div className="cards">
            <h3>Total Classes</h3>
            <p>6</p>
          </div>

          <div className="cards">
            <h3>Total Students</h3>
            <p>42</p>
          </div>

          <div className="cards">
            <h3>Pending Assignments</h3>
            <p>3</p>
          </div>

          <div className="cards">
            <h3>Exams</h3>
            <p>Midterm</p>
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
                    borderRadius: "8px",
                    padding: "10px",
                    marginBottom: "10px"
                  }}
                >

                  <p>
                    <strong>
                      {n.message}
                    </strong>
                  </p>

                  <small>
                    {
                      new Date(
                        n.createdAt
                      ).toLocaleString()
                    }
                  </small>

                  <div
                    style={{
                      marginTop: "10px",
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

export default TeacherDashboard;
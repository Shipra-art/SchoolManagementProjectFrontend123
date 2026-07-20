import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard">

      {/* Sidebar */}
      <aside className="sidebar">

        <div className="logo">
          <h2>Education</h2>
        </div>

        <ul className="adm-nav">
          <li className="adm-nav-item active">Dashboard</li>
          <li className="adm-nav-item" onClick={() => navigate("/student-list")}> Students </li>
          <li className="adm-nav-item" onClick={() => navigate("/teacher")}>Teachers</li>
          <li className="adm-nav-item" onClick={() => navigate("/AdminAttendance")}>Attendance</li>
          <li className="adm-nav-item" onClick={() => navigate("/EditAddMarks")}> Results</li>
          <li className="adm-nav-item adm-logout" onClick={() => navigate("/")}> Logout</li>
        </ul>

        <div className="invite-box">
          <img
            src="https://cdn-icons-png.flaticon.com/512/6997/6997662.png"
            alt="Invite"
          />
          <h4>Invite Friend</h4>
          <button>Get the Link</button>
        </div>

      </aside>

      {/* Main Content */}
      <main className="adm-main">

        {/* Topbar */}
        <div className="adm-topbar">
          <h2> Admin Dashboard</h2>
        </div>

        {/* Stats */}
        <div className="stats-row">

          <div className="stat-card purple">
            <h4>Total Students</h4>
            <h2>1220</h2>
          </div>

          <div className="stat-card pink">
            <h4>Total Teachers</h4>
            <h2>120</h2>
          </div>

          <div className="stat-card blue">
            <h4>Total Courses</h4>
            <h2>15</h2>
          </div>

          <div className="stat-card orange">
            <h4>Faculty Room</h4>
            <h2>100</h2>
          </div>

        </div>

        {/* Charts */}
        <div className="content-row">

          <div className="chart-box">
            <h3>Statistics</h3>

            <div className="bars">
              <span style={{ height: "100px" }}></span>
              <span style={{ height: "120px" }}></span>
              <span style={{ height: "90px" }}></span>
              <span style={{ height: "160px" }}></span>
              <span style={{ height: "130px" }}></span>
            </div>
          </div>

          <div className="progress-box">
            <h3>Course Activities</h3>

            <div className="circle">
              <span>75%</span>
            </div>
          </div>

        </div>

        {/* Database */}
        <div className="table-box">

          <h3>Database</h3>

          <table>
            <thead>
              <tr>
                <th>Student</th>
                <th>Score</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Esha</td>
                <td>80/100</td>
                <td>Pass</td>
              </tr>

              <tr>
                <td>Abhinav</td>
                <td>70/100</td>
                <td>Pass</td>
              </tr>

              <tr>
                <td>Yash</td>
                <td>98/100</td>
                <td>Pass</td>
              </tr>

              <tr>
                <td>Gargee</td>
                <td>22/100</td>
                <td>Fail</td>
              </tr>
            </tbody>
          </table>

        </div>

      </main>

      {/* Right Sidebar */}
      <aside className="right-sidebar">

        <div className="calendar">
          <h3>July 2026</h3>

          <aside className="right-sidebar">
            <div className="calendar">
              <h3>July 2026</h3>

              <div className="calendar-body">
                <div className="calendar-grid">

                  {/* Days */}
                  <div className="day-name">Sun</div>
                  <div className="day-name">Mon</div>
                  <div className="day-name">Tue</div>
                  <div className="day-name">Wed</div>
                  <div className="day-name">Thu</div>
                  <div className="day-name">Fri</div>
                  <div className="day-name">Sat</div>

                  {/* Empty cells before July 1 (Wednesday) */}
                  <div className="day empty"></div>
                  <div className="day empty"></div>
                  <div className="day empty"></div>

                  {/* Dates */}
                  <div className="day">1</div>
                  <div className="day">2</div>
                  <div className="day">3</div>
                  <div className="day">4</div>

                  <div className="day">5</div>
                  <div className="day">6</div>
                  <div className="day">7</div>
                  <div className="day">8</div>
                  <div className="day">9</div>
                  <div className="day">10</div>
                  <div className="day">11</div>

                  <div className="day">12</div>
                  <div className="day">13</div>
                  <div className="day">14</div>
                  <div className="day">15</div>
                  <div className="day">16</div>
                  <div className="day">17</div>
                  <div className="day">18</div>

                  <div className="day">19</div>
                  <div className="day today">20</div>
                  <div className="day">21</div>
                  <div className="day">22</div>
                  <div className="day">23</div>
                  <div className="day">24</div>
                  <div className="day">25</div>

                  <div className="day">26</div>
                  <div className="day">27</div>
                  <div className="day">28</div>
                  <div className="day">29</div>
                  <div className="day">30</div>
                  <div className="day">31</div>

                </div>
              </div>
            </div>
          </aside>

          <div className="notice-board">

            <h3>Notice Board</h3>

            <ul>
              <li>Special Examination Notice</li>
              <li>Admission Notice</li>
              <li>COVID Vaccination Survey</li>
              <li>Scholarship Notice</li>
            </ul>

          </div>
        </div>
      </aside>
    </div>
  );
}

export default AdminDashboard;
import React, { useRef } from 'react'
import { Routes, Route } from 'react-router-dom'  // Remove BrowserRouter import
import { Toast } from 'primereact/toast'
import { ConfirmDialog } from 'primereact/confirmdialog'
import StudentList from './Components/StudentList'
import StudentEditAdd from './Components/StudentEditAdd'
import './App.css'
import "primereact/resources/themes/lara-light-green/theme.css"
import "primereact/resources/primereact.min.css"
import "primeicons/primeicons.css"
import Login from './Components/Login'
import Teacher from './Components/Teacher'
import Home from './Components/Home'
import TeacherEditAdd from './Components/TeacherEditAdd'
import TeacherDashboard from './Teacher pages/TeacherDashboard'
import StudentDashboard from './Studentpages/StudentDashboard'
import AdminDashboard from './Components/AdminDashboard'
import Profile from './Studentpages/Profile'
import Courses from './Studentpages/courses'
import Marks from './Studentpages/Marks'
import Teacherprofile from './Teacher pages/Teacherprofile'
import Classes from './Teacher pages/Classes'
import Viewmarks from "./Teacher pages/Viewmarks"
import ResultQuery from '../src/Teacher pages/ResultQuery'
import Query from './Studentpages/Query'
import Timetable from './Studentpages/Timetable'
import ReportCard from './Teacher pages/ReportCard'
import Attendance from './Teacher pages/Attendance'
import StudentAttendance from './Studentpages/StudentAttendance'
import ParentDashboard from './Parent/ParentDashboard'
import ParentAttendance from './Parent/ParentAttendance'
import ParentReportCard from './Parent/ParentReportCard'
import ParentMarks from './Parent/ParentMarks'
import ParentTimeTable from './Parent/ParentTimeTable'
import ParentHomework from './Parent/ParentHomework'
import Homework from './Studentpages/Homework'
import Register from './Components/Register'
// import Notification from "./Components/Notification"
// import Practice from "./Components/Practice"


const App = () => {
  const toast = useRef(null)

  return (
    <>                         
      <Toast ref={toast} />
      <ConfirmDialog />

      <Routes>                  
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* Dashboard Routes */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/parent-dashboard" element={<ParentDashboard />} />
        {/* Other Routes */}
        <Route path="/teacher-profile" element={<Teacherprofile />} />
        <Route path="/classes" element={<Classes />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/marks" element={<Marks />} />
        <Route path="/view-marks" element={<Viewmarks />} />
        <Route path="/query" element={<ResultQuery />} />
        <Route path="/query-form" element={<Query/>}/> 
        <Route path="/timetable" element={<Timetable/>}/>
        <Route path="/report-card" element={<ReportCard />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/student-attendance" element={<StudentAttendance />} />
        <Route path="/parent-dashboard" element={<ParentDashboard />} />
        <Route path="/parent-attendance" element={<ParentAttendance />} />
        <Route path="/parent-report-card" element={<ParentReportCard />} />
        <Route path="/parent-marks" element={<ParentMarks />} />
        <Route path="/parent-time-table" element={<ParentTimeTable />} />
        <Route path="/parent-homework" element={<ParentHomework />} />
        <Route path="/Homework" element={<Homework />} />
        <Route path="/Register" element={<Register />} />
        {/* <Route path="/practice" element={<Practice />} /> */}

        {/* Student and teacher routes */}
        {/* <Route path="/Notification" element={<Notification/>}/> */}
        <Route path="/student-list" element={<StudentList toast={toast} />} />
        <Route path="/add-student" element={<StudentEditAdd toast={toast} />} />
        <Route path="/edit-student/:id" element={<StudentEditAdd toast={toast} />} />
        <Route path="/teacher" element={<Teacher toast={toast} />} />
        <Route path="/add-teacher" element={<TeacherEditAdd toast={toast} />} />
        <Route path="/edit-teacher/:id" element={<TeacherEditAdd toast={toast} />} />
      </Routes>
    </>
  )
}

export default App

// VS code Git Symbols
//M=Modified (file change hui hai)
//U=Untracked(new file hai, Git track nahi kar raha)
//A=Added(git add ho chuki hai)
//D=Deleted (file delete hui hai)
//R=Renamed(file ka naam change hua hai)
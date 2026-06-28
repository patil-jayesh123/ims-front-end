import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import About from "./components/About";
import Navbar from "./components/Navbar";
import AdminNavbar from "./components/AdminNavbar";
import Courses from "./components/Courses";
import Contact from "./components/Contact";
import Signup from "./components/Signup";
import Dashbord from "./components/Dashbord";
import Students from "./components/Students";
import Staff from "./components/Staff";
import Course from "./components/Course";
import PrivateRoute from "./components/PrivateRoute";
import Notfound from "./components/Notfound";
import Home from "./components/Home";
import Login from "./components/Login";
import Studentform from "./components/Studentform";
import EditStudent from "./components/EditStudent";
import Staffform from "./components/Staffform";
import Editstaff from "./components/Editstaff";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import Courseform from "./components/Courseform";
import axios from "axios";

function App() {
  const [studentData, setStudentData] = useState([]);
  const [staffdata, setstaffdata] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem("token");
        const result = await axios.get("https://ims-backend-p5hr.onrender.com/admin/student", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStudentData(result.data || []);
      } catch (_) {}
    };
    fetchStudents();
  }, []);

  useEffect(() => {
    const fetchstaffdata = async () => {
      try {
        const token = localStorage.getItem("token");
        const result = await axios.get("https://ims-backend-p5hr.onrender.com/admin/staff", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setstaffdata(result.data || []);
      } catch (_) {}
    };
    fetchstaffdata();
  }, []);

  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {/* Public navbar — hide on admin pages */}
      {!isAdminRoute && <Navbar />}

      {/* Admin top navbar — show on admin pages (inside PrivateRoute so token exists) */}
      {isAdminRoute && <AdminNavbar />}

      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Course" element={<Course />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* Admin Pages */}
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute>
              <Dashbord studentData={studentData} staffdata={staffdata} />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/student"
          element={<PrivateRoute><Students /></PrivateRoute>}
        />
        <Route
          path="/admin/courses"
          element={<PrivateRoute><Courses /></PrivateRoute>}
        />
        <Route
          path="/admin/staff"
          element={<PrivateRoute><Staff /></PrivateRoute>}
        />
        <Route
          path="/admin/studentform"
          element={<PrivateRoute><Studentform /></PrivateRoute>}
        />
        <Route
          path="/admin/editstudent/:id"
          element={<PrivateRoute><EditStudent /></PrivateRoute>}
        />
        <Route
          path="/admin/staffform"
          element={<PrivateRoute><Staffform /></PrivateRoute>}
        />
        <Route
          path="/admin/editstaff/:id"
          element={<PrivateRoute><Editstaff /></PrivateRoute>}
        />
        <Route
          path="/admin/courseform"
          element={<PrivateRoute><Courseform /></PrivateRoute>}
        />

        {/* 404 */}
        <Route path="*" element={<Notfound />} />
      </Routes>
    </>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
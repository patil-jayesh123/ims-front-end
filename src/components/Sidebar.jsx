import React, { useEffect } from "react";
import "../styles/Sidebar.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Sidebar() {
  const navigate = useNavigate();

  //-----------------------------------------------

  const handlelogout = (e) => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("token");
      // toast.success("user logout successfully 😢");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }
  };

  return (
    <div>
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">IMS Panel</h2>
        <ul className="Nav-link">
          <li>
            {/* <Link to="/admin/dashboard">Dashboard</Link> */}
            <NavLink to="/admin/dashboard">Dashboard</NavLink>
          </li>
          <li>
            {/* <Link to="/admin/student">Students</Link> */}
            <NavLink to="/admin/student">Students</NavLink>
          </li>
          <li>
            {/* <Link to="/admin/courses">Courses</Link> */}
            <NavLink to="/admin/courses">Courses</NavLink>
          </li>
          <li>
            {/* <Link to="/admin/staff">Staff</Link> */}
            <NavLink to="/admin/staff">Staff</NavLink>
          </li>
          <li>
            {/* <Link to="/admin/seting">Settings</Link> */}
            <NavLink to="/admin/seting">Settings</NavLink>
          </li>
          <button className="logout-btn" onClick={handlelogout}>
            Logout
          </button>
        </ul>
      </aside>
    </div>
  );
}

export default Sidebar;

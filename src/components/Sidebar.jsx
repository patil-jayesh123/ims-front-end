import React, { useEffect } from "react";
import "../styles/Sidebar.css";
import { Link, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  //-----------------------------------------------

  const handlelogout = (e) => {
    if (window.confirm("Are you sure you want to logout? 😢")) {
      localStorage.removeItem("token");
      // alert("user logout successfully 😢");
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
            <Link to="/admin/dashboard">🏠 Dashboard</Link>
          </li>
          <li>
            <Link to="/admin/student">👨‍🎓 Students</Link>
          </li>
          <li>
            <Link to="/admin/courses">📚 Courses</Link>
          </li>
          <li>
            <Link to="/admin/staff">🧑‍🏫 Staff</Link>
          </li>
          <li>
            <Link to="/admin/seting">⚙️ Settings</Link>
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

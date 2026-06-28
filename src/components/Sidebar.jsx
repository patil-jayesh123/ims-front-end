import React, { useState, useEffect } from "react";
import "../styles/Sidebar.css";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import ConfirmModal from "./ConfirmModal";
import { useSidebar } from "./SidebarContext";

const NAV_ITEMS = [
  { to: "/admin/dashboard", label: "Dashboard", icon: "📊" },
  { to: "/admin/student",   label: "Students",  icon: "👨‍🎓" },
  { to: "/admin/courses",   label: "Courses",   icon: "📚" },
  { to: "/admin/staff",     label: "Staff",     icon: "🧑‍🏫" },
];

function Sidebar() {
  const { isOpen, close } = useSidebar();
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate  = useNavigate();
  const location  = useLocation();

  // Close sidebar on mobile when navigating
  useEffect(() => {
    if (window.innerWidth < 768) close();
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("adminName");
    localStorage.removeItem("adminEmail");
    toast.success("Logged out successfully 👋");
    setTimeout(() => navigate("/login"), 800);
  };

  return (
    <>
      {/* Overlay — mobile only, closes sidebar on click */}
      {isOpen && (
        <div className="sidebar-overlay" onClick={close} aria-hidden="true" />
      )}

      <aside className={`sidebar ${isOpen ? "sidebar--open" : "sidebar--closed"}`}>
        {/* Brand inside sidebar */}
        <div className="sidebar__brand">
          <span className="sidebar__brand-icon">🎓</span>
          <span className="sidebar__brand-text">IMS Panel</span>
        </div>

        <nav className="sidebar__nav">
          <ul>
            {NAV_ITEMS.map(({ to, label, icon }) => (
              <li key={to}>
                <NavLink to={to} className={({ isActive }) => isActive ? "active" : ""}>
                  <span className="sidebar__item-icon">{icon}</span>
                  <span className="sidebar__item-label">{label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <button className="logout-btn" onClick={() => setShowConfirm(true)}>
          <span className="sidebar__item-icon">🚪</span>
          <span className="sidebar__item-label">Logout</span>
        </button>

        <ConfirmModal
          show={showConfirm}
          title="Logout Confirmation"
          message="Are you sure you want to logout?"
          confirmText="Logout"
          cancelText="Cancel"
          variant="danger"
          onCancel={() => setShowConfirm(false)}
          onConfirm={() => { setShowConfirm(false); handleLogout(); }}
        />
      </aside>
    </>
  );
}

export default Sidebar;
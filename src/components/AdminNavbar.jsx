import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "./ThemeContext";
import { useSidebar } from "./SidebarContext";
import { toast } from "react-toastify";
import ConfirmModal from "./ConfirmModal";
import "./AdminNavbar.css";

const AdminNavbar = () => {
  const { isDark, toggleTheme } = useTheme();
  const { isOpen, toggle } = useSidebar();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const dropdownRef = useRef(null);

  const adminName  = localStorage.getItem("adminName")  || "Admin";
  const adminEmail = localStorage.getItem("adminEmail") || "admin@ims.com";
  const initials   = adminName.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("adminName");
    localStorage.removeItem("adminEmail");
    toast.success("Logged out successfully 👋");
    setTimeout(() => navigate("/login"), 800);
  };

  return (
    <>
      <header className={`admin-navbar ${isOpen ? "admin-navbar--sidebar-open" : "admin-navbar--sidebar-closed"}`}>

        {/* Left: Hamburger toggle */}
        <div className="admin-navbar__left">
          <button
            className="admin-navbar__toggle"
            onClick={toggle}
            aria-label="Toggle sidebar"
            title="Toggle sidebar"
          >
            {/* Animated hamburger → arrow */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              {isOpen ? (
                // X / close lines when open on mobile; chevron-left on desktop
                <>
                  <line x1="3" y1="6"  x2="21" y2="6"  />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6"  x2="21" y2="6"  />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>

          <div className="admin-navbar__brand">
            <span className="admin-navbar__logo">🎓</span>
            <span className="admin-navbar__title">IMS Panel</span>
          </div>
        </div>

        {/* Right: Controls */}
        <div className="admin-navbar__right">
          {/* Theme Toggle */}
          <button
            className="admin-navbar__theme-btn"
            onClick={toggleTheme}
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle theme"
          >
            {isDark ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
            <span className="admin-navbar__theme-label">
              {isDark ? "Light Mode" : "Dark Mode"}
            </span>
          </button>

          {/* Profile Dropdown */}
          <div className="admin-navbar__profile" ref={dropdownRef}>
            <button
              className="admin-navbar__avatar-btn"
              onClick={() => setDropdownOpen((p) => !p)}
              aria-label="Profile menu"
            >
              <div className="admin-navbar__avatar">{initials}</div>
              <div className="admin-navbar__avatar-info">
                <span className="admin-navbar__avatar-name">{adminName}</span>
                <span className="admin-navbar__avatar-role">Administrator</span>
              </div>
              <svg className={`admin-navbar__chevron ${dropdownOpen ? "open" : ""}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {dropdownOpen && (
              <div className="admin-navbar__dropdown">
                <div className="admin-navbar__dropdown-header">
                  <div className="admin-navbar__dropdown-avatar">{initials}</div>
                  <div>
                    <p className="admin-navbar__dropdown-name">{adminName}</p>
                    <p className="admin-navbar__dropdown-email">{adminEmail}</p>
                  </div>
                </div>
                <div className="admin-navbar__dropdown-divider" />
                <button className="admin-navbar__dropdown-item" onClick={() => { toggleTheme(); setDropdownOpen(false); }}>
                  <span className="admin-navbar__dropdown-icon">{isDark ? "☀️" : "🌙"}</span>
                  {isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
                </button>
                <div className="admin-navbar__dropdown-divider" />
                <button className="admin-navbar__dropdown-item admin-navbar__dropdown-item--danger" onClick={() => { setDropdownOpen(false); setShowLogoutModal(true); }}>
                  <span className="admin-navbar__dropdown-icon">🚪</span>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <ConfirmModal
        show={showLogoutModal}
        title="Logout Confirmation"
        message="Are you sure you want to logout?"
        confirmText="Logout"
        cancelText="Cancel"
        variant="danger"
        onCancel={() => setShowLogoutModal(false)}
        onConfirm={() => { setShowLogoutModal(false); handleLogout(); }}
      />
    </>
  );
};

export default AdminNavbar;
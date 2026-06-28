import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useTheme } from "./ThemeContext";
import "./Navbar.css";

const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);

  // Close mobile menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="pub-navbar" ref={navRef}>
      {/* Left: Brand */}
      <div className="pub-navbar__brand">
        <Link to="/" className="pub-navbar__logo-link">
          <span className="pub-navbar__logo">🎓</span>
          <span className="pub-navbar__title">IMS</span>
        </Link>
      </div>

      {/* Center: Nav Links (desktop) */}
      <nav className="pub-navbar__links">
        <NavLink className={({ isActive }) => "pub-navbar__link" + (isActive ? " active" : "")} to="/" end>
          Home
        </NavLink>
        <NavLink className={({ isActive }) => "pub-navbar__link" + (isActive ? " active" : "")} to="/About">
          About
        </NavLink>
        <NavLink className={({ isActive }) => "pub-navbar__link" + (isActive ? " active" : "")} to="/Course">
          Courses
        </NavLink>
        <NavLink className={({ isActive }) => "pub-navbar__link" + (isActive ? " active" : "")} to="/Contact">
          Contact
        </NavLink>
      </nav>

      {/* Right: Controls */}
      <div className="pub-navbar__right">
        {/* Theme Toggle */}
        <button
          className="pub-navbar__theme-btn"
          onClick={toggleTheme}
          title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          aria-label="Toggle theme"
        >
          {isDark ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
          <span className="pub-navbar__theme-label">
            {isDark ? "Light Mode" : "Dark Mode"}
          </span>
        </button>

        {/* Admin Login Button */}
        <Link to="/login" className="pub-navbar__admin-btn">
          Admin
        </Link>

        {/* Mobile Hamburger */}
        <button
          className="pub-navbar__hamburger"
          onClick={() => setMenuOpen((p) => !p)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="pub-navbar__mobile-menu">
          <NavLink className={({ isActive }) => "pub-navbar__mobile-link" + (isActive ? " active" : "")} to="/" end onClick={() => setMenuOpen(false)}>
            Home
          </NavLink>
          <NavLink className={({ isActive }) => "pub-navbar__mobile-link" + (isActive ? " active" : "")} to="/About" onClick={() => setMenuOpen(false)}>
            About
          </NavLink>
          <NavLink className={({ isActive }) => "pub-navbar__mobile-link" + (isActive ? " active" : "")} to="/Course" onClick={() => setMenuOpen(false)}>
            Courses
          </NavLink>
          <NavLink className={({ isActive }) => "pub-navbar__mobile-link" + (isActive ? " active" : "")} to="/Contact" onClick={() => setMenuOpen(false)}>
            Contact
          </NavLink>
          <div className="pub-navbar__mobile-divider" />
          <button className="pub-navbar__mobile-theme" onClick={() => { toggleTheme(); setMenuOpen(false); }}>
            {isDark ? "☀️" : "🌙"} {isDark ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
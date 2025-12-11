import React from 'react'
import { Link } from "react-router-dom";
import "../styles/Navbar.css"


const Navbar = () => {
  return (
    <>
    <div>
         {/* Navbar */}
      <nav className="ims-navbar">
        <div className="logo">IMS ⛪</div>
         <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/course">Courses</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
        <div className="nav-login">
        <Link to="/login" className="login-btn">Admin</Link>
      </div>
      </nav>

    </div>
    </>
  )
}

export default Navbar

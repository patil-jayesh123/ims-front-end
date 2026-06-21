// import React from "react";
// import { Link } from "react-router-dom";

// const Navbar = () => {
//   return (
//     <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
//       <div className="container-fluid">
        
//         {/* Logo */}
//         <Link className="navbar-brand fw-bold" to="/">
//           IMS ⛪
//         </Link>

//         {/* Toggler */}
//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#imsNavbar"
//           aria-controls="imsNavbar"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>

//         {/* Links */}
//         <div className="collapse navbar-collapse" id="imsNavbar">
//           <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-lg-4 text-center">
//             <li className="nav-item">
//               <Link className="nav-link" to="/">Home</Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/course">Courses</Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/about">About</Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/contact">Contact</Link>
//             </li>
//           </ul>

//           {/* Admin Button */}
//           <div className="d-flex justify-content-center">
//             <Link to="/login" className="btn btn-warning fw-semibold">
//               Admin
//             </Link>
//           </div>
//         </div>

//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg custom-navbar sticky-top">
      <div className="container-fluid px-4 py-2">
        
        {/* Logo */}
        <Link className="navbar-brand fw-bold fs-4 d-flex align-items-center gap-2" to="/">
          <span className="logo-badge">🎓</span>
          <span className="logo-text">IMS</span>
        </Link>

        {/* Toggler */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#imsNavbar"
          aria-controls="imsNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Links */}
        <div className="collapse navbar-collapse" id="imsNavbar">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-lg-4 text-center">
            <li className="nav-item">
              <NavLink className="nav-link custom-link" to="/">Home</NavLink>
            </li>
            {/* <li className="nav-item">
              <NavLink className="nav-link custom-link" to="/course">Courses</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link custom-link" to="/about">About</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link custom-link" to="/contact">Contact</NavLink>
            </li> */}
          </ul>

          {/* Admin Button */}
          <div className="d-flex justify-content-center">
            <Link to="/login" className="btn admin-btn fw-semibold px-4">
              Admin
            </Link>
          </div>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
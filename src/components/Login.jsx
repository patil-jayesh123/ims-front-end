// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "./login.css";

// const Login = () => {
//   const navigate = useNavigate();
//   const [data, setData] = useState({ email: "", password: "" });
//   const [loading, setLoading] = useState(false);

//   const dataHandler = (e) => {
//     setData({ ...data, [e.target.name]: e.target.value });
//   };

//   const loginuser = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const res = await axios.post(
//         "https://ims-backend-p5hr.onrender.com/admin/login",
//         data
//       );
//       if (res.data.success) {
//         localStorage.setItem("token", res.data.token);
//         toast.success(res.data.message);
//         navigate("/admin/dashboard");
//       }
//     } catch (err) {
//       console.log("login failed", err);
//       toast.error(err.response?.data?.message || "Login failed ❌");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <ToastContainer position="top-right" autoClose={3000} />
//       <div className="login-container">
//         <div className="login-box">
//           <div className="login-icon">🔐</div>
//           <h2>Welcome Back</h2>
//           <p>Login to your account</p>

//           <form onSubmit={loginuser}>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={data.email}
//               onChange={dataHandler}
//               placeholder="Enter Email"
//               required
//             />

//             <input
//               type="password"
//               id="password"
//               name="password"
//               value={data.password}
//               onChange={dataHandler}
//               placeholder="Enter Password"
//               required
//             />

//             <button type="submit" className="login-btn" disabled={loading}>
//               {loading ? "Logging in..." : "Login"}
//             </button>
//           </form>

//           <div className="extra-links">
//             <Link to="/forgot">Forgot Password?</Link>
//             <Link to="/Signup">Create New Account</Link>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Login;


import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./login.css";

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const dataHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const loginuser = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        "https://ims-backend-p5hr.onrender.com/admin/login",
        data
      );
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        // Save admin info for profile display in AdminNavbar
        if (res.data.data?.name)  localStorage.setItem("adminName",  res.data.data.name);
        if (res.data.data?.email) localStorage.setItem("adminEmail", res.data.data.email);
        toast.success(res.data.message);
        navigate("/admin/dashboard");
      }
    } catch (err) {
      console.log("login failed", err);
      toast.error(err.response?.data?.message || "Login failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="login-container">
        <div className="login-box">
          <div className="login-icon">🔐</div>
          <h2>Welcome Back</h2>
          <p>Login to your account</p>

          <form onSubmit={loginuser}>
            <input
              type="email"
              id="email"
              name="email"
              value={data.email}
              onChange={dataHandler}
              placeholder="Enter Email"
              required
            />
            <input
              type="password"
              id="password"
              name="password"
              value={data.password}
              onChange={dataHandler}
              placeholder="Enter Password"
              required
            />
            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="extra-links">
            <Link to="/forgot">Forgot Password?</Link>
            <Link to="/Signup">Create New Account</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
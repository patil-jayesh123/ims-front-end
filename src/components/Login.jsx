import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ email: "", password: "" });

  const dataHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const loginuser = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://ims-backend-p5hr.onrender.com/admin/login",
        data
      );
      if (res.data.success) {
        alert(res.data.message);
        localStorage.setItem("token", res.data.token);
        navigate("/admin/dashboard");
      }
    } catch (err) {
      console.log("login failed", err);
      alert(err.response?.message || "Login failed ❌");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-gradient">
      <div className="card p-4 shadow" style={{ maxWidth: "400px", width: "100%" }}>
        {/* <h2 className="text-center mb-2">Welcome Back</h2> */}
        <p className="text-center text-muted mb-4">Login to your account</p>

        <form onSubmit={loginuser}>
          <div className="mb-3">
            <input
              type="email"
              id="email"
              name="email"
              value={data.email}
              onChange={dataHandler}
              placeholder="Enter Email"
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              id="password"
              name="password"
              value={data.password}
              onChange={dataHandler}
              placeholder="Enter Password"
              className="form-control"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 mb-3">
            Login
          </button>
        </form>

        <div className="d-flex justify-content-between">
          <Link to="/forgot" className="small text-decoration-none">
            Forgot Password?
          </Link>
          <Link to="/Signup" className="small text-decoration-none">
            Create New Account
          </Link>
        </div>
      </div>
    </div>
  );
};

// Optional gradient background CSS
const styles = document.createElement("style");
styles.innerHTML = `
  .bg-gradient {
    background: linear-gradient(to right, #667eea, #764ba2);
  }
  .btn-primary:hover {
    background-color: #5a67d8;
  }
  .form-control:focus {
    border-color: #667eea;
    box-shadow: 0 0 5px rgba(102, 126, 234, 0.5);
  }
`;
document.head.appendChild(styles);

export default Login;

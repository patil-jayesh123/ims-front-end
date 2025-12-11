import React from "react";
import "../styles/Login.css";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ email: "", password: "" });

  const dataHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const loginuser = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://ims-backend-p5hr.onrender.com/admin/login", data);
      if (res.data.success) {
        alert(res.data.message);
        console.log(res.data.data);
        // save token in localStorage
        localStorage.setItem("token", res.data.token);
        //redirect to dashbord
        navigate("/admin/dashboard");
        console.log(res.data);
      }
    } catch (err) {
      console.log("login failed", err);
      alert(err.response?.message || "login failed ❌");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
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

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        <div className="extra-links">
          <Link to="/forgot">Forgot Password?</Link>
          <Link to="/Signup">Create New Account</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

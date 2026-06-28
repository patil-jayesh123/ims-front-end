import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import "../styles/Signup.css";

const Signup = () => {
  const [data, setData] = useState({ name: "", email: "", password: "", secreteKey: "" });
  const [loading, setLoading] = useState(false);

  const dataHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const registeradmin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        "https://ims-backend-p5hr.onrender.com/admin/register",
        data
      );
      toast.success(res.data.message || "Account created successfully");
      setData({ name: "", email: "", password: "", secreteKey: "" });
      window.location.assign("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to register user");
      console.log("failed to register user", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">

        {/* Header */}
        <div className="signup-icon">🎓</div>
        <h2>Create Account</h2>
        <p>Join EduMaster Institute</p>

        <form onSubmit={registeradmin}>
          <div className="signup-field">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={data.name}
              onChange={dataHandler}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="signup-field">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={data.email}
              onChange={dataHandler}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="signup-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={data.password}
              onChange={dataHandler}
              placeholder="Enter password"
              required
            />
          </div>

          <button type="submit" className="signup-btn" disabled={loading}>
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <div className="signup-links">
          <p>
            Already have an account?{" "}
            <Link to="/login">Login</Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Signup;
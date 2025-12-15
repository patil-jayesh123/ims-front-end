import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Signup = () => {
  const [data, setData] = useState({ name: "", email: "", password: "" });

  const dataHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const registeradmin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://ims-backend-p5hr.onrender.com/admin/register",
        data
      );

      alert(res.data.message);
      setData({ name: "", email: "", password: "" });
      window.location.assign("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to register user");
      console.log("failed to register user", err);
    }
  };

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="card p-4 shadow-sm w-100" style={{ maxWidth: "400px" }}>
        <h2 className="card-title text-center mb-3">Create Account</h2>
        <p className="text-center text-muted mb-4">Join EduMaster Institute</p>

        <form onSubmit={registeradmin}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={data.name}
              onChange={dataHandler}
              className="form-control"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={data.email}
              onChange={dataHandler}
              className="form-control"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={data.password}
              onChange={dataHandler}
              className="form-control"
              placeholder="Enter password"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 mb-3">
            Sign Up
          </button>
        </form>

        <div className="text-center">
          <p className="mb-0">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;

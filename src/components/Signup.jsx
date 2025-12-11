import React from "react";
import "../styles/Signup.css";
import { useState } from "react";
import axios from 'axios'

const Signup = () => {
  const [data, setData] = useState({ name: "", email: "", password: "" });

  const dataHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const registeradmin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:2000/admin/register", data);

      alert(res.data.message); // success message
      console.log(data);
      setData({ name: "", email: "", password: "" });
      window.location.assign("/login");

    } catch (err) {
      // Yeh line important hai (backend message alert me show karega)
      alert(err.response?.data?.message || "Failed to register user");

      console.log("failed to register user", err);
    }
  };

  //-----------------------------------------------------------------------------
  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Create Account</h2>
        <p>Join EduMaster Institute</p>

        <form onSubmit={(e)=>registeradmin(e)}>
          <input
            type="text"
            id="name"
            name="name"
            value={data.name}
            onChange={(e)=>dataHandler(e)}
            placeholder="Full Name"
            required
          />
          <input
            type="email"
            id="email"
            name="email"
            value={data.email}
            onChange={(e)=>dataHandler(e)}
            placeholder="Email Address"
            required
          />
          <input
            type="password"
            id="password"
            name="password"
            value={data.password}
            onChange={(e)=>dataHandler(e)}
            placeholder="Password"
            required
          />

          <button type="submit" className="signup-btn">
            Sign Up
          </button>
        </form>

        <div className="signup-links">
          <p>
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;

import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import "../styles/Signup.css";

const Signup = () => {
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

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
      setData({ name: "", email: "", password: "" });
      window.location.assign("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to register user");
      console.log("failed to register user", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">

      {/* ── Left panel — branding ── */}
      <div className="auth-brand-panel">
        <div className="auth-brand-inner">
          <div className="auth-brand-logo">🎓</div>
          <h1 className="auth-brand-title">EduMaster IMS</h1>
          <p className="auth-brand-sub">
            Create your admin account and start managing your institution.
          </p>
          <div className="auth-brand-features">
            <div className="auth-feature">✅ Secure admin access</div>
            <div className="auth-feature">✅ Manage student records</div>
            <div className="auth-feature">✅ Staff &amp; course control</div>
            <div className="auth-feature">✅ Real-time dashboard</div>
          </div>
        </div>
      </div>

      {/* ── Right panel — form ── */}
      <div className="auth-form-panel">
        <div className="signup-box">
          <div className="signup-icon">🎓</div>
          <h2>Create Account</h2>
          <p>Join EduMaster as an administrator</p>

          <form onSubmit={registeradmin} noValidate>
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
                autoComplete="name"
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
                placeholder="admin@example.com"
                required
                autoComplete="email"
              />
            </div>

            <div className="signup-field">
              <label htmlFor="password">Password</label>
              <div className="auth-pwd-wrapper">
                <input
                  type={showPwd ? "text" : "password"}
                  id="password"
                  name="password"
                  value={data.password}
                  onChange={dataHandler}
                  placeholder="Create a strong password"
                  required
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="auth-pwd-toggle"
                  onClick={() => setShowPwd(!showPwd)}
                  tabIndex={-1}
                >
                  {showPwd ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            <button type="submit" className="signup-btn" disabled={loading}>
              {loading ? <span className="auth-spinner" /> : "Create Account"}
            </button>
          </form>

          <div className="signup-links">
            <p>
              Already have an account?{" "}
              <Link to="/login">Sign In</Link>
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Signup;
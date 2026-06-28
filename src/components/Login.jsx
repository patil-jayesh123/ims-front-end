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
  const [showPwd, setShowPwd] = useState(false);

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
      <div className="auth-page">

        {/* ── Left panel — branding ── */}
        <div className="auth-brand-panel">
          <div className="auth-brand-inner">
            <div className="auth-brand-logo">🎓</div>
            <h1 className="auth-brand-title">EduMaster IMS</h1>
            <p className="auth-brand-sub">
              Manage students, staff, and courses — all in one place.
            </p>
            <div className="auth-brand-features">
              <div className="auth-feature">✅ Student records management</div>
              <div className="auth-feature">✅ Staff directory</div>
              <div className="auth-feature">✅ Course catalogue</div>
              <div className="auth-feature">✅ Real-time dashboard</div>
            </div>
          </div>
        </div>

        {/* ── Right panel — form ── */}
        <div className="auth-form-panel">
          <div className="login-box">
            <div className="login-icon">🔐</div>
            <h2>Welcome Back</h2>
            <p>Sign in to your admin account</p>

            <form onSubmit={loginuser} noValidate>
              <div className="auth-field">
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

              <div className="auth-field">
                <label htmlFor="password">Password</label>
                <div className="auth-pwd-wrapper">
                  <input
                    type={showPwd ? "text" : "password"}
                    id="password"
                    name="password"
                    value={data.password}
                    onChange={dataHandler}
                    placeholder="Enter your password"
                    required
                    autoComplete="current-password"
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

              <button type="submit" className="login-btn" disabled={loading}>
                {loading ? (
                  <span className="auth-spinner" />
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            <div className="extra-links">
              <Link to="/forgot">Forgot Password?</Link>
              <Link to="/Signup">Create Account</Link>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default Login;
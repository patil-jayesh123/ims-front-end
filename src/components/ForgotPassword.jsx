import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://ims-backend-p5hr.onrender.com/admin/forgot-password",
        { email }
      );
      alert(res.data.msg || "Check response");
      if (res.data.resetURL) alert("Dev reset URL: " + res.data.resetURL);
    } catch (err) {
      alert("Error");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-gradient">
      <div
        className="card shadow p-4"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h2 className="text-center mb-3">Forgot Password</h2>
        <p className="text-center text-muted mb-4">
          Enter your email to receive a password reset link
        </p>

        <form onSubmit={submit}>
          <div className="mb-3">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Send Reset Link
          </button>
          <p className="mb-0">
            I have a password? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

// Optional: add a gradient background with CSS
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

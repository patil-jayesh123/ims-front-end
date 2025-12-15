import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Staffform = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ name: "", department: "", email: "" });

  const dataHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const registerstaff = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://ims-backend-p5hr.onrender.com/admin/registerstaff",
        data
      );
      alert("Staff added successfully");
      setData({ name: "", department: "", email: "" });
      navigate("/admin/staff");
    } catch (err) {
      console.log("Failed to register: " + err);
      alert("Failed to register staff");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow" style={{ maxWidth: "500px", width: "100%" }}>
        <h2 className="text-center mb-3">Staff Registration</h2>

        <form onSubmit={registerstaff}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={data.name}
              onChange={dataHandler}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="department" className="form-label">
              Department:
            </label>
            <input
              type="text"
              id="department"
              name="department"
              value={data.department}
              onChange={dataHandler}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={data.email}
              onChange={dataHandler}
              className="form-control"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Register
          </button>
          <p>I don't want to add staff <Link to="/admin/staff">click here</Link></p>
        </form>
      </div>
    </div>
  );
};

export default Staffform;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Studentform = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({ name: "", rollNo: "", course: "" });

  const dataHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const registeruser = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://ims-backend-p5hr.onrender.com/admin/registeruser",
        data
      );
      alert("Student added successfully");
      setData({ name: "", rollNo: "", course: "" });
      navigate("/admin/student");
    } catch (err) {
      console.log("Failed to register: " + err);
      alert("Failed to register student");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow" style={{ maxWidth: "500px", width: "100%" }}>
        <h2 className="text-center mb-3">Student Registration</h2>

        <form onSubmit={registeruser}>
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
            <label htmlFor="rollNo" className="form-label">
              Roll Number:
            </label>
            <input
              type="text"
              id="rollNo"
              name="rollNo"
              value={data.rollNo}
              onChange={dataHandler}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="course" className="form-label">
              Course:
            </label>
            <input
              type="text"
              id="course"
              name="course"
              value={data.course}
              onChange={dataHandler}
              className="form-control"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Register
          </button>
          <p>I don't want to add student <Link to="/admin/student">click here</Link></p>
        </form>
      </div>
    </div>
  );
};

export default Studentform;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Courseform = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ name: "", duration: "", instructor: "" });

  const dataHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const savecourse = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://ims-backend-p5hr.onrender.com/admin/savecourse", data);
      alert("Course added successfully");
      setData({ name: "", duration: "", instructor: "" });
      navigate("/admin/courses");
    } catch (err) {
      console.log(err);
      alert("Failed to add course");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow" style={{ maxWidth: "500px", width: "100%" }}>
        <h2 className="text-center mb-4">Add New Course</h2>

        <form onSubmit={savecourse}>
          {/* Course Name */}
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Course Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={data.name}
              onChange={dataHandler}
              className="form-control"
              placeholder="Enter course name"
              required
            />
          </div>

          {/* Course Duration */}
          <div className="mb-3">
            <label htmlFor="duration" className="form-label">
              Course Duration
            </label>
            <input
              type="text"
              id="duration"
              name="duration"
              value={data.duration}
              onChange={dataHandler}
              className="form-control"
              placeholder="e.g., 3 Months"
              required
            />
          </div>

          {/* Instructor */}
          <div className="mb-3">
            <label htmlFor="instructor" className="form-label">
              Instructor Name
            </label>
            <input
              type="text"
              id="instructor"
              name="instructor"
              value={data.instructor}
              onChange={dataHandler}
              className="form-control"
              placeholder="Enter instructor name"
              required
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-100">
            Submit Course
          </button>
          <p>I don't want to add a course <Link to="/admin/courses">click here</Link></p>
        </form>
      </div>
    </div>
  );
};

export default Courseform;

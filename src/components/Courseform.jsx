import React, { useState } from "react";
import "../styles/Courseform.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Courseform = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ name: "", duration: "", instructor: "" });

  const dataHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const savecourse = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:2000/admin/savecourse", data);
      alert("course added successfully");
      console.log(data);
      setData({ name: "", duration: "", instructor: "" });
      navigate("/admin/courses");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="course-container">
      <form className="course-form" onSubmit={(e) => savecourse(e)}>
        <h2 className="form-title">Add New Course</h2>

        {/* Course Name */}
        <div className="form-group">
          <label>Course Name</label>
          <input
            type="text"
            placeholder="Enter course name"
            id="name"
            name="name"
            value={data.name}
            onChange={(e) => dataHandler(e)}
          />
        </div>

        {/* Course Duration */}
        <div className="form-group">
          <label>Course Duration</label>
          <input
            type="text"
            placeholder="e.g., 3 Months"
            id="duration"
            name="duration"
            value={data.duration}
            onChange={(e) => dataHandler(e)}
          />
        </div>

        {/* Instructor */}
        <div className="form-group">
          <label>Instructor Name</label>
          <input
            type="text"
            placeholder="Enter instructor name"
            id="instructor"
            name="instructor"
            value={data.instructor}
            onChange={(e) => dataHandler(e)}
          />
        </div>

        {/* Button */}
        <button className="submit-btn">Submit Course</button>
      </form>
    </div>
  );
};

export default Courseform;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

//------------------------------------------------------------

const EditStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    rollNo: "",
    course: "",
  });

  // Fetch student data
  const fetchStudent = async () => {
    try {
      const res = await axios.get(`http://localhost:2000/admin/student/${id}`);
      setData(res.data.student);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchStudent();
  }, []);

  //------------------------------------------------------------
  const dataHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  //------------------------------------------------------------
  // Update API
  const updateStudent = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:2000/admin/update/${id}`, data);
      alert("Student updated successfully");
      navigate("/admin/student");
    } catch (err) {
      console.log(err);
      alert("Failed to update");
    }
  };
//------------------------------------------------------------
  return (
    <div className="student-form-container">
      <h2>Student Registration</h2>
      {/* 5 */}

      <form onSubmit={(e) => updateStudent(e)}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={data.name}
            onChange={(e) => dataHandler(e)}
            required
          />
        </div>

        <div className="form-group">
          <label>Roll Number:</label>
          <input
            type="text"
            id="rollNo"
            name="rollNo"
            value={data.rollNo}
            onChange={(e) => dataHandler(e)}
            required
          />
        </div>

        <div className="form-group">
          <label>Course:</label>
          <input
            type="text"
            id="course"
            name="course"
            value={data.course}
            onChange={(e) => dataHandler(e)}
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          Register
        </button>
      </form>
    </div>
  );
};

export default EditStudent;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

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
      const res = await axios.get(`https://ims-backend-p5hr.onrender.com/admin/student/${id}`);
      setData(res.data.student);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchStudent();
  }, []);

  const dataHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const updateStudent = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://ims-backend-p5hr.onrender.com/admin/update/${id}`, data);
      alert("Student updated successfully");
      navigate("/admin/student");
    } catch (err) {
      console.log(err);
      alert("Failed to update");
    }
  };

  return (
    <div className="container mt-5">
      {/* <Sidebar /> */}
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card p-4 shadow-sm">
            <h2 className="mb-4 text-center">Update Student</h2>

            <form onSubmit={updateStudent}>
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
                Update Student
              </button><br/>
              <p>I don't want to update student <Link to="/admin/student">click here</Link></p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditStudent;

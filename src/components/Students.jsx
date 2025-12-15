import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";

function Students() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const result = await axios.get(
        "https://ims-backend-p5hr.onrender.com/admin/student",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setData(result.data);
    } catch (err) {
      console.log("Failed to fetch data", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteStudent = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      const token = localStorage.getItem("token");
      try {
        await axios.delete(`https://ims-backend-p5hr.onrender.com/admin/delete/${id}`, {
          headers: { "x-token": token },
        });
        alert("Student deleted successfully");
        fetchData();
      } catch (err) {
        console.log(err);
        alert("Failed to delete student");
      }
    }
  };

  const filteredData = data.filter((student) =>
    (student?.name || "").toLowerCase().includes((search || "").toLowerCase())
  );

  return (
    <div className="container">
      <div className="row">
        {/* Sidebar */}
        <div className="col-12 col-md-3 col-lg-2 p-0 bg-light">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="col-12 col-md-9 col-lg-10 p-4">
          <h1 className="mb-4">Student Management</h1>

          {/* Top Bar */}
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-3 gap-2">
            <input
              type="text"
              className="form-control w-100 w-md-50"
              placeholder="Search student..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Link to="/admin/studentform" className="btn btn-primary">
              + Add Student
            </Link>
          </div>

          {/* Student Table */}
          <div className="table-responsive">
            <table className="table table-bordered table-hover">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Course</th>
                  <th>Roll No.</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredData.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center">
                      Data Not Found
                    </td>
                  </tr>
                ) : (
                  filteredData.map((val, index) => (
                    <tr key={val._id}>
                      <td>{index + 1}</td>
                      <td>{val.name}</td>
                      <td>{val.course}</td>
                      <td>{val.rollNo}</td>
                      <td className="d-flex gap-2">
                        <button
                          className="btn btn-sm btn-warning"
                          onClick={() => navigate(`/admin/editstudent/${val._id}`)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => deleteStudent(val._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Students;

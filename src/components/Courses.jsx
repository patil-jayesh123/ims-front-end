import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function Courses() {
  const navigate = useNavigate();
  //search course
  const [search, setSearch] = useState("");
  //read data
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const result = await axios.get(
        "https://ims-backend-p5hr.onrender.com/admin/courses",
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

  //search course

  const filteredData = data.filter((course) =>
    (course?.name || "").toLowerCase().includes((search || "").toLowerCase())
  );

  //delete course
  const deletecourse=async(id)=>{
    if(window.confirm("are you sure you want to delete this course")){
      const token = localStorage.getItem("token")
      try{
        await axios.delete(`https://ims-backend-p5hr.onrender.com/admin/coursedelete/${id}`,{
          headers:{"x-token":token}
        })
        fetchData()
      }catch(err){
        console.log(err);
        alert("failed to delete")       
      }
    }
  }

  return (
    <div className="container">
      <div className="row">
        {/* Sidebar */}
        <div className="col-12 col-md-3 col-lg-2 p-0 bg-light">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="col-12 col-md-9 col-lg-10 p-4">
          <h1 className="mb-4">Courses Management</h1>

          {/* Top Bar */}
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-3 gap-2">
            <input
              type="text"
              className="form-control w-100 w-md-50"
              placeholder="Search course..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              className="btn btn-primary"
              onClick={() => navigate("/admin/courseform")}
            >
              + Add Course
            </button>
          </div>

          {/* Courses Table */}
          <div className="table-responsive">
            <table className="table table-bordered table-hover">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Course Name</th>
                  <th>Duration</th>
                  <th>Instructor</th>
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
                    <tr key={val._id || index}>
                      <td>{index + 1}</td>
                      <td>{val.name}</td>
                      <td>{val.duration}</td>
                      <td>{val.instructor}</td>
                      <td className="d-flex gap-2">
                        <button className="btn btn-sm btn-warning">Edit</button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => deletecourse(val._id)}
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

export default Courses;

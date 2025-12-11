import React, { useEffect } from "react";
import "../styles/Students.css";
import Sidebar from "./Sidebar";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Students() {
  const navigate = useNavigate();

  //--------read student-------------------------------------------------------------
  const [data, setData] = useState([]);

  //search ke liye state
  const [search, setsearch] = useState();

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token"); // token must be stored at login
      console.log("Token milaa:", token);

      const result = await axios.get("http://127.0.0.1:2000/admin/student", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(result.data);
      console.log("student data fetch successfully");
      setData(result.data);
    } catch (err) {
      console.log("failed to fetch data", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  //------------------delete student------------------------------------------------------
  const deletestudent = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      const token = localStorage.getItem("token");
      try {
        await axios.delete(`http://localhost:2000/admin/delete/${id}`, {
          headers: {
            "x-token": token,
          },
        });
        alert("student delete sucessfully");

        fetchData();
      } catch (err) {
        console.log(err);
        alert("faile to delete");
      }
    }
  };

  //filter search logic
  const filtereData = data.filter((Student) => {
    const searchText = (search || "").toLowerCase();
    const name = (Student?.name || "").toLowerCase();
    return name.includes(searchText);
  });
  //----------------------------------------------------------------

  return (
    <div className="app-container">
      {/* flex container */}
      <Sidebar />
      <div className="student-container">
        <h1>Student Management</h1>

        <div className="top-bar">
          <input
            type="text"
            placeholder="Search student..."
            value={search}
            onChange={(e) => setsearch(e.target.value)}
          />
          <Link to={"/admin/studentform"}>
            <button className="add-btn">+ Add Student</button>
          </Link>
        </div>

        <table className="student-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Course</th>
              <th>Roll No.</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filtereData.length === 0 ? (
              <tr>
                <td colSpan="2"></td>
                <td>Data Not Found</td>
              </tr>
            ) : (
              filtereData.map((val, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{val.name}</td>
                    <td>{val.course}</td>
                    <td>{val.rollNo}</td>
                    <td>
                      <button
                        //edite ke liye dusre page pr jayegi
                        onClick={() =>
                          navigate(`/admin/editstudent/${val._id}`)
                        }
                        className="edit"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deletestudent(val._id)}
                        className="delete"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Students;

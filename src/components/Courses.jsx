import React, { useEffect } from "react";
import "../styles/Courses.css";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Courses() {
  const navigate = useNavigate();

  //search ke liye
  const [search, setsearch] = useState();

  const editehandler = () => {
    navigate("/admin/courseform");
  };

  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("token mila", token);

      const result = await axios.get("http://127.0.0.1:2000/admin/courses", {
        headers: { Authorization: `Bearer ${token}` },
      });

      // console.log(result.data);
      console.log("data fetch successfully", data);
      console.log(result.data);
      setData(result.data);
    } catch (err) {
      console.log("failed to fetch data", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filtereData = data.filter((Courses) => {
    const searchText = (search || "").toLowerCase();
    const name = (Courses?.name || "").toLowerCase();
    return name.includes(searchText);
  });

  //---------------------------------------------------

  return (
    <div className="courses-container">
      <Sidebar />

      <div className="courses-content">
        <h1>Courses Management</h1>

        <div className="top-bar">
          <input
            type="text"
            placeholder="Search course..."
            value={search}
            onChange={(e) => setsearch(e.target.value)}
          />
          <button className="add-btn" onClick={() => editehandler()}>
            + Add Course
          </button>
        </div>

        <table className="courses-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Course Name</th>
              <th>Duration</th>
              <th>Instructor</th>
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
                    <td>{val.duration}</td>
                    <td>{val.instructor}</td>
                    <td>
                      <button className="edit">Edit</button>
                      <button className="delete">Delete</button>
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

export default Courses;

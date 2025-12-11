import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import "../styles/Staff.css";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

function Staff() {
  const navigate = useNavigate();
  const editehandler = () => {
    navigate("/admin/staffform");
  };

  //-------------------red staff--------------------------
  const [data, setData] = useState([]);

  //surch ke liye
  const [search, setsearch] = useState();
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("token milla", token);

      const result = await axios.get("https://ims-backend-p5hr.onrender.com/admin/staff", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(result.data);
      console.log("staff data fetch succeffuly");
      setData(result.data);
    } catch (err) {
      console.log("failed to fetch data", err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  //---------------delete staff-----------------------------
  const deletestaff = async (id) => {
    if (window.confirm("are you sure you wnt to delete this staff member")) {
      const token = localStorage.getItem("token");
      try {
        await axios.delete(`https://ims-backend-p5hr.onrender.com/admin/staffdelete/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        alert("staff member delete successfully");
        fetchData();
      } catch (err) {
        console.log(err);
        alert("failed to delete");
      }
    }
  };

  //filter search logic
  const filtereData = data.filter((Staff) => {
    const searchText = (search || "").toLowerCase();
    const name = (Staff?.name || "").toLowerCase();
    return name.includes(searchText);
  });

  //--------------------------------------------------------------
  return (
    <div className="staff-container">
      <Sidebar />

      <div className="staff-content">
        <h1>Staff Management</h1>

        <div className="top-bar">
          <input
            type="text"
            placeholder="Search staff..."
            value={search}
            onChange={(e) => setsearch(e.target.value)}
          />
          <button className="add-btn" onClick={() => editehandler()}>
            + Add Staff
          </button>
        </div>

        <table className="staff-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Department</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filtereData.length===0?(
              <tr>
                <td colSpan="2"></td>
                <td>Data Not Found</td>
              </tr>
            ):(
            filtereData.map((val, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{val.name}</td>
                  <td>{val.department}</td>
                  <td>{val.email}</td>
                  <td>
                    <NavLink to={`/admin/editstaff/${val._id}`}>
                      <button className="edit">Edit</button>
                    </NavLink>
                    <button
                      onClick={() => deletestaff(val._id)}
                      className="delete"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            }))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Staff;

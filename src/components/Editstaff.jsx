import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Editstaff = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    department: "",
    email: "",
  });

  // Fetch staff data
  const fetchStaff = async () => {
    try {
      const res = await axios.get(`https://ims-backend-p5hr.onrender.com/admin/staff/${id}`);
      setData(res.data.staff);
    } catch (err) {
      console.log("Data fetch failed", err);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const dataHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const updateStaff = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://ims-backend-p5hr.onrender.com/admin/updatestaff/${id}`, data);
      alert("Staff updated successfully");
      navigate("/admin/staff");
    } catch (err) {
      console.log("Failed to update", err);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card p-4 shadow-sm">
            <h2 className="mb-4 text-center">Update Staff</h2>

            <form onSubmit={updateStaff}>
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
                <label htmlFor="department" className="form-label">
                  Department:
                </label>
                <input
                  type="text"
                  id="department"
                  name="department"
                  value={data.department}
                  onChange={dataHandler}
                  className="form-control"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={data.email}
                  onChange={dataHandler}
                  className="form-control"
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Update Staff
              </button>
              <p>I don't want to update staff <Link to="/admin/staff">click here</Link></p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editstaff;

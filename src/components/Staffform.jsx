import React, { useState } from "react";
import axios from "axios";
import "../styles/Studentform.css";

const Staffform = ({ onClose, onSuccess }) => {
  const [data, setData] = useState({ name: "", department: "", email: "" });
  const [submitting, setSubmitting] = useState(false);

  const dataHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const registerstaff = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.post(
        "https://ims-backend-p5hr.onrender.com/admin/registerstaff",
        data
      );
      setData({ name: "", department: "", email: "" });
      onSuccess ? onSuccess() : onClose && onClose();
    } catch (err) {
      console.log("Failed to register: " + err);
      alert("Failed to register staff");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="sf-overlay" onClick={onClose}>
      <div className="sf-modal" onClick={(e) => e.stopPropagation()}>
        <button className="sf-close" onClick={onClose} aria-label="Close">
          &times;
        </button>

        <div className="sf-header">
          <h2>Add New Staff</h2>
          <p>Fill in the details below to register a staff member</p>
        </div>

        <form onSubmit={registerstaff} className="sf-form">
          <div className="sf-field">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="e.g. Priya Mehta"
              value={data.name}
              onChange={dataHandler}
              required
            />
          </div>

          <div className="sf-field">
            <label htmlFor="department">Department</label>
            <input
              type="text"
              id="department"
              name="department"
              placeholder="e.g. Administration"
              value={data.department}
              onChange={dataHandler}
              required
            />
          </div>

          <div className="sf-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="e.g. priya@example.com"
              value={data.email}
              onChange={dataHandler}
              required
            />
          </div>

          <div className="sf-actions">
            <button
              type="button"
              className="sf-btn sf-btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="sf-btn sf-btn-primary"
              disabled={submitting}
            >
              {submitting ? "Adding..." : "Add Staff"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Staffform;
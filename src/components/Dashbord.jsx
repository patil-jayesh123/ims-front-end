import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Dashboard.css";
import Sidebar from "./Sidebar";

const Dashboard = ({ studentData = [], staffdata = [] }) => {
  return (
    <div className="dashboard-container d-flex flex-column flex-lg-row">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main Dashboard */}
      <main className="main-content flex-grow-1 p-4">
        
        {/* Header */}
        <header className="dashboard-header mb-4 text-center text-lg-start">
          <h1 className="display-5">Welcome Admin 👋</h1>
          <p className="lead">Institute Management Dashboard</p>
        </header>

        {/* Stats Cards */}
        <section className="stats-grid mb-5">
          <div className="row g-3">
            <div className="col-6 col-md-3">
              <div className="card text-center shadow-sm h-100">
                <div className="card-body">
                  <h3>{studentData.length || 0}</h3>
                  <p>Total Students</p>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="card text-center shadow-sm h-100">
                <div className="card-body">
                  <h3>15</h3>
                  <p>Active Courses</p>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="card text-center shadow-sm h-100">
                <div className="card-body">
                  <h3>{staffdata.length || 0}</h3>
                  <p>Staff Members</p>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="card text-center shadow-sm h-100">
                <div className="card-body">
                  <h3>5</h3>
                  <p>New Admissions</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Recent Activity */}
        <section className="activity-section">
          <h2 className="mb-3">Recent Activity</h2>
          <ul className="list-group">
            <li className="list-group-item">✔ New Student Registered</li>
            <li className="list-group-item">✔ Course Updated: Full Stack Dev</li>
            <li className="list-group-item">✔ Added New Staff Member</li>
            <li className="list-group-item">✔ Updated Fee Structure</li>
          </ul>
        </section>

      </main>
    </div>
  );
};

export default Dashboard;

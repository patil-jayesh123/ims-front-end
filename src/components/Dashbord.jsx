import React, { useState } from "react";
import "../styles/Dashboard.css";
import Sidebar from "./Sidebar";
import { data, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

const Dashboard = ({studentData=[], staffdata=[]}) => {

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Dashboard */}
      <main className="main-content">
        <header className="dashboard-header">
          <h1>Welcome Admin 👋</h1>
          <p>Institute Management Dashboard</p>
        </header>

        {/* Stats Cards */}
        <section className="stats-grid">
          <div className="stat-card">
            <h3>{studentData.length || 0}</h3>
            <p>Total Students</p>
          </div>
          <div className="stat-card">
            <h3>15</h3>
            <p>Active Courses</p>
          </div>
          <div className="stat-card">
            <h3>{staffdata.length || 0}</h3>
            <p>Staff Members</p>
          </div>
          <div className="stat-card">
            <h3>5</h3>
            <p>New Admissions</p>
          </div>
        </section>

        {/* Recent Activity */}
        <section className="activity-section">
          <h2>Recent Activity</h2>
          <ul>
            <li>✔ New Student Registered</li>
            <li>✔ Course Updated: Full Stack Dev</li>
            <li>✔ Added New Staff Member</li>
            <li>✔ Updated Fee Structure</li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;

import React from "react";
import "../styles/Home.css";

const Home = () => {
  return (
    <div className="ims-home">
      {/* Hero Section */}
      <section className="ims-hero">
        <div className="hero-content">
          <h1>Institute Management System</h1>
          <p>
            Simplify administration, empower learning, and manage your entire
            institute with ease.
          </p>
          <button className="primary-btn">Get Started</button>
          <button className="outline-btn">Learn More</button>
        </div>

        <div className="hero-image">
          <img
            src="ims.avif"
            alt="Institute Management"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="ims-features">
        <h2>Why Choose Our System?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Student Management</h3>
            <p>Track admissions, attendance, performance and more.</p>
          </div>

          <div className="feature-card">
            <h3>Staff Management</h3>
            <p>Manage teachers, roles, salaries and work schedules.</p>
          </div>

          <div className="feature-card">
            <h3>Course & Timetable</h3>
            <p>Create courses, arrange classes and smart schedules effortlessly.</p>
          </div>

          <div className="feature-card">
            <h3>Online Fee Portal</h3>
            <p>Automated fee reminders, payments and receipts.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="ims-footer">
        © 2025 EduMaster Institute — All Rights Reserved
      </footer>
    </div>
  );
};

export default Home;

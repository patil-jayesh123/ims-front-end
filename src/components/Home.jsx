import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Home.css";

const Home = () => {
  const features = [
    {
      icon: "👨‍🎓",
      title: "Student Management",
      text: "Track admissions, attendance, performance and more.",
    },
    {
      icon: "🧑‍🏫",
      title: "Staff Management",
      text: "Manage teachers, roles, salaries and work schedules.",
    },
    {
      icon: "📚",
      title: "Course & Timetable",
      text: "Create courses, arrange classes and smart schedules effortlessly.",
    },
    {
      icon: "💳",
      title: "Online Fee Portal",
      text: "Automated fee reminders, payments and receipts.",
    },
  ];

  return (
    <div className="ims-home">

      {/* Hero Section */}
      <section className="ims-hero py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 mb-4 mb-md-0">
              <span className="ims-badge">Institute Management Made Simple</span>
              <h1 className="display-5 fw-bold mt-3">Institute Management System</h1>
              <p className="lead text-secondary">
                Simplify administration, empower learning, and manage your entire
                institute with ease.
              </p>
              <div className="d-flex gap-2 flex-wrap mt-4">
                <button className="btn ims-btn-primary">Get Started</button>
                <button className="btn ims-btn-outline">Learn More</button>
              </div>
            </div>

            <div className="col-md-6 text-center">
              <img
                src="/ims.avif"
                alt="Institute Management"
                className="img-fluid rounded-4 ims-hero-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="ims-features py-5">
        <div className="container">
          <h2 className="text-center fw-bold mb-2">Why Choose Our System?</h2>
          <p className="text-center text-secondary mb-5">
            Everything you need to run your institute, in one place
          </p>
          <div className="row g-4">
            {features.map((f, i) => (
              <div className="col-sm-6 col-lg-3" key={i}>
                <div className="card h-100 text-center p-3 ims-feature-card">
                  <div className="card-body">
                    <div className="ims-feature-icon">{f.icon}</div>
                    <h5 className="card-title fw-semibold">{f.title}</h5>
                    <p className="card-text text-secondary">{f.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="ims-footer py-4 text-center">
        © 2025 EduMaster Institute — All Rights Reserved
      </footer>
    </div>
  );
};

export default Home;
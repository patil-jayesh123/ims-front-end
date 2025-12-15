import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "../styles/Home.css"; // Optional custom CSS

const Home = () => {
  return (
    <div className="ims-home">

      {/* Hero Section */}
      <section className="ims-hero py-5 bg-light">
        <div className="container">
          <div className="row align-items-center">
            {/* Text Content */}
            <div className="col-md-6 mb-4 mb-md-0">
              <h1 className="display-4">Institute Management System</h1>
              <p className="lead">
                Simplify administration, empower learning, and manage your entire
                institute with ease.
              </p>
              <div className="d-flex gap-2 flex-wrap">
                <button className="btn btn-primary">Get Started</button>
                <button className="btn btn-outline-primary">Learn More</button>
              </div>
            </div>

            {/* Hero Image */}
            <div className="col-md-6 text-center">
              <img
                src="ims.avif"
                alt="Institute Management"
                className="img-fluid rounded"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="ims-features py-5">
        <div className="container">
          <h2 className="text-center mb-5">Why Choose Our System?</h2>
          <div className="row g-4">
            <div className="col-sm-6 col-lg-3">
              <div className="card h-100 text-center p-3 border-0 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Student Management</h5>
                  <p className="card-text">
                    Track admissions, attendance, performance and more.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-lg-3">
              <div className="card h-100 text-center p-3 border-0 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Staff Management</h5>
                  <p className="card-text">
                    Manage teachers, roles, salaries and work schedules.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-lg-3">
              <div className="card h-100 text-center p-3 border-0 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Course & Timetable</h5>
                  <p className="card-text">
                    Create courses, arrange classes and smart schedules effortlessly.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-lg-3">
              <div className="card h-100 text-center p-3 border-0 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Online Fee Portal</h5>
                  <p className="card-text">
                    Automated fee reminders, payments and receipts.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="ims-footer py-4 bg-dark text-white text-center">
        © 2025 EduMaster Institute — All Rights Reserved
      </footer>
    </div>
  );
};

export default Home;

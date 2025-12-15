import React from "react";
import "../styles/About.css"; // optional for extra custom styles

const About = () => {
  return (
    <div className="about-container">

      {/* Header Section */}
      <section className="about-hero py-5 bg-light text-center">
        <div className="container">
          <h1 className="display-4">About Our Institute</h1>
          <p className="lead">
            Empowering Education Through Technology & Innovation
          </p>
        </div>
      </section>

      {/* Institute Info */}
      <section className="about-content py-5">
        <div className="container">
          <div className="row align-items-center">
            {/* Text */}
            <div className="col-lg-6 mb-4 mb-lg-0">
              <h2>Who We Are</h2>
              <p>
                EduMaster Institute is a modern educational platform that helps
                institutions manage students, staff, courses, finances, and
                operations effortlessly. Our goal is to bring automation, accuracy,
                and efficiency to every educational organization.
              </p>

              <h2>Our Mission</h2>
              <p>
                To provide a seamless, technology-driven management system that
                empowers institutes to focus more on quality education and less on
                paperwork.
              </p>

              <h2>Our Vision</h2>
              <p>
                To become the most trusted and widely-used institute management
                solution for schools, colleges, and coaching centers worldwide.
              </p>
            </div>

            {/* Image */}
            <div className="col-lg-6 text-center">
              <img
                src="https://cdni.iconscout.com/illustration/premium/thumb/education-management-system-illustration-download-in-svg-png-gif-file-formats--school-solution-software-pack-network illustrations-6527859.png"
                alt="Institute Illustration"
                className="img-fluid rounded"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5">Our Core Values</h2>
          <div className="row g-4">
            <div className="col-sm-6 col-lg-3">
              <div className="card h-100 text-center p-3 border-0 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Innovation</h5>
                  <p className="card-text">
                    We create modern solutions that evolve with technology.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-lg-3">
              <div className="card h-100 text-center p-3 border-0 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Integrity</h5>
                  <p className="card-text">
                    We work with transparency and strong ethical principles.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-lg-3">
              <div className="card h-100 text-center p-3 border-0 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Support</h5>
                  <p className="card-text">
                    We provide top-notch support to all our institutions.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-lg-3">
              <div className="card h-100 text-center p-3 border-0 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Growth</h5>
                  <p className="card-text">
                    We help institutes scale and manage their operations easily.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="about-footer py-4 bg-dark text-white text-center">
        © 2025 EduMaster Institute — All Rights Reserved
      </footer>
    </div>
  );
};

export default About;

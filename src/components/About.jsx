import React from "react";
import "../styles/About.css";

const About = () => {
  return (
    <div className="about-container">
      {/* Header Section */}
      <section className="about-hero">
        <h1>About Our Institute</h1>
        <p>Empowering Education Through Technology & Innovation</p>
      </section>

      {/* Institute Info */}
      <section className="about-content">
        <div className="about-text">
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

        <div className="about-image">
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/education-management-system-illustration-download-in-svg-png-gif-file-formats--school-solution-software-pack-network illustrations-6527859.png"
            alt="Institute Illustration"
          />
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <h2>Our Core Values</h2>

        <div className="values-grid">
          <div className="value-card">
            <h3>Innovation</h3>
            <p>We create modern solutions that evolve with technology.</p>
          </div>

          <div className="value-card">
            <h3>Integrity</h3>
            <p>We work with transparency and strong ethical principles.</p>
          </div>

          <div className="value-card">
            <h3>Support</h3>
            <p>We provide top-notch support to all our institutions.</p>
          </div>

          <div className="value-card">
            <h3>Growth</h3>
            <p>We help institutes scale and manage their operations easily.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="about-footer">
        © 2025 EduMaster Institute — All Rights Reserved
      </footer>
    </div>
  );
};

export default About;

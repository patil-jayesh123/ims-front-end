import React from "react";
import "../styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-container">
      {/* Header Section */}
      <div className="contact-header">
        <h1>Contact Us</h1>
        <p>We’d love to hear from you! Reach out to us anytime.</p>
      </div>

      {/* Contact Section */}
      <div className="contact-content">
        {/* Left Section - Contact Info */}
        <div className="contact-info">
          <h2>Get in Touch</h2>
          <p>Have questions? Our team is here to help you.</p>

          <div className="info-box">
            <h4>📍 Address</h4>
            <p>EduMaster Institute, MG Road, Bangalore, India</p>
          </div>

          <div className="info-box">
            <h4>📞 Phone</h4>
            <p>+91 98765 43210</p>
          </div>

          <div className="info-box">
            <h4>📧 Email</h4>
            <p>support@edumaster.com</p>
          </div>

          <div className="info-box">
            <h4>⏰ Working Hours</h4>
            <p>Mon – Sat : 9:00 AM – 6:00 PM</p>
          </div>
        </div>

        {/* Right Section - Contact Form */}
        <div className="contact-form">
          <h2>Send a Message</h2>
          <form>
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <input type="text" placeholder="Subject" required />
            <textarea placeholder="Your Message" rows="5" required></textarea>

            <button type="submit" className="send-btn">
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Map Section */}
      <div className="contact-map">
        <iframe
          title="institute-map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d92660.87187512124!2d75.49302020898429!3d20.990224813566382!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd90fa4a1eab90f%3A0x37f67bd21bff0a3c!2sJalgaon%2C%20Maharashtra!5e1!3m2!1sen!2sin!4v1764850477701!5m2!1sen!2sin"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>

      {/* Footer */}
      <footer className="contact-footer">
        © 2025 EduMaster Institute — All Rights Reserved
      </footer>
    </div>
  );
};

export default Contact;

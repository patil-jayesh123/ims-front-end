import React from "react";
import "../styles/Contact.css"; // optional for extra custom styles

const Contact = () => {
  return (
    <div className="contact-container">

      {/* Header Section */}
      <section className="contact-header py-5 bg-light text-center">
        <div className="container">
          <h1 className="display-4">Contact Us</h1>
          <p className="lead">We’d love to hear from you! Reach out to us anytime.</p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-content py-5">
        <div className="container">
          <div className="row g-4">
            
            {/* Left Section - Contact Info */}
            <div className="col-lg-5">
              <h2>Get in Touch</h2>
              <p>Have questions? Our team is here to help you.</p>

              <div className="mb-3">
                <h5>📍 Address</h5>
                <p>EduMaster Institute, MG Road, Bangalore, India</p>
              </div>

              <div className="mb-3">
                <h5>📞 Phone</h5>
                <p>+91 98765 43210</p>
              </div>

              <div className="mb-3">
                <h5>📧 Email</h5>
                <p>support@edumaster.com</p>
              </div>

              <div className="mb-3">
                <h5>⏰ Working Hours</h5>
                <p>Mon – Sat : 9:00 AM – 6:00 PM</p>
              </div>
            </div>

            {/* Right Section - Contact Form */}
            <div className="col-lg-7">
              <h2>Send a Message</h2>
              <form>
                <div className="mb-3">
                  <input type="text" className="form-control" placeholder="Your Name" required />
                </div>
                <div className="mb-3">
                  <input type="email" className="form-control" placeholder="Your Email" required />
                </div>
                <div className="mb-3">
                  <input type="text" className="form-control" placeholder="Subject" required />
                </div>
                <div className="mb-3">
                  <textarea className="form-control" placeholder="Your Message" rows="5" required></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Send Message</button>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="contact-map">
        <div className="container">
          <div className="ratio ratio-16x9">
            <iframe
              title="institute-map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d92660.87187512124!2d75.49302020898429!3d20.990224813566382!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd90fa4a1eab90f%3A0x37f67bd21bff0a3c!2sJalgaon%2C%20Maharashtra!5e1!3m2!1sen!2sin!4v1764850477701!5m2!1sen!2sin"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="contact-footer py-4 bg-dark text-white text-center">
        © 2025 EduMaster Institute — All Rights Reserved
      </footer>
    </div>
  );
};

export default Contact;

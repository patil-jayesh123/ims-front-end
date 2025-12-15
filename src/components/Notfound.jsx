import React from "react";
import { Link } from "react-router-dom";

const Notfound = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>404</h1>
      <p style={styles.subText}>Oops! The page you're looking for doesn't exist.</p>

      <Link to="/" style={styles.btn}>
        Go Back Home
      </Link>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f4f4",
    textAlign: "center",
    padding: "0 20px", // responsive padding for small screens
    boxSizing: "border-box",
  },
  heading: {
    fontSize: "clamp(60px, 15vw, 120px)", // responsive font size
    color: "#ff4b4b",
    margin: "0",
    fontWeight: "bold",
  },
  subText: {
    fontSize: "clamp(16px, 3vw, 24px)", // responsive font size
    color: "#333",
    marginBottom: "20px",
  },
  btn: {
    display: "inline-block",
    padding: "12px 25px",
    fontSize: "16px",
    background: "#4b7bff",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    textDecoration: "none",
    cursor: "pointer",
    transition: "background 0.3s",
  },
};

// Optional: add hover effect via a small component-level trick
// You can also move to CSS module or styled-components for better control
export default Notfound;

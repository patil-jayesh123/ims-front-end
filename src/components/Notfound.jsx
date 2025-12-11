import React from "react";

const Notfound = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>404</h1>
      <p style={styles.subText}>Oops! The page you're looking for doesn't exist.</p>

      <button style={styles.btn} onClick={() => (window.location.href = "/")}>
        Go Back Home
      </button>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f4f4",
    textAlign: "center",
  },
  heading: {
    fontSize: "100px",
    color: "#ff4b4b",
    margin: "0",
    fontWeight: "bold",
  },
  subText: {
    fontSize: "20px",
    color: "#333",
    marginBottom: "20px",
  },
  btn: {
    padding: "12px 25px",
    fontSize: "16px",
    background: "#4b7bff",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "0.3s",
  },
};

// hover effect add
styles.btn[":hover"] = {
  background: "#3a62cc",
};

export default Notfound;

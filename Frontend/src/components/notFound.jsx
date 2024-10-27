import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>404</h1>
      <p style={styles.text}>
        Oops! The page you are looking for does not exist.
      </p>
      <p style={styles.text}>
        Return to the{" "}
        <Link to="/" style={styles.link}>
          homepage
        </Link>
        .
      </p>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#1c1c1e", // Dark background
    color: "#f2f2f2", // Light text
    textAlign: "center",
    padding: "50px",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: "48px",
    margin: "0",
  },
  text: {
    fontSize: "18px",
    margin: "10px 0",
  },
  link: {
    textDecoration: "none",
    color: "#4da6ff", // Light blue link color for dark theme
    fontWeight: "bold",
  },
  linkHover: {
    textDecoration: "underline",
  },
};

export default NotFound;

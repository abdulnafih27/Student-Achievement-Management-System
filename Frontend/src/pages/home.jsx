// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../App.css"; // Create a separate CSS file for Home styles if needed

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to SAMs</h1>
      <p>
        SAMs is your one-stop solution for managing student achievements,
        projects, and progress. Our platform allows students to document their
        academic journey and showcase their skills.
      </p>
      <p>Sign up today to start tracking your achievements and projects!</p>
      <div className="home-actions">
        <Link to="/signup" className="action-link">
          Sign Up
        </Link>
        <Link to="/signin" className="action-link">
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default Home;

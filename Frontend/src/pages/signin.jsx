import React, { useState } from "react";
import "../App.css"; // Reuse the same CSS file for styling
import axios from "axios";
import { Link } from "react-router-dom";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState(""); // State for error message

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear the error message when user starts typing
    setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/student/login",
        formData
      );

      // Check if response contains token and name
      localStorage.setItem("token", response.data.data.token);
      localStorage.setItem("name", response.data.data.name);
      window.location.href = "/dashboard"; // Use navigate instead of window.location
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMessage("Incorrect username or password."); // Set error message
      }
    }
  };

  return (
    <div className="signin-container">
      <form className="signin-form" onSubmit={handleSubmit}>
        <h2>Sign In</h2>

        {/* Error Message Container */}
        {errorMessage && (
          <div className="error-message-container">
            <p className="error-message">{errorMessage}</p>
          </div>
        )}

        <div className="form-group">
          <label htmlFor="email" className="floating-label">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password" className="floating-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          Sign In
        </button>

        <p>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default SignIn;

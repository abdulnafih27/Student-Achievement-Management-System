import React, { useState } from "react";
import "../App.css";
import axios from "axios";
import { Link } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [confirmPassword, setConfirmPassword] = useState(""); // Separate state for confirmPassword

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value); // Only handle confirmPassword here
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isPasswordMatching) {
         console.log("Form data:", formData); 
      try {
        // Directly send formData instead of wrapping it in another object
        const response = await axios.post(
          "http://localhost:5000/student/signup",
          formData
        );
        console.log(response); // Handle successful signup here
        localStorage.setItem("token", response.data.data.token);
        localStorage.setItem("name", response.data.data.name);
        window.location.href = "/dashboard";
      } catch (error) {
        console.error(error); // Handle error appropriately
      }
    }
  };

  // Check if password and confirmPassword are matching
  const isPasswordMatching =
    formData.password && formData.password === confirmPassword;

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>

        <div className="form-group">
          <label htmlFor="name" className="floating-label">
            Username
          </label>
          <input
            type="text"
            name="name"
            id="name" // Updated to match the name
            placeholder="Enter your username"
            value={formData.name} // Changed to formData.name
            onChange={handleChange}
            required
          />
        </div>

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
            className={
              !isPasswordMatching && confirmPassword ? "not-matching" : ""
            }
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword" className="floating-label">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
            className={
              !isPasswordMatching && confirmPassword ? "not-matching" : ""
            }
          />
        </div>

        <button
          type="submit"
          className="submit-btn"
          disabled={!isPasswordMatching} // Disable the button if passwords do not match
        >
          Sign Up
        </button>
        <p>
          Already have an account? <Link to="/signin">Log in</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;

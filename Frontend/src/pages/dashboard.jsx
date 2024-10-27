import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";

const Dashboard = ({ onLogout }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  //   const name = localStorage.getItem("name") || "User";
  const token = localStorage.getItem("token");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const validateToken = async () => {
      try {
        // Add your token validation API endpoint here
        const response = await axios.get("http://localhost:5000/student", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Token validation failed:", error);
        navigate("/signin");
      }
    };

    validateToken();
  }, [navigate, token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-nav">
        <h2>Welcome, {user?.name}!</h2>
        <button onClick={onLogout} className="logout-btn">
          Logout
        </button>
      </div>
      <p>Welcome to your dashboard.</p>
      {/* Add your dashboard content here */}
    </div>
  );
};

export default Dashboard;

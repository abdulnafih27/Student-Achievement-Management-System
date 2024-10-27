import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Signup from "./pages/signup";
import SignIn from "./pages/signin";
import Home from "./pages/home";
import Dashboard from "./pages/dashboard";
import Sidebar from "./components/navbar";
import Project from "./pages/projects";
import Profile from "./pages/profile";
import NotFound from "./components/notFound";
import Achievement from "./pages/achievements";
import "./App.css";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/signin" />;
  }
  return children;
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="app-container">
        {/* Conditionally render the sidebar only if logged in */}
        {isLoggedIn && (
          <div className="sidebar">
            <Sidebar />
          </div>
        )}

        <div className={`main-content ${isLoggedIn ? "logged-in" : "public"}`}>
          <Routes>
            {/* Route redirection for "/" */}
            <Route
              path="/"
              element={
                isLoggedIn ? (
                  <Navigate to="/dashboard" />
                ) : (
                  <Navigate to="/home" />
                )
              }
            />

            {/* Public Routes */}
            {!isLoggedIn && (
              <>
                <Route path="/home" element={<Home />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/signin" element={<SignIn />} />
              </>
            )}

            {/* Protected Routes */}
            {isLoggedIn && (
              <>
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard onLogout={handleLogout} />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/projects"
                  element={
                    <ProtectedRoute>
                      <Project />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/achievements"
                  element={
                    <ProtectedRoute>
                      <Achievement />
                    </ProtectedRoute>
                  }
                />
              </>
            )}

            {/* Redirect unknown paths to home */}
            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;

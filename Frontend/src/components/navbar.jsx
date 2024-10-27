import React from "react";
import { FaHome, FaUser, FaProjectDiagram, FaSignOutAlt } from "react-icons/fa";
import { GrAchievement, GrScorecard } from "react-icons/gr";
import { BsPersonWorkspace } from "react-icons/bs";
import { NavLink, Outlet } from "react-router-dom";
import "../App.css"; // Import the CSS file for styling

const Sidebar = ({ children }) => {
  // Menu items as an array of objects
  const menuItems = [
    {
      name: "Home",
      icon: <FaHome />,
      path: "/dashboard",
    },
    {
      name: "Projects",
      icon: <FaProjectDiagram />,
      path: "/projects",
    },
    {
      name: "Internships",
      icon: <BsPersonWorkspace />,
      path: "/internships",
    },
    {
      name: "Achievements",
      icon: <GrAchievement />,
      path: "/achievements",
    },
    {
      name: "Marks",
      icon: <GrScorecard />,
      path: "/marks",
    },
  ];

  return (
    <div className="layout">
      <div className="sidebar">
        <h2 className="sidebar-title">SAMS</h2>
        <ul className="sidebar-menu">
          {menuItems.map((item, index) => (
            <li key={index} className="menu-item">
              <NavLink to={item.path} className="menu-link">
                {item.icon} {/* Icon from the object */}
                <span>{item.name}</span> {/* Name from the object */}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <main>{children}</main> {/* Main content area */}
    </div>
  );
};

export default Sidebar;

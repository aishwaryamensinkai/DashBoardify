// src/components/Navbar.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated"); // Remove authentication status
    navigate("/"); // Redirect to the login page
    window.location.reload(); // Optional: Reload the page to reflect the change
  };

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/">User Management</Link>
        </li>
        <li>
          <Link to="/analytics">Analytics</Link>
        </li>
        <li>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

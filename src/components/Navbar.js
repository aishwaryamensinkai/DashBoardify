// src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import "../css/Navbar.css";

const Navbar = () => {
  return (
    // Main navigation container
    <nav className="navbar">
      <ul>
        {/* Navigation link to the User Management page */}
        <li>
          <Link to="/">User Management</Link>
        </li>

        {/* Navigation link to the Analytics page */}
        <li>
          <Link to="/analytics">Analytics</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

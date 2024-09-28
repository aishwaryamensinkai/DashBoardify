import React, { useState } from "react";
import "../css/Login.css";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "password123") {
      localStorage.setItem("isAuthenticated", "true");
      onLogin(true);
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-intro">
        <h1>Welcome to the Admin Panel</h1>
        <p>
          Manage your content, monitor activity, and gain insights all in one
          place. Please log in with your admin credentials to access your
          dashboard.
        </p>
        <ul className="feature-list">
          <li>🔍 Comprehensive Analytics</li>
          <li>💡 Quick and Easy Content Management</li>
          <li>🔒 Secure Access and User Control</li>
        </ul>
      </div>
      <div className="login-container">
        <h2>Admin Login</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;

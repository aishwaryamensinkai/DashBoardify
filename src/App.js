// src/App.js
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";
import AnalyticsDashboard from "./components/AnalyticsDashboard";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import "./App.css";

const App = () => {
  const [userToEdit, setUserToEdit] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check authentication status on page load
    const authStatus = localStorage.getItem("isAuthenticated");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      {isAuthenticated ? (
        <>
          <Navbar />
          <div className="app-container">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <UserForm
                      userToEdit={userToEdit}
                      onSave={() => window.location.reload()}
                      clearEdit={() => setUserToEdit(null)}
                    />
                    <UserList onEdit={setUserToEdit} />
                  </>
                }
              />
              <Route path="/analytics" element={<AnalyticsDashboard />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </>
      ) : (
        <Login onLogin={setIsAuthenticated} />
      )}
    </Router>
  );
};

export default App;

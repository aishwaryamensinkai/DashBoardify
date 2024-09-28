// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";
import AnalyticsDashboard from "./components/AnalyticsDashboard";
import Navbar from "./components/Navbar";
import "./App.css";

const App = () => {
  const [userToEdit, setUserToEdit] = useState(null);

  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <Router>
      <Navbar />
      <div className="app-container">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <UserForm
                  userToEdit={userToEdit}
                  onSave={refreshPage}
                  clearEdit={() => setUserToEdit(null)}
                />
                <UserList onEdit={setUserToEdit} />
              </>
            }
          />
          <Route path="/analytics" element={<AnalyticsDashboard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

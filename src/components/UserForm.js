// src/components/UserForm.js
import React, { useState, useEffect } from "react";
import api from "../services/api";
import "../css/UserForm.css";

const UserForm = ({ userToEdit, onSave, clearEdit }) => {
  // State to manage user details
  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "",
    registeredDate: "",
    lastUpdatedDate: "",
  });

  // State to handle error messages
  const [error, setError] = useState("");

  // Effect hook to populate the form with data when editing an existing user
  useEffect(() => {
    if (userToEdit) {
      // If there's a user to edit, set the form state with that user's data
      setUser(userToEdit);
    } else {
      // Otherwise, reset the form with default values and current timestamps
      setUser({
        name: "",
        email: "",
        role: "",
        registeredDate: new Date().toISOString(),
        lastUpdatedDate: new Date().toISOString(),
      });
    }
  }, [userToEdit]);

  // Handler function for input changes
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Email validation function using regex
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handler function for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate user input before submitting
    if (!user.name || !user.email || !user.role) {
      setError("All fields are required.");
      return;
    }

    if (!isValidEmail(user.email)) {
      setError("Invalid email format.");
      return;
    }

    if (!["admin", "user"].includes(user.role.toLowerCase())) {
      setError("Role must be either 'admin' or 'user'.");
      return;
    }

    setError(""); // Clear any existing errors

    try {
      if (userToEdit) {
        // If editing, update the existing user with a new timestamp
        const updatedUser = {
          ...user,
          lastUpdatedDate: new Date().toISOString(),
        };
        await api.put(`/users/${user.id}`, updatedUser); // Send PUT request to update user
      } else {
        // If creating a new user, send a POST request
        await api.post("/users", user);
      }

      onSave(); // Notify parent component that save was successful
      clearEdit(); // Clear the edit state
      setUser({
        name: "",
        email: "",
        role: "",
        registeredDate: "",
        lastUpdatedDate: "",
      }); // Reset the form
    } catch (error) {
      console.error("Error saving user:", error);
      setError("Failed to save user. Please try again later.");
    }
  };

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      {/* Display error message if there's an error */}
      {error && <div className="error-message">{error}</div>}

      {/* Input field for the user's name */}
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={user.name}
        onChange={handleChange}
        required
      />

      {/* Input field for the user's email */}
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={user.email}
        onChange={handleChange}
        required
      />

      {/* Input field for the user's role */}
      <input
        type="text"
        name="role"
        placeholder="Role (admin/user)"
        value={user.role}
        onChange={handleChange}
        required
      />

      {/* Submit button that displays "Create User" or "Update User" based on editing state */}
      <button type="submit">
        {userToEdit ? "Update User" : "Create User"}
      </button>
    </form>
  );
};

export default UserForm;

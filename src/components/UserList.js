// src/components/UserList.js
import React, { useEffect, useState } from "react";
import api from "../services/api"; // Import the API service for making request
import "../css/UserList.css";

const UserList = ({ onEdit }) => {
  // State to manage users, search term, sorting, filtering, error messages, and loading status
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "asc",
  });
  const [filterRole, setFilterRole] = useState("All");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch users when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  // Function to fetch users from the API
  const fetchUsers = async () => {
    setLoading(true); // Show loading state
    try {
      const response = await api.get("/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Failed to fetch users. Please try again later.");
    } finally {
      setLoading(false); // Hide loading state
    }
  };

  // Function to delete a user
  const deleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await api.delete(`/users/${id}`);
        fetchUsers(); // Refresh user list after deletion
      } catch (error) {
        console.error("Error deleting user:", error);
        setError("Failed to delete user. Please try again later.");
      }
    }
  };

  // Filtering and sorting logic for the user list
  const filteredUsers = users
    .filter(
      (user) =>
        (user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (filterRole === "All" || user.role === filterRole)
    )
    .sort((a, b) => {
      if (
        sortConfig.key === "registeredDate" ||
        sortConfig.key === "lastUpdatedDate"
      ) {
        const dateA = new Date(a[sortConfig.key]);
        const dateB = new Date(b[sortConfig.key]);
        return sortConfig.direction === "asc" ? dateA - dateB : dateB - dateA;
      } else {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      }
    });

  // Function to handle sorting requests
  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="user-list">
      {/* Display error message if there's an error */}
      {error && <div className="error-message">{error}</div>}

      {/* Display loading message while fetching data */}
      {loading ? (
        <div className="loading-message">Loading users...</div>
      ) : (
        <>
          {/* Controls for searching and filtering users */}
          <div className="controls">
            <input
              type="text"
              placeholder="Search by name or email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="filter-dropdown"
            >
              <option value="All">All Roles</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>

          {/* Display the filtered and sorted user list in a table */}
          {filteredUsers.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th onClick={() => requestSort("name")}>
                    Name{" "}
                    {sortConfig.key === "name" &&
                      (sortConfig.direction === "asc" ? "▲" : "▼")}
                  </th>
                  <th onClick={() => requestSort("email")}>
                    Email{" "}
                    {sortConfig.key === "email" &&
                      (sortConfig.direction === "asc" ? "▲" : "▼")}
                  </th>
                  <th onClick={() => requestSort("role")}>
                    Role{" "}
                    {sortConfig.key === "role" &&
                      (sortConfig.direction === "asc" ? "▲" : "▼")}
                  </th>
                  <th onClick={() => requestSort("registeredDate")}>
                    Registered Date{" "}
                    {sortConfig.key === "registeredDate" &&
                      (sortConfig.direction === "asc" ? "▲" : "▼")}
                  </th>
                  <th onClick={() => requestSort("lastUpdatedDate")}>
                    Last Updated{" "}
                    {sortConfig.key === "lastUpdatedDate" &&
                      (sortConfig.direction === "asc" ? "▲" : "▼")}
                  </th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {/* Render each user row */}
                {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                      {new Date(user.registeredDate).toLocaleDateString()}
                    </td>
                    <td>
                      {user.lastUpdatedDate
                        ? new Date(user.lastUpdatedDate).toLocaleString()
                        : "N/A"}
                    </td>
                    <td>
                      <button onClick={() => onEdit(user)}>Edit</button>
                    </td>
                    <td>
                      <button onClick={() => deleteUser(user.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            // Message displayed if no users match the search/filter criteria
            <div className="no-results-message">No users found.</div>
          )}
        </>
      )}
    </div>
  );
};

export default UserList;

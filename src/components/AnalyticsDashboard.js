// src/components/AnalyticsDashboard.js
import React, { useEffect, useState } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  ArcElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import api from "../services/api";
import "../css/AnalyticsDashboard.css";

// Register the chart.js modules
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  ArcElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const AnalyticsDashboard = () => {
  // State to store user registration data, selected role, and active user count
  const [userRegistrations, setUserRegistrations] = useState([]);
  const [selectedRole, setSelectedRole] = useState("all");
  const [activeUsersCount, setActiveUsersCount] = useState(0);

  // Fetch user registration data when the component mounts
  useEffect(() => {
    const fetchUserRegistrations = async () => {
      const response = await api.get("/users");
      setUserRegistrations(response.data);
      calculateActiveUsers(response.data); // Calculate active users based on fetched data
    };

    fetchUserRegistrations();
  }, []);

  // Calculate the number of active users
  const calculateActiveUsers = (users) => {
    const activeCount = users.filter((user) => user.active).length;
    setActiveUsersCount(activeCount);
  };

  // Get the count of user registrations within a specific number of days
  const getUsersCountByDays = (days) => {
    const today = new Date();
    return userRegistrations.filter((user) => {
      // Filter by selected role if it's not "all"
      if (selectedRole !== "all" && user.role !== selectedRole) return false;

      // Calculate the difference in days between today and the registration date
      const registrationDate = new Date(user.registeredDate);
      const diffTime = Math.abs(today - registrationDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= days;
    }).length;
  };

  // Available roles for filtering
  const roles = ["all", "admin", "user"];

  // Handle changes in the role selection dropdown
  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  // Data for the bar chart
  const barData = {
    labels: ["Last 24 hours", "Last 7 days", "Last 15 days", "Last 30 days"],
    datasets: [
      {
        label: `Registrations (${selectedRole})`,
        data: [
          getUsersCountByDays(1),
          getUsersCountByDays(7),
          getUsersCountByDays(15),
          getUsersCountByDays(30),
        ],
        backgroundColor: "rgba(75,192,192,0.6)", // Bar color
      },
    ],
  };

  // Data for the line chart
  const lineData = {
    labels: ["Last 24 hours", "Last 7 days", "Last 15 days", "Last 30 days"],
    datasets: [
      {
        label: `Registrations Over Time (${selectedRole})`,
        data: [
          getUsersCountByDays(1),
          getUsersCountByDays(7),
          getUsersCountByDays(15),
          getUsersCountByDays(30),
        ],
        fill: false,
        borderColor: "rgba(75,192,192,1)", // Line color
        tension: 0.1, // Line smoothness
      },
    ],
  };

  // Data for the pie chart
  const pieData = {
    labels: ["Last 24 hours", "Last 7 days", "Last 15 days", "Last 30 days"],
    datasets: [
      {
        label: "User Registrations",
        data: [
          getUsersCountByDays(1),
          getUsersCountByDays(7),
          getUsersCountByDays(15),
          getUsersCountByDays(30),
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
        ], // Colors for different slices of the pie chart
        hoverOffset: 4, // Offset for hover effect
      },
    ],
  };

  return (
    <div className="analytics-dashboard">
      <h2>User Registration Analytics</h2>

      {/* Display the count of active users */}
      <div className="metrics-container">
        <h3>Active Users: {activeUsersCount}</h3>
      </div>

      {/* Role filter dropdown for selecting user roles */}
      <div className="role-filter">
        <label htmlFor="role">Filter by Role:</label>
        <select id="role" value={selectedRole} onChange={handleRoleChange}>
          {roles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
      </div>

      {/* Bar Chart for displaying registration data */}
      <h3>Registrations Bar Chart</h3>
      <div className="chart-container">
        <Bar data={barData} />
      </div>

      {/* Line Chart for displaying registration trends over time */}
      <h3>Registrations Line Chart</h3>
      <div className="chart-container">
        <Line data={lineData} />
      </div>

      {/* Pie Chart for showing distribution of registrations */}
      <h3>Registrations Pie Chart</h3>
      <div className="chart-container">
        <Pie data={pieData} />
      </div>
    </div>
  );
};

export default AnalyticsDashboard;

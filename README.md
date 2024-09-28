
# Admin Panel with User Management and Analytics

## Objective
The goal of this assignment is to create an Admin Panel that allows for comprehensive user management and provides insightful analytics on user registration trends. This project is a fully functional and responsive admin interface that performs CRUD (Create, Read, Update, Delete) operations and visualizes user registration data using a simulated backend API.

## Table of Contents
- [Project Overview](#project-overview)
- [Setup Instructions](#setup-instructions)
- [Assumptions Made](#assumptions-made)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Running the Project](#running-the-project)
- [Approach and Challenges](#approach-and-challenges)
- [Features](#features)
- [Future Enhancements](#future-enhancements)

## Project Overview
This Admin Panel is designed to manage users efficiently and provide analytics on user registration over time. It enables administrators to:
- View, search, filter, and sort users.
- Create, update, and delete user profiles.
- Visualize registration data using interactive charts.
- Filter data by user roles.

The application uses React for the frontend, JSON Server for simulating a backend API, and Chart.js for data visualization.

## Setup Instructions

### Prerequisites
Ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v12 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/aishwaryamensinkai/DashBoardify.git
   ```
2. Navigate to the project directory:
   ```bash
   cd DashBoardify
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
   or if using yarn:
   ```bash
   yarn install
   ```

### JSON Server Setup
1. Install JSON Server globally (if not already installed):
   ```bash
   npm install -g json-server
   ```
2. Start the JSON Server with the provided `db.json` file:
   ```bash
   json-server --watch db.json --port 3000
   ```

## Assumptions Made
- The `db.json` serves as the primary data source and simulates a backend API.
- User roles are restricted to 'admin' and 'user' for simplicity, and validation ensures only these roles are accepted.
- Dates (e.g., registration and last updated dates) are stored in ISO format.
- Error handling for API requests assumes transient errors and prompts users to retry.

## Technologies Used

### Frontend
- **React.js**: Used for building the user interface, offering reusable components.
- **React Router**: Manages the routing between different pages (User Management and Analytics Dashboard).
- **Chart.js**: Provides interactive data visualization for analytics.
- **CSS Modules**: Each component has its own CSS file to maintain separation of concerns and avoid style clashes.

### Backend Simulation
- **JSON Server**: Simulates a RESTful API for handling user data CRUD operations.

## Project Structure
```
.
├── README.md
├── db.json
├── package-lock.json
├── package.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
└── src
    ├── App.css
    ├── App.js
    ├── components
    │   ├── AnalyticsDashboard.js
    │   ├── Navbar.js
    │   ├── UserForm.js
    │   └── UserList.js
    ├── css
    │   ├── AnalyticsDashboard.css
    │   ├── Navbar.css
    │   ├── UserForm.css
    │   └── UserList.css
    ├── index.css
    ├── index.js
    └── services
        └── api.js
```

## API Endpoints
- **GET /users** – Fetch all users
- **GET /users/:id** – Fetch a specific user by ID
- **POST /users** – Add a new user
- **PUT /users/:id** – Update an existing user
- **DELETE /users/:id** – Delete a user

### Example Usage
#### Fetching all users
```javascript
fetch('http://localhost:3000/users')
  .then(response => response.json())
  .then(data => console.log(data));
```

#### Adding a new user
```javascript
fetch('http://localhost:3000/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'John Doe', email: 'john@example.com', role: 'admin' })
})
.then(response => response.json())
.then(data => console.log(data));
```

## Running the Project Together
1. Start the JSON Server:
   ```bash
   json-server --watch db.json --port 3000
   ```
2. In a separate terminal window, start the React app:
   ```bash
   npm start
   ```

Access the application at `http://localhost:3001`.

## Authentication Details

### Type
Basic authentication using hardcoded credentials.

### Login Credentials
- **Username:** `admin`
- **Password:** `password123`

### Authentication Process
- When the correct credentials are entered, an `isAuthenticated` key with the value `"true"` is stored in `localStorage`, allowing access to the admin panel.

### Error Handling
- If the credentials are incorrect, an error message, "Invalid credentials. Please try again," is displayed.


## Approach and Challenges

### Approach
- **Component-Based Design**: Leveraged React components to create reusable elements (e.g., UserForm, UserList, AnalyticsDashboard).
- **State Management**: Used `useState` and `useEffect` hooks for handling form input, user data, and API interactions.
- **Data Visualization**: Implemented `chart.js` for creating bar, line, and pie charts for a visually engaging analytics experience.
- **Responsive Design**: CSS media queries were used to ensure the interface adapts to various screen sizes (desktop, tablet, mobile).

### Challenges
- **Real-Time Data Synchronization**: Keeping data consistent between the `UserList` and `UserForm` components required careful state management and re-rendering.
- **Error Handling**: Implemented error messages for failed API requests, ensuring the user is informed when data fetching/saving encounters issues.
- **Chart Rendering**: Updating chart data dynamically based on user registration activity required effective use of `useEffect` hooks.

## Features

### User Management
- **CRUD Operations**: Add, view, edit, and delete users.
- **Search and Filter**: Search users by name/email and filter by role (admin/user).
- **Sort Users**: Sort by name, email, role, registration date, or last updated date.

### Analytics Dashboard
- **Active Users Count**: Displays the total count of active users.
- **Registration Metrics**: Displays the number of users registered in the last 24 hours, 7 days, 15 days, and 30 days.
- **Interactive Charts**: Visualize user registrations over different time frames using bar, line, and pie charts.

## Future Enhancements
- **Authentication**: Implement user authentication to secure the admin panel.
- **Role-Based Access Control**: Limit actions based on user roles (e.g., only admins can delete users).
- **Pagination**: Add pagination to the user list for better performance with large datasets.
- **Export Data**: Allow exporting user data to CSV or Excel for further analysis.

## Contact
Feel free to reach out if you have any questions or suggestions regarding this project! 🎉

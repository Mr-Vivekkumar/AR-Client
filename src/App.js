import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Admin from "./components/Admin";

function App() {
  // Check if user is authenticated
  const isLoggedIn = localStorage.getItem("loggedIn") === "true";  // Convert string to boolean
  const userType = localStorage.getItem("userType");
  
  console.log("isLoggedIn:", isLoggedIn);
  console.log("userType:", userType);
  
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
          />

          <Route
            path="/adminPath"
            element={
              isLoggedIn && userType === "admin" ? (
                <Admin />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {/* Default Route */}
          {/* <Route path="*" element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

import React from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const name = localStorage.getItem("name");
  const age = localStorage.getItem("age");
  const address = localStorage.getItem("address");
  const email = localStorage.getItem("email");
  const userType = localStorage.getItem("userType");
  console.log(email, userType);

  const handleLogout = () => {
    // Clear authentication data from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    localStorage.removeItem("name");
    localStorage.removeItem("age");
    localStorage.removeItem("address");
    localStorage.removeItem("loggedIn");
    console.log(localStorage.getItem("userType"));

    // Redirect to login page
    navigate("/login");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-4">User Dashboard</h1>
        <h5 className="text-lg mb-2">
          <span className="font-semibold">Name:</span> {name}
        </h5>
        <h5 className="text-lg mb-2">
          <span className="font-semibold">Account Type:</span> {userType}
        </h5>
        <h5 className="text-lg mb-2">
          <span className="font-semibold">Email ID:</span> {email}
        </h5>
        <h5 className="text-lg mb-2">
          <span className="font-semibold">Age:</span> {age}
        </h5>
        <h5 className="text-lg mb-2">
          <span className="font-semibold">Address:</span> {address}
        </h5>

        {/* Add additional dashboard features */}
        <button
          onClick={handleLogout}
          className="mt-4 w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;

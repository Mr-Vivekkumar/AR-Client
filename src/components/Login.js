import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Use the useNavigate hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log("Form submitted"); // Before form submission
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/login`,
        { email, password }
      );

      console.log("Response received:", response.data); // After API response

      // Assuming the response contains a success status and token
      if (response?.data?.status === "ok") {
        console.log("Status OK, storing token and userType"); // Before storing in localStorage
        localStorage.setItem("token", response?.data?.token);
        localStorage.setItem("userType", response?.data?.userType);
        localStorage.setItem("email", response?.data?.email);
        localStorage.setItem("name", response?.data?.name);
        localStorage.setItem("age", response?.data?.age);
        localStorage.setItem("address", response?.data?.address);
        localStorage.setItem("loggedIn", "true");

        console.log("Token and userType stored successfully:", {
          token: response?.data?.token,
          userType: response?.data?.userType
        }); // After storing in localStorage

        // Debugging userType before navigating
        console.log("User type before navigation:", response?.data?.userType);

        // Await response before navigating
        if (response?.data?.userType?.toLowerCase() === "admin") {
          console.log("Navigating to /admin"); // Before navigate
          await navigate("/adminPath"); // Redirect to admin dashboard
          console.log("Navigation to /admin complete"); // After navigate
        } else {
          console.log("Navigating to /dashboard"); // Before navigate
          await navigate("/dashboard"); // Redirect to user dashboard
          console.log("Navigation to /dashboard complete"); // After navigate
        }
      } else {
        console.log("Login failed, status not OK:", response?.data); // If login failed
        alert(
          response?.data?.message ||
            "Login failed. Please check your credentials."
        );
      }
    } catch (error) {
      console.error("Error during login:", error); // Catch and log any error
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="p-6 bg-white rounded-md shadow-md"
      >
        <h2 className="text-2xl mb-4">Login</h2>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border border-gray-400 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 border border-gray-400 rounded w-full"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Login
        </button>
        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/register")} // Redirect to register page
            className="text-blue-500 underline"
          >
            Register
          </button>
        </p>
      </form>
    </div>
  );
}

export default Login;

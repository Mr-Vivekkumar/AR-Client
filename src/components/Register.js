import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("user"); // Default to user
  const [adminSecret, setAdminSecret] = useState(""); // State for admin secret key
  const [errors, setErrors] = useState({}); // State for form errors

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // Reset errors

    // Validate fields
    const newErrors = {};
    if (!fname) newErrors.fname = "First name is required.";
    if (!lname) newErrors.lname = "Last name is required.";
    if (!age || age <= 0) newErrors.age = "Please enter a valid age.";
    if (!address) newErrors.address = "Address is required.";
    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid.";
    }
    if (!password) newErrors.password = "Password is required.";
    if (userType === "admin" && adminSecret !== process.env.REACT_APP_ADMIN_SECRET) {
      newErrors.adminSecret = "Invalid Admin Secret Key.";
    }

    // Check for errors
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; 
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/register`,
        { fname, lname, age, address, email, password, userType }
      );

      // Handle successful registration
      if (response.status === 201) {
        alert("Registration successful! Redirecting to login...");
        navigate("/login"); // Redirect to login page
      } else {
        alert("Registration failed: " + response.data.error);
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred during registration. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="p-6 bg-white rounded-md shadow-md">
        <h2 className="text-2xl mb-4">Register</h2>

        <div className="mb-4">
          <input
            type="text"
            placeholder="First Name"
            value={fname}
            onChange={(e) => setFname(e.target.value)}
            className={`p-2 border ${errors.fname ? 'border-red-500' : 'border-gray-400'} rounded w-full`}
          />
          {errors.fname && <p className="text-red-500 text-sm">{errors.fname}</p>}
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Last Name"
            value={lname}
            onChange={(e) => setLname(e.target.value)}
            className={`p-2 border ${errors.lname ? 'border-red-500' : 'border-gray-400'} rounded w-full`}
          />
          {errors.lname && <p className="text-red-500 text-sm">{errors.lname}</p>}
        </div>
        <div className="mb-4">
          <input
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className={`p-2 border ${errors.age ? 'border-red-500' : 'border-gray-400'} rounded w-full`}
          />
          {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className={`p-2 border ${errors.address ? 'border-red-500' : 'border-gray-400'} rounded w-full`}
          />
          {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
        </div>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`p-2 border ${errors.email ? 'border-red-500' : 'border-gray-400'} rounded w-full`}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`p-2 border ${errors.password ? 'border-red-500' : 'border-gray-400'} rounded w-full`}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>

        <div className="mb-4">
          <label className="mr-4">User Type:</label>
          <label>
            <input
              type="radio"
              name="userType"
              value="user"
              checked={userType === "user"}
              onChange={() => setUserType("user")}
            />
            User
          </label>
          <label className="ml-4">
            <input
              type="radio"
              name="userType"
              value="admin"
              checked={userType === "admin"}
              onChange={() => setUserType("admin")}
            />
            Admin
          </label>
        </div>

        {userType === "admin" && (
          <div className="mb-4">
            <input
              type="text"
              placeholder="Admin Secret Key"
              value={adminSecret}
              onChange={(e) => setAdminSecret(e.target.value)}
              className={`p-2 border ${errors.adminSecret ? 'border-red-500' : 'border-gray-400'} rounded w-full`}
            />
            {errors.adminSecret && <p className="text-red-500 text-sm">{errors.adminSecret}</p>}
          </div>
        )}

        <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;

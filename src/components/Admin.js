import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Admin() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    console.log("Admin Pannel");
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token"); // Get the token from localStorage
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/admin/all-users`, 
          {
            headers: {
              Authorization: `Bearer ${token}`, // Add the token in the Authorization header
            },
          }
        );
        
        setUsers(response.data); // Assuming the response contains a 'users' array
      } catch (error) {
        console.error("Error fetching users:", error);
        // Handle error, e.g., show an alert or redirect to login if the token is invalid
      }
    };
  
    fetchUsers();
  }, []);


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

  const handleDelete = async (email) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/admin/delete-user`,
        { email }, // Email as part of the request body
        {
          headers: {
            Authorization: `Bearer ${token}`, // Token in the Authorization header
          },
        }
      );
      console.log(response.data);
      setUsers(users.filter((user) => user.email !== email)); // Remove the user from the UI
    } catch (error) {
      console.error(error);
    }
  };

  

  return (
    <div className="p-6">
      <h1 className="text-3xl mb-4">Admin Panel</h1>
      <button
          onClick={handleLogout}
          className="mt-4 w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
        >
          Logout
        </button>
      
      <table style={{ width: 700 }}>
          <tr style={{ textAlign: "center" }}>
            <th>Name</th>
            <th>Email</th>
            <th>User Type</th>
            <th>Delete</th>
          </tr>
          {users.map((i) => {
            return (
              <tr style={{ textAlign: "center" }}>
                <td>{i.fname}</td>
                <td>{i.email}</td>
                <td>{i.userType}</td>
                <td><button onClick={() => handleDelete(i.email)} className="ml-4 bg-red-500 p-2 rounded text-white">
              Delete
            </button></td>
                
              </tr>
            );
          })}
        </table>
    </div>
  );
}

export default Admin;

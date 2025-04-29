import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import axios from "axios";

const AuthHeader = ({ pageTitle, userType }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("authToken"));
  const [user, setUser] = useState(null);

  const fetchUserDetails = async () => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const response = await axios.get("http://localhost:5001/api/auth/get-profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
        setIsLoggedIn(true);
        console.log("Profile picture URL in AuthHeader.jsx:", response.data.profilePic);
      } catch (err) {
        console.error("Error fetching user details:", err);
        localStorage.removeItem("authToken");
        setIsLoggedIn(false);
        setUser(null);
      }
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUserDetails();

    window.addEventListener("userProfileUpdated", fetchUserDetails);

    return () => {
      window.removeEventListener("userProfileUpdated", fetchUserDetails);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    setUser(null);
    navigate("/");
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white border-b border-gray-300">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-700 hover:text-gray-900 focus:outline-none"
      >
        <FiArrowLeft className="mr-2 text-xl" />
        <span className="font-medium text-sm">Back</span>
      </button>

      <Link to="/" className="flex items-center justify-center">
        <img src="/logo.png" alt="Logo" className="h-10" />
      </Link>

      <div className="flex items-center space-x-6">
        {!isLoggedIn ? (
          <>
            {pageTitle !== "Login" && (
              <Link to="/login" className="text-sm font-medium text-blue-600 hover:text-blue-800">
                Login
              </Link>
            )}
            {pageTitle !== "Sign Up" && (
              <Link
                to="/create-account"
                className="text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                Sign Up
              </Link>
            )}
            <Link to="/help" className="text-xs text-gray-500 hover:text-gray-700">
              Need Help?
            </Link>
          </>
        ) : (
          <div className="relative">
            <img
              src={user?.profilePic || "https://via.placeholder.com/40"}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover cursor-pointer"
              onClick={() => navigate("/profile")}
              onError={() => console.log("Profile picture failed to load in AuthHeader:", user?.profilePic)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthHeader;
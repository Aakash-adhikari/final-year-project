import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import axios from "axios";

const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("authToken"));
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [profilePicUrl, setProfilePicUrl] = useState("https://via.placeholder.com/40");
  
  // Define base URL for API and assets
  const API_BASE_URL = "http://localhost:5001";

  const fetchUserDetails = async () => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/auth/get-profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
        setIsLoggedIn(true);
        
        // Fix profile picture URL handling
        let picUrl;
        if (response.data.profilePic) {
          // If the profile pic path starts with http, use it directly
          if (response.data.profilePic.startsWith('http')) {
            picUrl = response.data.profilePic;
          } else {
            // Otherwise, prepend the API base URL
            picUrl = `${API_BASE_URL}${response.data.profilePic}`;
          }
        } else {
          picUrl = "https://via.placeholder.com/40";
        }
        
        // Add cache-busting parameter
        picUrl = `${picUrl}?t=${Date.now()}`;
        setProfilePicUrl(picUrl);
        console.log("Profile picture URL in Header.jsx:", picUrl);
      } catch (err) {
        console.error("Error fetching user:", err);
        localStorage.removeItem("authToken");
        setIsLoggedIn(false);
        setUser(null);
        setProfilePicUrl("https://via.placeholder.com/40");
      }
    } else {
      setIsLoggedIn(false);
      setUser(null);
      setProfilePicUrl("https://via.placeholder.com/40");
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
    setProfilePicUrl("https://via.placeholder.com/40");
    navigate("/");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center p-4">
        <div className="flex items-center space-x-3">
          <Link to="/">
            <img src="/logo.png" alt="Logo" className="h-10" />
          </Link>
        </div>
        <nav className="flex-1 flex justify-center space-x-8">
          <Link to="/" className="text-gray-700 hover:text-blue-600">
            Home
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-blue-600">
            About
          </Link>
          <Link to="/services" className="text-gray-700 hover:text-blue-600">
            Services
          </Link>
          <Link to="/contact" className="text-gray-700 hover:text-blue-600">
            Contact
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <div className="relative">
              <img
                src={profilePicUrl}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover cursor-pointer"
                onClick={toggleDropdown}
                onError={(e) => {
                  console.log("Profile picture failed to load in Header:", profilePicUrl);
                  e.target.src = "https://via.placeholder.com/40"; // Fallback image
                }}
              />
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                  <div className="px-4 py-2 text-sm text-gray-700">
                    {user?.fullName} ({user?.role})
                  </div>
                  <Link
                    to={`/${user?.role}/dashboard`}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => {
                      console.log("Navigating to /profile");
                      setIsDropdownOpen(false);
                    }}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login">
                <button className="bg-transparent text-gray-700 hover:text-blue-600 flex items-center">
                  <FiUser className="text-2xl" />
                  <span className="ml-2">Login</span>
                </button>
              </Link>
              <Link to="/create-account">
                <button className="bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700">
                  Create Account
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
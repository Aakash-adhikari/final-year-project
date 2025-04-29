import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [profilePicPreview, setProfilePicPreview] = useState("");
  const fileInputRef = useRef(null);
  
  // Define base URL for API and assets
  const API_BASE_URL = "http://localhost:5001";

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        navigate("/login");
        return;
      }
      try {
        const response = await axios.get(`${API_BASE_URL}/api/auth/get-profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
        setFormData({
          fullName: response.data.fullName || "",
          email: response.data.email || "",
          phoneNumber: response.data.phoneNumber || "",
          companyName: response.data.companyName || "",
          vehicleType: response.data.vehicleType || "",
          location: response.data.location || "",
        });
        
        // Fix profile picture URL handling
        let profilePicUrl;
        if (response.data.profilePic) {
          // If the profile pic path starts with http, use it directly
          if (response.data.profilePic.startsWith('http')) {
            profilePicUrl = response.data.profilePic;
          } else {
            // Otherwise, prepend the API base URL
            profilePicUrl = `${API_BASE_URL}${response.data.profilePic}`;
          }
        } else {
          profilePicUrl = "https://via.placeholder.com/100";
        }
        
        setProfilePicPreview(profilePicUrl);
        console.log("Profile picture URL in Profile.jsx:", profilePicUrl);
      } catch (err) {
        setError("Failed to load profile. Please try again.");
        console.error("Error fetching profile:", err);
      }
    };
    fetchUserDetails();
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicPreview(reader.result);
      };
      reader.readAsDataURL(file);
      setFormData((prev) => ({ ...prev, profilePic: file }));
    }
  };

  const handleSave = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const data = new FormData();
      data.append("fullName", formData.fullName);
      data.append("email", formData.email);
      data.append("phoneNumber", formData.phoneNumber);
      data.append("companyName", formData.companyName || "");
      data.append("vehicleType", formData.vehicleType || "");
      data.append("location", formData.location || "");
      if (formData.profilePic && typeof formData.profilePic !== "string") {
        data.append("profilePic", formData.profilePic);
      }

      console.log("Sending update request with data:", {
        fullName: formData.fullName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        companyName: formData.companyName,
        vehicleType: formData.vehicleType,
        location: formData.location,
        hasProfilePic: !!formData.profilePic,
      });

      const response = await axios.post(
        `${API_BASE_URL}/api/auth/update-profile`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      
      setUser(response.data);
      
      // Fix profile picture URL handling after update
      let updatedProfilePic;
      if (response.data.profilePic) {
        // If the profile pic path starts with http, use it directly
        if (response.data.profilePic.startsWith('http')) {
          updatedProfilePic = response.data.profilePic;
        } else {
          // Otherwise, prepend the API base URL
          updatedProfilePic = `${API_BASE_URL}${response.data.profilePic}`;
        }
      } else {
        updatedProfilePic = "https://via.placeholder.com/100";
      }
      
      setProfilePicPreview(updatedProfilePic);
      console.log("Updated profile picture URL after save:", updatedProfilePic);
      setIsEditing(false);
      setError("");
      window.dispatchEvent(new Event("userProfileUpdated"));
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.response?.data?.msg || err.message;
      setError(`Failed to update profile: ${errorMessage}`);
      console.error("Error updating profile:", err);
    }
  };

  const handleCancel = () => {
    setFormData({
      fullName: user?.fullName || "",
      email: user?.email || "",
      phoneNumber: user?.phoneNumber || "",
      companyName: user?.companyName || "",
      vehicleType: user?.vehicleType || "",
      location: user?.location || "",
    });
    
    // Fix profile picture URL handling for cancel
    let profilePicUrl;
    if (user?.profilePic) {
      // If the profile pic path starts with http, use it directly
      if (user.profilePic.startsWith('http')) {
        profilePicUrl = user.profilePic;
      } else {
        // Otherwise, prepend the API base URL
        profilePicUrl = `${API_BASE_URL}${user.profilePic}`;
      }
    } else {
      profilePicUrl = "https://via.placeholder.com/100";
    }
    
    setProfilePicPreview(profilePicUrl);
    setIsEditing(false);
    setError("");
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <Header />
        <div className="container mx-auto p-6 flex-grow">
          <p className="text-red-500 text-center">{error}</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <Header />
        <div className="container mx-auto p-6 flex-grow">
          <p className="text-gray-600 text-center">Loading...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <div className="container mx-auto p-6 flex-grow">
        <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Your Profile</h2>
          <div className="flex items-center mb-4">
            <div className="relative">
              <img
                src={profilePicPreview}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover mr-4 cursor-pointer"
                onClick={handleImageClick}
                onError={(e) => {
                  console.log("Profile picture failed to load:", profilePicPreview);
                  e.target.src = "https://via.placeholder.com/100"; // Fallback image
                }}
              />
              {isEditing && (
                <span className="absolute bottom-0 right-4 bg-yellow-600 text-white text-xs px-2 py-1 rounded-full">
                  Change
                </span>
              )}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
            </div>
            <div>
              {isEditing ? (
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="text-xl font-medium text-gray-700 border-b border-gray-300 focus:outline-none focus:border-yellow-600"
                />
              ) : (
                <h3 className="text-xl font-medium text-gray-700">{user.fullName}</h3>
              )}
              <p className="text-gray-600">{user.role}</p>
            </div>
          </div>
          <div className="space-y-2">
            <div>
              <strong>Email:</strong>{" "}
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="border-b border-gray-300 focus:outline-none focus:border-yellow-600 w-full"
                />
              ) : (
                user.email
              )}
            </div>
            <div>
              <strong>Phone:</strong>{" "}
              {isEditing ? (
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="border-b border-gray-300 focus:outline-none focus:border-yellow-600 w-full"
                />
              ) : (
                user.phoneNumber || "Not provided"
              )}
            </div>
            {user.role === "shipper" && (
              <div>
                <strong>Company:</strong>{" "}
                {isEditing ? (
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    className="border-b border-gray-300 focus:outline-none focus:border-yellow-600 w-full"
                />
                ) : (
                  user.companyName || "Not provided"
                )}
              </div>
            )}
            {user.role === "transporter" && (
              <div>
                <strong>Vehicle Type:</strong>{" "}
                {isEditing ? (
                  <input
                    type="text"
                    name="vehicleType"
                    value={formData.vehicleType}
                    onChange={handleInputChange}
                    className="border-b border-gray-300 focus:outline-none focus:border-yellow-600 w-full"
                  />
                ) : (
                  user.vehicleType || "Not provided"
                )}
              </div>
            )}
            <div>
              <strong>Location:</strong>{" "}
              {isEditing ? (
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="border-b border-gray-300 focus:outline-none focus:border-yellow-600 w-full"
                />
              ) : (
                user.location || "Not provided"
              )}
            </div>
          </div>
          <div className="mt-6 flex space-x-3">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
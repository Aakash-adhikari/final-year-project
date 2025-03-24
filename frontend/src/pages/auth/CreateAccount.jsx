import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import AuthHeader from "../auth/AuthHeader";
import Footer from "../../components/Footer";
import axios from "axios";

const CreateAccount = () => {
  const history = useNavigate();
  const [role, setRole] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    vehicleType: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedFormData = { ...formData, role };

    try {
      const response = await axios.post("http://localhost:5001/api/auth/create-account", updatedFormData);
      setSuccessMessage(response.data.msg);
      setError("");
      setFormData({ fullName: "", email: "", password: "", confirmPassword: "", companyName: "", vehicleType: "" });
      setRole("");
      setTimeout(() => history.push("/login"), 2000); // Redirect to login after 2s
    } catch (err) {
      setError(err.response?.data?.msg || "An error occurred. Please try again.");
      setSuccessMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <AuthHeader pageTitle="Create Account" userType="User" />
      <div className="container mx-auto p-8 flex-grow">
        <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800">Create an Account</h2>
            <p className="text-sm text-gray-600">Choose your role and fill in the details.</p>
          </div>

          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:outline-none"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:outline-none"
              placeholder="Enter your email address"
              required
            />
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">Account Type</label>
            <select
              id="role"
              name="role"
              value={role}
              onChange={handleRoleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:outline-none"
              required
            >
              <option value="" disabled>Select your role</option>
              <option value="shipper">Shipper</option>
              <option value="transporter">Transporter</option>
            </select>
          </div>

          {role === "shipper" && (
            <div>
              <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">Company Name</label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                placeholder="Enter your company name"
              />
            </div>
          )}

          {role === "transporter" && (
            <div>
              <label htmlFor="vehicleType" className="block text-sm font-medium text-gray-700">Vehicle Type</label>
              <input
                type="text"
                id="vehicleType"
                name="vehicleType"
                value={formData.vehicleType}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                placeholder="Enter your vehicle type (e.g., Truck)"
              />
            </div>
          )}

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:outline-none"
              placeholder="Enter your password"
              required
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:outline-none"
              placeholder="Confirm your password"
              required
            />
          </div>

          {error && <div className="text-red-500 text-sm">{error}</div>}
          {successMessage && <div className="text-green-500 text-sm">{successMessage}</div>}

          <button
            type="submit"
            className="w-full bg-yellow-600 text-white py-2 rounded-md hover:bg-yellow-700 transition-colors duration-300"
          >
            Create Account
          </button>

          <p className="text-center text-sm">
            Already have an account?{" "}
            <a href="/login" className="text-yellow-600 hover:text-yellow-700">Login</a>
          </p>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default CreateAccount;
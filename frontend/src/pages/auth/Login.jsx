import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthHeader from "../auth/AuthHeader";
import Footer from "../../components/Footer";

const Login = () => {
  const navigate = useNavigate(); // Use navigate instead of history
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await axios.post("http://localhost:5001/api/auth/login", {
        email: formData.email,
        password: formData.password,
      });
      localStorage.setItem("authToken", response.data.token);
      const { role } = response.data.user;

      // Navigate to the appropriate dashboard
      if (role === "shipper") {
        navigate("/shipper/dashboard");
      } else if (role === "transporter") {
        navigate("/transporter/dashboard");
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.msg || "Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <AuthHeader pageTitle="Login" userType="User" />
      <div className="container mx-auto p-6 flex-grow">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Login</h2>
          <p className="text-sm text-gray-600">Enter your credentials to access your account.</p>
        </div>

        {errorMessage && (
          <div className="bg-red-100 text-red-500 p-2 mb-4 rounded text-sm">{errorMessage}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
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

          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="rememberMe" className="text-sm text-gray-600">Remember Me</label>
            </div>
            <a href="/forgot-password" className="text-sm text-gray-600 hover:text-gray-800">Forgot Password?</a>
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-600 text-white py-2 rounded-md hover:bg-yellow-700 transition-colors duration-300"
          >
            Login
          </button>

          <p className="text-center text-sm">
            Don't have an account?{" "}
            <a href="/create-account" className="text-yellow-600 hover:text-yellow-700">Create Account</a>
          </p>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Login;

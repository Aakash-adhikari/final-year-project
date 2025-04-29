import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthHeader from "../auth/AuthHeader";
import Footer from "../../components/Footer";
import axios from "axios";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  fullName: yup
    .string()
    .required("Full name is required")
    .min(2, "Full name must be at least 2 characters")
    .matches(/^[a-zA-Z\s]+$/, "Full name can only contain letters and spaces"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  role: yup
    .string()
    .oneOf(["shipper", "transporter"], "Please select a valid role")
    .required("Role is required"),
  companyName: yup.string().when("role", {
    is: "shipper",
    then: (schema) =>
      schema
        .required("Company name is required for shippers")
        .min(3, "Company name must be at least 3 characters"),
    otherwise: (schema) => schema.notRequired(),
  }),
  vehicleType: yup.string().when("role", {
    is: "transporter",
    then: (schema) =>
      schema
        .required("Vehicle type is required for transporters")
        .min(3, "Vehicle type must be at least 3 characters"),
    otherwise: (schema) => schema.notRequired(),
  }),
  phoneNumber: yup
    .string()
    .matches(/^\+?\d{10,15}$|^$/, "Phone number must be 10-15 digits or empty"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain one uppercase, one lowercase, one number, and one special character"
    ),
  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

const CreateAccount = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    vehicleType: "",
    phoneNumber: "",
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
    setErrors({ ...errors, role: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    setSuccessMessage("");

    try {
      await validationSchema.validate({ ...formData, role }, { abortEarly: false });
      setErrors({});

      const updatedFormData = { ...formData, role };
      console.log("Submitting registration data:", updatedFormData);

      const response = await axios.post(
        "http://localhost:5001/api/auth/create-account",
        updatedFormData
      );
      setSuccessMessage(response.data.msg);

      // Store the token in localStorage for auto-login
      localStorage.setItem("authToken", response.data.token);

      setTimeout(() => navigate("/profile"), 2000); // Redirect to profile instead of login
    } catch (err) {
      if (err.name === "ValidationError") {
        const validationErrors = {};
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        setErrors(validationErrors);
      } else {
        const errorMessage = err.response?.data?.msg || err.response?.data?.error || err.message;
        setServerError(errorMessage);
        console.error("Error during registration:", err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <AuthHeader pageTitle="Create Account" userType="User" />
      <div className="container mx-auto p-8 flex-grow">
        <form
          onSubmit={handleSubmit}
          className="space-y-6 max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md"
        >
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800">Create an Account</h2>
            <p className="text-sm text-gray-600">
              Choose your role and fill in the details.
            </p>
          </div>

          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={`w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-yellow-500 focus:outline-none ${
                errors.fullName ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your full name"
            />
            {errors.fullName && (
              <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-yellow-500 focus:outline-none ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your email address"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number (Optional)
            </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className={`w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-yellow-500 focus:outline-none ${
                errors.phoneNumber ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your phone number"
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700"
            >
              Account Type
            </label>
            <select
              id="role"
              name="role"
              value={role}
              onChange={handleRoleChange}
              className={`w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-yellow-500 focus:outline-none ${
                errors.role ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="" disabled>
                Select your role
              </option>
              <option value="shipper">Shipper</option>
              <option value="transporter">Transporter</option>
            </select>
            {errors.role && (
              <p className="text-red-500 text-xs mt-1">{errors.role}</p>
            )}
          </div>

          {role === "shipper" && (
            <div>
              <label
                htmlFor="companyName"
                className="block text-sm font-medium text-gray-700"
              >
                Company Name
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className={`w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-yellow-500 focus:outline-none ${
                  errors.companyName ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your company name"
              />
              {errors.companyName && (
                <p className="text-red-500 text-xs mt-1">{errors.companyName}</p>
              )}
            </div>
          )}

          {role === "transporter" && (
            <div>
              <label
                htmlFor="vehicleType"
                className="block text-sm font-medium text-gray-700"
              >
                Vehicle Type
              </label>
              <input
                type="text"
                id="vehicleType"
                name="vehicleType"
                value={formData.vehicleType}
                onChange={handleChange}
                className={`w-full mt-1 pوں

2 border rounded-md focus:ring-2 focus:ring-yellow-500 focus:outline-none ${
                  errors.vehicleType ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your vehicle type (e.g., Truck)"
              />
              {errors.vehicleType && (
                <p className="text-red-500 text-xs mt-1">{errors.vehicleType}</p>
              )}
            </div>
          )}

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-yellow-500 focus:outline-none ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-yellow-500 focus:outline-none ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {serverError && <div className="text-red-500 text-sm">{serverError}</div>}
          {successMessage && (
            <div className="text-green-500 text-sm">{successMessage}</div>
          )}

          <button
            type="submit"
            className="w-full bg-yellow-600 text-white py-2 rounded-md hover:bg-yellow-700 transition-colors duration-300"
          >
            Create Account
          </button>

          <p className="text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-yellow-600 hover:text-yellow-700">
              Login
            </Link>
          </p>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default CreateAccount;
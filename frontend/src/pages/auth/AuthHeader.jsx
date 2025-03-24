import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

const AuthHeader = ({ pageTitle, userType }) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between p-4 bg-white border-b border-gray-300">
      {/* Back Button with Arrow */}
      <button
        onClick={() => navigate(-1)} // Go back to the previous page
        className="flex items-center text-gray-700 hover:text-gray-900 focus:outline-none transition duration-200"
      >
        <FiArrowLeft className="mr-2 text-xl" />
        <span className="font-medium text-sm">Back</span>
      </button>

      {/* Logo */}
      <Link to="/" className="flex items-center justify-center">
        <img src="/path/to/logo.png" alt="Logo" className="h-10 sm:h-12" />
      </Link>

      {/* Right Section: Links and Help */}
      <div className="flex items-center space-x-6">
        {/* Conditional Render: "Already have an account?" or "Create Account" */}
        {pageTitle === "Sign Up" ? (
          <Link
            to="/login"
            className="text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            Already have an account? Login
          </Link>
        ) : null}

        {/* "Need Help?" Link */}
        <Link
          to="/help"
          className="text-xs text-gray-500 hover:text-gray-700 transition duration-200"
        >
          Need Help?
        </Link>
      </div>
    </div>
  );
};

export default AuthHeader;

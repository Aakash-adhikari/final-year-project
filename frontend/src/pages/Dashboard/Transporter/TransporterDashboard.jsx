import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaTachometerAlt, FaSearch, FaEye, FaCog, FaBookmark, FaTruck } from "react-icons/fa";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import SearchLoads from "./SearchLoad";
import SavedLoads from "./SavedLoads";
import BookedLoads from "./BookedLoads";
import ViewBids from "./ViewBids"; // New component

const TransporterDashboard = () => {
  const [activeSection, setActiveSection] = useState("my-dashboard");

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <section className="py-12 bg-gray-50 flex-grow">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Transporter Dashboard</h2>
              <ul className="space-y-3">
                {[
                  { id: "my-dashboard", label: "My Dashboard", icon: <FaTachometerAlt /> },
                  { id: "search-loads", label: "Search Loads", icon: <FaSearch /> },
                  { id: "saved-loads", label: "Saved Loads", icon: <FaBookmark /> },
                  { id: "booked-loads", label: "Booked Loads", icon: <FaTruck /> },
                  { id: "view-bids", label: "View Bids", icon: <FaEye /> },
                  { id: "profile-settings", label: "Profile Settings", icon: <FaCog /> },
                ].map((item) => (
                  <li key={item.id}>
                    <Link
                      to="#"
                      onClick={() => setActiveSection(item.id)}
                      className={`flex items-center space-x-2 text-base font-medium ${
                        activeSection === item.id ? "text-yellow-600" : "text-gray-600"
                      } hover:text-yellow-600 transition-colors`}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-4 bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                {activeSection === "my-dashboard" && "Welcome to Your Dashboard"}
                {activeSection === "search-loads" && "Search Available Loads"}
                {activeSection === "saved-loads" && "Your Saved Loads"}
                {activeSection === "booked-loads" && "Your Booked Loads"}
                {activeSection === "view-bids" && "Your Bids"}
                {activeSection === "profile-settings" && "Profile Settings"}
              </h2>
              {activeSection === "my-dashboard" && (
                <p className="text-gray-600">Overview of your recent transport activity goes here.</p>
              )}
              {activeSection === "search-loads" && <SearchLoads />}
              {activeSection === "saved-loads" && <SavedLoads />}
              {activeSection === "booked-loads" && <BookedLoads />}
              {activeSection === "view-bids" && <ViewBids />}
              {activeSection === "profile-settings" && (
                <p className="text-gray-600">Update your profile details here.</p>
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default TransporterDashboard;
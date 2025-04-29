import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaTachometerAlt, FaPlusCircle, FaEye, FaCog, FaBoxOpen } from "react-icons/fa";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import PostYourLoad from "./Components/PostYourLoad";
import ViewLoads from "./Components/ViewLoads";
import Orders from "./Components/Orders";

const ShipperDashboard = () => {
  const [activeSection, setActiveSection] = useState("my-dashboard");

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <section className="py-12 bg-gray-50 flex-grow">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Shipper Dashboard</h2>
              <ul className="space-y-3">
                {[
                  { id: "my-dashboard", label: "My Dashboard", icon: <FaTachometerAlt /> },
                  { id: "post-load", label: "Post Load", icon: <FaPlusCircle /> },
                  { id: "view-loads", label: "View Loads", icon: <FaEye /> },
                  { id: "orders", label: "Orders", icon: <FaBoxOpen /> },
                  { id: "profile-settings", label: "Profile Settings", icon: <FaCog />, path: "/profile" },
                ].map((item) => (
                  <li key={item.id}>
                    <Link
                      to={item.path || "#"}
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

            {/* Main Content */}
            <div className="lg:col-span-4 bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                {activeSection === "my-dashboard" && "Welcome to Your Dashboard"}
                {activeSection === "post-load" && "Post Your Load"}
                {activeSection === "view-loads" && "View Your Loads"}
                {activeSection === "orders" && "Your Orders"}
                {activeSection === "profile-settings" && "Profile Settings"}
              </h2>

              {activeSection === "my-dashboard" && (
                <p className="text-gray-600">Overview of your recent shipping activity goes here.</p>
              )}
              {activeSection === "post-load" && <PostYourLoad />}
              {activeSection === "view-loads" && <ViewLoads />}
              {activeSection === "orders" && <Orders />}
              {activeSection === "profile-settings" && (
                <p className="text-gray-600">Redirecting to profile page...</p>
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ShipperDashboard;
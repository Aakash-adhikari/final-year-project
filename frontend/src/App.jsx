import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import LoginPage from './pages/auth/Login';
import CreateAccountPage from './pages/auth/CreateAccount';
import ServicePage from "./pages/Service/ServicePage"; 
import Dashboard from './pages/Dashboard/Shipper/ShipperDashboard';
import TransporterDashboard from './pages/Dashboard/Transporter/TransporterDashboard';
import GetStarted from './pages/Home/components/Getstarted';
import BrowseLoads from './pages/Home/components/BrowsePage/BrowseLoads';
import AboutUs from './pages/About/Aboutus'; 
import ContactUs from './pages/Contact/Contactus'; 
import Profile from './pages/auth/Profile'; 


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/create-account" element={<CreateAccountPage />} />
          <Route path="/services" element={<ServicePage />} />
          <Route path="/shipper/dashboard" element={<Dashboard />} />
          <Route path="/transporter/dashboard" element={<TransporterDashboard />} />
          <Route path="/get-started" element={<GetStarted />} />
          <Route path="/browse-loads" element={<BrowseLoads />} />
          <Route path="/about" element={<AboutUs />} /> 
          <Route path="/contact" element={<ContactUs />} /> 
          <Route path="/profile" element={<Profile />} /> 
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;

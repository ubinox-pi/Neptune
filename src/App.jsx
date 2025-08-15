import React from "react";
import GetStartedPage from "./pages/GetStartedPage";
import "./styles/get-started.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Services from "./pages/Services.jsx";
import Contact from "./pages/Contact.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import EmployeeDashboard from "./pages/EmployeeDashboard.jsx";
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div className="main-content">
          <Routes>
            <Route path="/" element={<GetStartedPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import logo from "../assets/Neptune Bank.png";

const EmployeeDashboard = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const navigate = useNavigate();

  const handleLogout = () => {
    // Handle logout logic here
    navigate("/login");
  };

  const sidebarItems = [
    { id: "overview", label: "Overview", icon: "📊" },
    { id: "customers", label: "Customer Management", icon: "👥" },
    { id: "accounts", label: "Account Operations", icon: "🏦" },
    { id: "transactions", label: "Transaction History", icon: "💳" },
    { id: "reports", label: "Reports", icon: "📈" },
    { id: "settings", label: "Settings", icon: "⚙️" },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return (
          <div className="content-section">
            <h2>Employee Dashboard Overview</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">👥</div>
                <div className="stat-info">
                  <h3>Total Customers</h3>
                  <p className="stat-number">1,247</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">💰</div>
                <div className="stat-info">
                  <h3>Daily Transactions</h3>
                  <p className="stat-number">$125,430</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">🏦</div>
                <div className="stat-info">
                  <h3>Active Accounts</h3>
                  <p className="stat-number">892</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">📈</div>
                <div className="stat-info">
                  <h3>Pending Approvals</h3>
                  <p className="stat-number">23</p>
                </div>
              </div>
            </div>
            <div className="recent-activities">
              <h3>Recent Activities</h3>
              <div className="activity-list">
                <div className="activity-item">
                  <span className="activity-time">10:30 AM</span>
                  <span className="activity-desc">
                    New account opened for John Smith
                  </span>
                </div>
                <div className="activity-item">
                  <span className="activity-time">10:15 AM</span>
                  <span className="activity-desc">
                    Transaction approved: $5,000
                  </span>
                </div>
                <div className="activity-item">
                  <span className="activity-time">09:45 AM</span>
                  <span className="activity-desc">
                    Customer inquiry resolved
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      case "customers":
        return (
          <div className="content-section">
            <h2>Customer Management</h2>
            <div className="customer-tools">
              <button className="action-btn primary">Add New Customer</button>
              <button className="action-btn secondary">Search Customers</button>
            </div>
            <div className="customer-table">
              <table>
                <thead>
                  <tr>
                    <th>Customer ID</th>
                    <th>Name</th>
                    <th>Account Type</th>
                    <th>Balance</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>C001</td>
                    <td>John Smith</td>
                    <td>Savings</td>
                    <td>$15,250</td>
                    <td>
                      <span className="status active">Active</span>
                    </td>
                    <td>
                      <button className="edit-btn">Edit</button>
                    </td>
                  </tr>
                  <tr>
                    <td>C002</td>
                    <td>Sarah Johnson</td>
                    <td>Checking</td>
                    <td>$3,890</td>
                    <td>
                      <span className="status active">Active</span>
                    </td>
                    <td>
                      <button className="edit-btn">Edit</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );
      default:
        return (
          <div className="content-section">
            <h2>
              {sidebarItems.find((item) => item.id === activeSection)?.label}
            </h2>
            <p>This section is under development.</p>
          </div>
        );
    }
  };

  return (
    <div className="employee-dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <img src={logo} alt="Neptune Bank" className="header-logo" />
          <h1>Employee Portal</h1>
        </div>
        <div className="header-right">
          <div className="employee-info">
            <span className="employee-name">Rajesh</span>
            <span className="employee-id">EMP001</span>
          </div>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </header>

      <div className="dashboard-content">
        {/* Sidebar */}
        <aside className="sidebar">
          <nav className="sidebar-nav">
            {sidebarItems.map((item) => (
              <motion.button
                key={item.id}
                className={`sidebar-item ${
                  activeSection === item.id ? "active" : ""
                }`}
                onClick={() => setActiveSection(item.id)}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="sidebar-icon">{item.icon}</span>
                <span className="sidebar-label">{item.label}</span>
              </motion.button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </main>
      </div>

      <style jsx>{`
        .employee-dashboard {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          font-family: "Roboto", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        }

        .dashboard-header {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          padding: 1rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .header-logo {
          height: 70px;
          width: auto;
        }

        .header-left h1 {
          color: #003366;
          font-size: 1.6rem;
          margin: 0;
          font-weight: 600;
          font-family: "Poppins", "Roboto", sans-serif;
          letter-spacing: -0.5px;
          background: linear-gradient(135deg, #003366, #667eea);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .employee-info {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }

        .employee-name {
          font-weight: 600;
          color: #003366;
        }

        .employee-id {
          font-size: 0.8rem;
          color: #666;
        }

        .logout-btn {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .logout-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .dashboard-content {
          display: flex;
          height: calc(100vh - 85px);
        }

        .sidebar {
          width: 280px;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(20px);
          padding: 2rem 0;
        }

        .sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          padding: 0 1rem;
        }

        .sidebar-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: transparent;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: left;
          width: 100%;
        }

        .sidebar-item:hover {
          background: rgba(102, 126, 234, 0.1);
        }

        .sidebar-item.active {
          background: rgba(102, 126, 234, 0.15);
          color: #004080;
          font-weight: 600;
        }

        .sidebar-icon {
          font-size: 1.2rem;
          width: 24px;
          text-align: center;
        }

        .sidebar-label {
          font-size: 0.95rem;
        }

        .main-content {
          flex: 1;
          padding: 2rem;
          overflow-y: auto;
        }

        .content-section {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 16px;
          padding: 2rem;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .content-section h2 {
          color: #003366;
          margin-bottom: 2rem;
          font-size: 1.8rem;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .stat-card {
          background: white;
          padding: 1.5rem;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 1rem;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
          border: 1px solid rgba(0, 0, 0, 0.05);
        }

        .stat-icon {
          font-size: 2rem;
          width: 60px;
          height: 60px;
          border-radius: 12px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .stat-info h3 {
          color: #666;
          font-size: 0.9rem;
          margin: 0 0 0.5rem 0;
          font-weight: 500;
        }

        .stat-number {
          color: #003366;
          font-size: 1.5rem;
          font-weight: 700;
          margin: 0;
        }

        .recent-activities {
          background: white;
          padding: 1.5rem;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
        }

        .recent-activities h3 {
          color: #003366;
          margin-bottom: 1rem;
        }

        .activity-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .activity-item {
          display: flex;
          gap: 1rem;
          padding: 0.75rem;
          background: #f8f9ff;
          border-radius: 8px;
          border-left: 3px solid #667eea;
        }

        .activity-time {
          color: #667eea;
          font-weight: 600;
          min-width: 80px;
          font-size: 0.9rem;
        }

        .activity-desc {
          color: #333;
          font-size: 0.9rem;
        }

        .customer-tools {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .action-btn {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .action-btn.primary {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
        }

        .action-btn.secondary {
          background: white;
          color: #667eea;
          border: 2px solid #667eea;
        }

        .action-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .customer-table {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        th {
          background: #f8f9ff;
          padding: 1rem;
          text-align: left;
          color: #003366;
          font-weight: 600;
          border-bottom: 1px solid #e1e8f0;
        }

        td {
          padding: 1rem;
          border-bottom: 1px solid #f0f0f0;
          color: #333;
        }

        .status.active {
          background: #e8f5e8;
          color: #2d5a2d;
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .edit-btn {
          background: #667eea;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.8rem;
          transition: all 0.3s ease;
        }

        .edit-btn:hover {
          background: #5a6fd8;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .dashboard-header {
            padding: 0.8rem 1rem;
            flex-direction: column;
            gap: 0.8rem;
          }

          .header-left {
            gap: 0.8rem;
          }

          .header-logo {
            height: 60px;
          }

          .header-left h1 {
            font-size: 1.4rem;
          }

          .header-right {
            width: 100%;
            justify-content: space-between;
          }

          .dashboard-content {
            flex-direction: column;
            height: auto;
          }

          .sidebar {
            width: 100%;
            order: 2;
          }

          .main-content {
            order: 1;
            padding: 1rem;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .customer-tools {
            flex-direction: column;
          }

          .customer-table {
            overflow-x: auto;
          }
        }

        @media (max-width: 480px) {
          .header-logo {
            height: 50px;
          }

          .header-left h1 {
            font-size: 1.2rem;
          }

          .sidebar-nav {
            flex-direction: row;
            overflow-x: auto;
            padding: 0 1rem;
          }

          .sidebar-item {
            min-width: 120px;
            flex-direction: column;
            gap: 0.5rem;
            padding: 0.75rem;
          }

          .sidebar-label {
            font-size: 0.8rem;
          }

          .content-section {
            padding: 1rem;
          }

          .stat-card {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
};

export default EmployeeDashboard;

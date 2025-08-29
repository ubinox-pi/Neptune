import React from 'react';
import { FiGrid, FiList, FiSend, FiBell, FiCreditCard } from 'react-icons/fi';
import '../styles/dashboard.css';

const items = [
  { key: 'overview', label: 'Overview', icon: <FiGrid size={18} /> },
  { key: 'transactions', label: 'Transactions', icon: <FiList size={18} /> },
  { key: 'transfer', label: 'Transfer Money', icon: <FiSend size={18} /> },
  { key: 'notifications', label: 'Notifications', icon: <FiBell size={18} /> },
  // Management
  { key: 'upi', label: 'UPI Management', icon: <FiCreditCard size={18} /> },
];

const Sidebar = ({ active, onSelect }) => {
  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        {items.map((it) => (
          <button
            key={it.key}
            className={`sidebar-item ${active === it.key ? 'active' : ''}`}
            onClick={() => onSelect(it.key)}
          >
            <span className="sidebar-icon">{it.icon}</span>
            <span>{it.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;

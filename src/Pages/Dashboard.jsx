import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/Neptune Bank.png';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showBalance, setShowBalance] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  const userProfile = {
    name: 'Rajesh Kumar',
    accountNumber: '****5678',
    customerId: 'NB123456789'
  };

  const accounts = [
    {
      type: 'Savings Account',
      accountNumber: '1234567890',
      balance: 2456780.50,
      status: 'Active'
    },
    {
      type: 'Current Account',
      accountNumber: '0987654321',
      balance: 856420.75,
      status: 'Active'
    },
    {
      type: 'Fixed Deposit',
      accountNumber: '5678901234',
      balance: 500000.00,
      status: 'Active'
    }
  ];

  const recentTransactions = [
    { id: 1, date: '2025-07-17', description: 'Online Transfer to Priya Sharma', amount: -15000, type: 'debit' },
    { id: 2, date: '2025-07-16', description: 'Salary Credit - TechCorp Ltd', amount: 85000, type: 'credit' },
    { id: 3, date: '2025-07-15', description: 'ATM Withdrawal - Andheri East', amount: -5000, type: 'debit' },
    { id: 4, date: '2025-07-14', description: 'UPI Payment - Amazon', amount: -2499, type: 'debit' },
    { id: 5, date: '2025-07-13', description: 'Refund - Flipkart', amount: 1200, type: 'credit' },
  ];

  const quickActions = [
    { title: 'Fund Transfer', icon: '💸' },
    { title: 'Bill Payment', icon: '⚡' },
    { title: 'Mobile Recharge', icon: '📱' },
    { title: 'Statements', icon: '📊' }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      fontFamily: 'Arial, sans-serif',
      margin: 0,
      padding: 0,
      position: 'relative',
      top: 0,
      left: 0,
      right: 0
    }}>
      {}
      <header style={{
        backgroundColor: 'white',
        padding: '1rem 2rem',
        borderBottom: '1px solid #ddd',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        margin: 0,
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <img src={logo} alt="Neptune Bank" style={{ height: '40px' }} />
            <h1 style={{ margin: 0, color: '#2563eb', fontSize: '1.5rem' }}>Neptune Bank</h1>
          </div>

          {}
          <nav style={{ display: 'flex', gap: '2rem' }} className="desktop-nav">
            <button
              onClick={() => setActiveTab('overview')}
              style={{
                background: activeTab === 'overview' ? '#2563eb' : 'transparent',
                color: activeTab === 'overview' ? 'white' : '#666',
                border: '1px solid #ddd',
                padding: '0.5rem 1rem',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('transactions')}
              style={{
                background: activeTab === 'transactions' ? '#2563eb' : 'transparent',
                color: activeTab === 'transactions' ? 'white' : '#666',
                border: '1px solid #ddd',
                padding: '0.5rem 1rem',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Transactions
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              style={{
                background: activeTab === 'profile' ? '#2563eb' : 'transparent',
                color: activeTab === 'profile' ? 'white' : '#666',
                border: '1px solid #ddd',
                padding: '0.5rem 1rem',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Profile
            </button>
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ color: '#666' }}>Hi, {userProfile.name.split(' ')[0]}</span>
            <button
              onClick={handleLogout}
              style={{
                backgroundColor: '#dc2626',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Logout
            </button>

            {}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="mobile-menu-btn"
              style={{
                display: 'none',
                background: '#2563eb',
                color: 'white',
                border: 'none',
                padding: '0.5rem',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              {isMobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {}
        {isMobileMenuOpen && (
          <div className="mobile-nav" style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#f9f9f9', borderRadius: '5px' }}>
            <button
              onClick={() => { setActiveTab('overview'); setIsMobileMenuOpen(false); }}
              style={{
                display: 'block',
                width: '100%',
                margin: '0.5rem 0',
                background: activeTab === 'overview' ? '#2563eb' : 'white',
                color: activeTab === 'overview' ? 'white' : '#666',
                border: '1px solid #ddd',
                padding: '0.75rem',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Dashboard
            </button>
            <button
              onClick={() => { setActiveTab('transactions'); setIsMobileMenuOpen(false); }}
              style={{
                display: 'block',
                width: '100%',
                margin: '0.5rem 0',
                background: activeTab === 'transactions' ? '#2563eb' : 'white',
                color: activeTab === 'transactions' ? 'white' : '#666',
                border: '1px solid #ddd',
                padding: '0.75rem',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Transactions
            </button>
            <button
              onClick={() => { setActiveTab('profile'); setIsMobileMenuOpen(false); }}
              style={{
                display: 'block',
                width: '100%',
                margin: '0.5rem 0',
                background: activeTab === 'profile' ? '#2563eb' : 'white',
                color: activeTab === 'profile' ? 'white' : '#666',
                border: '1px solid #ddd',
                padding: '0.75rem',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Profile
            </button>
          </div>
        )}
      </header>

      {}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem', marginTop: 0 }}>
        {activeTab === 'overview' && (
          <div>
            <h2 style={{ color: '#333', marginBottom: '2rem' }}>Dashboard Overview</h2>

            {}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
              {accounts.map((account, index) => (
                <div key={index} style={{
                  backgroundColor: 'white',
                  padding: '1.5rem',
                  borderRadius: '10px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                  border: '1px solid #e5e5e5'
                }}>
                  <h3 style={{ margin: '0 0 1rem 0', color: '#2563eb' }}>{account.type}</h3>
                  <p style={{ margin: '0.5rem 0', color: '#666' }}>Account: ****{account.accountNumber.slice(-4)}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                    <div>
                      <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#333' }}>
                        {showBalance ? formatCurrency(account.balance) : '****'}
                      </span>
                      <button
                        onClick={() => setShowBalance(!showBalance)}
                        style={{
                          marginLeft: '10px',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          fontSize: '1rem'
                        }}
                      >
                        {showBalance ? '👁️' : '👁️‍🗨️'}
                      </button>
                    </div>
                    <span style={{
                      backgroundColor: account.status === 'Active' ? '#10b981' : '#6b7280',
                      color: 'white',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '15px',
                      fontSize: '0.85rem'
                    }}>
                      {account.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {}
            <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', marginBottom: '2rem' }}>
              <h3 style={{ margin: '0 0 1rem 0', color: '#333' }}>Quick Actions</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
                {quickActions.map((action, index) => (
                  <button key={index} style={{
                    backgroundColor: '#f8f9fa',
                    border: '1px solid #e5e5e5',
                    padding: '1rem',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    textAlign: 'center',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#e9ecef'}
                  onMouseOut={(e) => e.target.style.backgroundColor = '#f8f9fa'}
                  >
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{action.icon}</div>
                    <div style={{ fontSize: '0.9rem', fontWeight: '500' }}>{action.title}</div>
                  </button>
                ))}
              </div>
            </div>

            {}
            <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ margin: 0, color: '#333' }}>Recent Transactions</h3>
                <button
                  onClick={() => setActiveTab('transactions')}
                  style={{
                    color: '#2563eb',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}
                >
                  View All
                </button>
              </div>
              {recentTransactions.slice(0, 5).map((transaction) => (
                <div key={transaction.id} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '1rem 0',
                  borderBottom: '1px solid #f0f0f0'
                }}>
                  <div>
                    <div style={{ fontWeight: '500', color: '#333' }}>{transaction.description}</div>
                    <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '0.25rem' }}>{transaction.date}</div>
                  </div>
                  <div style={{
                    fontWeight: 'bold',
                    color: transaction.type === 'credit' ? '#10b981' : '#ef4444'
                  }}>
                    {transaction.type === 'credit' ? '+' : '-'}{formatCurrency(Math.abs(transaction.amount))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'transactions' && (
          <div>
            <h2 style={{ color: '#333', marginBottom: '2rem' }}>All Transactions</h2>
            <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '1rem 0',
                  borderBottom: '1px solid #f0f0f0'
                }}>
                  <div>
                    <div style={{ fontWeight: '500', color: '#333' }}>{transaction.description}</div>
                    <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '0.25rem' }}>{transaction.date}</div>
                  </div>
                  <div style={{
                    fontWeight: 'bold',
                    color: transaction.type === 'credit' ? '#10b981' : '#ef4444'
                  }}>
                    {transaction.type === 'credit' ? '+' : '-'}{formatCurrency(Math.abs(transaction.amount))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div>
            <h2 style={{ color: '#333', marginBottom: '2rem' }}>Profile Information</h2>
            <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  backgroundColor: '#2563eb',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '2rem',
                  fontWeight: 'bold'
                }}>
                  {userProfile.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>{userProfile.name}</h3>
                  <p style={{ margin: 0, color: '#666' }}>Customer ID: {userProfile.customerId}</p>
                  <p style={{ margin: 0, color: '#666' }}>Account: {userProfile.accountNumber}</p>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                <div style={{ padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
                  <strong style={{ color: '#333' }}>Name:</strong>
                  <div style={{ marginTop: '0.5rem', color: '#666' }}>{userProfile.name}</div>
                </div>
                <div style={{ padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
                  <strong style={{ color: '#333' }}>Customer ID:</strong>
                  <div style={{ marginTop: '0.5rem', color: '#666' }}>{userProfile.customerId}</div>
                </div>
                <div style={{ padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
                  <strong style={{ color: '#333' }}>Account:</strong>
                  <div style={{ marginTop: '0.5rem', color: '#666' }}>{userProfile.accountNumber}</div>
                </div>
                <div style={{ padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
                  <strong style={{ color: '#333' }}>Status:</strong>
                  <div style={{ marginTop: '0.5rem', color: '#10b981' }}>Active</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          
          .mobile-menu-btn {
            display: block !important;
          }
        }

        @media (min-width: 769px) {
          .mobile-nav {
            display: none !important;
          }
          
          .mobile-menu-btn {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;

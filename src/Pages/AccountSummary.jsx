import React from 'react';

const maskAccount = (num) => `**** ${String(num).slice(-4)}`;

const AccountSummary = ({ accounts = [], showBalance = true, onToggleShowBalance, formatCurrency = (n) => n }) => {
  if (!accounts.length) {
    return <div className="text-muted">No accounts available.</div>;
  }

  return (
    <div className="dashboard-grid cols-3">
      {accounts.map((acc, idx) => (
        <div key={idx} className="dashboard-card" style={{ border: '1px solid #eef2f7' }}>
          <div className="flex justify-between align-center mb-2">
            <h4 style={{ margin: 0, color: '#2563eb' }}>{acc.type}</h4>
            <span className={`status-badge ${acc.status?.toLowerCase() === 'active' ? 'active' : 'inactive'}`}>{acc.status || 'Inactive'}</span>
          </div>
          <div className="text-muted mb-2">Account: {maskAccount(acc.accountNumber)}</div>
          <div className="flex justify-between align-center">
            <div>
              <div className="font-bold" style={{ fontSize: 20, color: '#111827' }}>
                {showBalance ? formatCurrency(acc.balance) : '*****'}
              </div>
              <div className="text-muted" style={{ fontSize: 12 }}>Available balance</div>
            </div>
            <button className="dashboard-btn secondary" onClick={onToggleShowBalance}>
              {showBalance ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AccountSummary;


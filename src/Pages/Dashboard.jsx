import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/Neptune Bank.png';
import '../styles/dashboard.css';
import SpendingChart from './SpendingChart.jsx';
import Sidebar from './Sidebar.jsx';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showBalance, setShowBalance] = useState(true);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [transferForm, setTransferForm] = useState({ recipient: '', amount: '', remarks: '' });
  const [notifications, setNotifications] = useState([
    { id: 1, date: '2025-08-20', title: 'Statement Ready', text: 'Your monthly statement is now available.' },
    { id: 2, date: '2025-08-18', title: 'Login Alert', text: 'New login from Chrome on Windows.' },
  ]);
  const [showBanner, setShowBanner] = useState(true);
  const [lastLogin, setLastLogin] = useState('');
  const [showTimeoutModal, setShowTimeoutModal] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // UPI Management state: history and limit
  const [upiHistory] = useState(() => [
    { id: 'upi-1', date: '2025-08-22', merchant: 'Amazon', vpa: 'pay.amazon@upi', amount: -2499, status: 'Success' },
    { id: 'upi-2', date: '2025-08-20', merchant: 'Swiggy', vpa: 'swiggy@sbi', amount: -589, status: 'Success' },
    { id: 'upi-3', date: '2025-08-18', merchant: 'Phone Recharge', vpa: 'airtel@icici', amount: -399, status: 'Success' },
    { id: 'upi-4', date: '2025-08-15', merchant: 'Zomato', vpa: 'zomato@axis', amount: -842, status: 'Success' },
    { id: 'upi-5', date: '2025-08-12', merchant: 'IRCTC', vpa: 'irctc@hdfcbank', amount: -1340, status: 'Success' },
    { id: 'upi-6', date: '2025-08-10', merchant: 'UPI Collect - Rohan Mehta', vpa: 'rohan@ybl', amount: -1500, status: 'Success' },
    { id: 'upi-7', date: '2025-08-08', merchant: 'Electricity Bill', vpa: 'mahadiscom@upi', amount: -1785, status: 'Success' },
  ]);
  const [upiDailyLimit, setUpiDailyLimit] = useState(() => {
    try {
      const saved = localStorage.getItem('upiDailyLimit');
      return saved ? parseInt(saved, 10) : 20000; // default INR 20,000 daily
    } catch {
      return 20000;
    }
  });
  const [pendingUpiLimit, setPendingUpiLimit] = useState(upiDailyLimit);
  useEffect(() => { setPendingUpiLimit(upiDailyLimit); }, [upiDailyLimit]);

  // Sync tab from query string
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    if (tab && tab !== activeTab) setActiveTab(tab);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  const userProfile = {
    name: 'Rajesh Kumar',
    accountNumber: '****5678',
    customerId: 'NB123456789'
  };

  const primaryAccount = {
    type: 'Savings Account',
    accountNumber: '1234567890',
    balance: 2456780.50,
    status: 'Active',
    branch: 'Andheri East, Mumbai',
    ifsc: 'NEPT0001234'
  };

  const [recentTransactions, setRecentTransactions] = useState([
    { id: 1, date: '2025-07-17', description: 'Online Transfer to Priya Sharma', amount: -15000, type: 'debit', status: 'Success' },
    { id: 2, date: '2025-07-16', description: 'Salary Credit - TechCorp Ltd', amount: 85000, type: 'credit', status: 'Success' },
    { id: 3, date: '2025-07-15', description: 'ATM Withdrawal - Andheri East', amount: -5000, type: 'debit', status: 'Success' },
    { id: 4, date: '2025-07-14', description: 'UPI Payment - Amazon', amount: -2499, type: 'debit', status: 'Success' },
    { id: 5, date: '2025-07-13', description: 'Refund - Flipkart', amount: 1200, type: 'credit', status: 'Success' },
  ]);

  // Last login init (simulate if missing)
  useEffect(() => {
    try {
      const saved = localStorage.getItem('lastLogin');
      if (saved) {
        setLastLogin(new Date(saved).toLocaleString());
      } else {
        const nowIso = new Date().toISOString();
        localStorage.setItem('lastLogin', nowIso);
        setLastLogin(new Date(nowIso).toLocaleString());
      }
    } catch (e) { /* ignore */ }
  }, []);

  // Idle session timeout (demo: 10 minutes). Extend resets timer.
  useEffect(() => {
    const TIMEOUT_MS = 10 * 60 * 1000; // 10 minutes
    let lastActivity = Date.now();
    const onActivity = () => { lastActivity = Date.now(); };
    const iv = setInterval(() => {
      if (Date.now() - lastActivity > TIMEOUT_MS) setShowTimeoutModal(true);
    }, 30 * 1000);
    window.addEventListener('mousemove', onActivity);
    window.addEventListener('keydown', onActivity);
    window.addEventListener('touchstart', onActivity);
    return () => {
      clearInterval(iv);
      window.removeEventListener('mousemove', onActivity);
      window.removeEventListener('keydown', onActivity);
      window.removeEventListener('touchstart', onActivity);
    };
  }, []);

  const extendSession = () => {
    setShowTimeoutModal(false);
  };

  // Helpers for currency and UPI limit adjustments
  const formatCurrency = (amount) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
  const clampUpiLimit = (v) => {
    const min = 1000; // INR 1,000
    const max = 100000; // INR 1,00,000 daily
    const step = 500; // adjust in 500s
    if (Number.isNaN(v)) return upiDailyLimit;
    const rounded = Math.round(v / step) * step;
    return Math.min(max, Math.max(min, rounded));
  };
  const applyUpiLimitChange = (delta) => setPendingUpiLimit((prev) => clampUpiLimit(prev + delta));
  const saveUpiLimit = () => {
    const next = clampUpiLimit(pendingUpiLimit);
    setUpiDailyLimit(next);
    try { localStorage.setItem('upiDailyLimit', String(next)); } catch (e) { /* ignore */ }
    setNotifications((n) => [{ id: Date.now(), date: new Date().toISOString().slice(0,10), title: 'UPI Limit Updated', text: `Your UPI daily limit is now ${formatCurrency(next)}.` }, ...n]);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  const handleTransferChange = (e) => {
    const { name, value } = e.target;
    setTransferForm((f) => ({ ...f, [name]: value }));
  };

  const validateTransfer = () => {
    const { recipient, amount } = transferForm;
    if (!recipient || !/^\d{8,18}$/.test(recipient)) return 'Enter a valid recipient account number (8-18 digits).';
    const amt = parseFloat(amount);
    if (Number.isNaN(amt) || amt <= 0) return 'Enter a valid amount greater than 0.';
    return '';
  };

  const submitTransfer = (e) => {
    e?.preventDefault?.();
    const err = validateTransfer();
    if (err) return alert(err);
    const amt = parseFloat(transferForm.amount);
    const newTxn = { id: Date.now(), date: new Date().toISOString().slice(0, 10), description: `Transfer to ${transferForm.recipient}`, amount: -Math.abs(amt), type: 'debit', status: 'Success' };
    setRecentTransactions((tx) => [newTxn, ...tx].slice(0, 50));
    setNotifications((n) => [{ id: Date.now() + 1, date: new Date().toISOString().slice(0,10), title: 'Transfer Successful', text: `${formatCurrency(amt)} sent to ${transferForm.recipient}` }, ...n]);
    setTransferForm({ recipient: '', amount: '', remarks: '' });
    alert('Transfer submitted (demo).');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-light)', fontFamily: 'Arial, sans-serif', margin: 0, padding: 0, position: 'relative', top: 0, left: 0, right: 0 }}>
      {/* Accessibility skip link */}
      <a href="#main-content" className="skip-link">Skip to main content</a>

      {/* Header */}
      <header className="header-accent" style={{ backgroundColor: 'white', padding: '1rem 2rem', borderBottom: '1px solid #ddd', position: 'sticky', top: 0, zIndex: 100, margin: 0, width: '100%', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <img src={logo} alt="Neptune Bank" style={{ height: '40px' }} />
            <h1 style={{ margin: 0, color: 'var(--text-dark)', fontSize: '1.5rem' }}>Neptune Bank</h1>
          </div>

          <div className="header-actions">
            <button className="dashboard-btn secondary" onClick={() => setShowBalance((v) => !v)}>{showBalance ? 'Hide balance' : 'Show balance'}</button>
            <div className="profile-pill" onClick={() => setShowProfileMenu((v) => !v)}>
              <span className="avatar">{userProfile.name.split(' ').map(n => n[0]).join('')}</span>
              <span style={{ color: 'var(--text-dark)', fontWeight: 600 }}>{userProfile.name.split(' ')[0]}</span>
            </div>
            {showProfileMenu && (
              <div className="dropdown">
                <button onClick={() => { setActiveTab('profile'); setShowProfileMenu(false); }}>Profile</button>
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Content */}
      <main id="main-content" style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem', marginTop: 0 }}>
        {/* Security / Fraud banner */}
        {showBanner && (
          <div className="banner" style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span aria-hidden>🔒</span>
              <span>Beware of fraud: Neptune Bank will never ask for your OTP, CVV, or UPI PIN. Do not share sensitive information.</span>
            </div>
            <button className="banner-action" onClick={() => setShowBanner(false)} aria-label="Dismiss security notice">✕</button>
          </div>
        )}

        {/* Last login */}
        <div className="text-muted" style={{ fontSize: 13, marginBottom: '0.75rem' }}>Last login: {lastLogin || '—'}</div>

        <div className="dashboard-layout">
          <Sidebar active={activeTab} onSelect={(k) => setActiveTab(k)} />

          <div className="main-panel">
            {activeTab === 'overview' && (
              <div>
                <h2 style={{ color: 'var(--text-dark)', marginBottom: '1.25rem' }}>Overview</h2>

                {/* Account Overview */}
                <div className="dashboard-card" style={{ marginBottom: '1.5rem' }}>
                  <h3 className="section-title">Account Overview</h3>
                  <p className="section-subtitle">Primary account details</p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                    <div><div className="text-muted">Account Type</div><div style={{ color: 'var(--text-dark)', fontWeight: 600 }}>{primaryAccount.type}</div></div>
                    <div><div className="text-muted">Account Number</div><div style={{ color: 'var(--text-dark)', fontWeight: 600 }}>**** {primaryAccount.accountNumber.slice(-4)}</div></div>
                    <div><div className="text-muted">Branch</div><div style={{ color: 'var(--text-dark)', fontWeight: 600 }}>{primaryAccount.branch}</div></div>
                    <div><div className="text-muted">IFSC</div><div style={{ color: 'var(--text-dark)', fontWeight: 600 }}>{primaryAccount.ifsc}</div></div>
                  </div>
                  <div style={{ marginTop: '1rem', fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-dark)' }}>{showBalance ? formatCurrency(primaryAccount.balance) : '****'}</div>
                </div>

                {/* Spending Chart (moved above Recent Transactions) */}
                <div className="dashboard-card" style={{ marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h3 className="section-title">Spending This Year</h3>
                    <span className="section-subtitle">Monthly overview</span>
                  </div>
                  <SpendingChart height={320} currency="INR" />
                </div>

                {/* Recent Transactions */}
                <div className="dashboard-card" style={{ marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h3 className="section-title">Recent Transactions</h3>
                  </div>
                  {recentTransactions.slice(0, 5).map((transaction) => (
                    <div key={transaction.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 0', borderBottom: '1px solid #f0f0f0' }}>
                      <div>
                        <div style={{ fontWeight: '500', color: 'var(--text-dark)' }}>{transaction.description}</div>
                        <div className="text-muted" style={{ fontSize: '0.85rem', marginTop: '0.25rem' }}>{transaction.date} • {transaction.status}</div>
                      </div>
                      <div style={{ fontWeight: 'bold', color: transaction.type === 'credit' ? '#10b981' : '#ef4444' }}>{transaction.type === 'credit' ? '+' : '-'}{formatCurrency(Math.abs(transaction.amount))}</div>
                    </div>
                  ))}
                </div>

                {/* Bottom CTA: View All Transactions */}
                <div className="bottom-cta">
                  <button className="btn-gradient" onClick={() => setActiveTab('transactions')}>View All Transactions</button>
                </div>
              </div>
            )}

            {activeTab === 'transactions' && (
              <div>
                <h2 style={{ color: 'var(--text-dark)', marginBottom: '1.25rem' }}>All Transactions</h2>
                <div className="dashboard-card">
                  {recentTransactions.map((transaction) => (
                    <div key={transaction.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 0', borderBottom: '1px solid #f0f0f0' }}>
                      <div>
                        <div style={{ fontWeight: '500', color: 'var(--text-dark)' }}>{transaction.description}</div>
                        <div className="text-muted" style={{ fontSize: '0.85rem', marginTop: '0.25rem' }}>{transaction.date} • {transaction.status}</div>
                      </div>
                      <div style={{ fontWeight: 'bold', color: transaction.type === 'credit' ? '#10b981' : '#ef4444' }}>{transaction.type === 'credit' ? '+' : '-'}{formatCurrency(Math.abs(transaction.amount))}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'transfer' && (
              <div>
                <h2 style={{ color: 'var(--text-dark)', marginBottom: '1.25rem' }}>Transfer Money</h2>
                <div className="dashboard-card">
                  <h3 className="section-title">Send a Transfer</h3>
                  <p className="section-subtitle">Enter details below</p>
                  <form onSubmit={submitTransfer} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
                    <div><label className="text-muted">Recipient Account</label><input className="form-input" name="recipient" value={transferForm.recipient} onChange={handleTransferChange} placeholder="e.g., 987654321098" /></div>
                    <div><label className="text-muted">Amount</label><input className="form-input" name="amount" value={transferForm.amount} onChange={handleTransferChange} placeholder="e.g., 2500" /></div>
                    <div><label className="text-muted">Remarks</label><input className="form-input" name="remarks" value={transferForm.remarks} onChange={handleTransferChange} placeholder="Optional" /></div>
                    <div style={{ alignSelf: 'end' }}><button type="submit" className="btn-gradient">Send</button></div>
                  </form>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div>
                <h2 style={{ color: 'var(--text-dark)', marginBottom: '1.25rem' }}>Notifications</h2>
                <div className="dashboard-card">
                  {notifications.length === 0 && (<div className="text-muted">You're all caught up.</div>)}
                  {notifications.map((n) => (
                    <div key={n.id} style={{ padding: '0.9rem 0', borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ fontWeight: 600, color: 'var(--text-dark)' }}>{n.title}</div>
                        <div className="text-muted" style={{ fontSize: 12 }}>{n.text}</div>
                      </div>
                      <div className="text-muted" style={{ fontSize: 12 }}>{n.date}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'profile' && (
              <div>
                <h2 style={{ color: 'var(--text-dark)', marginBottom: '1.25rem' }}>Profile</h2>
                <div className="dashboard-card">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    <div className="avatar" style={{ width: 56, height: 56, fontSize: 18 }}>{userProfile.name.split(' ').map(n => n[0]).join('')}</div>
                    <div>
                      <div style={{ fontWeight: 700, color: 'var(--text-dark)' }}>{userProfile.name}</div>
                      <div className="text-muted">Customer ID: {userProfile.customerId}</div>
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                    <div className="dashboard-card" style={{ padding: '1rem' }}><div className="text-muted">Primary Account</div><div style={{ color: 'var(--text-dark)', fontWeight: 600 }}>**** {primaryAccount.accountNumber.slice(-4)}</div></div>
                    <div className="dashboard-card" style={{ padding: '1rem' }}><div className="text-muted">Branch</div><div style={{ color: 'var(--text-dark)', fontWeight: 600 }}>{primaryAccount.branch}</div></div>
                    <div className="dashboard-card" style={{ padding: '1rem' }}><div className="text-muted">IFSC</div><div style={{ color: 'var(--text-dark)', fontWeight: 600 }}>{primaryAccount.ifsc}</div></div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'upi' && (
              <div>
                <h2 style={{ color: 'var(--text-dark)', marginBottom: '1.25rem' }}>UPI Management</h2>

                {/* UPI Payment History */}
                <div className="dashboard-card" style={{ marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <h3 className="section-title" style={{ margin: 0 }}>UPI Payment History</h3>
                    <span className="section-subtitle">Last {upiHistory.length} payments</span>
                  </div>

                  {upiHistory.length === 0 && (
                    <div className="text-muted">No UPI payments found.</div>
                  )}

                  {upiHistory.map((t) => (
                    <div key={t.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.9rem 0', borderBottom: '1px solid #f0f0f0' }}>
                      <div>
                        <div style={{ fontWeight: 600, color: 'var(--text-dark)' }}>{t.merchant}</div>
                        <div className="text-muted" style={{ fontSize: 12 }}>{t.date} • {t.vpa}</div>
                      </div>
                      <div style={{ fontWeight: 700, color: '#ef4444' }}>-{formatCurrency(Math.abs(t.amount))}</div>
                    </div>
                  ))}
                </div>

                {/* UPI Daily Limit */}
                <div className="dashboard-card">
                  <h3 className="section-title" style={{ marginTop: 0 }}>UPI Daily Limit</h3>
                  <p className="section-subtitle">Control your daily UPI spend. Changes are effective immediately.</p>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                      <button className="dashboard-btn secondary" onClick={() => applyUpiLimitChange(-500)} aria-label="Decrease UPI daily limit by 500">-500</button>
                      <div style={{ fontWeight: 700, fontSize: 20, color: 'var(--text-dark)' }}>{formatCurrency(pendingUpiLimit)}</div>
                      <button className="dashboard-btn secondary" onClick={() => applyUpiLimitChange(500)} aria-label="Increase UPI daily limit by 500">+500</button>
                    </div>

                    <input
                      type="range"
                      min={1000}
                      max={100000}
                      step={500}
                      value={pendingUpiLimit}
                      onChange={(e) => setPendingUpiLimit(clampUpiLimit(parseInt(e.target.value, 10)))}
                      aria-label="UPI daily limit slider"
                    />

                    <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                      <input
                        className="form-input"
                        style={{ maxWidth: 200 }}
                        value={pendingUpiLimit}
                        onChange={(e) => setPendingUpiLimit(clampUpiLimit(parseInt(e.target.value.replace(/[^0-9]/g, ''), 10)))}
                        inputMode="numeric"
                        aria-label="UPI daily limit input in INR"
                      />
                      <span className="text-muted" style={{ fontSize: 12 }}>Min ₹1,000 • Max ₹1,00,000 • Step ₹500</span>
                    </div>

                    <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                      <button className="dashboard-btn secondary" onClick={() => setPendingUpiLimit(upiDailyLimit)}>Reset</button>
                      <button className="btn-gradient" onClick={saveUpiLimit} disabled={pendingUpiLimit === upiDailyLimit}>Save</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Floating Help */}
      <button className="floating-help-btn" onClick={() => setHelpOpen(true)} aria-haspopup="dialog" aria-expanded={helpOpen}>Need help?</button>
      {helpOpen && (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Help and support">
          <div className="modal-card">
            <h3 className="section-title" style={{ marginTop: 0 }}>Help & Support</h3>
            <p className="text-muted">How can we assist you today?</p>
            <div style={{ display: 'grid', gap: 8, marginTop: 10 }}>
              <a className="dashboard-btn secondary" href="/contact">Contact Support</a>
              <a className="dashboard-btn secondary" href="tel:+1800123456">Call 1800-123-456</a>
              <button className="btn-gradient" onClick={() => setHelpOpen(false)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Session timeout modal */}
      {showTimeoutModal && (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Session timeout">
          <div className="modal-card">
            <h3 className="section-title" style={{ marginTop: 0 }}>Session Timeout</h3>
            <p className="text-muted">For your security, your session is about to expire due to inactivity.</p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 10 }}>
              <button className="dashboard-btn secondary" onClick={() => { setShowTimeoutModal(false); navigate('/login'); }}>Logout</button>
              <button className="btn-gradient" onClick={extendSession}>Continue Session</button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer style={{ marginTop: '2rem', padding: '1rem 2rem', background: '#fff', borderTop: '1px solid #e9eef5' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <div className="text-muted" style={{ fontSize: 13 }}>© {new Date().getFullYear()} Neptune Bank. All rights reserved.</div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', color: 'var(--text-medium)', fontSize: 13 }}>
            <span aria-hidden>🔒</span>
            <span>128-bit SSL secured</span>
            <a href="/services" className="text-primary" style={{ textDecoration: 'none' }}>Terms</a>
            <a href="/services" className="text-primary" style={{ textDecoration: 'none' }}>Privacy</a>
          </div>
        </div>
      </footer>

      <style>{`
        @media (max-width: 768px) { .desktop-nav { display: none !important; } .mobile-menu-btn { display: block !important; } }
        @media (min-width: 769px) { .mobile-nav { display: none !important; } .mobile-menu-btn { display: none !important; } }
      `}</style>
    </div>
  );
};

export default Dashboard;

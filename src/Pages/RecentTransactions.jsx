import React from 'react';
import { FiArrowDownRight, FiArrowUpRight } from 'react-icons/fi';

const Row = ({ t, formatCurrency }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 0', borderBottom: '1px solid #f0f2f5' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <div style={{
        width: 36,
        height: 36,
        borderRadius: 8,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: t.type === 'credit' ? '#ecfdf5' : '#fef2f2',
        color: t.type === 'credit' ? '#10b981' : '#ef4444',
      }}>
        {t.type === 'credit' ? <FiArrowDownRight size={18} /> : <FiArrowUpRight size={18} />}
      </div>
      <div>
        <div style={{ fontWeight: 500, color: '#111827' }}>{t.description}</div>
        <div className="text-muted" style={{ fontSize: 12 }}>{t.date}</div>
      </div>
    </div>
    <div style={{ fontWeight: 700, color: t.type === 'credit' ? '#10b981' : '#ef4444' }}>
      {t.type === 'credit' ? '+' : '-'}{formatCurrency(Math.abs(t.amount))}
    </div>
  </div>
);

const RecentTransactions = ({ transactions = [], limit, formatCurrency = (n) => n }) => {
  const list = Array.isArray(transactions) ? (limit ? transactions.slice(0, limit) : transactions) : [];

  if (!list.length) {
    return <div className="text-muted">No recent transactions.</div>;
  }

  return (
    <div>
      {list.map((t) => (
        <Row key={t.id} t={t} formatCurrency={formatCurrency} />
      ))}
    </div>
  );
};

export default RecentTransactions;


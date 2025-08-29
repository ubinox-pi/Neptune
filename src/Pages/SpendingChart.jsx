import React, { useMemo } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

/**
 * SpendingChart
 * Props:
 * - data?: Array<{ name: string; spend: number }>
 * - height?: number (default 320)
 * - currency?: string (default 'INR')
 * - color?: string (default '#2563eb')
 */
const SpendingChart = ({ data, height = 320, currency = 'INR', color = '#2563eb' }) => {
  const chartData = useMemo(() => {
    if (Array.isArray(data) && data.length) return data;
    // Fallback demo data (monthly)
    return [
      { name: 'Jan', spend: 32000 },
      { name: 'Feb', spend: 28000 },
      { name: 'Mar', spend: 35000 },
      { name: 'Apr', spend: 30000 },
      { name: 'May', spend: 42000 },
      { name: 'Jun', spend: 38000 },
      { name: 'Jul', spend: 45000 },
      { name: 'Aug', spend: 41000 },
      { name: 'Sep', spend: 39000 },
      { name: 'Oct', spend: 47000 },
      { name: 'Nov', spend: 44000 },
      { name: 'Dec', spend: 49000 },
    ];
  }, [data]);

  const formatCurrency = (val) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency }).format(val);

  if (!chartData?.length) {
    return <div className="text-muted">No spending data available.</div>;
  }

  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="spendGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.35} />
              <stop offset="95%" stopColor={color} stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#eef2f7" />
          <XAxis
            dataKey="name"
            tick={{ fill: '#6b7280', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: '#6b7280', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => formatCurrency(v).replace(/\.?00$/, '')}
          />
          <Tooltip
            formatter={(value) => [formatCurrency(value), 'Spending']}
            contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb' }}
          />
          <Area type="monotone" dataKey="spend" stroke={color} strokeWidth={2} fill="url(#spendGradient)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SpendingChart;

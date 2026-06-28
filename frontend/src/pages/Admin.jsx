import { useEffect, useState } from 'react';
import { adminService } from '../services/expenseService.js';
import { formatCurrency, formatDate } from '../utils/format.js';

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    adminService.users().then(setUsers).catch(() => setUsers([]));
    adminService.stats().then(setStats).catch(() => setStats(null));
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Total Users" value={stats?.totalUsers ?? users.length} />
        <Stat label="Total Expenses" value={stats?.totalExpenses ?? '—'} />
        <Stat label="Total Volume" value={formatCurrency(stats?.totalVolume ?? 0)} />
      </div>

      <div className="bg-white border rounded-xl overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="text-left p-3">Email</th>
              <th className="text-left p-3">Name</th>
              <th className="text-left p-3">Joined</th>
              <th className="text-right p-3">Total Spent</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {users.map(u => (
              <tr key={u.id}>
                <td className="p-3">{u.email}</td>
                <td className="p-3">{u.name}</td>
                <td className="p-3">{formatDate(u.createdAt)}</td>
                <td className="p-3 text-right font-semibold">{formatCurrency(u.totalSpent || 0)}</td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr><td colSpan="4" className="p-6 text-center text-slate-500">No users.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="bg-white border rounded-xl p-4">
      <div className="text-sm text-slate-500">{label}</div>
      <div className="text-2xl font-bold text-brand-700">{value}</div>
    </div>
  );
}

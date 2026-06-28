import { useEffect, useState } from 'react';
import { savingsService } from '../services/expenseService.js';
import { formatCurrency } from '../utils/format.js';
import toast from 'react-hot-toast';

export default function Savings() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ goal: '', targetAmount: '', savedAmount: '0' });

  const load = () => savingsService.list().then(setItems).catch(() => setItems([]));
  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await savingsService.create({ ...form, targetAmount: Number(form.targetAmount), savedAmount: Number(form.savedAmount) });
      toast.success('Goal added'); setForm({ goal: '', targetAmount: '', savedAmount: '0' }); load();
    } catch { toast.error('Failed'); }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Savings Goals</h1>
      <form onSubmit={submit} className="bg-white border rounded-xl p-4 grid sm:grid-cols-4 gap-2">
        <input className="border rounded-md px-3 py-2 text-sm" placeholder="Goal name"
          value={form.goal} onChange={e => setForm({ ...form, goal: e.target.value })} required />
        <input className="border rounded-md px-3 py-2 text-sm" type="number" placeholder="Target"
          value={form.targetAmount} onChange={e => setForm({ ...form, targetAmount: e.target.value })} required />
        <input className="border rounded-md px-3 py-2 text-sm" type="number" placeholder="Saved so far"
          value={form.savedAmount} onChange={e => setForm({ ...form, savedAmount: e.target.value })} />
        <button className="bg-brand-600 hover:bg-brand-700 text-white rounded-md text-sm">Add</button>
      </form>

      <div className="grid gap-3 sm:grid-cols-2">
        {items.map(g => {
          const pct = Math.min(100, Math.round((g.savedAmount / g.targetAmount) * 100));
          return (
            <div key={g.id} className="bg-white border rounded-xl p-4">
              <div className="flex justify-between mb-2">
                <span className="font-medium">{g.goal}</span>
                <span className="text-sm text-slate-500">{formatCurrency(g.savedAmount)} / {formatCurrency(g.targetAmount)}</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500" style={{ width: `${pct}%` }} />
              </div>
            </div>
          );
        })}
        {items.length === 0 && <p className="text-sm text-slate-500">No goals yet.</p>}
      </div>
    </div>
  );
}

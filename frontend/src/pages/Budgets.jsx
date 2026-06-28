import { useEffect, useState } from 'react';
import { budgetService } from '../services/expenseService.js';
import { formatCurrency } from '../utils/format.js';
import toast from 'react-hot-toast';

export default function Budgets() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ category: '', limit: '' });

  const load = () => budgetService.list().then(setItems).catch(() => setItems([]));
  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await budgetService.upsert({ ...form, limit: Number(form.limit) });
      toast.success('Budget saved'); setForm({ category: '', limit: '' }); load();
    } catch { toast.error('Failed'); }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Budgets</h1>
      <form onSubmit={submit} className="bg-white border rounded-xl p-4 grid sm:grid-cols-3 gap-2">
        <input className="border rounded-md px-3 py-2 text-sm" placeholder="Category"
          value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} required />
        <input className="border rounded-md px-3 py-2 text-sm" type="number" placeholder="Monthly limit"
          value={form.limit} onChange={e => setForm({ ...form, limit: e.target.value })} required />
        <button className="bg-brand-600 hover:bg-brand-700 text-white rounded-md text-sm">Save</button>
      </form>

      <div className="grid gap-3 sm:grid-cols-2">
        {items.map(b => {
          const pct = Math.min(100, Math.round(((b.spent || 0) / b.limit) * 100));
          return (
            <div key={b.id || b.category} className="bg-white border rounded-xl p-4">
              <div className="flex justify-between mb-2">
                <span className="font-medium">{b.category}</span>
                <span className="text-sm text-slate-500">{formatCurrency(b.spent || 0)} / {formatCurrency(b.limit)}</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className={`h-full ${pct > 90 ? 'bg-red-500' : 'bg-brand-600'}`} style={{ width: `${pct}%` }} />
              </div>
            </div>
          );
        })}
        {items.length === 0 && <p className="text-sm text-slate-500">No budgets yet.</p>}
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { incomeService } from '../services/expenseService.js';
import { formatCurrency, formatDate } from '../utils/format.js';
import toast from 'react-hot-toast';

export default function Income() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ source: '', amount: '', date: new Date().toISOString().slice(0,10) });

  const load = () => incomeService.list().then(setItems).catch(() => setItems([]));
  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await incomeService.create({ ...form, amount: Number(form.amount) });
      toast.success('Income added'); setForm({ source: '', amount: '', date: new Date().toISOString().slice(0,10) }); load();
    } catch { toast.error('Failed'); }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Income</h1>
      <form onSubmit={submit} className="bg-white border rounded-xl p-4 grid sm:grid-cols-4 gap-2">
        <input className="border rounded-md px-3 py-2 text-sm" placeholder="Source"
          value={form.source} onChange={e => setForm({ ...form, source: e.target.value })} required />
        <input className="border rounded-md px-3 py-2 text-sm" type="number" placeholder="Amount"
          value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} required />
        <input className="border rounded-md px-3 py-2 text-sm" type="date"
          value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
        <button className="bg-brand-600 hover:bg-brand-700 text-white rounded-md text-sm">Add</button>
      </form>

      <div className="bg-white border rounded-xl divide-y">
        {items.map(i => (
          <div key={i.id} className="p-3 flex justify-between text-sm">
            <span>{i.source} · <span className="text-slate-500">{formatDate(i.date)}</span></span>
            <span className="font-semibold text-emerald-600">{formatCurrency(i.amount)}</span>
          </div>
        ))}
        {items.length === 0 && <p className="p-4 text-sm text-slate-500">No income recorded.</p>}
      </div>
    </div>
  );
}

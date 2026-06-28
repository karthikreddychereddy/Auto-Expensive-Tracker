import { useState, useEffect } from 'react';

const empty = { title: '', amount: '', category: 'General', date: new Date().toISOString().slice(0, 10), notes: '' };

export default function ExpenseForm({ initial, onSubmit, onCancel }) {
  const [form, setForm] = useState(empty);

  useEffect(() => {
    if (initial) setForm({ ...empty, ...initial, date: (initial.date || '').slice(0, 10) || empty.date });
  }, [initial]);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    onSubmit({ ...form, amount: Number(form.amount) });
  };

  return (
    <form onSubmit={submit} className="grid gap-3 sm:grid-cols-2">
      <input className="input" placeholder="Title" value={form.title} onChange={set('title')} required />
      <input className="input" type="number" step="0.01" placeholder="Amount" value={form.amount} onChange={set('amount')} required />
      <input className="input" placeholder="Category" value={form.category} onChange={set('category')} />
      <input className="input" type="date" value={form.date} onChange={set('date')} />
      <textarea className="input sm:col-span-2" rows={2} placeholder="Notes" value={form.notes} onChange={set('notes')} />
      <div className="sm:col-span-2 flex gap-2 justify-end">
        {onCancel && <button type="button" onClick={onCancel} className="btn-ghost">Cancel</button>}
        <button type="submit" className="btn-primary">{initial ? 'Update' : 'Add'} Expense</button>
      </div>
      <style>{`
        .input { @apply w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500; }
        .btn-primary { @apply bg-brand-600 hover:bg-brand-700 text-white text-sm px-4 py-2 rounded-md; }
        .btn-ghost { @apply text-slate-600 hover:bg-slate-100 text-sm px-4 py-2 rounded-md; }
      `}</style>
    </form>
  );
}

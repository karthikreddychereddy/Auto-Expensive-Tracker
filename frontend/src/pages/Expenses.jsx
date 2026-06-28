import { useEffect, useMemo, useState } from 'react';
import { useExpenses } from '../context/ExpenseContext.jsx';
import ExpenseForm from '../components/ExpenseForm.jsx';
import { formatCurrency, formatDate } from '../utils/format.js';
import { Pencil, Trash2, Plus, Search } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Expenses() {
  const { expenses, fetchExpenses, addExpense, updateExpense, deleteExpense, loading } = useExpenses();
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('date_desc');

  useEffect(() => { fetchExpenses().catch(() => {}); }, [fetchExpenses]);

  const filtered = useMemo(() => {
    let list = [...expenses];
    if (search) list = list.filter(e => e.title?.toLowerCase().includes(search.toLowerCase()));
    if (category) list = list.filter(e => e.category === category);
    list.sort((a, b) => {
      if (sort === 'amount_desc') return b.amount - a.amount;
      if (sort === 'amount_asc') return a.amount - b.amount;
      if (sort === 'date_asc') return new Date(a.date) - new Date(b.date);
      return new Date(b.date) - new Date(a.date);
    });
    return list;
  }, [expenses, search, category, sort]);

  const categories = useMemo(() => Array.from(new Set(expenses.map(e => e.category).filter(Boolean))), [expenses]);

  const onSubmit = async (data) => {
    try {
      if (editing) await updateExpense(editing.id, data);
      else await addExpense(data);
      toast.success(editing ? 'Updated' : 'Added');
      setEditing(null); setShowForm(false);
    } catch (e) { toast.error('Save failed'); }
  };

  const onDelete = async (id) => {
    if (!confirm('Delete this expense?')) return;
    try { await deleteExpense(id); toast.success('Deleted'); } catch { toast.error('Delete failed'); }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2 justify-between">
        <h1 className="text-2xl font-bold">Expenses</h1>
        <button onClick={() => { setEditing(null); setShowForm(true); }}
          className="inline-flex items-center gap-1 bg-brand-600 hover:bg-brand-700 text-white px-3 py-2 rounded-md text-sm">
          <Plus size={16} /> New Expense
        </button>
      </div>

      <div className="bg-white border rounded-xl p-3 flex flex-wrap gap-2 items-center">
        <div className="flex items-center gap-2 border rounded-md px-2">
          <Search size={14} className="text-slate-500" />
          <input className="py-2 text-sm outline-none" placeholder="Search title"
            value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select value={category} onChange={e => setCategory(e.target.value)} className="border rounded-md px-2 py-2 text-sm">
          <option value="">All categories</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={sort} onChange={e => setSort(e.target.value)} className="border rounded-md px-2 py-2 text-sm">
          <option value="date_desc">Newest first</option>
          <option value="date_asc">Oldest first</option>
          <option value="amount_desc">Amount: High → Low</option>
          <option value="amount_asc">Amount: Low → High</option>
        </select>
      </div>

      {showForm && (
        <div className="bg-white border rounded-xl p-4">
          <ExpenseForm initial={editing} onSubmit={onSubmit} onCancel={() => { setShowForm(false); setEditing(null); }} />
        </div>
      )}

      <div className="bg-white border rounded-xl overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="text-left p-3">Date</th>
              <th className="text-left p-3">Title</th>
              <th className="text-left p-3">Category</th>
              <th className="text-right p-3">Amount</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {loading && <tr><td colSpan="5" className="p-6 text-center text-slate-500">Loading…</td></tr>}
            {!loading && filtered.map(e => (
              <tr key={e.id}>
                <td className="p-3">{formatDate(e.date)}</td>
                <td className="p-3 font-medium">{e.title}</td>
                <td className="p-3 text-slate-600">{e.category}</td>
                <td className="p-3 text-right font-semibold">{formatCurrency(e.amount)}</td>
                <td className="p-3 text-right whitespace-nowrap">
                  <button onClick={() => { setEditing(e); setShowForm(true); }} className="text-brand-600 hover:bg-brand-50 p-1 rounded"><Pencil size={16} /></button>
                  <button onClick={() => onDelete(e.id)} className="text-red-600 hover:bg-red-50 p-1 rounded ml-1"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
            {!loading && filtered.length === 0 && (
              <tr><td colSpan="5" className="p-6 text-center text-slate-500">No expenses match.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

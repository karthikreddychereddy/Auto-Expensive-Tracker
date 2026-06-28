import { useEffect, useState } from 'react';
import { categoryService } from '../services/expenseService.js';
import toast from 'react-hot-toast';

export default function Categories() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');

  const load = () => categoryService.list().then(setItems).catch(() => setItems([]));
  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    try { await categoryService.create({ name }); toast.success('Added'); setName(''); load(); }
    catch { toast.error('Failed'); }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Categories</h1>
      <form onSubmit={submit} className="bg-white border rounded-xl p-4 flex gap-2">
        <input className="flex-1 border rounded-md px-3 py-2 text-sm" placeholder="New category"
          value={name} onChange={e => setName(e.target.value)} />
        <button className="bg-brand-600 hover:bg-brand-700 text-white rounded-md text-sm px-4">Add</button>
      </form>
      <div className="flex flex-wrap gap-2">
        {items.map(c => (
          <span key={c.id || c.name} className="bg-white border rounded-full px-3 py-1 text-sm">{c.name}</span>
        ))}
        {items.length === 0 && <p className="text-sm text-slate-500">No categories yet.</p>}
      </div>
    </div>
  );
}

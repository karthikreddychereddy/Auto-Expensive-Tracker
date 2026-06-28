import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { authService } from '../services/authService.js';
import toast from 'react-hot-toast';

export default function Profile() {
  const { user, refresh } = useAuth();
  const [form, setForm] = useState({ name: '', email: '' });
  const [busy, setBusy] = useState(false);

  useEffect(() => { if (user) setForm({ name: user.name || '', email: user.email || '' }); }, [user]);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try { await authService.updateProfile(form); await refresh(); toast.success('Profile saved'); }
    catch { toast.error('Save failed'); }
    finally { setBusy(false); }
  };

  return (
    <div className="space-y-4 max-w-lg">
      <h1 className="text-2xl font-bold">Profile</h1>
      <form onSubmit={submit} className="bg-white border rounded-xl p-4 space-y-3">
        <label className="block text-sm">
          <span className="text-slate-600">Name</span>
          <input className="mt-1 w-full border rounded-md px-3 py-2"
            value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        </label>
        <label className="block text-sm">
          <span className="text-slate-600">Email</span>
          <input className="mt-1 w-full border rounded-md px-3 py-2" type="email"
            value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        </label>
        <button disabled={busy} className="bg-brand-600 hover:bg-brand-700 text-white rounded-md px-4 py-2 text-sm">
          {busy ? 'Saving…' : 'Save changes'}
        </button>
      </form>
    </div>
  );
}

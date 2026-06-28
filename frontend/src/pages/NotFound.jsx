import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen grid place-items-center text-center px-4">
      <div>
        <h1 className="text-6xl font-bold text-brand-700">404</h1>
        <p className="text-slate-600 mt-2">Page not found.</p>
        <Link to="/dashboard" className="inline-block mt-4 text-brand-600 hover:underline">Go to Dashboard</Link>
      </div>
    </div>
  );
}

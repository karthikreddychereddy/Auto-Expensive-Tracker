import { createContext, useContext, useState, useCallback } from 'react';
import { expenseService } from '../services/expenseService.js';

const ExpenseContext = createContext(null);

export function ExpenseProvider({ children }) {
  const [expenses, setExpenses] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchExpenses = useCallback(async (params) => {
    setLoading(true);
    try {
      const data = await expenseService.list(params);
      setExpenses(Array.isArray(data) ? data : data.items || []);
    } finally { setLoading(false); }
  }, []);

  const fetchStats = useCallback(async () => {
    const s = await expenseService.stats();
    setStats(s);
  }, []);

  const addExpense = async (payload) => {
    const created = await expenseService.create(payload);
    setExpenses(prev => [created, ...prev]);
    return created;
  };

  const updateExpense = async (id, payload) => {
    const updated = await expenseService.update(id, payload);
    setExpenses(prev => prev.map(e => (e.id === id ? updated : e)));
    return updated;
  };

  const deleteExpense = async (id) => {
    await expenseService.remove(id);
    setExpenses(prev => prev.filter(e => e.id !== id));
  };

  return (
    <ExpenseContext.Provider value={{
      expenses, stats, loading,
      fetchExpenses, fetchStats, addExpense, updateExpense, deleteExpense,
    }}>
      {children}
    </ExpenseContext.Provider>
  );
}

export const useExpenses = () => useContext(ExpenseContext);

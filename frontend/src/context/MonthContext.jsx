import {
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

const MonthContext = createContext(null);

export function MonthProvider({ children }) {

  const today = new Date();

  const currentMonth =
    `${today.getFullYear()}-${String(
      today.getMonth() + 1
    ).padStart(2, "0")}`;

  const [selectedMonth, setSelectedMonth] =
    useState(currentMonth);

  const value = useMemo(
    () => ({
      selectedMonth,
      setSelectedMonth,
    }),
    [selectedMonth]
  );

  return (
    <MonthContext.Provider value={value}>
      {children}
    </MonthContext.Provider>
  );
}

export const useMonth = () =>
  useContext(MonthContext);
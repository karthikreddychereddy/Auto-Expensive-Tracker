import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import toast from "react-hot-toast";

import {
  savingsService,
} from "../services/savingsService";

import {
  useAuth,
} from "./AuthContext";

import {
  useMonth,
} from "./MonthContext";

const SavingsContext =
  createContext(null);

export function SavingsProvider({
  children,
}) {
  const {
    user,
  } = useAuth();

  const {
    selectedMonth,
  } = useMonth();

  const [
    savings,
    setSavings,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState(null);

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    dateFilter,
    setDateFilter,
  ] = useState("All");

  // ==========================================
  // FETCH SAVINGS FOR SELECTED MONTH
  // ==========================================

  const fetchSavings =
    useCallback(async () => {
      if (!user) {
        setSavings([]);
        setLoading(false);
        setError(null);

        return;
      }

      try {
        setLoading(true);
        setError(null);

        const data =
          await savingsService.list(
            selectedMonth
          );

        setSavings(
          Array.isArray(data)
            ? data
            : []
        );

      } catch (err) {
        console.error(
          "Failed to load savings:",
          err
        );

        setSavings([]);

        setError(
          err?.response?.data?.message ||
            "Failed to load savings."
        );

        toast.error(
          "Failed to load savings"
        );

      } finally {
        setLoading(false);
      }
    }, [
      user,
      selectedMonth,
    ]);

  // ==========================================
  // LOAD / MONTH CHANGE
  // ==========================================

  useEffect(() => {
    fetchSavings();
  }, [fetchSavings]);

  // ==========================================
  // ADD
  // ==========================================

  const addSaving =
    async payload => {
      try {
        await savingsService.create(
          payload
        );

        toast.success(
          "Saving Added"
        );

        await fetchSavings();

        window.dispatchEvent(
          new Event(
            "dashboard-update"
          )
        );

      } catch (err) {
        console.error(
          "Add saving error:",
          err
        );

        toast.error(
          "Failed to add saving"
        );

        throw err;
      }
    };

  // ==========================================
  // UPDATE
  // ==========================================

  const updateSaving =
    async (
      id,
      payload
    ) => {
      try {
        await savingsService.update(
          id,
          payload
        );

        toast.success(
          "Saving Updated"
        );

        await fetchSavings();

        window.dispatchEvent(
          new Event(
            "dashboard-update"
          )
        );

      } catch (err) {
        console.error(
          "Update saving error:",
          err
        );

        toast.error(
          "Failed to update saving"
        );

        throw err;
      }
    };

  // ==========================================
  // DELETE
  // ==========================================

  const deleteSaving =
    async id => {
      try {
        await savingsService.remove(
          id
        );

        toast.success(
          "Saving Deleted"
        );

        await fetchSavings();

        window.dispatchEvent(
          new Event(
            "dashboard-update"
          )
        );

      } catch (err) {
        console.error(
          "Delete saving error:",
          err
        );

        toast.error(
          "Failed to delete saving"
        );

        throw err;
      }
    };

  // ==========================================
  // TOTAL FOR SELECTED MONTH
  // ==========================================

  const totalSavings =
    useMemo(() => {
      return savings.reduce(
        (sum, item) =>
          sum +
          Number(
            item.amount || 0
          ),
        0
      );
    }, [savings]);

  // ==========================================
  // DATE HELPERS
  // ==========================================

  function parseSavingDate(
    date
  ) {
    if (!date) {
      return null;
    }

    const value =
      new Date(
        `${date}T00:00:00`
      );

    return Number.isNaN(
      value.getTime()
    )
      ? null
      : value;
  }

  // ==========================================
  // FILTERED SAVINGS
  // ==========================================

  const filteredSavings =
    useMemo(() => {
      const normalizedSearch =
        search
          .trim()
          .toLowerCase();

      const today =
        new Date();

      today.setHours(
        0,
        0,
        0,
        0
      );

      const startOfWeek =
        new Date(today);

      const day =
        startOfWeek.getDay();

      const difference =
        day === 0
          ? -6
          : 1 - day;

      startOfWeek.setDate(
        startOfWeek.getDate() +
          difference
      );

      startOfWeek.setHours(
        0,
        0,
        0,
        0
      );

      const endOfWeek =
        new Date(
          startOfWeek
        );

      endOfWeek.setDate(
        startOfWeek.getDate() +
          6
      );

      endOfWeek.setHours(
        23,
        59,
        59,
        999
      );

      return savings
        .filter(item => {
          // ====================================
          // SEARCH
          // ====================================

          const matchesSearch =
            !normalizedSearch ||
            [
              item.source,
              item.description,
              item.amount,
              item.savingDate,
            ].some(value =>
              String(
                value || ""
              )
                .toLowerCase()
                .includes(
                  normalizedSearch
                )
            );

          // ====================================
          // DATE
          // ====================================

          let matchesDate =
            true;

          const itemDate =
            parseSavingDate(
              item.savingDate
            );

          if (
            dateFilter ===
            "Today"
          ) {
            matchesDate =
              itemDate
                ? itemDate.getTime() ===
                  today.getTime()
                : false;

          } else if (
            dateFilter ===
            "This Week"
          ) {
            matchesDate =
              itemDate
                ? itemDate >=
                    startOfWeek &&
                  itemDate <=
                    endOfWeek
                : false;

          } else if (
            dateFilter ===
            "This Month"
          ) {
            /*
             * savings already contains only
             * the selected navbar month.
             */
            matchesDate =
              true;
          }

          return (
            matchesSearch &&
            matchesDate
          );
        })
        .sort(
          (a, b) =>
            new Date(
              b.savingDate
            ) -
            new Date(
              a.savingDate
            )
        );

    }, [
      savings,
      search,
      dateFilter,
    ]);

  // ==========================================
  // CLEAR FILTERS
  // ==========================================

  const clearFilters = () => {
    setSearch("");
    setDateFilter("All");
  };

  // ==========================================
  // SUMMARY VALUES
  // ==========================================

  const largestSaving =
    useMemo(() => {
      if (
        savings.length === 0
      ) {
        return 0;
      }

      return Math.max(
        ...savings.map(
          item =>
            Number(
              item.amount || 0
            )
        )
      );
    }, [savings]);

  const averageSaving =
    useMemo(() => {
      if (
        savings.length === 0
      ) {
        return 0;
      }

      return (
        totalSavings /
        savings.length
      );
    }, [
      savings,
      totalSavings,
    ]);

  return (
    <SavingsContext.Provider
      value={{
        loading,
        error,

        savings,
        filteredSavings,

        selectedMonth,

        fetchSavings,

        addSaving,
        updateSaving,
        deleteSaving,

        totalSavings,
        averageSaving,
        largestSaving,

        search,
        setSearch,

        dateFilter,
        setDateFilter,

        clearFilters,

        /*
         * Compatibility with existing
         * components.
         */
        goalFilter:
          "All",

        setGoalFilter:
          () => {},

        totalTarget:
          totalSavings,

        remainingSavings:
          0,

        overallProgress:
          savings.length > 0
            ? 100
            : 0,
      }}
    >
      {children}
    </SavingsContext.Provider>
  );
}

export const useSavings =
  () => {
    const context =
      useContext(
        SavingsContext
      );

    if (!context) {
      throw new Error(
        "useSavings must be used inside SavingsProvider"
      );
    }

    return context;
  };
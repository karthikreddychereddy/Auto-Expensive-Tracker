import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import toast from "react-hot-toast";

import { incomeService } from "../services/expenseService";
import { useAuth } from "./AuthContext";
import { useMonth } from "./MonthContext";

const IncomeContext = createContext(null);

export function IncomeProvider({ children }) {
  const { user } = useAuth();
  const { selectedMonth } = useMonth();

  const [income, setIncome] = useState([]);
  const [monthIncome, setMonthIncome] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [sourceFilter, setSourceFilter] =
    useState("All");
  const [dateFilter, setDateFilter] =
    useState("All");
  const [sortBy, setSortBy] =
    useState("newest");

  // ==========================================
  // MAP INCOME
  // ==========================================

  const mapIncome = useCallback(
    data =>
      (Array.isArray(data) ? data : []).map(
        item => ({
          id: item.id,

          amount:
            Number(
              item.amount || 0
            ),

          category:
            item.category || "",

          source:
            item.source || "",

          description:
            item.description || "",

          incomeDate:
            item.incomeDate,

          transactionType:
            item.transactionType,
        })
      ),
    []
  );

  // ==========================================
  // FETCH INCOME
  // ==========================================

  const fetchIncome =
    useCallback(async () => {
      if (!user) {
        setIncome([]);
        setMonthIncome([]);
        setLoading(false);
        setError(null);

        return;
      }

      try {
        setLoading(true);
        setError(null);

        const [
          allData,
          monthData,
        ] = await Promise.all([
          incomeService.list(),

          incomeService.list({
            month:
              selectedMonth,
          }),
        ]);

        setIncome(
          mapIncome(allData)
        );

        setMonthIncome(
          mapIncome(monthData)
        );

      } catch (err) {
        console.error(
          "Failed to fetch income:",
          err
        );

        setError(
          err?.response?.data
            ?.message ||
            "Failed to load income."
        );

      } finally {
        setLoading(false);
      }
    }, [
      user,
      selectedMonth,
      mapIncome,
    ]);

  useEffect(() => {
    fetchIncome();
  }, [fetchIncome]);

  // ==========================================
  // ADD INCOME
  // ==========================================

  const addIncome =
    async payload => {
      try {
        await incomeService.create(
          payload
        );

        toast.success(
          "Income Added"
        );

        await fetchIncome();

        window.dispatchEvent(
          new Event(
            "dashboard-update"
          )
        );

      } catch (err) {
        console.error(
          "Add income error:",
          err?.response?.data ||
            err
        );

        toast.error(
          "Failed to add income"
        );

        throw err;
      }
    };

  // ==========================================
  // UPDATE INCOME
  // ==========================================

  const updateIncome =
    async (
      id,
      payload
    ) => {
      try {
        await incomeService.update(
          id,
          payload
        );

        toast.success(
          "Income Updated"
        );

        await fetchIncome();

        window.dispatchEvent(
          new Event(
            "dashboard-update"
          )
        );

      } catch (err) {
        console.error(
          "Update income error:",
          err
        );

        toast.error(
          "Failed to update income"
        );

        throw err;
      }
    };

  // ==========================================
  // DELETE INCOME
  // ==========================================

  const deleteIncome =
    async id => {
      try {
        await incomeService.remove(
          id
        );

        toast.success(
          "Income Deleted"
        );

        await fetchIncome();

        window.dispatchEvent(
          new Event(
            "dashboard-update"
          )
        );

      } catch (err) {
        console.error(
          "Delete income error:",
          err
        );

        toast.error(
          "Failed to delete income"
        );

        throw err;
      }
    };

  // ==========================================
  // TOTAL FOR SELECTED MONTH
  // ==========================================

  const totalIncome =
    useMemo(() => {
      return monthIncome.reduce(
        (sum, item) =>
          sum +
          Number(
            item.amount || 0
          ),
        0
      );
    }, [monthIncome]);

  // ==========================================
  // DATE HELPERS
  // ==========================================

  function parseIncomeDate(
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

  function getPreviousMonth(
    month
  ) {
    if (!month) {
      return null;
    }

    const [
      year,
      monthNumber,
    ] = month
      .split("-")
      .map(Number);

    if (
      !year ||
      !monthNumber
    ) {
      return null;
    }

    const previous =
      new Date(
        year,
        monthNumber - 2,
        1
      );

    return `${previous.getFullYear()}-${String(
      previous.getMonth() + 1
    ).padStart(2, "0")}`;
  }

  // ==========================================
  // FILTERED INCOME
  // ==========================================

  const filteredIncome =
    useMemo(() => {
      /*
       * Normally the page works with the
       * selected month.
       *
       * Last Month needs the complete
       * income history.
       */
      let baseData =
        dateFilter ===
        "Last Month"
          ? income
          : monthIncome;

      const normalizedSearch =
        search
          .trim()
          .toLowerCase();

      const previousMonth =
        getPreviousMonth(
          selectedMonth
        );

      const today =
        new Date();

      today.setHours(
        0,
        0,
        0,
        0
      );

      /*
       * Monday → Sunday
       */
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

      const endOfWeek =
        new Date(
          startOfWeek
        );

      endOfWeek.setDate(
        startOfWeek.getDate() +
          6
      );

      baseData =
        baseData.filter(
          item => {
            // ==================================
            // SEARCH
            // ==================================

            const matchesSearch =
              !normalizedSearch ||
              [
                item.source,
                item.category,
                item.description,
              ].some(value =>
                String(
                  value || ""
                )
                  .toLowerCase()
                  .includes(
                    normalizedSearch
                  )
              );

            // ==================================
            // SOURCE
            // ==================================

            const matchesSource =
              sourceFilter ===
                "All" ||
              String(
                item.source || ""
              ).toLowerCase() ===
                String(
                  sourceFilter
                ).toLowerCase();

            // ==================================
            // DATE
            // ==================================

            let matchesDate =
              true;

            const itemDate =
              parseIncomeDate(
                item.incomeDate
              );

            if (
              !itemDate
            ) {
              matchesDate =
                false;

            } else if (
              dateFilter ===
              "Today"
            ) {
              matchesDate =
                itemDate.getTime() ===
                today.getTime();

            } else if (
              dateFilter ===
              "This Week"
            ) {
              matchesDate =
                itemDate >=
                  startOfWeek &&
                itemDate <=
                  endOfWeek;

            } else if (
              dateFilter ===
              "This Month"
            ) {
              const itemMonth =
                `${itemDate.getFullYear()}-${String(
                  itemDate.getMonth() +
                    1
                ).padStart(
                  2,
                  "0"
                )}`;

              matchesDate =
                itemMonth ===
                selectedMonth;

            } else if (
              dateFilter ===
              "Last Month"
            ) {
              const itemMonth =
                `${itemDate.getFullYear()}-${String(
                  itemDate.getMonth() +
                    1
                ).padStart(
                  2,
                  "0"
                )}`;

              matchesDate =
                itemMonth ===
                previousMonth;
            }

            return (
              matchesSearch &&
              matchesSource &&
              matchesDate
            );
          }
        );

      // ========================================
      // SORT
      // ========================================

      const sorted = [
        ...baseData,
      ];

      sorted.sort(
        (a, b) => {
          switch (sortBy) {
            case "oldest":
              return (
                new Date(
                  a.incomeDate
                ) -
                new Date(
                  b.incomeDate
                )
              );

            case "highest":
              return (
                Number(
                  b.amount
                ) -
                Number(
                  a.amount
                )
              );

            case "lowest":
              return (
                Number(
                  a.amount
                ) -
                Number(
                  b.amount
                )
              );

            case "newest":
            default:
              return (
                new Date(
                  b.incomeDate
                ) -
                new Date(
                  a.incomeDate
                )
              );
          }
        }
      );

      return sorted;

    }, [
      income,
      monthIncome,
      search,
      sourceFilter,
      dateFilter,
      sortBy,
      selectedMonth,
    ]);

  // ==========================================
  // SOURCE OPTIONS FROM REAL DATA
  // ==========================================

  const incomeSources =
    useMemo(() => {
      return [
        ...new Set(
          income
            .map(
              item =>
                item.source
            )
            .filter(Boolean)
        ),
      ].sort(
        (a, b) =>
          a.localeCompare(b)
      );
    }, [income]);

  // ==========================================
  // CLEAR FILTERS
  // ==========================================

  const clearFilters = () => {
    setSearch("");

    setSourceFilter(
      "All"
    );

    setDateFilter(
      "All"
    );

    setSortBy(
      "newest"
    );
  };

  return (
    <IncomeContext.Provider
      value={{
        income,

        monthIncome,

        filteredIncome,

        loading,

        error,

        fetchIncome,

        addIncome,

        updateIncome,

        deleteIncome,

        totalIncome,

        search,

        setSearch,

        sourceFilter,

        setSourceFilter,

        incomeSources,

        dateFilter,

        setDateFilter,

        sortBy,

        setSortBy,

        clearFilters,
      }}
    >
      {children}
    </IncomeContext.Provider>
  );
}

export const useIncome =
  () => {
    const context =
      useContext(
        IncomeContext
      );

    if (!context) {
      throw new Error(
        "useIncome must be used inside IncomeProvider"
      );
    }

    return context;
  };
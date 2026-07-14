import IncomeHeader from "../components/income/IncomeHeader";
import IncomeSummaryCards from "../components/income/IncomeSummaryCards";
import IncomeTrendChart from "../components/income/IncomeTrendChart";
import IncomeSourceChart from "../components/income/IncomeSourceChart";
import IncomeHistory from "../components/income/IncomeHistory";
import RecurringIncome from "../components/income/RecurringIncome";
import IncomeGoalCard from "../components/income/IncomeGoalCard";
import IncomeTips from "../components/income/IncomeTips";
import IncomeToolbar from "../components/income/IncomeToolbar";

import { useIncome } from "../context/IncomeContext";
import { useMonth } from "../context/MonthContext";



export default function Income() {

  const { selectedMonth } = useMonth();

  const {

    search,
    setSearch,

    sourceFilter,
    setSourceFilter,

    dateFilter,
    setDateFilter,

    sortBy,
    setSortBy,

  } = useIncome();

  return (

    <div className="space-y-8">

      <IncomeHeader />

      <IncomeSummaryCards />

      <IncomeToolbar

        search={search}
        setSearch={setSearch}

        sourceFilter={sourceFilter}
        setSourceFilter={setSourceFilter}

        dateFilter={dateFilter}
        setDateFilter={setDateFilter}

        sortBy={sortBy}
        setSortBy={setSortBy}

      />

      <div className="grid xl:grid-cols-2 gap-8">

        <IncomeTrendChart />

        <IncomeSourceChart />

      </div>

      <IncomeHistory />

      <div className="grid xl:grid-cols-2 gap-8">

        <RecurringIncome />

        <IncomeGoalCard />

      </div>

      <IncomeTips />

    </div>

  );

}
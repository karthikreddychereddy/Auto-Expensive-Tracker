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

import PageTransition from "../components/animations/PageTransition";
import FadeCard from "../components/animations/FadeCard";

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

    <PageTransition>

      <div className="space-y-8">

        <IncomeHeader />

        <FadeCard delay={0.10}>
          <IncomeSummaryCards />
        </FadeCard>

        <FadeCard delay={0.15}>
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
        </FadeCard>

        <div className="grid xl:grid-cols-2 gap-8">

          <FadeCard delay={0.20}>
            <IncomeTrendChart />
          </FadeCard>

          <FadeCard delay={0.25}>
            <IncomeSourceChart />
          </FadeCard>

        </div>

        <FadeCard delay={0.30}>
          <IncomeHistory />
        </FadeCard>

        <div className="grid xl:grid-cols-2 gap-8">

          <FadeCard delay={0.35}>
            <RecurringIncome />
          </FadeCard>

          <FadeCard delay={0.40}>
            <IncomeGoalCard />
          </FadeCard>

        </div>

        <FadeCard delay={0.45}>
          <IncomeTips />
        </FadeCard>

      </div>

    </PageTransition>

  );

}
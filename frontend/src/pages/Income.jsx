import {
  FaMoneyBillWave,
} from "react-icons/fa";

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

import PageTransition from "../components/animations/PageTransition";
import FadeCard from "../components/animations/FadeCard";

import PageLoader from "../components/common/PageLoader";
import EmptyState from "../components/common/EmptyState";
import ErrorState from "../components/common/ErrorState";

export default function Income() {
  const {
    income,
    filteredIncome,

    loading,
    error,
    fetchIncome,

    search,
    setSearch,

    sourceFilter,
    setSourceFilter,

    dateFilter,
    setDateFilter,

    sortBy,
    setSortBy,
  } = useIncome();

  if (
    loading &&
    income.length === 0
  ) {
    return (
      <PageLoader message="Loading income..." />
    );
  }

  if (
    error &&
    income.length === 0
  ) {
    return (
      <ErrorState
        title="Unable to load income"
        message={error}
        onRetry={
          fetchIncome
        }
      />
    );
  }

  return (
    <PageTransition>
      <div className="min-w-0 space-y-4 sm:space-y-6 lg:space-y-8">

        <IncomeHeader />

        {income.length === 0 ? (
          <EmptyState
            icon={
              <FaMoneyBillWave />
            }
            title="No income yet"
            description="Add your first income entry to begin tracking your earnings."
          />
        ) : (
          <>
            <FadeCard delay={0.10}>
              <IncomeSummaryCards />
            </FadeCard>

            <FadeCard delay={0.15}>
              <IncomeToolbar
                search={search}
                setSearch={
                  setSearch
                }
                sourceFilter={
                  sourceFilter
                }
                setSourceFilter={
                  setSourceFilter
                }
                dateFilter={
                  dateFilter
                }
                setDateFilter={
                  setDateFilter
                }
                sortBy={sortBy}
                setSortBy={
                  setSortBy
                }
              />
            </FadeCard>

            <div className="grid min-w-0 gap-4 sm:gap-6 xl:grid-cols-2 xl:gap-8">

              <FadeCard delay={0.20}>
                <IncomeTrendChart />
              </FadeCard>

              <FadeCard delay={0.25}>
                <IncomeSourceChart />
              </FadeCard>

            </div>

            {filteredIncome.length ===
            0 ? (
              <EmptyState
                compact
                icon={
                  <FaMoneyBillWave />
                }
                title="No matching income"
                description="No income entries match your current search or filters."
              />
            ) : (
              <FadeCard delay={0.30}>
                <IncomeHistory />
              </FadeCard>
            )}

            <div className="grid min-w-0 gap-4 sm:gap-6 xl:grid-cols-2 xl:gap-8">

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
          </>
        )}

      </div>
    </PageTransition>
  );
}
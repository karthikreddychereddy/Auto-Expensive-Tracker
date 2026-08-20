import {
  useState,
} from "react";

import {
  FaWallet,
} from "react-icons/fa";

import SummaryCards from "../components/budgets/dashboard/SummaryCards";
import MonthlyProgress from "../components/budgets/dashboard/MonthlyProgress";
import BudgetInsights from "../components/budgets/BudgetInsights";
import CategoryBudgetTable from "../components/budgets/CategoryBudgetTable";
import BudgetAlerts from "../components/budgets/BudgetAlerts";
import BudgetHealth from "../components/budgets/BudgetHealth";
import BudgetRecommendations from "../components/budgets/BudgetRecommendations";
import AddBudgetModal from "../components/budgets/AddBudgetModal";

import { useBudget } from "../context/BudgetContext";

import PageTransition from "../components/animations/PageTransition";
import FadeCard from "../components/animations/FadeCard";

import PageLoader from "../components/common/PageLoader";
import EmptyState from "../components/common/EmptyState";
import ErrorState from "../components/common/ErrorState";

export default function Budgets() {
  const [
    openAddModal,
    setOpenAddModal,
  ] = useState(false);

  const {
    budgets,
    loading,
    error,
    reloadBudgets,
  } = useBudget();

  if (
    loading &&
    budgets.length === 0
  ) {
    return (
      <PageLoader message="Loading budgets..." />
    );
  }

  if (
    error &&
    budgets.length === 0
  ) {
    return (
      <ErrorState
        title="Unable to load budgets"
        message={error}
        onRetry={
          reloadBudgets
        }
      />
    );
  }

  return (
    <PageTransition>
      <div className="space-y-8">

        <div className="flex flex-wrap items-center justify-between gap-4">

          <div>
            <h1 className="text-3xl font-bold text-slate-800 dark:text-white sm:text-4xl">
              Budgets
            </h1>

            <p className="mt-2 text-slate-500 dark:text-slate-400">
              Manage your monthly budget and monitor your spending.
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              setOpenAddModal(
                true
              )
            }
            className="rounded-xl bg-[#0B6B57] px-5 py-3 font-semibold text-white transition hover:bg-[#085443]"
          >
            + Add Budget
          </button>

        </div>

        {budgets.length === 0 ? (
          <EmptyState
            icon={<FaWallet />}
            title="No budgets yet"
            description="Create your first budget to start controlling your monthly spending."
            actionLabel="Add Budget"
            onAction={() =>
              setOpenAddModal(
                true
              )
            }
          />
        ) : (
          <>
            <FadeCard delay={0.10}>
              <SummaryCards />
            </FadeCard>

            <FadeCard delay={0.15}>
              <MonthlyProgress />
            </FadeCard>

            <FadeCard delay={0.20}>
              <BudgetHealth />
            </FadeCard>

            <FadeCard delay={0.25}>
              <BudgetInsights />
            </FadeCard>

            <FadeCard delay={0.30}>
              <BudgetRecommendations />
            </FadeCard>

            <FadeCard delay={0.35}>
              <CategoryBudgetTable />
            </FadeCard>

            <FadeCard delay={0.40}>
              <BudgetAlerts />
            </FadeCard>
          </>
        )}

        <AddBudgetModal
          open={openAddModal}
          onClose={() =>
            setOpenAddModal(
              false
            )
          }
        />

      </div>
    </PageTransition>
  );
}
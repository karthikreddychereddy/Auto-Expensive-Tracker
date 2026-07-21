import { useState } from "react";

import MonthSelector from "../components/common/MonthSelector";

import SummaryCards from "../components/budgets/dashboard/SummaryCards";
import MonthlyProgress from "../components/budgets/dashboard/MonthlyProgress";
import BudgetInsights from "../components/budgets/BudgetInsights";
import CategoryBudgetTable from "../components/budgets/CategoryBudgetTable";
import BudgetAlerts from "../components/budgets/BudgetAlerts";
import BudgetHealth from "../components/budgets/BudgetHealth";
import BudgetRecommendations from "../components/budgets/BudgetRecommendations";
import AddBudgetModal from "../components/budgets/AddBudgetModal";

import PageTransition from "../components/animations/PageTransition";
import FadeCard from "../components/animations/FadeCard";

export default function Budgets() {

  const [openAddModal, setOpenAddModal] = useState(false);

  return (
    <PageTransition>

      <div className="space-y-8">

        {/* Header */}

        <div className="flex justify-between items-center">

          <div>

            <h1 className="text-5xl font-bold">
              Budgets
            </h1>

            <p className="text-gray-500 mt-2">
              Manage your monthly budget and monitor your spending.
            </p>

          </div>

          <div className="flex items-center gap-4">

            <button
              onClick={() => setOpenAddModal(true)}
              className="bg-[#0B6B57] hover:bg-[#085443] text-white px-5 py-3 rounded-xl font-semibold"
            >
              + Add Budget
            </button>

          </div>

        </div>

        <FadeCard delay={0.1}>
          <SummaryCards />
        </FadeCard>

        <FadeCard delay={0.15}>
          <MonthlyProgress />
        </FadeCard>

        <FadeCard delay={0.2}>
          <BudgetHealth />
        </FadeCard>

        <FadeCard delay={0.25}>
          <BudgetInsights />
        </FadeCard>

        <FadeCard delay={0.3}>
          <BudgetRecommendations />
        </FadeCard>

        <FadeCard delay={0.35}>
          <CategoryBudgetTable />
        </FadeCard>

        <FadeCard delay={0.4}>
          <BudgetAlerts />
        </FadeCard>

        <AddBudgetModal
          open={openAddModal}
          onClose={() => setOpenAddModal(false)}
        />

      </div>

    </PageTransition>
  );

}
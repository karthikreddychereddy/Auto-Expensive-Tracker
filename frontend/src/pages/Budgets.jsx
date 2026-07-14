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

export default function Budgets() {

  const [openAddModal, setOpenAddModal] = useState(false);

  return (

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

          <MonthSelector />

          <button
            onClick={() => setOpenAddModal(true)}
            className="bg-[#0B6B57] hover:bg-[#085443] text-white px-5 py-3 rounded-xl font-semibold"
          >
            + Add Budget
          </button>

        </div>

      </div>

      <SummaryCards />

      <MonthlyProgress />

      <BudgetHealth />

      <BudgetInsights />

      <BudgetRecommendations />

      <CategoryBudgetTable />

      <BudgetAlerts />

      <AddBudgetModal
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
      />

    </div>

  );

}
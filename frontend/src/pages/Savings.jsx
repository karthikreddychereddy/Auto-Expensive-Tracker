import SavingsHeader from "../components/savings/SavingsHeader";
import SavingsSummaryCards from "../components/savings/SavingsSummaryCards";
import SavingsToolbar from "../components/savings/SavingsToolbar";
import SavingsHistory from "../components/savings/SavingsHistory";
import SavingsChart from "../components/savings/SavingsChart";
import SavingsGoalCard from "../components/savings/SavingsGoalCard";
import SavingsInsights from "../components/savings/SavingsInsights";

export default function Savings() {

  return (

    <div className="space-y-8">

      <SavingsHeader />

      <SavingsSummaryCards />

      <SavingsToolbar />

      <div className="grid xl:grid-cols-2 gap-8">

          <SavingsChart />

          <SavingsGoalCard />

      </div>

      <SavingsHistory />

      <SavingsInsights />

    </div>

  );

}
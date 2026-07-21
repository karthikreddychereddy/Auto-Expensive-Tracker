import SavingsHeader from "../components/savings/SavingsHeader";
import SavingsSummaryCards from "../components/savings/SavingsSummaryCards";
import SavingsToolbar from "../components/savings/SavingsToolbar";
import SavingsHistory from "../components/savings/SavingsHistory";
import SavingsChart from "../components/savings/SavingsChart";
import SavingsGoalCard from "../components/savings/SavingsGoalCard";
import SavingsInsights from "../components/savings/SavingsInsights";

import PageTransition from "../components/animations/PageTransition";
import FadeCard from "../components/animations/FadeCard";

export default function Savings() {

  return (

    <PageTransition>

      <div className="space-y-8">

        <SavingsHeader />

        <FadeCard delay={0.10}>
          <SavingsSummaryCards />
        </FadeCard>

        <FadeCard delay={0.15}>
          <SavingsToolbar />
        </FadeCard>

        <div className="grid xl:grid-cols-2 gap-8">

          <FadeCard delay={0.20}>
            <SavingsChart />
          </FadeCard>

          <FadeCard delay={0.25}>
            <SavingsGoalCard />
          </FadeCard>

        </div>

        <FadeCard delay={0.30}>
          <SavingsHistory />
        </FadeCard>

        <FadeCard delay={0.35}>
          <SavingsInsights />
        </FadeCard>

      </div>

    </PageTransition>

  );

}
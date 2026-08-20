import {
  MdSavings,
} from "react-icons/md";

import SavingsHeader from "../components/savings/SavingsHeader";
import SavingsSummaryCards from "../components/savings/SavingsSummaryCards";
import SavingsToolbar from "../components/savings/SavingsToolbar";
import SavingsHistory from "../components/savings/SavingsHistory";
import SavingsChart from "../components/savings/SavingsChart";
import SavingsGoalCard from "../components/savings/SavingsGoalCard";
import SavingsInsights from "../components/savings/SavingsInsights";

import {
  useSavings,
} from "../context/SavingsContext";

import PageTransition from "../components/animations/PageTransition";
import FadeCard from "../components/animations/FadeCard";

import PageLoader from "../components/common/PageLoader";
import EmptyState from "../components/common/EmptyState";
import ErrorState from "../components/common/ErrorState";

export default function Savings() {
  const {
    savings,
    filteredSavings,

    loading,
    error,

    fetchSavings,
  } = useSavings();

  if (
    loading &&
    savings.length === 0
  ) {
    return (
      <PageLoader message="Loading savings..." />
    );
  }

  if (
    error &&
    savings.length === 0
  ) {
    return (
      <ErrorState
        title="Unable to load savings"
        message={error}
        onRetry={
          fetchSavings
        }
      />
    );
  }

  return (
    <PageTransition>
      <div className="min-w-0 space-y-4 sm:space-y-6 lg:space-y-8">

        <SavingsHeader />

        {savings.length === 0 ? (
          <EmptyState
            icon={<MdSavings />}
            title="No savings yet"
            description="Add your first saving to start building your financial progress."
          />
        ) : (
          <>
            <FadeCard delay={0.10}>
              <SavingsSummaryCards />
            </FadeCard>

            <FadeCard delay={0.15}>
              <SavingsToolbar />
            </FadeCard>

            <div className="grid min-w-0 gap-4 sm:gap-6 xl:grid-cols-2 xl:gap-8">

              <FadeCard delay={0.20}>
                <SavingsChart />
              </FadeCard>

              <FadeCard delay={0.25}>
                <SavingsGoalCard />
              </FadeCard>

            </div>

            {filteredSavings.length ===
            0 ? (
              <EmptyState
                compact
                icon={<MdSavings />}
                title="No matching savings"
                description="No savings match your current search or filters."
              />
            ) : (
              <FadeCard delay={0.30}>
                <SavingsHistory />
              </FadeCard>
            )}

            <FadeCard delay={0.35}>
              <SavingsInsights />
            </FadeCard>
          </>
        )}

      </div>
    </PageTransition>
  );
}
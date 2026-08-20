import {
  FaBullseye,
} from "react-icons/fa";

import GoalHeader from "../components/goals/GoalHeader";
import GoalSummaryCards from "../components/goals/GoalSummaryCards";
import GoalToolbar from "../components/goals/GoalToolbar";
import GoalGrid from "../components/goals/GoalGrid";
import GoalHistory from "../components/goals/GoalHistory";
import GoalInsights from "../components/goals/GoalInsights";

import {
    useGoal,
} from "../context/GoalContext";

import PageTransition from "../components/animations/PageTransition";
import FadeCard from "../components/animations/FadeCard";

import PageLoader from "../components/common/PageLoader";
import EmptyState from "../components/common/EmptyState";
import ErrorState from "../components/common/ErrorState";

export default function Goals() {
    const {
        goals,
        filteredGoals,

        loading,
        error,

        reloadGoals,
    } = useGoal();

    if (
        loading &&
        goals.length === 0
    ) {
        return (
        <PageLoader message="Loading goals..." />
        );
    }

    if (
        error &&
        goals.length === 0
    ) {
        return (
        <ErrorState
            title="Unable to load goals"
            message={error}
            onRetry={
            reloadGoals
            }
        />
        );
    }

    return (
        <PageTransition>
        <div className="min-w-0 space-y-4 sm:space-y-6 lg:space-y-8">

            <GoalHeader />

            {goals.length === 0 ? (
            <EmptyState
                icon={<FaBullseye />}
                title="No goals yet"
                description="Create your first financial goal and start tracking your progress."
            />
            ) : (
            <>
                <FadeCard delay={0.10}>
                <GoalSummaryCards />
                </FadeCard>

                <FadeCard delay={0.15}>
                <GoalToolbar />
                </FadeCard>

                {filteredGoals.length ===
                0 ? (
                <EmptyState
                    compact
                    icon={<FaBullseye />}
                    title="No matching goals"
                    description="No goals match your current search or filters."
                />
                ) : (
                <FadeCard delay={0.20}>
                    <GoalGrid />
                </FadeCard>
                )}

                <FadeCard delay={0.25}>
                <GoalHistory />
                </FadeCard>

                <FadeCard delay={0.30}>
                <GoalInsights />
                </FadeCard>
            </>
            )}

        </div>
        </PageTransition>
    );
}
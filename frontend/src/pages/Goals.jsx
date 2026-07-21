import GoalHeader from "../components/goals/GoalHeader";
import GoalSummaryCards from "../components/goals/GoalSummaryCards";
import GoalToolbar from "../components/goals/GoalToolbar";
import GoalGrid from "../components/goals/GoalGrid";
import GoalHistory from "../components/goals/GoalHistory";
import GoalAnalytics from "../components/goals/GoalAnalytics";
import GoalInsights from "../components/goals/GoalInsights";

import PageTransition from "../components/animations/PageTransition";
import FadeCard from "../components/animations/FadeCard";

export default function Goals() {

    return (

        <PageTransition>

            <div className="space-y-8">

                <GoalHeader />

                <FadeCard delay={0.10}>
                    <GoalSummaryCards />
                </FadeCard>

                <FadeCard delay={0.15}>
                    <GoalToolbar />
                </FadeCard>

                {/* Enable whenever GoalAnalytics is ready */}
                {/* 
                <FadeCard delay={0.20}>
                    <GoalAnalytics />
                </FadeCard>
                */}

                <FadeCard delay={0.20}>
                    <GoalGrid />
                </FadeCard>

                <FadeCard delay={0.25}>
                    <GoalHistory />
                </FadeCard>

                <FadeCard delay={0.30}>
                    <GoalInsights />
                </FadeCard>

            </div>

        </PageTransition>

    );

}
import GoalHeader from "../components/goals/GoalHeader";
import GoalSummaryCards from "../components/goals/GoalSummaryCards";
import GoalToolbar from "../components/goals/GoalToolbar";
import GoalGrid from "../components/goals/GoalGrid";
import GoalHistory from "../components/goals/GoalHistory";
import GoalAnalytics from "../components/goals/GoalAnalytics";
import GoalInsights from "../components/goals/GoalInsights";

export default function Goals() {

    return (

        <div className="space-y-8">

            <GoalHeader />

            <GoalSummaryCards />

            <GoalToolbar />

            {/* <GoalAnalytics /> */}

            <GoalGrid />

            <GoalHistory />

            <GoalInsights />

        </div>

    );

}
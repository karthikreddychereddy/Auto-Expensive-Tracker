import ProfileHeader from "../components/profile/ProfileHeader";
import FinancialHealthCard from "../components/profile/FinancialHealthCard";
import GoalsOverview from "../components/profile/GoalsOverview";
import AchievementSection from "../components/profile/AchievementSection";
import MonthlyStatistics from "../components/profile/MonthlyStatistics";
import AIFinancialInsights from "../components/profile/AIFinancialInsights";
import RecentActivity from "../components/profile/RecentActivity";
import EditProfileModal from "../components/profile/EditProfileModal";

export default function Profile() {

    return (

        <div className="space-y-8">

            <ProfileHeader />

            <FinancialHealthCard />

            <MonthlyStatistics />

            <GoalsOverview />

            <AchievementSection />

            <AIFinancialInsights />

            <RecentActivity />

            <EditProfileModal />

        </div>

    );

}
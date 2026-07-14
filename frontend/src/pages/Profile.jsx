import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileInformation from "../components/profile/ProfileInformation";
import FinancialHealthCard from "../components/profile/FinancialHealthCard";
import ProfileSummary from "../components/profile/ProfileSummary";
import GoalsOverview from "../components/profile/GoalsOverview";
import AchievementSection from "../components/profile/AchievementSection";

export default function Profile() {

    return (

        <div className="space-y-8">

            <ProfileHeader />

            <div className="grid lg:grid-cols-2 gap-8">

                <ProfileInformation />

                <FinancialHealthCard />

            </div>

            <ProfileSummary />

            <GoalsOverview />

            <AchievementSection />

        </div>

    );

}
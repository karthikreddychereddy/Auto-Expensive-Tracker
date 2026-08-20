import ProfileHeader from "../components/profile/ProfileHeader";
import FinancialHealthCard from "../components/profile/FinancialHealthCard";
import MonthlyStatistics from "../components/profile/MonthlyStatistics";
import GoalsOverview from "../components/profile/GoalsOverview";
import AchievementSection from "../components/profile/AchievementSection";
import EditProfileModal from "../components/profile/EditProfileModal";

import PageTransition from "../components/animations/PageTransition";
import FadeCard from "../components/animations/FadeCard";

export default function Profile() {
  return (
    <PageTransition>
      <div className="min-w-0 space-y-4 sm:space-y-6 lg:space-y-8">

        <ProfileHeader />

        <div className="grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">

          <FadeCard delay={0.10}>
            <FinancialHealthCard />
          </FadeCard>

          <FadeCard delay={0.15}>
            <MonthlyStatistics />
          </FadeCard>

        </div>

        <FadeCard delay={0.20}>
          <GoalsOverview />
        </FadeCard>

        <FadeCard delay={0.25}>
          <AchievementSection />
        </FadeCard>

        <EditProfileModal />

      </div>
    </PageTransition>
  );
}
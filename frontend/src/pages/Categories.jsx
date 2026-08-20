import CategoryHeader from "../components/categories/CategoryHeader";
import CategorySummaryCards from "../components/categories/CategorySummaryCards";
import CategoryToolbar from "../components/categories/CategoryToolbar";
import CategoryGrid from "../components/categories/CategoryGrid";
import CategoryInsights from "../components/categories/CategoryInsights";

import PageTransition from "../components/animations/PageTransition";
import FadeCard from "../components/animations/FadeCard";

export default function Categories() {
  return (
    <PageTransition>

      <div className="min-w-0 space-y-4 sm:space-y-6 lg:space-y-8">

        <CategoryHeader />

        <FadeCard delay={0.10}>
          <CategorySummaryCards />
        </FadeCard>

        <FadeCard delay={0.15}>
          <CategoryToolbar />
        </FadeCard>

        <FadeCard delay={0.20}>
          <CategoryGrid />
        </FadeCard>

        <FadeCard delay={0.25}>
          <CategoryInsights />
        </FadeCard>

      </div>

    </PageTransition>
  );
}
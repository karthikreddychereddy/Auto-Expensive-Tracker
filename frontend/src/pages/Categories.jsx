import CategoryHeader from "../components/categories/CategoryHeader";
import CategorySummaryCards from "../components/categories/CategorySummaryCards";
import CategoryToolbar from "../components/categories/CategoryToolbar";
import CategoryGrid from "../components/categories/CategoryGrid";
import CategoryHistory from "../components/categories/CategoryHistory";
import CategoryInsights from "../components/categories/CategoryInsights";

import PageTransition from "../components/animations/PageTransition";
import FadeCard from "../components/animations/FadeCard";

export default function Categories() {

    return (

        <PageTransition>

            <div className="space-y-8">

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
                    <CategoryHistory />
                </FadeCard>

                <FadeCard delay={0.30}>
                    <CategoryInsights />
                </FadeCard>

            </div>

        </PageTransition>

    );

}
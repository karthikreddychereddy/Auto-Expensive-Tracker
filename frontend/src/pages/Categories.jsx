import CategoryHeader from "../components/categories/CategoryHeader";
import CategorySummaryCards from "../components/categories/CategorySummaryCards";
import CategoryToolbar from "../components/categories/CategoryToolbar";
import CategoryGrid from "../components/categories/CategoryGrid";
import CategoryHistory from "../components/categories/CategoryHistory";
import CategoryInsights from "../components/categories/CategoryInsights";

export default function Categories() {

    return (

        <div className="space-y-8">

            <CategoryHeader />

            <CategorySummaryCards />

            <CategoryToolbar />

            <CategoryGrid />

            <CategoryHistory />

            <CategoryInsights />

        </div>

    );

}
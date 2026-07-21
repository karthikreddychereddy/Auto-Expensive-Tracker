import api from "./api";

export const insightService = {

    getInsights: () =>
        api.get("/insights").then(res => res.data),

    getCategoryBreakdown: () =>
        api.get("/insights/category-breakdown").then(res => res.data),

    getMonthlyTrend: () =>
        api.get("/insights/monthly-trend").then(res => res.data),

    getWeeklyExpense: () =>
        api.get("/insights/weekly-expense").then(res => res.data),

    getRecentTransactions: () =>
        api.get("/insights/recent-transactions").then(res => res.data)

};

export default insightService;
import api from "./api";

export const dashboardService = {

  summary: () =>
    api.get("/dashboard/summary").then(r => r.data),

  recentTransactions: () =>
    api.get("/dashboard/recent-transactions").then(r => r.data),

  categorySummary: () =>
    api.get("/dashboard/category-summary").then(r => r.data),

  monthlySummary: () =>
    api.get("/dashboard/monthly-summary").then(r => r.data),

  weeklySummary: () =>
    api.get("/dashboard/weekly-summary").then(r => r.data),

};
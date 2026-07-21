import api from "./api";

export const dashboardService = {

  summary: (month) =>
    api.get("/dashboard/summary", {
      params: { month },
    }).then(r => r.data),

  recentTransactions: (month) =>
    api.get("/dashboard/recent-transactions", {
      params: { month },
    }).then(r => r.data),

  categorySummary: (month) =>
    api.get("/dashboard/category-summary", {
      params: { month },
    }).then(r => r.data),

  monthlySummary: () =>
    api.get("/dashboard/monthly-summary")
      .then(r => r.data),

  weeklySummary: (month) =>
    api.get("/dashboard/weekly-summary", {
      params: { month },
    }).then(r => r.data),

};
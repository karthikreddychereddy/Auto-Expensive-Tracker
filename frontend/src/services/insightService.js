import api from "./api";

export const insightService = {

  getInsights: month =>
    api
      .get(
        "/insights",
        {
          params: {
            month,
          },
        }
      )
      .then(
        response =>
          response.data
      ),

  getCategoryBreakdown: month =>
    api
      .get(
        "/insights/category-breakdown",
        {
          params: {
            month,
          },
        }
      )
      .then(
        response =>
          response.data
      ),

  getMonthlyTrend: month =>
    api
      .get(
        "/insights/monthly-trend",
        {
          params: {
            month,
          },
        }
      )
      .then(
        response =>
          response.data
      ),

  getWeeklyExpense: month =>
    api
      .get(
        "/insights/weekly-expense",
        {
          params: {
            month,
          },
        }
      )
      .then(
        response =>
          response.data
      ),

  getRecentTransactions: month =>
    api
      .get(
        "/insights/recent-transactions",
        {
          params: {
            month,
          },
        }
      )
      .then(
        response =>
          response.data
      ),

  getPaymentMethods: month =>
    api
      .get(
        "/insights/payment-methods",
        {
          params: {
            month,
          },
        }
      )
      .then(
        response =>
          response.data
      ),
};

export default insightService;
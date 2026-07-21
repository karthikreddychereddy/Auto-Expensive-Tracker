package com.paisatrack.backend.service;

import com.paisatrack.backend.dto.CategoryBreakdownResponse;
import com.paisatrack.backend.dto.DashboardSummaryResponse;
import com.paisatrack.backend.dto.MonthlyTrendResponse;
import com.paisatrack.backend.dto.RecentTransactionResponse;
import com.paisatrack.backend.dto.WeeklyExpenseResponse;

import java.util.List;

public interface DashboardService {

    DashboardSummaryResponse getDashboardSummary(String month);

    List<RecentTransactionResponse> getRecentTransactions(String month);

    List<CategoryBreakdownResponse> getCategoryWiseExpenses(String month);

    List<MonthlyTrendResponse> getMonthlySummary();

    List<WeeklyExpenseResponse> getWeeklyExpenseSummary(String month);

}
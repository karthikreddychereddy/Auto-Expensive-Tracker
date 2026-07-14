package com.paisatrack.backend.service;

import com.paisatrack.backend.dto.CategoryExpenseResponse;
import com.paisatrack.backend.dto.DashboardSummaryResponse;
import com.paisatrack.backend.dto.MonthlySummaryResponse;
import com.paisatrack.backend.dto.RecentTransactionResponse;
import com.paisatrack.backend.dto.WeeklyExpenseResponse;

import java.util.List;

public interface DashboardService {

    DashboardSummaryResponse getDashboardSummary();

    List<RecentTransactionResponse> getRecentTransactions();

    List<CategoryExpenseResponse> getCategoryWiseExpenses();

    List<MonthlySummaryResponse> getMonthlySummary();

    List<WeeklyExpenseResponse> getWeeklyExpenseSummary();
}
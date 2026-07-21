package com.paisatrack.backend.service;

import com.paisatrack.backend.dto.*;
import com.paisatrack.backend.dto.CategoryBreakdownResponse;

import java.util.List;

public interface InsightService {

    InsightResponse getInsights();

    List<CategoryBreakdownResponse> getCategoryBreakdown();

    List<MonthlyTrendResponse> getMonthlyTrend();

    List<WeeklyExpenseResponse> getWeeklyExpense();

    List<RecentTransactionResponse> getRecentTransactions();

}
package com.paisatrack.backend.service;

import com.paisatrack.backend.dto.CategoryBreakdownResponse;
import com.paisatrack.backend.dto.InsightResponse;
import com.paisatrack.backend.dto.MonthlyTrendResponse;
import com.paisatrack.backend.dto.PaymentMethodBreakdownResponse;
import com.paisatrack.backend.dto.RecentTransactionResponse;
import com.paisatrack.backend.dto.WeeklyExpenseResponse;

import java.util.List;

public interface InsightService {

    InsightResponse getInsights(
            String month
    );

    List<CategoryBreakdownResponse>
    getCategoryBreakdown(
            String month
    );

    List<MonthlyTrendResponse>
    getMonthlyTrend(
            String month
    );

    List<WeeklyExpenseResponse>
    getWeeklyExpense(
            String month
    );

    List<RecentTransactionResponse>
    getRecentTransactions(
            String month
    );

    List<PaymentMethodBreakdownResponse>
    getPaymentMethodBreakdown(
            String month
    );
}
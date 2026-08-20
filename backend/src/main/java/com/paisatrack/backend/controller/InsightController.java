package com.paisatrack.backend.controller;

import com.paisatrack.backend.dto.CategoryBreakdownResponse;
import com.paisatrack.backend.dto.InsightResponse;
import com.paisatrack.backend.dto.MonthlyTrendResponse;
import com.paisatrack.backend.dto.PaymentMethodBreakdownResponse;
import com.paisatrack.backend.dto.RecentTransactionResponse;
import com.paisatrack.backend.dto.WeeklyExpenseResponse;

import com.paisatrack.backend.service.InsightService;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/insights")
@RequiredArgsConstructor
@CrossOrigin(
        origins = "http://localhost:5173"
)
public class InsightController {

    private final InsightService
            insightService;

    // ==========================================
    // OVERVIEW
    // ==========================================

    @GetMapping
    public InsightResponse getInsights(
            @RequestParam(
                    required = false
            )
            String month
    ) {

        return insightService
                .getInsights(
                        month
                );
    }

    // ==========================================
    // CATEGORY BREAKDOWN
    // ==========================================

    @GetMapping(
            "/category-breakdown"
    )
    public List<CategoryBreakdownResponse>
    getCategoryBreakdown(
            @RequestParam(
                    required = false
            )
            String month
    ) {

        return insightService
                .getCategoryBreakdown(
                        month
                );
    }

    // ==========================================
    // MONTHLY TREND
    // ==========================================

    @GetMapping(
            "/monthly-trend"
    )
    public List<MonthlyTrendResponse>
    getMonthlyTrend(
            @RequestParam(
                    required = false
            )
            String month
    ) {

        return insightService
                .getMonthlyTrend(
                        month
                );
    }

    // ==========================================
    // WEEKLY EXPENSE
    // ==========================================

    @GetMapping(
            "/weekly-expense"
    )
    public List<WeeklyExpenseResponse>
    getWeeklyExpense(
            @RequestParam(
                    required = false
            )
            String month
    ) {

        return insightService
                .getWeeklyExpense(
                        month
                );
    }

    // ==========================================
    // RECENT TRANSACTIONS
    // ==========================================

    @GetMapping(
            "/recent-transactions"
    )
    public List<RecentTransactionResponse>
    getRecentTransactions(
            @RequestParam(
                    required = false
            )
            String month
    ) {

        return insightService
                .getRecentTransactions(
                        month
                );
    }

    // ==========================================
    // PAYMENT METHOD BREAKDOWN
    // ==========================================

    @GetMapping(
            "/payment-methods"
    )
    public List<PaymentMethodBreakdownResponse>
    getPaymentMethodBreakdown(
            @RequestParam(
                    required = false
            )
            String month
    ) {

        return insightService
                .getPaymentMethodBreakdown(
                        month
                );
    }
}
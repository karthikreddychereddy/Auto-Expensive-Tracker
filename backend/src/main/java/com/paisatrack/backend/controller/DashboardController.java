package com.paisatrack.backend.controller;

import com.paisatrack.backend.dto.CategoryBreakdownResponse;
import com.paisatrack.backend.dto.DashboardSummaryResponse;
import com.paisatrack.backend.dto.MonthlyTrendResponse;
import com.paisatrack.backend.dto.RecentTransactionResponse;
import com.paisatrack.backend.dto.WeeklyExpenseResponse;
import com.paisatrack.backend.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping("/summary")
    public DashboardSummaryResponse getSummary(
            @RequestParam(required = false) String month) {

        return dashboardService.getDashboardSummary(month);

    }

    @GetMapping("/recent-transactions")
    public List<RecentTransactionResponse> getRecentTransactions(
            @RequestParam(required = false) String month) {

        return dashboardService.getRecentTransactions(month);

    }

    @GetMapping("/category-summary")
    public List<CategoryBreakdownResponse> getCategorySummary(
            @RequestParam(required = false) String month) {

        return dashboardService.getCategoryWiseExpenses(month);

    }

    @GetMapping("/monthly-summary")
    public List<MonthlyTrendResponse> getMonthlySummary() {
        return dashboardService.getMonthlySummary();
    }

    @GetMapping("/weekly-summary")
    public List<WeeklyExpenseResponse> getWeeklySummary(
            @RequestParam(required = false) String month) {

        return dashboardService.getWeeklyExpenseSummary(month);

    }
}
package com.paisatrack.backend.controller;

import com.paisatrack.backend.dto.CategoryExpenseResponse;
import com.paisatrack.backend.dto.DashboardSummaryResponse;
import com.paisatrack.backend.dto.MonthlySummaryResponse;
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
    public DashboardSummaryResponse getSummary() {
        return dashboardService.getDashboardSummary();
    }

    @GetMapping("/recent-transactions")
    public List<RecentTransactionResponse> getRecentTransactions() {
        return dashboardService.getRecentTransactions();
    }

    @GetMapping("/category-summary")
    public List<CategoryExpenseResponse> getCategorySummary() {
        return dashboardService.getCategoryWiseExpenses();
    }

    @GetMapping("/monthly-summary")
    public List<MonthlySummaryResponse> getMonthlySummary() {
        return dashboardService.getMonthlySummary();
    }

    @GetMapping("/weekly-summary")
    public List<WeeklyExpenseResponse> getWeeklySummary() {
        return dashboardService.getWeeklyExpenseSummary();
    }
}
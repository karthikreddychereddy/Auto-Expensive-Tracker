package com.paisatrack.backend.controller;

import com.paisatrack.backend.dto.*;
import com.paisatrack.backend.service.InsightService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/insights")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class InsightController {

    private final InsightService insightService;


    @GetMapping
    public InsightResponse getInsights() {

        return insightService.getInsights();

    }


    @GetMapping("/category-breakdown")
    public List<CategoryBreakdownResponse> getCategoryBreakdown(){

        return insightService.getCategoryBreakdown();

    }


    @GetMapping("/monthly-trend")
    public List<MonthlyTrendResponse> getMonthlyTrend(){

        return insightService.getMonthlyTrend();

    }


    @GetMapping("/weekly-expense")
    public List<WeeklyExpenseResponse> getWeeklyExpense(){

        return insightService.getWeeklyExpense();

    }


    @GetMapping("/recent-transactions")
    public List<RecentTransactionResponse> getRecentTransactions(){

        return insightService.getRecentTransactions();

    }

}
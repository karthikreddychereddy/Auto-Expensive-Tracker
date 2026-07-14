package com.paisatrack.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InsightsResponse {

    private Double totalIncome;

    private Double totalExpense;

    private Double netSavings;

    private Double totalBudget;

    private Double budgetUsedPercentage;

    private String highestExpenseCategory;
}
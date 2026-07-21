package com.paisatrack.backend.dto;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InsightResponse {

    private BigDecimal totalIncome;

    private BigDecimal totalExpense;

    private BigDecimal totalSavings;

    private BigDecimal balance;

    private String highestExpenseCategory;

    private Long totalGoals;

    private Long completedGoals;

    private Double savingsRate;

    private Double expenseRate;

    private String financialHealth;
}
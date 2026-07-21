package com.paisatrack.backend.dto;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InsightOverviewResponse {

    private BigDecimal totalIncome;

    private BigDecimal totalExpense;

    private BigDecimal totalSavings;

    private BigDecimal currentBalance;

    private int totalGoals;

    private int completedGoals;
}
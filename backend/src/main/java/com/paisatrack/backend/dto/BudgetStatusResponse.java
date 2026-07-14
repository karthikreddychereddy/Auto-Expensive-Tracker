package com.paisatrack.backend.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class BudgetStatusResponse {

    private String category;

    private BigDecimal budgetAmount;

    private BigDecimal spentAmount;

    private BigDecimal remainingAmount;

    private Double percentageUsed;
}
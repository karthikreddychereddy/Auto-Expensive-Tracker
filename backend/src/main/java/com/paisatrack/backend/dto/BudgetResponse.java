package com.paisatrack.backend.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Builder
public class BudgetResponse {

    private Long id;

    private String category;

    private BigDecimal budgetAmount;

    private LocalDate startDate;

    private LocalDate endDate;
}
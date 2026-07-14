package com.paisatrack.backend.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class BudgetRequest {

    private String category;

    private BigDecimal budgetAmount;

    private LocalDate startDate;

    private LocalDate endDate;
}
package com.paisatrack.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
public class ExpenseResponse {

    private Long id;

    private BigDecimal amount;

    private String category;

    private String paymentMode;

    private String description;

    private String merchant;

    private LocalDate expenseDate;

    private String transactionType;

    private String source;
}
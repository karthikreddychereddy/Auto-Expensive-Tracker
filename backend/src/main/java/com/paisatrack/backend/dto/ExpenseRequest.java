package com.paisatrack.backend.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class ExpenseRequest {

    @NotNull(message = "Amount is required")
    @DecimalMin(value = "0.01", message = "Amount must be greater than zero")
    private BigDecimal amount;

    @NotBlank(message = "Category is required")
    private String category;

    @NotBlank(message = "Payment mode is required")
    private String paymentMode;

    @NotBlank(message = "Description is required")
    private String description;

    private String merchant;

    @NotNull(message = "Expense date is required")
    private LocalDate expenseDate;

    private String source;
}
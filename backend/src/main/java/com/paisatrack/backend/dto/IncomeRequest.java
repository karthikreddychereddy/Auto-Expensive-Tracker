package com.paisatrack.backend.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class IncomeRequest {

    @NotNull
    @DecimalMin("0.01")
    private BigDecimal amount;

    @NotBlank
    private String category;

    @NotBlank
    private String source;

    private String description;

    @NotNull(message = "Amount is required")
    private LocalDate incomeDate;
}
package com.paisatrack.backend.dto;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RecentTransactionResponse {

    private Long id;

    private String transactionType;

    private BigDecimal amount;

    private String category;

    private String description;

    private LocalDate date;
}
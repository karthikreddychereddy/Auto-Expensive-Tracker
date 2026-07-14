package com.paisatrack.backend.dto;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GoalResponse {

    private Long id;

    private String goalName;

    private BigDecimal targetAmount;

    private BigDecimal savedAmount;

    private BigDecimal remainingAmount;

    private Double progress;

    private String status;

    private LocalDate targetDate;
}
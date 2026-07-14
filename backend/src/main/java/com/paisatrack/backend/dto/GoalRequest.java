package com.paisatrack.backend.dto;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GoalRequest {

    private String goalName;

    private BigDecimal targetAmount;

    private BigDecimal savedAmount;

    private LocalDate targetDate;
}
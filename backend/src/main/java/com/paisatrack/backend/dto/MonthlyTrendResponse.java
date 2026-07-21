package com.paisatrack.backend.dto;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MonthlyTrendResponse {

    private String month;

    private BigDecimal income;

    private BigDecimal expense;
}
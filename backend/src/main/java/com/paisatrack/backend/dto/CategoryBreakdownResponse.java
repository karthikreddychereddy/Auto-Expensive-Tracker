package com.paisatrack.backend.dto;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CategoryBreakdownResponse {

    private String category;

    private BigDecimal amount;
}
package com.paisatrack.backend.dto;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SavingsRequest {

    private BigDecimal amount;

    private String source;

    private String description;

    private LocalDate savingDate;
}
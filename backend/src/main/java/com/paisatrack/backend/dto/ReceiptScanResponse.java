package com.paisatrack.backend.dto;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReceiptScanResponse {

    private String merchant;

    private BigDecimal amount;

    private BigDecimal gst;

    private LocalDate date;

    private String paymentMode;

    private String category;

    private String extractedText;

}
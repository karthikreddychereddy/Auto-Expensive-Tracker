package com.paisatrack.backend.controller;

import com.paisatrack.backend.dto.ReceiptAIRequest;
import com.paisatrack.backend.dto.ReceiptAIResponse;
import com.paisatrack.backend.service.ReceiptAIService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/receipt")
@RequiredArgsConstructor
public class ReceiptAIController {

    private final ReceiptAIService receiptAIService;

    @PostMapping("/ai-test")
    public ReceiptAIResponse improveReceipt(
            @RequestBody ReceiptAIRequest request
    ) {

        return receiptAIService.improveReceipt(
                request.getExtractedText()
        );

    }

}
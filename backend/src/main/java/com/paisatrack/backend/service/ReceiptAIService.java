package com.paisatrack.backend.service;

import com.paisatrack.backend.dto.ReceiptAIResponse;

public interface ReceiptAIService {

    ReceiptAIResponse improveReceipt(String extractedText);
}
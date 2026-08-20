package com.paisatrack.backend.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.paisatrack.backend.ai.ReceiptPromptBuilder;
import com.paisatrack.backend.ai.client.LLMClient;
import com.paisatrack.backend.dto.ReceiptAIResponse;
import com.paisatrack.backend.service.ReceiptAIService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ReceiptAIServiceImpl implements ReceiptAIService {

    private final LLMClient llmClient;
    private final ObjectMapper objectMapper;

    @Override
    public ReceiptAIResponse improveReceipt(String extractedText) {

        try {

            System.out.println("========== OCR TEXT ==========");
            System.out.println(extractedText);
            System.out.println("==============================");

            /*
             * Build AI prompt using OCR text.
             */
            String prompt =
                    ReceiptPromptBuilder.build(extractedText);

            /*
             * Send prompt to Gemini/LLM.
             */
            String response =
                    llmClient.generateResponse(prompt);

            System.out.println("========== RAW AI RESPONSE ==========");
            System.out.println(response);
            System.out.println("=====================================");

            /*
             * IMPORTANT:
             *
             * Gemini may return:
             *
             * ```json
             * {
             *   "merchant": "Quest Provider",
             *   "amount": 3966.30
             * }
             * ```
             *
             * Jackson cannot parse the Markdown code fences.
             *
             * Therefore clean the response before parsing.
             */
            String cleanedResponse =
                    cleanJsonResponse(response);

            System.out.println("========== CLEANED AI JSON ==========");
            System.out.println(cleanedResponse);
            System.out.println("=====================================");

            /*
             * Convert cleaned JSON into ReceiptAIResponse.
             */
            ReceiptAIResponse receipt =
                    objectMapper.readValue(
                            cleanedResponse,
                            ReceiptAIResponse.class
                    );

            /*
             * Final extracted values for debugging.
             */
            System.out.println("========== RECEIPT AI RESPONSE ==========");
            System.out.println("Merchant     = " + receipt.getMerchant());
            System.out.println("Amount       = " + receipt.getAmount());
            System.out.println("GST          = " + receipt.getGst());
            System.out.println("Date         = " + receipt.getDate());
            System.out.println("Payment Mode = " + receipt.getPaymentMode());
            System.out.println("Category     = " + receipt.getCategory());
            System.out.println("=========================================");

            return receipt;

        } catch (Exception ex) {

            ex.printStackTrace();

            throw new RuntimeException(
                    "Unable to improve receipt using AI.",
                    ex
            );
        }
    }

    /**
     * Cleans the AI response so that Jackson receives
     * only valid JSON.
     */
    private String cleanJsonResponse(String response) {

        if (response == null || response.isBlank()) {

            throw new RuntimeException(
                    "AI returned an empty response."
            );
        }

        String cleaned = response.trim();

        /*
         * Remove Markdown code fences.
         *
         * Handles:
         *
         * ```json
         * {...}
         * ```
         *
         * and:
         *
         * ```
         * {...}
         * ```
         */
        if (cleaned.startsWith("```json")) {

            cleaned = cleaned.substring(7);

        } else if (cleaned.startsWith("```")) {

            cleaned = cleaned.substring(3);
        }

        if (cleaned.endsWith("```")) {

            cleaned = cleaned.substring(
                    0,
                    cleaned.length() - 3
            );
        }

        cleaned = cleaned.trim();

        /*
         * Gemini can sometimes add text before or after
         * the JSON object.
         *
         * Example:
         *
         * Here is the extracted receipt:
         * {
         *   ...
         * }
         *
         * Extract only the JSON object.
         */
        int start = cleaned.indexOf("{");
        int end = cleaned.lastIndexOf("}");

        if (start >= 0 && end > start) {

            cleaned =
                    cleaned.substring(
                            start,
                            end + 1
                    );
        }

        cleaned = cleaned.trim();

        /*
         * Make sure something resembling JSON remains.
         */
        if (cleaned.isBlank()
                || !cleaned.startsWith("{")
                || !cleaned.endsWith("}")) {

            throw new RuntimeException(
                    "AI returned an invalid JSON response: "
                            + response
            );
        }

        return cleaned;
    }
}
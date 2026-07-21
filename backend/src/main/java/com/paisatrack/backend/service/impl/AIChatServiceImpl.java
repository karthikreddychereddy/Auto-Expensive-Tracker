package com.paisatrack.backend.service.impl;

import com.paisatrack.backend.ai.client.LLMClient;
import com.paisatrack.backend.ai.context.FinancialContextBuilder;
import com.paisatrack.backend.ai.context.model.FinancialContext;
import com.paisatrack.backend.ai.prompt.PromptBuilder;
import com.paisatrack.backend.dto.AIChatRequest;
import com.paisatrack.backend.dto.AIChatResponse;
import com.paisatrack.backend.service.AIChatService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class AIChatServiceImpl implements AIChatService {

    private final FinancialContextBuilder financialContextBuilder;
    private final PromptBuilder promptBuilder;
    private final LLMClient llmClient;

    public AIChatServiceImpl(FinancialContextBuilder financialContextBuilder,
                             PromptBuilder promptBuilder,
                             LLMClient llmClient) {
        this.financialContextBuilder = financialContextBuilder;
        this.promptBuilder = promptBuilder;
        this.llmClient = llmClient;
    }

    @Override
    public AIChatResponse chat(AIChatRequest request) {

        FinancialContext context =
                financialContextBuilder.buildCurrentUserContext();

        String prompt =
                promptBuilder.buildPrompt(context, request.getMessage());

        String reply =
                llmClient.generateResponse(prompt);

        AIChatResponse response = new AIChatResponse();

        response.setReply(reply);

        if (request.getConversationId() == null ||
                request.getConversationId().isBlank()) {

            response.setConversationId(UUID.randomUUID().toString());

        } else {

            response.setConversationId(request.getConversationId());

        }

        response.setTimestamp(LocalDateTime.now());

        response.setSuccess(true);

        return response;
    }
}
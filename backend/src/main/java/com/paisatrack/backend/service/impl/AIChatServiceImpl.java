package com.paisatrack.backend.service.impl;

import com.paisatrack.backend.ai.client.LLMClient;
import com.paisatrack.backend.ai.context.FinancialContextBuilder;
import com.paisatrack.backend.ai.context.model.FinancialContext;
import com.paisatrack.backend.ai.prompt.PromptBuilder;
import com.paisatrack.backend.dto.AIChatRequest;
import com.paisatrack.backend.dto.AIChatResponse;
import com.paisatrack.backend.entity.AIConversation;
import com.paisatrack.backend.entity.AIMessage;
import com.paisatrack.backend.entity.User;
import com.paisatrack.backend.repository.AIConversationRepository;
import com.paisatrack.backend.repository.AIMessageRepository;
import com.paisatrack.backend.repository.UserRepository;
import com.paisatrack.backend.service.AIChatService;
import com.paisatrack.backend.service.AIConversationService;
import com.paisatrack.backend.util.SecurityUtil;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class AIChatServiceImpl implements AIChatService {

    private final FinancialContextBuilder financialContextBuilder;
    private final PromptBuilder promptBuilder;
    private final LLMClient llmClient;

    private final AIConversationRepository conversationRepository;
    private final AIMessageRepository messageRepository;
    private final UserRepository userRepository;
    private final AIConversationService conversationService;

    public AIChatServiceImpl(
            FinancialContextBuilder financialContextBuilder,
            PromptBuilder promptBuilder,
            LLMClient llmClient,
            AIConversationRepository conversationRepository,
            AIMessageRepository messageRepository,
            UserRepository userRepository,
            AIConversationService conversationService
    ) {

        this.financialContextBuilder = financialContextBuilder;
        this.promptBuilder = promptBuilder;
        this.llmClient = llmClient;

        this.conversationRepository = conversationRepository;
        this.messageRepository = messageRepository;
        this.userRepository = userRepository;
        this.conversationService = conversationService;
    }

    private User getCurrentUser() {

        String email = SecurityUtil.getCurrentUserEmail();

        return userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new EntityNotFoundException("User not found"));

    }

    private AIConversation findOrCreateConversation(
            AIChatRequest request,
            User user
    ) {

        if (request.getConversationId() != null) {

            return conversationRepository
                    .findByIdAndUser(
                            request.getConversationId(),
                            user
                    )
                    .orElseThrow(() ->
                            new EntityNotFoundException(
                                    "Conversation not found"
                            ));

        }

        AIConversation conversation =
                AIConversation.builder()
                        .user(user)
                        .title("New Chat")
                        .pinned(false)
                        .build();

        return conversationRepository.save(conversation);

    }

    private AIMessage saveMessage(
            AIConversation conversation,
            String role,
            String content
    ) {

        AIMessage message =
                AIMessage.builder()
                        .conversation(conversation)
                        .role(role)
                        .content(content)
                        .build();

        return messageRepository.save(message);

    }

    @Override
    public AIChatResponse chat(AIChatRequest request) {

        User user = getCurrentUser();

        AIConversation conversation =
                findOrCreateConversation(request, user);

        if (conversation.getMessages().isEmpty()) {

            String title = request.getMessage();

            if (title.length() > 35) {
                title = title.substring(0, 35) + "...";
            }

            conversation.setTitle(title);

        }

        saveMessage(
                conversation,
                "user",
                request.getMessage()
        );

        FinancialContext context =
                financialContextBuilder
                        .buildCurrentUserContext();

        String prompt =
                promptBuilder.buildPrompt(
                        context,
                        request.getMessage()
                );

        String reply =
                llmClient.generateResponse(prompt);

        saveMessage(
                conversation,
                "assistant",
                reply
        );

        conversation.setUpdatedAt(
                LocalDateTime.now()
        );

        conversationRepository.save(conversation);
                AIChatResponse response = new AIChatResponse();

        response.setReply(reply);

        response.setConversationId(
                conversation.getId()
        );

        response.setTimestamp(
                LocalDateTime.now()
        );

        response.setSuccess(true);

        response.setConversation(

                conversationService.getConversation(
                        conversation.getId()
                )

        );

        return response;

    }

}
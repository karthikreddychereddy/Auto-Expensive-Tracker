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
import com.paisatrack.backend.service.AIFileService;
import com.paisatrack.backend.util.SecurityUtil;

import jakarta.persistence.EntityNotFoundException;
import reactor.core.publisher.Flux;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

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

    /*
     * Handles extraction of text from:
     *
     * PDF
     * TXT
     * CSV
     * DOCX
     * Excel
     * Images
     */
    private final AIFileService aiFileService;

    public AIChatServiceImpl(
            FinancialContextBuilder financialContextBuilder,
            PromptBuilder promptBuilder,
            LLMClient llmClient,
            AIConversationRepository conversationRepository,
            AIMessageRepository messageRepository,
            UserRepository userRepository,
            AIConversationService conversationService,
            AIFileService aiFileService
    ) {

        this.financialContextBuilder =
                financialContextBuilder;

        this.promptBuilder =
                promptBuilder;

        this.llmClient =
                llmClient;

        this.conversationRepository =
                conversationRepository;

        this.messageRepository =
                messageRepository;

        this.userRepository =
                userRepository;

        this.conversationService =
                conversationService;

        this.aiFileService =
                aiFileService;
    }

    private User getCurrentUser() {

        String email =
                SecurityUtil.getCurrentUserEmail();

        return userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new EntityNotFoundException(
                                "User not found"
                        )
                );
    }

    private AIConversation findOrCreateConversation(
            AIChatRequest request,
            User user
    ) {

        if (
                request.getConversationId()
                        != null
        ) {

            return conversationRepository
                    .findByIdAndUser(
                            request.getConversationId(),
                            user
                    )
                    .orElseThrow(() ->
                            new EntityNotFoundException(
                                    "Conversation not found"
                            )
                    );
        }

        AIConversation conversation =
                AIConversation.builder()
                        .user(user)
                        .title("New Chat")
                        .pinned(false)
                        .build();

        return conversationRepository
                .save(conversation);
    }

    /*
     * Normal text message.
     */
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
                        .hasAttachment(false)
                        .build();

        return messageRepository
                .save(message);
    }

    /*
     * User message containing an attachment.
     *
     * IMPORTANT:
     * We store only attachment metadata.
     *
     * The actual file is NOT stored inside
     * the ai_messages database table.
     */
    private AIMessage saveMessageWithAttachment(
            AIConversation conversation,
            String role,
            String content,
            MultipartFile file
    ) {

        String attachmentName =
                file.getOriginalFilename();

        if (
                attachmentName == null ||
                attachmentName.isBlank()
        ) {

            attachmentName =
                    "attachment";
        }

        String attachmentType =
                file.getContentType();

        AIMessage message =
                AIMessage.builder()
                        .conversation(conversation)
                        .role(role)
                        .content(content)
                        .hasAttachment(true)
                        .attachmentName(
                                attachmentName
                        )
                        .attachmentType(
                                attachmentType
                        )
                        .attachmentSize(
                                file.getSize()
                        )
                        .build();

        return messageRepository
                .save(message);
    }

    /*
     * Existing normal text chat.
     */
    @Override
    public AIChatResponse chat(
            AIChatRequest request
    ) {

        User user =
                getCurrentUser();

        AIConversation conversation =
                findOrCreateConversation(
                        request,
                        user
                );

        String userMessage =
                request.getMessage();

        if (
                userMessage == null ||
                userMessage.isBlank()
        ) {

            throw new IllegalArgumentException(
                    "Message cannot be empty."
            );
        }

        userMessage =
                userMessage.trim();

        /*
         * Generate title from the first
         * user message.
         */
        if (
                conversation
                        .getMessages()
                        .isEmpty()
        ) {

            String title =
                    userMessage;

            if (
                    title.length() > 35
            ) {

                title =
                        title.substring(
                                0,
                                35
                        )
                        + "...";
            }

            conversation.setTitle(
                    title
            );
        }

        /*
         * Save normal user message.
         */
        saveMessage(
                conversation,
                "user",
                userMessage
        );

        /*
         * Build current PaisaTrack
         * financial context.
         */
        FinancialContext context =
                financialContextBuilder
                        .buildCurrentUserContext();

        /*
         * Build AI prompt.
         */
        String prompt =
                promptBuilder.buildPrompt(
                        context,
                        userMessage
                );

        /*
         * Generate AI response.
         */
        String reply =
                llmClient.generateResponse(
                        prompt
                );

        /*
         * Save assistant response.
         */
        saveMessage(
                conversation,
                "assistant",
                reply
        );

        conversation.setUpdatedAt(
                LocalDateTime.now()
        );

        conversationRepository.save(
                conversation
        );

        return buildResponse(
                conversation,
                reply
        );
    }

    /*
     * AI chat with file attachment.
     */
    @Override
    public AIChatResponse chatWithFile(
            AIChatRequest request,
            MultipartFile file
    ) {

        User user =
                getCurrentUser();

        /*
         * Defensive validation.
         */
        if (
                file == null ||
                file.isEmpty()
        ) {

            throw new IllegalArgumentException(
                    "Attachment cannot be empty."
            );
        }

        AIConversation conversation =
                findOrCreateConversation(
                        request,
                        user
                );

        String userMessage =
                request.getMessage();

        /*
         * A file can be sent without
         * typing a question.
         */
        if (
                userMessage == null ||
                userMessage.isBlank()
        ) {

            userMessage =
                    "Please analyze this attachment.";
        }

        userMessage =
                userMessage.trim();

        /*
         * Generate conversation title
         * from the visible user message.
         */
        if (
                conversation
                        .getMessages()
                        .isEmpty()
        ) {

            String title =
                    userMessage;

            if (
                    title.length() > 35
            ) {

                title =
                        title.substring(
                                0,
                                35
                        )
                        + "...";
            }

            conversation.setTitle(
                    title
            );
        }

        /*
         * IMPORTANT CHANGE:
         *
         * Save the visible user message
         * together with attachment metadata.
         *
         * We do NOT store the extracted file
         * contents in the AIMessage table.
         */
        saveMessageWithAttachment(
                conversation,
                "user",
                userMessage,
                file
        );

        /*
         * Extract readable text from
         * the uploaded attachment.
         */
        String attachmentText =
                aiFileService.extractText(
                        file
                );

        /*
         * Protect against a file extractor
         * unexpectedly returning null.
         */
        if (attachmentText == null) {

            attachmentText = "";
        }

        System.out.println(
                "========== AI ATTACHMENT =========="
        );

        System.out.println(
                "File Name = "
                        + file.getOriginalFilename()
        );

        System.out.println(
                "File Type = "
                        + file.getContentType()
        );

        System.out.println(
                "File Size = "
                        + file.getSize()
        );

        System.out.println(
                "Extracted Characters = "
                        + attachmentText.length()
        );

        System.out.println(
                "==================================="
        );

        /*
         * Existing PaisaTrack financial
         * context.
         */
        FinancialContext context =
                financialContextBuilder
                        .buildCurrentUserContext();

        /*
         * Existing PaisaTrack AI prompt.
         */
        String basePrompt =
                promptBuilder.buildPrompt(
                        context,
                        userMessage
                );

        String fileName =
                file.getOriginalFilename();

        if (
                fileName == null ||
                fileName.isBlank()
        ) {

            fileName =
                    "attachment";
        }

        /*
         * Add extracted attachment content
         * as additional AI context.
         */
        String prompt =
                basePrompt
                        +
                        """



                        ============================================
                        ATTACHED FILE CONTEXT
                        ============================================

                        File name:
                        """
                        +
                        fileName
                        +
                        """



                        Extracted attachment content:

                        """
                        +
                        attachmentText
                        +
                        """



                        ============================================
                        ATTACHMENT RULES
                        ============================================

                        The user supplied the attachment above.

                        Use the attached content when it is relevant
                        to the user's question.

                        The PaisaTrack financial context and the
                        attachment are separate information sources.

                        Never invent numbers, transactions, dates,
                        balances, categories, or other values that are
                        not present in either source.

                        If information is missing from the attachment,
                        clearly say that it is unavailable.

                        If a value in the attachment conflicts with
                        the user's PaisaTrack financial records,
                        mention the difference instead of silently
                        combining the two values.

                        When calculating totals from the attachment,
                        calculate only from values actually present
                        in the extracted attachment content.

                        If the user's question refers to "this file",
                        "this document", "attachment", "PDF",
                        "statement", "receipt", "spreadsheet", or
                        similar wording, prioritize the attached
                        content when answering.
                        """;

        /*
         * Generate response from AI.
         */
        String reply =
                llmClient.generateResponse(
                        prompt
                );

        /*
         * Assistant message has no
         * attachment metadata.
         */
        saveMessage(
                conversation,
                "assistant",
                reply
        );

        conversation.setUpdatedAt(
                LocalDateTime.now()
        );

        conversationRepository.save(
                conversation
        );

        return buildResponse(
                conversation,
                reply
        );
    }

        @Override
        public Flux<String> streamChat(
                AIChatRequest request
        ) {

        User user =
                getCurrentUser();

        String userMessage =
                request.getMessage();

        if (
                userMessage == null ||
                userMessage.isBlank()
        ) {

                return Flux.error(
                        new IllegalArgumentException(
                                "Message cannot be empty."
                        )
                );
        }

        userMessage =
                userMessage.trim();

        AIConversation conversation =
                findOrCreateConversation(
                        request,
                        user
                );

        /*
        * Generate title for new conversation.
        */
        if (
                conversation
                        .getMessages()
                        .isEmpty()
        ) {

                String title =
                        userMessage;

                if (
                        title.length() > 35
                ) {

                title =
                        title.substring(
                                0,
                                35
                        )
                        + "...";
                }

                conversation.setTitle(
                        title
                );
        }

        /*
        * Save user's message immediately.
        */
        saveMessage(
                conversation,
                "user",
                userMessage
        );

        /*
        * Build existing PaisaTrack
        * financial context.
        */
        FinancialContext context =
                financialContextBuilder
                        .buildCurrentUserContext();

        String prompt =
                promptBuilder.buildPrompt(
                        context,
                        userMessage
                );

        /*
        * Accumulate streamed content so that
        * the complete assistant answer can
        * still be stored in the database.
        */
        StringBuilder completeReply =
                new StringBuilder();

        return llmClient
                .streamResponse(
                        prompt
                )

                /*
                * Forward every Groq chunk
                * to the frontend.
                */
                .doOnNext(
                        chunk ->
                                completeReply.append(
                                        chunk
                                )
                )

                /*
                * When streaming finishes normally,
                * save the full assistant response.
                */
                .doOnComplete(
                        () -> {

                                String reply =
                                        completeReply
                                                .toString()
                                                .trim();

                                if (
                                        !reply.isBlank()
                                ) {

                                saveMessage(
                                        conversation,
                                        "assistant",
                                        reply
                                );
                                }

                                conversation.setUpdatedAt(
                                        LocalDateTime.now()
                                );

                                conversationRepository.save(
                                        conversation
                                );
                        }
                )

                /*
                * Log errors without converting
                * them into fake text chunks.
                */
                .doOnError(
                        error -> {

                                System.err.println(
                                        "========== AI STREAM ERROR =========="
                                );

                                System.err.println(
                                        error.getMessage()
                                );

                                System.err.println(
                                        "====================================="
                                );
                        }
                );
        }

    /*
     * Shared response builder used by:
     *
     * /api/ai/chat
     * /api/ai/chat-with-file
     */
    private AIChatResponse buildResponse(
            AIConversation conversation,
            String reply
    ) {

        AIChatResponse response =
                new AIChatResponse();

        response.setReply(
                reply
        );

        response.setConversationId(
                conversation.getId()
        );

        response.setTimestamp(
                LocalDateTime.now()
        );

        response.setSuccess(
                true
        );

        response.setConversation(
                conversationService
                        .getConversation(
                                conversation.getId()
                        )
        );

        return response;
    }
}
package com.paisatrack.backend.service.impl;

import com.paisatrack.backend.dto.AIConversationRequest;
import com.paisatrack.backend.dto.AIConversationResponse;
import com.paisatrack.backend.dto.AIMessageResponse;
import com.paisatrack.backend.entity.AIConversation;
import com.paisatrack.backend.entity.AIMessage;
import com.paisatrack.backend.entity.User;
import com.paisatrack.backend.repository.AIConversationRepository;
import com.paisatrack.backend.repository.UserRepository;
import com.paisatrack.backend.service.AIConversationService;
import com.paisatrack.backend.util.SecurityUtil;

import jakarta.persistence.EntityNotFoundException;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AIConversationServiceImpl implements AIConversationService {

    private final AIConversationRepository conversationRepository;
    private final UserRepository userRepository;

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

    @Override
    public List<AIConversationResponse> getAllConversations() {

        User user =
                getCurrentUser();

        return conversationRepository
                .findByUserOrderByUpdatedAtDesc(user)
                .stream()
                .map(this::mapConversation)
                .toList();
    }

    @Override
    public AIConversationResponse getConversation(
            Long conversationId
    ) {

        User user =
                getCurrentUser();

        AIConversation conversation =
                conversationRepository
                        .findByIdAndUser(
                                conversationId,
                                user
                        )
                        .orElseThrow(() ->
                                new EntityNotFoundException(
                                        "Conversation not found"
                                )
                        );

        return mapConversation(
                conversation
        );
    }

    @Override
    public AIConversationResponse createConversation() {

        User user =
                getCurrentUser();

        AIConversation conversation =
                AIConversation.builder()
                        .user(user)
                        .title("New Chat")
                        .pinned(false)
                        .build();

        conversationRepository.save(
                conversation
        );

        return mapConversation(
                conversation
        );
    }

    @Override
    public AIConversationResponse updateConversation(
            Long conversationId,
            AIConversationRequest request
    ) {

        User user =
                getCurrentUser();

        AIConversation conversation =
                conversationRepository
                        .findByIdAndUser(
                                conversationId,
                                user
                        )
                        .orElseThrow(() ->
                                new EntityNotFoundException(
                                        "Conversation not found"
                                )
                        );

        if (
                request.getTitle() != null
        ) {

            conversation.setTitle(
                    request.getTitle()
            );
        }

        if (
                request.getPinned() != null
        ) {

            conversation.setPinned(
                    request.getPinned()
            );
        }

        conversationRepository.save(
                conversation
        );

        return mapConversation(
                conversation
        );
    }

    @Override
    public void deleteConversation(
            Long conversationId
    ) {

        User user =
                getCurrentUser();

        AIConversation conversation =
                conversationRepository
                        .findByIdAndUser(
                                conversationId,
                                user
                        )
                        .orElseThrow(() ->
                                new EntityNotFoundException(
                                        "Conversation not found"
                                )
                        );

        conversationRepository.delete(
                conversation
        );
    }

    @Override
    public List<AIConversationResponse> searchConversations(
            String keyword
    ) {

        User user =
                getCurrentUser();

        return conversationRepository
                .searchConversations(
                        user,
                        keyword
                )
                .stream()
                .map(this::mapConversation)
                .toList();
    }

    private AIConversationResponse mapConversation(
            AIConversation conversation
    ) {

        return AIConversationResponse.builder()
                .id(
                        conversation.getId()
                )
                .title(
                        conversation.getTitle()
                )
                .pinned(
                        conversation.getPinned()
                )
                .createdAt(
                        conversation.getCreatedAt()
                )
                .updatedAt(
                        conversation.getUpdatedAt()
                )
                .messages(
                        conversation
                                .getMessages()
                                .stream()
                                .map(this::mapMessage)
                                .toList()
                )
                .build();
    }

    private AIMessageResponse mapMessage(
            AIMessage message
    ) {

        return AIMessageResponse.builder()
                .id(
                        message.getId()
                )
                .role(
                        message.getRole()
                )
                .content(
                        message.getContent()
                )
                .createdAt(
                        message.getCreatedAt()
                )

                /*
                 * Attachment metadata.
                 */
                .hasAttachment(
                        Boolean.TRUE.equals(
                                message.getHasAttachment()
                        )
                )

                .attachmentName(
                        message.getAttachmentName()
                )

                .attachmentType(
                        message.getAttachmentType()
                )

                .attachmentSize(
                        message.getAttachmentSize()
                )

                .build();
    }
}
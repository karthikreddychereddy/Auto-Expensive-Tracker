package com.paisatrack.backend.service;

import com.paisatrack.backend.dto.AIConversationRequest;
import com.paisatrack.backend.dto.AIConversationResponse;

import java.util.List;

public interface AIConversationService {

    List<AIConversationResponse> getAllConversations();

    AIConversationResponse getConversation(Long conversationId);

    AIConversationResponse createConversation();

    AIConversationResponse updateConversation(
            Long conversationId,
            AIConversationRequest request
    );

    void deleteConversation(Long conversationId);

    List<AIConversationResponse> searchConversations(
            String keyword
    );

}
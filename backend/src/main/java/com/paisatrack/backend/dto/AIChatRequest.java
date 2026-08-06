package com.paisatrack.backend.dto;

import jakarta.validation.constraints.NotBlank;

public class AIChatRequest {

    @NotBlank(message = "Message cannot be empty")
    private String message;

    private Long conversationId;

    public AIChatRequest() {
    }

    public AIChatRequest(String message, Long conversationId) {
        this.message = message;
        this.conversationId = conversationId;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Long getConversationId() {
        return conversationId;
    }

    public void setConversationId(Long conversationId) {
        this.conversationId = conversationId;
    }

}
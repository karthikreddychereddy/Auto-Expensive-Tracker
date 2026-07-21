package com.paisatrack.backend.dto;

import java.time.LocalDateTime;

public class AIChatResponse {

    private String reply;
    private String conversationId;
    private LocalDateTime timestamp;
    private boolean success;

    public AIChatResponse() {
    }

    public AIChatResponse(String reply, String conversationId, LocalDateTime timestamp, boolean success) {
        this.reply = reply;
        this.conversationId = conversationId;
        this.timestamp = timestamp;
        this.success = success;
    }

    public String getReply() {
        return reply;
    }

    public void setReply(String reply) {
        this.reply = reply;
    }

    public String getConversationId() {
        return conversationId;
    }

    public void setConversationId(String conversationId) {
        this.conversationId = conversationId;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }
}
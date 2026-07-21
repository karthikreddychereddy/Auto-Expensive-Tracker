package com.paisatrack.backend.ai.client.model;

import java.util.List;

public class GroqRequest {

    private String model;
    private List<GroqMessage> messages;

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public List<GroqMessage> getMessages() {
        return messages;
    }

    public void setMessages(List<GroqMessage> messages) {
        this.messages = messages;
    }
}
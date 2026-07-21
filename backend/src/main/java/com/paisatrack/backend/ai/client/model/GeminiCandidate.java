package com.paisatrack.backend.ai.client.model;

public class GeminiCandidate {

    private GeminiContent content;

    public GeminiCandidate() {
    }

    public GeminiCandidate(GeminiContent content) {
        this.content = content;
    }

    public GeminiContent getContent() {
        return content;
    }

    public void setContent(GeminiContent content) {
        this.content = content;
    }
}
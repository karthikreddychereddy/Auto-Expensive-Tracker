package com.paisatrack.backend.ai.client.model;

import java.util.ArrayList;
import java.util.List;

public class GeminiContent {

    private List<GeminiPart> parts = new ArrayList<>();

    public GeminiContent() {
    }

    public GeminiContent(List<GeminiPart> parts) {
        this.parts = parts;
    }

    public List<GeminiPart> getParts() {
        return parts;
    }

    public void setParts(List<GeminiPart> parts) {
        this.parts = parts;
    }
}
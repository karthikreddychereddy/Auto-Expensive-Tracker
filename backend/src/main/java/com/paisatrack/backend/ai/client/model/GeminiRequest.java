package com.paisatrack.backend.ai.client.model;

import java.util.ArrayList;
import java.util.List;

public class GeminiRequest {

    private List<GeminiContent> contents = new ArrayList<>();

    public GeminiRequest() {
    }

    public GeminiRequest(List<GeminiContent> contents) {
        this.contents = contents;
    }

    public List<GeminiContent> getContents() {
        return contents;
    }

    public void setContents(List<GeminiContent> contents) {
        this.contents = contents;
    }
}
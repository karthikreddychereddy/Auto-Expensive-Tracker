package com.paisatrack.backend.ai.client.model;

import java.util.ArrayList;
import java.util.List;

public class GeminiResponse {

    private List<GeminiCandidate> candidates = new ArrayList<>();

    public GeminiResponse() {
    }

    public List<GeminiCandidate> getCandidates() {
        return candidates;
    }

    public void setCandidates(List<GeminiCandidate> candidates) {
        this.candidates = candidates;
    }
}
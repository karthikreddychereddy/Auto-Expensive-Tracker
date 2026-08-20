package com.paisatrack.backend.ai.client;

import reactor.core.publisher.Flux;

public interface LLMClient {

    /*
     * Existing non-streaming response.
     *
     * Used by:
     * - existing AI chat
     * - receipt AI
     * - other normal AI operations
     */
    String generateResponse(
            String prompt
    );

    /*
     * True streaming response.
     *
     * Each Flux item contains only the
     * newly generated text from the LLM.
     */
    Flux<String> streamResponse(
            String prompt
    );
}
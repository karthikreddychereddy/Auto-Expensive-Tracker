package com.paisatrack.backend.ai.client;

import com.paisatrack.backend.ai.client.model.GeminiContent;
import com.paisatrack.backend.ai.client.model.GeminiPart;
import com.paisatrack.backend.ai.client.model.GeminiRequest;
import com.paisatrack.backend.ai.client.model.GeminiResponse;
import com.paisatrack.backend.ai.exception.AIException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

import java.time.Duration;
import java.util.List;

@Component
public class GeminiClient implements LLMClient {

    private final WebClient webClient;

    @Value("${gemini.api.key}")
    private String apiKey;

    public GeminiClient(WebClient geminiWebClient) {
        this.webClient = geminiWebClient;
    }

    @Override
    public String generateResponse(String prompt) {

        try {

            GeminiRequest request = buildRequest(prompt);

            GeminiResponse response =
                    webClient.post()
                            .uri(uriBuilder ->
                                    uriBuilder
                                            .queryParam("key", apiKey)
                                            .build())
                            .contentType(MediaType.APPLICATION_JSON)
                            .accept(MediaType.APPLICATION_JSON)
                            .bodyValue(request)
                            .retrieve()
                            .onStatus(
                                status -> true,
                                clientResponse -> clientResponse.bodyToMono(String.class)
                                        .map(body -> {
                                            System.out.println("HTTP Status: " + clientResponse.statusCode());
                                            System.out.println("Response Body:");
                                            System.out.println(body);
                                            return new RuntimeException(body);
                                        })
                            )
                            .bodyToMono(GeminiResponse.class)
                            .timeout(Duration.ofSeconds(60))
                            .block();

            return extractResponse(response);

        } catch (Exception ex) {
            ex.printStackTrace();

            throw new AIException(
                    "Failed to communicate with Gemini API.",
                    ex
            );
        }
    }

    private GeminiRequest buildRequest(String prompt) {

        GeminiPart part = new GeminiPart();
        part.setText(prompt);

        GeminiContent content = new GeminiContent();
        content.setParts(List.of(part));

        GeminiRequest request = new GeminiRequest();
        request.setContents(List.of(content));

        return request;
    }

    private String extractResponse(GeminiResponse response) {

        if (response == null) {
            throw new AIException("Gemini returned an empty response.");
        }

        if (response.getCandidates() == null ||
                response.getCandidates().isEmpty()) {

            throw new AIException("Gemini returned no candidates.");
        }

        GeminiContent content =
                response.getCandidates()
                        .get(0)
                        .getContent();

        if (content == null) {
            throw new AIException("Gemini returned empty content.");
        }

        if (content.getParts() == null ||
                content.getParts().isEmpty()) {

            throw new AIException("Gemini returned no text.");
        }

        String answer = content.getParts().get(0).getText();

        if (answer == null || answer.isBlank()) {
            throw new AIException("Gemini returned a blank response.");
        }

        return answer.trim();
    }
}
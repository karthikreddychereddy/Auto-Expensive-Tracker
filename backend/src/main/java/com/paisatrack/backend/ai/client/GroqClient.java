package com.paisatrack.backend.ai.client;

import com.paisatrack.backend.ai.client.model.GroqChoice;
import com.paisatrack.backend.ai.client.model.GroqMessage;
import com.paisatrack.backend.ai.client.model.GroqRequest;
import com.paisatrack.backend.ai.client.model.GroqResponse;
import com.paisatrack.backend.ai.exception.AIException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

import java.time.Duration;
import java.util.List;

@Component
public class GroqClient implements LLMClient {

    private final WebClient webClient;

    @Value("${groq.api.key}")
    private String apiKey;

    @Value("${groq.model}")
    private String model;

    public GroqClient(WebClient groqWebClient) {
        this.webClient = groqWebClient;
    }

    @Override
    public String generateResponse(String prompt) {

        try {

            GroqRequest request = buildRequest(prompt);

            GroqResponse response =
                    webClient.post()
                            .uri("/chat/completions")
                            .header(HttpHeaders.AUTHORIZATION, "Bearer " + apiKey)
                            .contentType(MediaType.APPLICATION_JSON)
                            .accept(MediaType.APPLICATION_JSON)
                            .bodyValue(request)
                            .retrieve()
                            .bodyToMono(GroqResponse.class)
                            .timeout(Duration.ofSeconds(60))
                            .block();

            return extractResponse(response);

        } catch (Exception ex) {

            ex.printStackTrace();

            throw new AIException(
                    "Failed to communicate with Groq API.",
                    ex
            );
        }
    }

    private GroqRequest buildRequest(String prompt) {

        GroqMessage message =
                new GroqMessage("user", prompt);

        GroqRequest request = new GroqRequest();

        request.setModel(model);
        request.setMessages(List.of(message));

        return request;
    }

    private String extractResponse(GroqResponse response) {

        if (response == null) {
            throw new AIException("Groq returned an empty response.");
        }

        if (response.getChoices() == null ||
                response.getChoices().isEmpty()) {

            throw new AIException("Groq returned no choices.");
        }

        GroqChoice choice =
                response.getChoices().get(0);

        if (choice.getMessage() == null) {

            throw new AIException("Groq returned no message.");
        }

        String answer =
                choice.getMessage().getContent();

        if (answer == null || answer.isBlank()) {

            throw new AIException("Groq returned an empty response.");
        }

        return answer.trim();
    }
}
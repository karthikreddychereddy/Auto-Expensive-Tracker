package com.paisatrack.backend.ai.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class AIConfig {

    @Value("${gemini.api.url}")
    private String geminiApiUrl;

    @Bean
    public WebClient geminiWebClient(WebClient.Builder builder) {

        return builder
                .baseUrl(geminiApiUrl)
                .build();
    }
}
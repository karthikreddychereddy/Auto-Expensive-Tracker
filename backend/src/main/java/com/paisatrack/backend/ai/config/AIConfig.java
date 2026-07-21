package com.paisatrack.backend.ai.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class AIConfig {

    @Value("${groq.api.url}")
    private String groqApiUrl;

    @Bean
    public WebClient groqWebClient(WebClient.Builder builder) {

        return builder
                .baseUrl(groqApiUrl)
                .build();
    }
}
package com.paisatrack.backend.ai.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class AIConfig {

    @Bean
    public WebClient groqWebClient(
            @Value("${groq.api.url}") String groqApiUrl
    ) {

        return WebClient.builder()
                .baseUrl(groqApiUrl)
                .build();
    }
}
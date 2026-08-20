package com.paisatrack.backend.service;

import com.paisatrack.backend.dto.AIChatRequest;
import com.paisatrack.backend.dto.AIChatResponse;

import org.springframework.web.multipart.MultipartFile;

import reactor.core.publisher.Flux;

public interface AIChatService {

    AIChatResponse chat(
            AIChatRequest request
    );

    AIChatResponse chatWithFile(
            AIChatRequest request,
            MultipartFile file
    );

    Flux<String> streamChat(
            AIChatRequest request
    );
}
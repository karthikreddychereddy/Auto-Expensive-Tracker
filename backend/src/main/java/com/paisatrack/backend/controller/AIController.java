package com.paisatrack.backend.controller;

import com.paisatrack.backend.dto.AIChatRequest;
import com.paisatrack.backend.dto.AIChatResponse;
import com.paisatrack.backend.service.AIChatService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
public class AIController {

    private final AIChatService aiChatService;

    public AIController(AIChatService aiChatService) {
        this.aiChatService = aiChatService;
    }

    @PostMapping("/chat")
    public ResponseEntity<AIChatResponse> chat(@Valid @RequestBody AIChatRequest request) {
        AIChatResponse response = aiChatService.chat(request);
        return ResponseEntity.ok(response);
    }

}
package com.paisatrack.backend.controller;

import com.paisatrack.backend.dto.AIChatRequest;
import com.paisatrack.backend.dto.AIChatResponse;
import com.paisatrack.backend.service.AIChatService;

import jakarta.validation.Valid;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import org.springframework.web.multipart.MultipartFile;

import reactor.core.publisher.Flux;

@RestController
@RequestMapping("/api/ai")
public class AIController {

    private final AIChatService aiChatService;

    public AIController(
            AIChatService aiChatService
    ) {
        this.aiChatService =
                aiChatService;
    }

    /*
     * Existing normal text chat.
     */
    @PostMapping("/chat")
    public ResponseEntity<AIChatResponse> chat(
            @Valid
            @RequestBody
            AIChatRequest request
    ) {

        AIChatResponse response =
                aiChatService.chat(
                        request
                );

        return ResponseEntity.ok(
                response
        );
    }

    /*
     * Existing attachment chat.
     */
    @PostMapping(
            value = "/chat-with-file",
            consumes =
                    MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<AIChatResponse>
    chatWithFile(

            @RequestParam(
                    value = "message",
                    required = false,
                    defaultValue = ""
            )
            String message,

            @RequestParam(
                    value = "conversationId",
                    required = false
            )
            Long conversationId,

            @RequestParam("file")
            MultipartFile file
    ) {

        AIChatRequest request =
                new AIChatRequest(
                        message,
                        conversationId
                );

        AIChatResponse response =
                aiChatService.chatWithFile(
                        request,
                        file
                );

        return ResponseEntity.ok(
                response
        );
    }

    /*
     * ==========================================
     * TRUE STREAMING TEXT CHAT
     * ==========================================
     *
     * The frontend receives small text chunks
     * immediately while Groq is generating.
     */
    @PostMapping(
            value = "/chat/stream",
            consumes =
                    MediaType.APPLICATION_JSON_VALUE,
            produces =
                    MediaType.TEXT_EVENT_STREAM_VALUE
    )
    public Flux<String> streamChat(
            @RequestBody
            AIChatRequest request
    ) {

        return aiChatService
                .streamChat(
                        request
                );
    }
}
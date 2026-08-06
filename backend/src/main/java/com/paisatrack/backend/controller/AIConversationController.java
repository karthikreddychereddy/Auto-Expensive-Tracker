package com.paisatrack.backend.controller;

import com.paisatrack.backend.dto.AIConversationRequest;
import com.paisatrack.backend.dto.AIConversationResponse;
import com.paisatrack.backend.service.AIConversationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ai/conversations")
@RequiredArgsConstructor
public class AIConversationController {

    private final AIConversationService conversationService;

    @GetMapping
    public ResponseEntity<List<AIConversationResponse>> getAllConversations() {

        return ResponseEntity.ok(
                conversationService.getAllConversations()
        );

    }
    @GetMapping("/search")
    public ResponseEntity<List<AIConversationResponse>> searchConversations(
            @RequestParam String keyword
    ) {

        return ResponseEntity.ok(
                conversationService.searchConversations(keyword)
        );

    }

    @GetMapping("/{id}")
    public ResponseEntity<AIConversationResponse> getConversation(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                conversationService.getConversation(id)
        );

    }

    @PostMapping
    public ResponseEntity<AIConversationResponse> createConversation() {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(conversationService.createConversation());

    }

    @PatchMapping("/{id}")
    public ResponseEntity<AIConversationResponse> updateConversation(

            @PathVariable Long id,

            @RequestBody AIConversationRequest request

    ) {

        return ResponseEntity.ok(
                conversationService.updateConversation(id, request)
        );

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteConversation(
            @PathVariable Long id
    ) {

        conversationService.deleteConversation(id);

        return ResponseEntity.noContent().build();

    }

}
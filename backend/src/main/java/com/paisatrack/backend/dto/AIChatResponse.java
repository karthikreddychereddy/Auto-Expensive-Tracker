package com.paisatrack.backend.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AIChatResponse {

    private String reply;

    private Long conversationId;

    private LocalDateTime timestamp;

    private boolean success;

    private AIConversationResponse conversation;

}
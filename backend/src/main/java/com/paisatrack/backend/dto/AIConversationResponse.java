package com.paisatrack.backend.dto;

import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AIConversationResponse {

    private Long id;

    private String title;

    private Boolean pinned;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    private List<AIMessageResponse> messages;
}
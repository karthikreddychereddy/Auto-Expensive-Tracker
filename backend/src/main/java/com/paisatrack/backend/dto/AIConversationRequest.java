package com.paisatrack.backend.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AIConversationRequest {

    private String title;

    private Boolean pinned;

}
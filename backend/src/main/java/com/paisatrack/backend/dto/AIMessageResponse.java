package com.paisatrack.backend.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AIMessageResponse {

    private Long id;

    private String role;

    private String content;

    private LocalDateTime createdAt;

    private Boolean hasAttachment;

    private String attachmentName;

    private String attachmentType;

    private Long attachmentSize;
}
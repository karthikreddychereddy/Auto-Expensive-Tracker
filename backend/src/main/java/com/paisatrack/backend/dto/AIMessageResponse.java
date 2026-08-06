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

}
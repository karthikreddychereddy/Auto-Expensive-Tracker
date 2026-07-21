package com.paisatrack.backend.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecommendationResponse {

    private String title;

    private String description;

    private String type;
}
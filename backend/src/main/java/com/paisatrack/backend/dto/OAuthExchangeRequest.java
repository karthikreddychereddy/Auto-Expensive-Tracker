package com.paisatrack.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class OAuthExchangeRequest {

    @NotBlank
    private String code;
}
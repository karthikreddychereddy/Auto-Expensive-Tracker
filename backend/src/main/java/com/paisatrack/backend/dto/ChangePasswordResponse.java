package com.paisatrack.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class ChangePasswordResponse {

    private boolean success;

    private String message;

}
package com.paisatrack.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

import lombok.Data;

@Data
public class ResendOtpRequest {

    @Email(
            message = "Invalid email address"
    )
    @NotBlank(
            message = "Email is required"
    )
    private String email;
}
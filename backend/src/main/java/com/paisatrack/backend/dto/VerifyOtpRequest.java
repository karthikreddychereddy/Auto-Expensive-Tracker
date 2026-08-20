package com.paisatrack.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

import lombok.Data;

@Data
public class VerifyOtpRequest {

    @Email(
            message = "Invalid email address"
    )
    @NotBlank(
            message = "Email is required"
    )
    private String email;

    @NotBlank(
            message = "OTP is required"
    )
    @Pattern(
            regexp = "\\d{6}",
            message = "OTP must contain exactly 6 digits"
    )
    private String otp;
}
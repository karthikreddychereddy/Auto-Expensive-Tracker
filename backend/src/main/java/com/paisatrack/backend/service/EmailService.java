package com.paisatrack.backend.service;

public interface EmailService {

    void sendVerificationOtp(
            String email,
            String firstName,
            String otp
    );

    void sendPasswordResetOtp(
            String email,
            String firstName,
            String otp
    );
}
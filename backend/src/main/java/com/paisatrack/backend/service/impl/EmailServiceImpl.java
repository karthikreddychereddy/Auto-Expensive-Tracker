package com.paisatrack.backend.service.impl;

import com.paisatrack.backend.service.EmailService;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String senderEmail;

    // ==========================================
    // EMAIL VERIFICATION OTP
    // ==========================================

    @Override
    public void sendVerificationOtp(
            String email,
            String firstName,
            String otp
    ) {

        SimpleMailMessage message =
                new SimpleMailMessage();

        message.setFrom(
                senderEmail
        );

        message.setTo(
                email
        );

        message.setSubject(
                "Verify your PaisaTrack account"
        );

        String displayName =
                firstName != null &&
                !firstName.isBlank()
                        ? firstName
                        : "User";

        message.setText(
                """
                Hi %s,

                Welcome to PaisaTrack.

                Your email verification OTP is:

                %s

                This OTP is valid for 10 minutes.

                Do not share this OTP with anyone.

                If you did not create this account,
                you can safely ignore this email.

                Regards,
                PaisaTrack
                """
                        .formatted(
                                displayName,
                                otp
                        )
        );

        mailSender.send(
                message
        );
    }

    // ==========================================
    // PASSWORD RESET OTP
    // ==========================================

    @Override
    public void sendPasswordResetOtp(
            String email,
            String firstName,
            String otp
    ) {

        SimpleMailMessage message =
                new SimpleMailMessage();

        message.setFrom(
                senderEmail
        );

        message.setTo(
                email
        );

        message.setSubject(
                "Reset your PaisaTrack password"
        );

        String displayName =
                firstName != null &&
                !firstName.isBlank()
                        ? firstName
                        : "User";

        message.setText(
                """
                Hi %s,

                We received a request to reset your PaisaTrack password.

                Your password reset OTP is:

                %s

                This OTP is valid for 10 minutes.

                Do not share this OTP with anyone.

                If you did not request a password reset,
                you can safely ignore this email.

                Regards,
                PaisaTrack
                """
                        .formatted(
                                displayName,
                                otp
                        )
        );

        mailSender.send(
                message
        );
    }
}
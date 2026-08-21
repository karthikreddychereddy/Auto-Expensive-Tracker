package com.paisatrack.backend.service.impl;

import com.paisatrack.backend.service.EmailService;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

    private final WebClient.Builder webClientBuilder;

    @Value("${resend.api.key}")
    private String resendApiKey;

    @Value("${resend.from-email}")
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

        String displayName =
                firstName != null &&
                !firstName.isBlank()
                        ? firstName
                        : "User";

        String body =
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
                        );

        sendEmail(
                email,
                "Verify your PaisaTrack account",
                body
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

        String displayName =
                firstName != null &&
                !firstName.isBlank()
                        ? firstName
                        : "User";

        String body =
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
                        );

        sendEmail(
                email,
                "Reset your PaisaTrack password",
                body
        );
    }

    // ==========================================
    // RESEND EMAIL API
    // ==========================================

    private void sendEmail(
            String recipient,
            String subject,
            String text
    ) {

        Map<String, Object> requestBody =
                Map.of(
                        "from",
                        senderEmail,
                        "to",
                        List.of(recipient),
                        "subject",
                        subject,
                        "text",
                        text
                );

        try {

            webClientBuilder
                    .baseUrl(
                            "https://api.resend.com"
                    )
                    .build()
                    .post()
                    .uri(
                            "/emails"
                    )
                    .contentType(
                            MediaType.APPLICATION_JSON
                    )
                    .header(
                            "Authorization",
                            "Bearer " + resendApiKey
                    )
                    .bodyValue(
                            requestBody
                    )
                    .retrieve()
                    .toBodilessEntity()
                    .block();

        } catch (Exception exception) {

            throw new RuntimeException(
                    "Failed to send email through Resend: "
                            + exception.getMessage(),
                    exception
            );
        }
    }
}
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

    @Value("${brevo.api.key}")
    private String brevoApiKey;

    @Value("${brevo.from-email}")
    private String senderEmail;

    @Value("${brevo.from-name:PaisaTrack}")
    private String senderName;

    @Override
    public void sendVerificationOtp(
            String email,
            String firstName,
            String otp
    ) {

        String displayName =
                firstName != null && !firstName.isBlank()
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

    @Override
    public void sendPasswordResetOtp(
            String email,
            String firstName,
            String otp
    ) {

        String displayName =
                firstName != null && !firstName.isBlank()
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

    private void sendEmail(
            String recipient,
            String subject,
            String text
    ) {

        Map<String, Object> requestBody =
                Map.of(
                        "sender",
                        Map.of(
                                "name",
                                senderName,
                                "email",
                                senderEmail
                        ),
                        "to",
                        List.of(
                                Map.of(
                                        "email",
                                        recipient
                                )
                        ),
                        "subject",
                        subject,
                        "textContent",
                        text
                );

        try {

            webClientBuilder
                    .baseUrl(
                            "https://api.brevo.com"
                    )
                    .build()
                    .post()
                    .uri(
                            "/v3/smtp/email"
                    )
                    .contentType(
                            MediaType.APPLICATION_JSON
                    )
                    .header(
                            "api-key",
                            brevoApiKey
                    )
                    .bodyValue(
                            requestBody
                    )
                    .retrieve()
                    .toBodilessEntity()
                    .block();

        } catch (Exception exception) {

            throw new RuntimeException(
                    "Failed to send email through Brevo: "
                            + exception.getMessage(),
                    exception
            );
        }
    }
}
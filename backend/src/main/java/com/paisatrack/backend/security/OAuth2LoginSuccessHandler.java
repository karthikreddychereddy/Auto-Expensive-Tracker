package com.paisatrack.backend.security;

import com.paisatrack.backend.entity.NotificationSetting;
import com.paisatrack.backend.entity.OAuthLoginCode;
import com.paisatrack.backend.entity.User;

import com.paisatrack.backend.repository.NotificationSettingRepository;
import com.paisatrack.backend.repository.OAuthLoginCodeRepository;
import com.paisatrack.backend.repository.UserRepository;

import com.paisatrack.backend.service.DefaultCategoryService;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Value;

import org.springframework.security.core.Authentication;

import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.security.oauth2.core.user.OAuth2User;

import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;

import java.time.LocalDateTime;
import java.time.LocalTime;

import java.util.UUID;

@Component
@RequiredArgsConstructor
public class OAuth2LoginSuccessHandler
        implements AuthenticationSuccessHandler {

    private final UserRepository
            userRepository;

    private final OAuthLoginCodeRepository
            oauthLoginCodeRepository;

    private final NotificationSettingRepository
            notificationSettingRepository;

    private final DefaultCategoryService
            defaultCategoryService;

    private final PasswordEncoder
            passwordEncoder;

    @Value(
            "${app.frontend.oauth-success-url}"
    )
    private String frontendSuccessUrl;

    @Override
    @Transactional
    public void onAuthenticationSuccess(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication
    ) throws IOException, ServletException {

        OAuth2User oauthUser =
                (OAuth2User)
                        authentication.getPrincipal();

        String email =
                oauthUser.getAttribute(
                        "email"
                );

        if (
                email == null ||
                email.isBlank()
        ) {

            response.sendRedirect(
                    "http://localhost:5173/login?oauthError=email"
            );

            return;
        }

        email =
                email.trim()
                        .toLowerCase();

        String firstName =
                oauthUser.getAttribute(
                        "given_name"
                );

        String lastName =
                oauthUser.getAttribute(
                        "family_name"
                );

        String fullName =
                oauthUser.getAttribute(
                        "name"
                );

        String picture =
                oauthUser.getAttribute(
                        "picture"
                );

        if (
                firstName == null ||
                firstName.isBlank()
        ) {

            firstName =
                    fullName != null &&
                    !fullName.isBlank()
                            ? fullName
                                    .trim()
                                    .split("\\s+")[0]
                            : "Google";
        }

        if (
                lastName == null
        ) {
            lastName = "";
        }

        final String normalizedEmail =
                email;

        final String resolvedFirstName =
                firstName;

        final String resolvedLastName =
                lastName;

        final String profilePicture =
                picture;

        User user =
                userRepository
                        .findByEmail(
                                normalizedEmail
                        )
                        .orElseGet(
                                () -> {

                                    User newUser =
                                            User.builder()

                                                    .firstName(
                                                            resolvedFirstName
                                                    )

                                                    .lastName(
                                                            resolvedLastName
                                                    )

                                                    .email(
                                                            normalizedEmail
                                                    )

                                                    /*
                                                     * Google users don't
                                                     * sign in using this
                                                     * password.
                                                     */
                                                    .password(
                                                            passwordEncoder
                                                                    .encode(
                                                                            UUID.randomUUID()
                                                                                    .toString()
                                                                    )
                                                    )

                                                    .phoneNumber(
                                                            ""
                                                    )

                                                    .profileImage(
                                                            profilePicture
                                                    )

                                                    .emailVerified(
                                                            true
                                                    )

                                                    .enabled(
                                                            true
                                                    )

                                                    .role(
                                                            "USER"
                                                    )

                                                    .currency(
                                                            "INR"
                                                    )

                                                    .language(
                                                            "English"
                                                    )

                                                    .build();

                                    return userRepository
                                            .save(
                                                    newUser
                                            );
                                }
                        );

        /*
         * A Google account already proves
         * ownership of the email.
         */
        if (
                !Boolean.TRUE.equals(
                        user.getEmailVerified()
                )
        ) {

            user.setEmailVerified(
                    true
            );

            userRepository.save(
                    user
            );
        }

        /*
         * Existing email/password account
         * with the same email is reused.
         */
        defaultCategoryService
                .ensureDefaultCategories(
                        user
                );

        ensureNotificationSettings(
                user
        );

        String exchangeCode =
                UUID.randomUUID()
                        .toString();

        OAuthLoginCode loginCode =
                OAuthLoginCode.builder()

                        .code(
                                exchangeCode
                        )

                        .user(
                                user
                        )

                        .expiresAt(
                                LocalDateTime
                                        .now()
                                        .plusMinutes(
                                                2
                                        )
                        )

                        .used(
                                false
                        )

                        .build();

        oauthLoginCodeRepository
                .save(
                        loginCode
                );

        String redirectUrl =
                UriComponentsBuilder
                        .fromUriString(
                                frontendSuccessUrl
                        )
                        .queryParam(
                                "code",
                                exchangeCode
                        )
                        .build()
                        .toUriString();

        response.sendRedirect(
                redirectUrl
        );
    }

    private void ensureNotificationSettings(
            User user
    ) {

        if (
                notificationSettingRepository
                        .findByUser(
                                user
                        )
                        .isPresent()
        ) {
            return;
        }

        NotificationSetting setting =
                NotificationSetting.builder()

                        .user(
                                user
                        )

                        .morningReminderTime(
                                LocalTime.of(
                                        9,
                                        0
                                )
                        )

                        .afternoonReminderTime(
                                LocalTime.of(
                                        13,
                                        0
                                )
                        )

                        .eveningReminderTime(
                                LocalTime.of(
                                        18,
                                        0
                                )
                        )

                        .nightReminderTime(
                                LocalTime.of(
                                        22,
                                        0
                                )
                        )

                        .enabled(
                                true
                        )

                        .build();

        notificationSettingRepository
                .save(
                        setting
                );
    }
}
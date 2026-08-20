package com.paisatrack.backend.service.impl;

import com.paisatrack.backend.entity.RefreshToken;
import com.paisatrack.backend.entity.User;
import com.paisatrack.backend.repository.RefreshTokenRepository;
import com.paisatrack.backend.service.RefreshTokenService;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class RefreshTokenServiceImpl
        implements RefreshTokenService {

    private final RefreshTokenRepository
            refreshTokenRepository;

    private static final long
            REFRESH_TOKEN_DAYS = 30;

    // ==========================================
    // CREATE REFRESH TOKEN
    // ==========================================

    @Override
    public RefreshToken createRefreshToken(
            User user
    ) {

        RefreshToken refreshToken =
                RefreshToken.builder()

                        .user(user)

                        .token(
                                UUID.randomUUID()
                                        .toString()
                                        +
                                        UUID.randomUUID()
                                                .toString()
                        )

                        .expiresAt(
                                LocalDateTime
                                        .now()
                                        .plusDays(
                                                REFRESH_TOKEN_DAYS
                                        )
                        )

                        .revoked(false)

                        .build();

        return refreshTokenRepository
                .save(
                        refreshToken
                );
    }

    // ==========================================
    // VERIFY REFRESH TOKEN
    // ==========================================

    @Override
    public RefreshToken verifyRefreshToken(
            String token
    ) {

        RefreshToken refreshToken =
                refreshTokenRepository
                        .findByToken(
                                token
                        )
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Invalid refresh token."
                                )
                        );

        if (
                Boolean.TRUE.equals(
                        refreshToken.getRevoked()
                )
        ) {

            throw new RuntimeException(
                    "Refresh token has been revoked."
            );
        }

        if (
                refreshToken
                        .getExpiresAt()
                        .isBefore(
                                LocalDateTime.now()
                        )
        ) {

            refreshToken.setRevoked(
                    true
            );

            refreshTokenRepository.save(
                    refreshToken
            );

            throw new RuntimeException(
                    "Refresh token has expired. Please login again."
            );
        }

        return refreshToken;
    }

    // ==========================================
    // ROTATE REFRESH TOKEN
    // ==========================================

    @Override
    public RefreshToken rotateRefreshToken(
            String token
    ) {

        RefreshToken oldToken =
                verifyRefreshToken(
                        token
                );

        User user =
                oldToken.getUser();

        /*
         * Old refresh token becomes invalid
         * immediately after successful refresh.
         */
        oldToken.setRevoked(
                true
        );

        refreshTokenRepository.save(
                oldToken
        );

        return createRefreshToken(
                user
        );
    }

    // ==========================================
    // REVOKE ONE TOKEN
    // ==========================================

    @Override
    public void revokeRefreshToken(
            String token
    ) {

        refreshTokenRepository
                .findByToken(
                        token
                )
                .ifPresent(
                        refreshToken -> {

                            refreshToken.setRevoked(
                                    true
                            );

                            refreshTokenRepository.save(
                                    refreshToken
                            );
                        }
                );
    }

    // ==========================================
    // REVOKE ALL USER TOKENS
    // ==========================================

    @Override
    public void revokeAllUserTokens(
            User user
    ) {

        refreshTokenRepository
                .findByUserAndRevokedFalse(
                        user
                )
                .forEach(
                        refreshToken -> {

                            refreshToken.setRevoked(
                                    true
                            );

                            refreshTokenRepository.save(
                                    refreshToken
                            );
                        }
                );
    }
}
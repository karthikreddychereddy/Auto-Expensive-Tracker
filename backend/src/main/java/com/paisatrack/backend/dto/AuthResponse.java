package com.paisatrack.backend.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthResponse {

    /*
     * JWT access token.
     */
    private String token;

    /*
     * Database-backed refresh token.
     */
    private String refreshToken;

    private String message;

    private UserResponse user;

    /*
     * Keeps compatibility with existing
     * code that still creates AuthResponse
     * using three parameters.
     */
    public AuthResponse(
            String token,
            String message,
            UserResponse user
    ) {

        this.token = token;
        this.refreshToken = null;
        this.message = message;
        this.user = user;
    }
}
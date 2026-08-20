package com.paisatrack.backend.service;

import com.paisatrack.backend.entity.RefreshToken;
import com.paisatrack.backend.entity.User;

public interface RefreshTokenService {

    RefreshToken createRefreshToken(
            User user
    );

    RefreshToken verifyRefreshToken(
            String token
    );

    RefreshToken rotateRefreshToken(
            String token
    );

    void revokeRefreshToken(
            String token
    );

    void revokeAllUserTokens(
            User user
    );
}
package com.paisatrack.backend.service;

import com.paisatrack.backend.dto.AuthResponse;
import com.paisatrack.backend.dto.ForgotPasswordRequest;
import com.paisatrack.backend.dto.LoginRequest;
import com.paisatrack.backend.dto.LogoutRequest;
import com.paisatrack.backend.dto.RefreshTokenRequest;
import com.paisatrack.backend.dto.RefreshTokenResponse;
import com.paisatrack.backend.dto.RegisterRequest;
import com.paisatrack.backend.dto.ResendOtpRequest;
import com.paisatrack.backend.dto.ResetPasswordRequest;
import com.paisatrack.backend.dto.VerificationResponse;
import com.paisatrack.backend.dto.VerifyOtpRequest;
import com.paisatrack.backend.dto.VerifyResetOtpRequest;

public interface AuthService {

        AuthResponse register(
                RegisterRequest request
        );

        AuthResponse login(
                LoginRequest request
        );

        AuthResponse verifyEmail(
                VerifyOtpRequest request
        );

        AuthResponse exchangeOAuthCode(
                String code
        );

        VerificationResponse resendOtp(
                ResendOtpRequest request
        );

        VerificationResponse forgotPassword(
                ForgotPasswordRequest request
        );

        VerificationResponse verifyResetOtp(
                VerifyResetOtpRequest request
        );

        VerificationResponse resetPassword(
                ResetPasswordRequest request
        );

        RefreshTokenResponse refreshToken(
                RefreshTokenRequest request
        );

        VerificationResponse logout(
                LogoutRequest request
        );
}
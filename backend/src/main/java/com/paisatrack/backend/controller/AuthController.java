package com.paisatrack.backend.controller;

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
import com.paisatrack.backend.dto.OAuthExchangeRequest;

import com.paisatrack.backend.service.AuthService;

import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(
        origins = "http://localhost:5173"
)
public class AuthController {

        private final AuthService authService;

        @PostMapping("/register")
        public AuthResponse register(
                @Valid
                @RequestBody
                RegisterRequest request
        ) {

                return authService.register(
                        request
                );
        }

        @PostMapping("/login")
        public AuthResponse login(
                @Valid
                @RequestBody
                LoginRequest request
        ) {

                return authService.login(
                        request
                );
        }

        @PostMapping("/verify-email")
        public AuthResponse verifyEmail(
                @Valid
                @RequestBody
                VerifyOtpRequest request
        ) {

                return authService.verifyEmail(
                        request
                );
        }

        @PostMapping("/resend-otp")
        public VerificationResponse resendOtp(
                @Valid
                @RequestBody
                ResendOtpRequest request
        ) {

                return authService.resendOtp(
                        request
                );
        }

        @PostMapping("/forgot-password")
        public VerificationResponse forgotPassword(
                @Valid
                @RequestBody
                ForgotPasswordRequest request
        ) {

                return authService.forgotPassword(
                        request
                );
        }

        @PostMapping("/verify-reset-otp")
        public VerificationResponse verifyResetOtp(
                @Valid
                @RequestBody
                VerifyResetOtpRequest request
        ) {

                return authService.verifyResetOtp(
                        request
                );
        }

        @PostMapping("/reset-password")
        public VerificationResponse resetPassword(
                @Valid
                @RequestBody
                ResetPasswordRequest request
        ) {

                return authService.resetPassword(
                        request
                );
        }

        // ==========================================
        // REFRESH TOKEN
        // ==========================================

        @PostMapping("/refresh")
        public RefreshTokenResponse refreshToken(
                @Valid
                @RequestBody
                RefreshTokenRequest request
        ) {

                return authService.refreshToken(
                        request
                );
        }

        // ==========================================
        // LOGOUT
        // ==========================================

        @PostMapping("/logout")
        public VerificationResponse logout(
                @Valid
                @RequestBody
                LogoutRequest request
        ) {

                return authService.logout(
                        request
                );
        }

        @PostMapping("/oauth/exchange")
        public AuthResponse exchangeOAuthCode(
                @Valid
                @RequestBody
                OAuthExchangeRequest request
        ) {

        return authService
                .exchangeOAuthCode(
                        request.getCode()
                );
        }
}
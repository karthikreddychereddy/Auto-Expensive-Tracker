package com.paisatrack.backend.service.impl;

import com.paisatrack.backend.dto.AuthResponse;
import com.paisatrack.backend.dto.ForgotPasswordRequest;
import com.paisatrack.backend.dto.LoginRequest;
import com.paisatrack.backend.dto.LogoutRequest;
import com.paisatrack.backend.dto.RefreshTokenRequest;
import com.paisatrack.backend.dto.RefreshTokenResponse;
import com.paisatrack.backend.dto.RegisterRequest;
import com.paisatrack.backend.dto.ResendOtpRequest;
import com.paisatrack.backend.dto.ResetPasswordRequest;
import com.paisatrack.backend.dto.UserResponse;
import com.paisatrack.backend.dto.VerificationResponse;
import com.paisatrack.backend.dto.VerifyOtpRequest;
import com.paisatrack.backend.dto.VerifyResetOtpRequest;
import com.paisatrack.backend.repository.OAuthLoginCodeRepository;
import com.paisatrack.backend.entity.OAuthLoginCode;

import com.paisatrack.backend.entity.EmailVerificationOtp;
import com.paisatrack.backend.entity.NotificationSetting;
import com.paisatrack.backend.entity.PasswordResetOtp;
import com.paisatrack.backend.entity.RefreshToken;
import com.paisatrack.backend.entity.User;

import com.paisatrack.backend.exception.EmailNotVerifiedException;

import com.paisatrack.backend.repository.EmailVerificationOtpRepository;
import com.paisatrack.backend.repository.NotificationSettingRepository;
import com.paisatrack.backend.repository.PasswordResetOtpRepository;
import com.paisatrack.backend.repository.UserRepository;

import com.paisatrack.backend.security.JwtService;

import com.paisatrack.backend.service.AuthService;
import com.paisatrack.backend.service.DefaultCategoryService;
import com.paisatrack.backend.service.EmailService;
import com.paisatrack.backend.service.LoginAttemptService;
import com.paisatrack.backend.service.RefreshTokenService;

import lombok.RequiredArgsConstructor;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final JwtService jwtService;

    private final AuthenticationManager authenticationManager;

    private final NotificationSettingRepository notificationSettingRepository;

    private final EmailVerificationOtpRepository otpRepository;

    private final PasswordResetOtpRepository passwordResetOtpRepository;

    private final EmailService emailService;

    private final RefreshTokenService refreshTokenService;

    private final LoginAttemptService loginAttemptService;

    private final DefaultCategoryService defaultCategoryService;

    private final SecureRandom secureRandom =
            new SecureRandom();

    private final OAuthLoginCodeRepository
            oauthLoginCodeRepository;

    // ==========================================
    // REGISTER
    // ==========================================

    @Override
    @Transactional
    public AuthResponse register(
            RegisterRequest request
    ) {

        String email =
                request.getEmail()
                        .trim()
                        .toLowerCase();

        if (
                userRepository.existsByEmail(
                        email
                )
        ) {
            throw new RuntimeException(
                    "Email already exists"
            );
        }

        String firstName =
                request.getFirstName() != null
                        ? request.getFirstName().trim()
                        : "";

        String lastName =
                request.getLastName() != null
                        ? request.getLastName().trim()
                        : "";

        String phoneNumber =
                request.getPhoneNumber() != null
                        ? request.getPhoneNumber().trim()
                        : "";

        User user =
                User.builder()
                        .firstName(
                                firstName
                        )
                        .lastName(
                                lastName
                        )
                        .email(
                                email
                        )
                        .phoneNumber(
                                phoneNumber
                        )
                        .password(
                                passwordEncoder.encode(
                                        request.getPassword()
                                )
                        )
                        .emailVerified(
                                false
                        )
                        .build();

        user =
                userRepository.save(
                        user
                );

        // ==========================================
        // DEFAULT CATEGORIES
        //
        // Every newly registered user receives
        // the default PaisaTrack categories.
        // ==========================================

        defaultCategoryService
                .ensureDefaultCategories(
                        user
                );

        // ==========================================
        // DEFAULT NOTIFICATION SETTINGS
        // ==========================================

        NotificationSetting notificationSetting =
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

        notificationSettingRepository.save(
                notificationSetting
        );

        // ==========================================
        // EMAIL VERIFICATION OTP
        // ==========================================

        String otp =
                generateOtp();

        EmailVerificationOtp verificationOtp =
                EmailVerificationOtp.builder()
                        .user(
                                user
                        )
                        .otp(
                                otp
                        )
                        .expiresAt(
                                LocalDateTime
                                        .now()
                                        .plusMinutes(
                                                10
                                        )
                        )
                        .used(
                                false
                        )
                        .build();

        otpRepository.save(
                verificationOtp
        );

        emailService.sendVerificationOtp(
                user.getEmail(),
                user.getFirstName(),
                otp
        );

        return new AuthResponse(
                null,
                "Registration successful. Please verify your email using the OTP sent to you.",
                buildUserResponse(
                        user
                )
        );
    }

    // ==========================================
    // LOGIN
    // ==========================================

    @Override
    @Transactional
    public AuthResponse login(
            LoginRequest request
    ) {

        String email =
                request.getEmail()
                        .trim()
                        .toLowerCase();

        // ==========================================
        // RATE LIMIT CHECK
        // ==========================================

        loginAttemptService
                .checkAllowed(
                        email
                );

        // ==========================================
        // FIND USER
        // ==========================================

        User user =
                userRepository
                        .findByEmail(
                                email
                        )
                        .orElse(
                                null
                        );

        if (
                user == null
        ) {

            loginAttemptService
                    .loginFailed(
                            email
                    );

            throw new BadCredentialsException(
                    "Invalid email or password."
            );
        }

        // ==========================================
        // EMAIL VERIFICATION
        // ==========================================

        if (
                !Boolean.TRUE.equals(
                        user.getEmailVerified()
                )
        ) {

            throw new EmailNotVerifiedException(
                    "Email not verified. Please verify your email before logging in."
            );
        }

        // ==========================================
        // PASSWORD AUTHENTICATION
        // ==========================================

        try {

            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            email,
                            request.getPassword()
                    )
            );

        } catch (
                AuthenticationException exception
        ) {

            loginAttemptService
                    .loginFailed(
                            email
                    );

            throw new BadCredentialsException(
                    "Invalid email or password."
            );
        }

        // ==========================================
        // SUCCESS
        // ==========================================

        loginAttemptService
                .loginSucceeded(
                        email
                );

        // ==========================================
        // ENSURE DEFAULT CATEGORIES
        //
        // This also upgrades existing accounts.
        //
        // Existing categories are preserved.
        // Only missing defaults are inserted.
        // ==========================================

        defaultCategoryService
                .ensureDefaultCategories(
                        user
                );

        String token =
                generateToken(
                        user
                );

        RefreshToken refreshToken =
                refreshTokenService
                        .createRefreshToken(
                                user
                        );

        return new AuthResponse(
                token,
                refreshToken.getToken(),
                "Login successful.",
                buildUserResponse(
                        user
                )
        );
    }

    // ==========================================
    // VERIFY EMAIL + AUTO LOGIN
    // ==========================================

    @Override
    @Transactional
    public AuthResponse verifyEmail(
            VerifyOtpRequest request
    ) {

        String email =
                request.getEmail()
                        .trim()
                        .toLowerCase();

        User user =
                userRepository
                        .findByEmail(
                                email
                        )
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "User not found"
                                )
                        );

        if (
                Boolean.TRUE.equals(
                        user.getEmailVerified()
                )
        ) {

            /*
             * Also make sure categories exist
             * before automatic login.
             */
            defaultCategoryService
                    .ensureDefaultCategories(
                            user
                    );

            String token =
                    generateToken(
                            user
                    );

            RefreshToken refreshToken =
                    refreshTokenService
                            .createRefreshToken(
                                    user
                            );

            return new AuthResponse(
                    token,
                    refreshToken.getToken(),
                    "Email is already verified.",
                    buildUserResponse(
                            user
                    )
            );
        }

        EmailVerificationOtp otp =
                otpRepository
                        .findTopByUserAndUsedFalseOrderByCreatedAtDesc(
                                user
                        )
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "No active verification OTP found."
                                )
                        );

        if (
                otp.getExpiresAt()
                        .isBefore(
                                LocalDateTime.now()
                        )
        ) {

            throw new RuntimeException(
                    "OTP has expired. Please request a new OTP."
            );
        }

        if (
                !otp.getOtp()
                        .equals(
                                request.getOtp()
                        )
        ) {

            throw new RuntimeException(
                    "Invalid OTP."
            );
        }

        otp.setUsed(
                true
        );

        otpRepository.save(
                otp
        );

        user.setEmailVerified(
                true
        );

        userRepository.save(
                user
        );

        /*
         * Guarantee the verified user has
         * all required default categories.
         */
        defaultCategoryService
                .ensureDefaultCategories(
                        user
                );

        String token =
                generateToken(
                        user
                );

        RefreshToken refreshToken =
                refreshTokenService
                        .createRefreshToken(
                                user
                        );

        return new AuthResponse(
                token,
                refreshToken.getToken(),
                "Email verified successfully.",
                buildUserResponse(
                        user
                )
        );
    }

    // ==========================================
    // RESEND VERIFICATION OTP
    // ==========================================

    @Override
    @Transactional
    public VerificationResponse resendOtp(
            ResendOtpRequest request
    ) {

        String email =
                request.getEmail()
                        .trim()
                        .toLowerCase();

        User user =
                userRepository
                        .findByEmail(
                                email
                        )
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "User not found"
                                )
                        );

        if (
                Boolean.TRUE.equals(
                        user.getEmailVerified()
                )
        ) {

            return VerificationResponse
                    .builder()
                    .success(
                            true
                    )
                    .message(
                            "Email is already verified."
                    )
                    .build();
        }

        otpRepository
                .findTopByUserAndUsedFalseOrderByCreatedAtDesc(
                        user
                )
                .ifPresent(
                        oldOtp -> {

                            oldOtp.setUsed(
                                    true
                            );

                            otpRepository.save(
                                    oldOtp
                            );
                        }
                );

        String newOtp =
                generateOtp();

        EmailVerificationOtp otp =
                EmailVerificationOtp.builder()
                        .user(
                                user
                        )
                        .otp(
                                newOtp
                        )
                        .expiresAt(
                                LocalDateTime
                                        .now()
                                        .plusMinutes(
                                                10
                                        )
                        )
                        .used(
                                false
                        )
                        .build();

        otpRepository.save(
                otp
        );

        emailService.sendVerificationOtp(
                user.getEmail(),
                user.getFirstName(),
                newOtp
        );

        return VerificationResponse
                .builder()
                .success(
                        true
                )
                .message(
                        "A new verification OTP has been sent to your email."
                )
                .build();
    }

    // ==========================================
    // FORGOT PASSWORD
    // ==========================================

    @Override
    @Transactional
    public VerificationResponse forgotPassword(
            ForgotPasswordRequest request
    ) {

        String email =
                request.getEmail()
                        .trim()
                        .toLowerCase();

        User user =
                userRepository
                        .findByEmail(
                                email
                        )
                        .orElse(
                                null
                        );

        /*
         * Do not reveal whether the
         * account exists.
         */
        if (
                user == null
        ) {

            return VerificationResponse
                    .builder()
                    .success(
                            true
                    )
                    .message(
                            "If an account exists for this email, a password reset OTP has been sent."
                    )
                    .build();
        }

        /*
         * Invalidate previous active reset OTP.
         */
        passwordResetOtpRepository
                .findTopByUserAndUsedFalseOrderByCreatedAtDesc(
                        user
                )
                .ifPresent(
                        previousOtp -> {

                            previousOtp.setUsed(
                                    true
                            );

                            passwordResetOtpRepository.save(
                                    previousOtp
                            );
                        }
                );

        String otp =
                generateOtp();

        PasswordResetOtp passwordResetOtp =
                PasswordResetOtp.builder()
                        .user(
                                user
                        )
                        .otp(
                                otp
                        )
                        .expiresAt(
                                LocalDateTime
                                        .now()
                                        .plusMinutes(
                                                10
                                        )
                        )
                        .verified(
                                false
                        )
                        .used(
                                false
                        )
                        .build();

        passwordResetOtpRepository.save(
                passwordResetOtp
        );

        emailService.sendPasswordResetOtp(
                user.getEmail(),
                user.getFirstName(),
                otp
        );

        return VerificationResponse
                .builder()
                .success(
                        true
                )
                .message(
                        "If an account exists for this email, a password reset OTP has been sent."
                )
                .build();
    }

    // ==========================================
    // VERIFY PASSWORD RESET OTP
    // ==========================================

    @Override
    @Transactional
    public VerificationResponse verifyResetOtp(
            VerifyResetOtpRequest request
    ) {

        String email =
                request.getEmail()
                        .trim()
                        .toLowerCase();

        User user =
                userRepository
                        .findByEmail(
                                email
                        )
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Invalid password reset request."
                                )
                        );

        PasswordResetOtp resetOtp =
                passwordResetOtpRepository
                        .findTopByUserAndUsedFalseOrderByCreatedAtDesc(
                                user
                        )
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "No active password reset OTP found."
                                )
                        );

        if (
                resetOtp.getExpiresAt()
                        .isBefore(
                                LocalDateTime.now()
                        )
        ) {

            resetOtp.setUsed(
                    true
            );

            passwordResetOtpRepository.save(
                    resetOtp
            );

            throw new RuntimeException(
                    "Password reset OTP has expired. Please request a new OTP."
            );
        }

        if (
                !resetOtp.getOtp()
                        .equals(
                                request.getOtp()
                        )
        ) {

            throw new RuntimeException(
                    "Invalid password reset OTP."
            );
        }

        resetOtp.setVerified(
                true
        );

        passwordResetOtpRepository.save(
                resetOtp
        );

        return VerificationResponse
                .builder()
                .success(
                        true
                )
                .message(
                        "OTP verified successfully. You can now create a new password."
                )
                .build();
    }

    // ==========================================
    // RESET PASSWORD
    // ==========================================

    @Override
    @Transactional
    public VerificationResponse resetPassword(
            ResetPasswordRequest request
    ) {

        String email =
                request.getEmail()
                        .trim()
                        .toLowerCase();

        User user =
                userRepository
                        .findByEmail(
                                email
                        )
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Invalid password reset request."
                                )
                        );

        PasswordResetOtp resetOtp =
                passwordResetOtpRepository
                        .findTopByUserAndUsedFalseOrderByCreatedAtDesc(
                                user
                        )
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "No active password reset request found."
                                )
                        );

        if (
                resetOtp.getExpiresAt()
                        .isBefore(
                                LocalDateTime.now()
                        )
        ) {

            resetOtp.setUsed(
                    true
            );

            passwordResetOtpRepository.save(
                    resetOtp
            );

            throw new RuntimeException(
                    "Password reset session has expired. Please request another OTP."
            );
        }

        if (
                !Boolean.TRUE.equals(
                        resetOtp.getVerified()
                )
        ) {

            throw new RuntimeException(
                    "Please verify the password reset OTP first."
            );
        }

        if (
                passwordEncoder.matches(
                        request.getNewPassword(),
                        user.getPassword()
                )
        ) {

            throw new RuntimeException(
                    "New password must be different from your current password."
            );
        }

        user.setPassword(
                passwordEncoder.encode(
                        request.getNewPassword()
                )
        );

        userRepository.save(
                user
        );

        resetOtp.setUsed(
                true
        );

        passwordResetOtpRepository.save(
                resetOtp
        );

        return VerificationResponse
                .builder()
                .success(
                        true
                )
                .message(
                        "Password reset successfully. You can now sign in using your new password."
                )
                .build();
    }

    // ==========================================
    // REFRESH ACCESS TOKEN
    // ==========================================

    @Override
    @Transactional
    public RefreshTokenResponse refreshToken(
            RefreshTokenRequest request
    ) {

        RefreshToken existingToken =
                refreshTokenService
                        .verifyRefreshToken(
                                request.getRefreshToken()
                        );

        User user =
                existingToken.getUser();

        RefreshToken newRefreshToken =
                refreshTokenService
                        .rotateRefreshToken(
                                request.getRefreshToken()
                        );

        String newAccessToken =
                generateToken(
                        user
                );

        return RefreshTokenResponse
                .builder()
                .accessToken(
                        newAccessToken
                )
                .refreshToken(
                        newRefreshToken.getToken()
                )
                .tokenType(
                        "Bearer"
                )
                .expiresIn(
                        null
                )
                .build();
    }

    // ==========================================
    // LOGOUT
    // ==========================================

    @Override
    @Transactional
    public VerificationResponse logout(
            LogoutRequest request
    ) {

        refreshTokenService
                .revokeRefreshToken(
                        request.getRefreshToken()
                );

        return VerificationResponse
                .builder()
                .success(
                        true
                )
                .message(
                        "Logged out successfully."
                )
                .build();
    }

        // ==========================================
        // EXCHANGE GOOGLE OAUTH LOGIN CODE
        // ==========================================

        @Override
        @Transactional
        public AuthResponse exchangeOAuthCode(
                String code
        ) {

        if (
                code == null ||
                code.isBlank()
        ) {
                throw new RuntimeException(
                        "OAuth login code is required."
                );
        }

        OAuthLoginCode loginCode =
                oauthLoginCodeRepository
                        .findByCodeAndUsedFalse(
                                code
                        )
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Invalid or already used OAuth login code."
                                )
                        );

        if (
                loginCode
                        .getExpiresAt()
                        .isBefore(
                                LocalDateTime.now()
                        )
        ) {

                loginCode.setUsed(
                        true
                );

                oauthLoginCodeRepository.save(
                        loginCode
                );

                throw new RuntimeException(
                        "OAuth login session expired. Please sign in with Google again."
                );
        }

        User user =
                loginCode.getUser();

        /*
        * One-time use only.
        */
        loginCode.setUsed(
                true
        );

        oauthLoginCodeRepository.save(
                loginCode
        );

        defaultCategoryService
                .ensureDefaultCategories(
                        user
                );

        String token =
                generateToken(
                        user
                );

        RefreshToken refreshToken =
                refreshTokenService
                        .createRefreshToken(
                                user
                        );

        return new AuthResponse(
                token,
                refreshToken.getToken(),
                "Google login successful.",
                buildUserResponse(
                        user
                )
        );
        }

    // ==========================================
    // GENERATE JWT
    // ==========================================

    private String generateToken(
            User user
    ) {

        return jwtService.generateToken(

                org.springframework.security
                        .core.userdetails.User
                        .withUsername(
                                user.getEmail()
                        )
                        .password(
                                user.getPassword()
                        )
                        .roles(
                                user.getRole()
                        )
                        .build()
        );
    }

    // ==========================================
    // GENERATE OTP
    // ==========================================

    private String generateOtp() {

        int value =
                100000 +
                        secureRandom.nextInt(
                                900000
                        );

        return String.valueOf(
                value
        );
    }

    // ==========================================
    // USER RESPONSE
    // ==========================================

    private UserResponse buildUserResponse(
            User user
    ) {

        return new UserResponse(
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getPhoneNumber(),
                user.getProfileImage(),
                user.getCurrency(),
                user.getLanguage(),
                user.getRole()
        );
    }
}
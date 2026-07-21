package com.paisatrack.backend.service.impl;

import com.paisatrack.backend.dto.AuthResponse;
import com.paisatrack.backend.dto.LoginRequest;
import com.paisatrack.backend.dto.RegisterRequest;
import com.paisatrack.backend.dto.UserResponse;
import com.paisatrack.backend.entity.NotificationSetting;
import com.paisatrack.backend.entity.User;
import com.paisatrack.backend.repository.NotificationSettingRepository;
import com.paisatrack.backend.repository.UserRepository;
import com.paisatrack.backend.security.JwtService;
import com.paisatrack.backend.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalTime;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final NotificationSettingRepository notificationSettingRepository;

    @Override
    @Transactional
    public AuthResponse register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        User user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .phoneNumber(request.getPhoneNumber())
                .password(passwordEncoder.encode(request.getPassword()))
                .build();

        user = userRepository.save(user);

        // =====================================================
        // Create Default Notification Settings
        // =====================================================

        NotificationSetting notificationSetting =
                NotificationSetting.builder()
                        .user(user)
                        .morningReminderTime(LocalTime.of(9, 0))
                        .afternoonReminderTime(LocalTime.of(13, 0))
                        .eveningReminderTime(LocalTime.of(18, 0))
                        .nightReminderTime(LocalTime.of(22, 0))
                        .enabled(true)
                        .build();

        notificationSettingRepository.save(notificationSetting);

        // =====================================================
        // Generate JWT
        // =====================================================

        String token = jwtService.generateToken(
                org.springframework.security.core.userdetails.User
                        .withUsername(user.getEmail())
                        .password(user.getPassword())
                        .roles(user.getRole())
                        .build());

        return new AuthResponse(
                token,
                "Registration Successful",
                new UserResponse(
                        user.getId(),
                        user.getFirstName(),
                        user.getLastName(),
                        user.getEmail(),
                        user.getPhoneNumber(),
                        user.getProfileImage(),
                        user.getCurrency(),
                        user.getLanguage(),
                        user.getRole()
                )
        );
    }

    @Override
    public AuthResponse login(LoginRequest request) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()));

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow();

        String token = jwtService.generateToken(
                org.springframework.security.core.userdetails.User
                        .withUsername(user.getEmail())
                        .password(user.getPassword())
                        .roles(user.getRole())
                        .build());

        return new AuthResponse(
                token,
                "Login Successful",
                new UserResponse(
                        user.getId(),
                        user.getFirstName(),
                        user.getLastName(),
                        user.getEmail(),
                        user.getPhoneNumber(),
                        user.getProfileImage(),
                        user.getCurrency(),
                        user.getLanguage(),
                        user.getRole()
                )
        );
    }
}
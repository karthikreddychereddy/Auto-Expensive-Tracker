package com.paisatrack.backend.service;

import com.paisatrack.backend.dto.AuthResponse;
import com.paisatrack.backend.dto.LoginRequest;
import com.paisatrack.backend.dto.RegisterRequest;

public interface AuthService {

    AuthResponse register(RegisterRequest request);

    AuthResponse login(LoginRequest request);

}
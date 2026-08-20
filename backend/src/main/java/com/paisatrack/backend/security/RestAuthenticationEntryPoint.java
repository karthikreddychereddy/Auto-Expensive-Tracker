package com.paisatrack.backend.security;

import com.fasterxml.jackson.databind.ObjectMapper;

import com.paisatrack.backend.dto.ApiErrorResponse;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class RestAuthenticationEntryPoint
        implements AuthenticationEntryPoint {

    private final ObjectMapper objectMapper;

    @Override
    public void commence(
            HttpServletRequest request,
            HttpServletResponse response,
            AuthenticationException authException
    ) throws IOException, ServletException {

        ApiErrorResponse body =
                ApiErrorResponse.builder()

                        .timestamp(
                                LocalDateTime.now()
                        )

                        .status(
                                HttpStatus.UNAUTHORIZED.value()
                        )

                        .error(
                                HttpStatus.UNAUTHORIZED
                                        .getReasonPhrase()
                        )

                        .message(
                                "Authentication is required to access this resource."
                        )

                        .path(
                                request.getRequestURI()
                        )

                        .build();

        response.setStatus(
                HttpStatus.UNAUTHORIZED.value()
        );

        response.setContentType(
                MediaType.APPLICATION_JSON_VALUE
        );

        objectMapper.writeValue(
                response.getOutputStream(),
                body
        );
    }
}
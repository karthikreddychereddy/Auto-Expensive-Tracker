package com.paisatrack.backend.exception;

import com.paisatrack.backend.dto.ApiErrorResponse;

import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;

import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // ==========================================
    // VALIDATION ERROR
    // ==========================================

    @ExceptionHandler(
            MethodArgumentNotValidException.class
    )
    public ResponseEntity<ApiErrorResponse>
    handleValidation(
            MethodArgumentNotValidException exception,
            HttpServletRequest request
    ) {

        String message =
                exception
                        .getBindingResult()
                        .getFieldErrors()
                        .stream()
                        .findFirst()
                        .map(error ->
                                error.getDefaultMessage()
                        )
                        .orElse(
                                "Invalid request."
                        );

        return buildResponse(
                HttpStatus.BAD_REQUEST,
                message,
                request
        );
    }

    // ==========================================
    // EMAIL NOT VERIFIED
    // ==========================================

    @ExceptionHandler(
            EmailNotVerifiedException.class
    )
    public ResponseEntity<ApiErrorResponse>
    handleEmailNotVerified(
            EmailNotVerifiedException exception,
            HttpServletRequest request
    ) {

        return buildResponse(
                HttpStatus.FORBIDDEN,
                exception.getMessage(),
                request
        );
    }

    // ==========================================
    // TOO MANY LOGIN ATTEMPTS
    // ==========================================

    @ExceptionHandler(
            TooManyLoginAttemptsException.class
    )
    public ResponseEntity<ApiErrorResponse>
    handleTooManyLoginAttempts(
            TooManyLoginAttemptsException exception,
            HttpServletRequest request
    ) {

        return buildResponse(
                HttpStatus.TOO_MANY_REQUESTS,
                exception.getMessage(),
                request
        );
    }

    // ==========================================
    // WRONG LOGIN CREDENTIALS
    // ==========================================

    @ExceptionHandler({
            BadCredentialsException.class
    })
    public ResponseEntity<ApiErrorResponse>
    handleBadCredentials(
            BadCredentialsException exception,
            HttpServletRequest request
    ) {

        return buildResponse(
                HttpStatus.UNAUTHORIZED,
                "Invalid email or password.",
                request
        );
    }

    // ==========================================
    // OTHER SPRING SECURITY AUTH ERRORS
    // ==========================================

    @ExceptionHandler(
            AuthenticationException.class
    )
    public ResponseEntity<ApiErrorResponse>
    handleAuthentication(
            AuthenticationException exception,
            HttpServletRequest request
    ) {

        return buildResponse(
                HttpStatus.UNAUTHORIZED,
                "Authentication failed.",
                request
        );
    }

    // ==========================================
    // ENTITY NOT FOUND
    // ==========================================

    @ExceptionHandler(
            EntityNotFoundException.class
    )
    public ResponseEntity<ApiErrorResponse>
    handleNotFound(
            EntityNotFoundException exception,
            HttpServletRequest request
    ) {

        return buildResponse(
                HttpStatus.NOT_FOUND,
                exception.getMessage(),
                request
        );
    }

    // ==========================================
    // INVALID REQUEST / BUSINESS RULE
    // ==========================================

    @ExceptionHandler(
            IllegalArgumentException.class
    )
    public ResponseEntity<ApiErrorResponse>
    handleIllegalArgument(
            IllegalArgumentException exception,
            HttpServletRequest request
    ) {

        return buildResponse(
                HttpStatus.BAD_REQUEST,
                exception.getMessage(),
                request
        );
    }

    // ==========================================
    // EXISTING AUTH/BUSINESS ERRORS
    //
    // Your current OTP/reset services still
    // throw RuntimeException for invalid OTP,
    // expired OTP, duplicate email, etc.
    //
    // Return a clean 400 instead of exposing
    // a server stack trace as the API response.
    // ==========================================

    @ExceptionHandler(
            RuntimeException.class
    )
    public ResponseEntity<ApiErrorResponse>
    handleRuntimeException(
            RuntimeException exception,
            HttpServletRequest request
    ) {

        return buildResponse(
                HttpStatus.BAD_REQUEST,
                exception.getMessage() != null
                        ? exception.getMessage()
                        : "Unable to process request.",
                request
        );
    }

    // ==========================================
    // FALLBACK
    // ==========================================

    @ExceptionHandler(
            Exception.class
    )
    public ResponseEntity<ApiErrorResponse>
    handleUnexpected(
            Exception exception,
            HttpServletRequest request
    ) {

        /*
         * Log unexpected problems internally.
         *
         * Do not expose implementation details
         * to the frontend.
         */
        exception.printStackTrace();

        return buildResponse(
                HttpStatus.INTERNAL_SERVER_ERROR,
                "An unexpected server error occurred.",
                request
        );
    }

    // ==========================================
    // RESPONSE BUILDER
    // ==========================================

    private ResponseEntity<ApiErrorResponse>
    buildResponse(
            HttpStatus status,
            String message,
            HttpServletRequest request
    ) {

        ApiErrorResponse response =
                ApiErrorResponse.builder()

                        .timestamp(
                                LocalDateTime.now()
                        )

                        .status(
                                status.value()
                        )

                        .error(
                                status.getReasonPhrase()
                        )

                        .message(
                                message
                        )

                        .path(
                                request.getRequestURI()
                        )

                        .build();

        return ResponseEntity
                .status(status)
                .body(response);
    }
}
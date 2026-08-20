package com.paisatrack.backend.service;

public interface LoginAttemptService {

    void checkAllowed(
            String email
    );

    void loginFailed(
            String email
    );

    void loginSucceeded(
            String email
    );
}
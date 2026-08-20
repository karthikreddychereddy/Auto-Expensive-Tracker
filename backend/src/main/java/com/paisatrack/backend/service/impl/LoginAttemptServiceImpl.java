package com.paisatrack.backend.service.impl;

import com.paisatrack.backend.exception.TooManyLoginAttemptsException;
import com.paisatrack.backend.service.LoginAttemptService;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class LoginAttemptServiceImpl
        implements LoginAttemptService {

    /*
     * Maximum consecutive failed attempts.
     */
    private static final int MAX_ATTEMPTS = 5;

    /*
     * Lock account login attempts for
     * 15 minutes after reaching the limit.
     */
    private static final long LOCK_MINUTES = 15;

    private final Map<String, AttemptInfo>
            attempts =
            new ConcurrentHashMap<>();

    // ==========================================
    // CHECK LOGIN ALLOWED
    // ==========================================

    @Override
    public void checkAllowed(
            String email
    ) {

        String key =
                normalize(
                        email
                );

        AttemptInfo info =
                attempts.get(
                        key
                );

        if (info == null) {
            return;
        }

        if (
                info.failedAttempts()
                        <
                        MAX_ATTEMPTS
        ) {
            return;
        }

        LocalDateTime lockedUntil =
                info.lastFailedAt()
                        .plusMinutes(
                                LOCK_MINUTES
                        );

        if (
                LocalDateTime.now()
                        .isAfter(
                                lockedUntil
                        )
        ) {

            /*
             * Lock period finished.
             */
            attempts.remove(
                    key
            );

            return;
        }

        long secondsRemaining =
                ChronoUnit.SECONDS.between(
                        LocalDateTime.now(),
                        lockedUntil
                );

        long minutesRemaining =
                Math.max(
                        1,
                        (
                                secondsRemaining
                                        + 59
                        )
                                / 60
                );

        throw new TooManyLoginAttemptsException(
                "Too many failed login attempts. Try again in "
                        +
                        minutesRemaining
                        +
                        " minute(s)."
        );
    }

    // ==========================================
    // LOGIN FAILED
    // ==========================================

    @Override
    public void loginFailed(
            String email
    ) {

        String key =
                normalize(
                        email
                );

        attempts.compute(
                key,
                (
                        ignored,
                        current
                ) -> {

                    int count =
                            current == null
                                    ? 1
                                    : current
                                            .failedAttempts()
                                            + 1;

                    return new AttemptInfo(
                            count,
                            LocalDateTime.now()
                    );
                }
        );
    }

    // ==========================================
    // LOGIN SUCCEEDED
    // ==========================================

    @Override
    public void loginSucceeded(
            String email
    ) {

        attempts.remove(
                normalize(
                        email
                )
        );
    }

    private String normalize(
            String email
    ) {

        if (email == null) {
            return "";
        }

        return email
                .trim()
                .toLowerCase();
    }

    private record AttemptInfo(
            int failedAttempts,
            LocalDateTime lastFailedAt
    ) {
    }
}
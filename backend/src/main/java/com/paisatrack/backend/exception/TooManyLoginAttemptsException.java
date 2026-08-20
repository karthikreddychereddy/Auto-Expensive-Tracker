package com.paisatrack.backend.exception;

public class TooManyLoginAttemptsException
        extends RuntimeException {

    public TooManyLoginAttemptsException(
            String message
    ) {

        super(
                message
        );
    }
}
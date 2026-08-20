package com.paisatrack.backend.exception;

public class EmailNotVerifiedException
        extends RuntimeException {

    public EmailNotVerifiedException(
            String message
    ) {

        super(
                message
        );
    }
}
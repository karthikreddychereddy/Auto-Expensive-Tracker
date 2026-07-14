package com.paisatrack.backend.util;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class SecurityUtil {

    private SecurityUtil() {
    }

    public static String getCurrentUserEmail() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        System.out.println("Authentication = " + authentication);

        if (authentication != null) {
            System.out.println("Email = " + authentication.getName());
            return authentication.getName();
        }

        return null;
    }
}
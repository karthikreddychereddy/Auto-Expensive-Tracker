package com.paisatrack.backend.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserResponse {

    private Long id;

    private String firstName;

    private String lastName;

    private String email;

    private String phoneNumber;

    private String profileImage;

    private String currency;

    private String language;

    private String role;
}
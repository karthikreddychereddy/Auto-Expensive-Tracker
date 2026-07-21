package com.paisatrack.backend.dto;

import lombok.Data;

@Data
public class UserUpdateRequest {


    private String firstName;

    private String lastName;

    private String phoneNumber;

    private String profileImage;

    private String currency;

    private String language;

}
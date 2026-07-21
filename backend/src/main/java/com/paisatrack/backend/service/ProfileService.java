package com.paisatrack.backend.service;

import com.paisatrack.backend.dto.ProfileRequest;
import com.paisatrack.backend.dto.ProfileResponse;

public interface ProfileService {

    ProfileResponse getProfile();

    ProfileResponse updateProfile(ProfileRequest request);

}
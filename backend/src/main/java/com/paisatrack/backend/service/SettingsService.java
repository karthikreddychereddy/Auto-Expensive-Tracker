package com.paisatrack.backend.service;

import com.paisatrack.backend.dto.ChangePasswordRequest;
import com.paisatrack.backend.dto.ChangePasswordResponse;
import com.paisatrack.backend.dto.SettingsRequest;
import com.paisatrack.backend.dto.SettingsResponse;

public interface SettingsService {

    SettingsResponse getSettings();

    SettingsResponse updateSettings(SettingsRequest request);

    ChangePasswordResponse changePassword(
            ChangePasswordRequest request
    );

}
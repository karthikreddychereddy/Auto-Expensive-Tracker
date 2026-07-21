package com.paisatrack.backend.controller;

import com.paisatrack.backend.dto.ChangePasswordRequest;
import com.paisatrack.backend.dto.ChangePasswordResponse;
import com.paisatrack.backend.dto.SettingsRequest;
import com.paisatrack.backend.dto.SettingsResponse;
import com.paisatrack.backend.service.SettingsService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/settings")
@RequiredArgsConstructor
public class SettingsController {

    private final SettingsService settingsService;

    @GetMapping
    public SettingsResponse getSettings() {
        return settingsService.getSettings();
    }

    @PutMapping
    public SettingsResponse updateSettings(
            @RequestBody SettingsRequest request) {

        return settingsService.updateSettings(request);
    }

    @PostMapping("/change-password")
    public ChangePasswordResponse changePassword(
            @RequestBody ChangePasswordRequest request) {

        return settingsService.changePassword(request);
    }
}
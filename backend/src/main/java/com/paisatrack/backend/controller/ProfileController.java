package com.paisatrack.backend.controller;

import com.paisatrack.backend.dto.ProfileRequest;
import com.paisatrack.backend.dto.ProfileResponse;
import com.paisatrack.backend.service.ProfileService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
@CrossOrigin(origins = "*")
public class ProfileController {

    private final ProfileService profileService;

    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @GetMapping
    public ProfileResponse getProfile() {
        return profileService.getProfile();
    }

    @PutMapping
    public ProfileResponse updateProfile(
            @RequestBody ProfileRequest request
    ) {
        return profileService.updateProfile(request);
    }

}
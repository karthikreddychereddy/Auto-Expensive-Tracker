package com.paisatrack.backend.service.impl;

import com.paisatrack.backend.dto.ProfileRequest;
import com.paisatrack.backend.dto.ProfileResponse;
import com.paisatrack.backend.entity.Profile;
import com.paisatrack.backend.repository.ProfileRepository;
import com.paisatrack.backend.service.ProfileService;
import org.springframework.stereotype.Service;

@Service
public class ProfileServiceImpl implements ProfileService {

    private final ProfileRepository repository;

    public ProfileServiceImpl(ProfileRepository repository) {
        this.repository = repository;
    }

    @Override
    public ProfileResponse getProfile() {

        Profile profile = repository.findAll()
                .stream()
                .findFirst()
                .orElseGet(() -> {

                    Profile defaultProfile = new Profile();

                    defaultProfile.setName("Karthik Reddy");
                    defaultProfile.setEmail("karthik@example.com");
                    defaultProfile.setPhone("+91 9876543210");
                    defaultProfile.setPhoto(null);
                    defaultProfile.setMonthlyIncome(0.0);
                    defaultProfile.setSavingsGoal(0.0);
                    defaultProfile.setFinancialHealth(80);

                    return repository.save(defaultProfile);

                });

        return map(profile);

    }

    @Override
    public ProfileResponse updateProfile(ProfileRequest request) {

        Profile profile = repository.findAll()
                .stream()
                .findFirst()
                .orElse(new Profile());

        profile.setName(request.getName());
        profile.setEmail(request.getEmail());
        profile.setPhone(request.getPhone());
        profile.setPhoto(request.getPhoto());
        profile.setMonthlyIncome(request.getMonthlyIncome());
        profile.setSavingsGoal(request.getSavingsGoal());
        profile.setFinancialHealth(request.getFinancialHealth());

        Profile saved = repository.save(profile);

        return map(saved);

    }

    private ProfileResponse map(Profile profile) {

        return new ProfileResponse(

                profile.getId(),
                profile.getName(),
                profile.getEmail(),
                profile.getPhone(),
                profile.getPhoto(),
                profile.getMonthlyIncome(),
                profile.getSavingsGoal(),
                profile.getFinancialHealth()

        );

    }

}
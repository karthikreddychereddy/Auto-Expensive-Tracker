package com.paisatrack.backend.service.impl;

import com.paisatrack.backend.dto.ProfileRequest;
import com.paisatrack.backend.dto.ProfileResponse;
import com.paisatrack.backend.entity.Profile;
import com.paisatrack.backend.entity.User;
import com.paisatrack.backend.repository.ProfileRepository;
import com.paisatrack.backend.repository.UserRepository;
import com.paisatrack.backend.service.ProfileService;
import com.paisatrack.backend.util.SecurityUtil;
import org.springframework.stereotype.Service;

@Service
public class ProfileServiceImpl implements ProfileService {

    private final ProfileRepository repository;
    private final UserRepository userRepository;

    public ProfileServiceImpl(
            ProfileRepository repository,
            UserRepository userRepository
    ) {
        this.repository = repository;
        this.userRepository = userRepository;
    }

    @Override
    public ProfileResponse getProfile() {

        String email = getCurrentUserEmail();

        Profile profile = repository.findByEmail(email)
                .orElseGet(() -> createDefaultProfile(email));

        return map(profile);
    }

    @Override
    public ProfileResponse updateProfile(ProfileRequest request) {

        String email = getCurrentUserEmail();

        Profile profile = repository.findByEmail(email)
                .orElseGet(() -> createDefaultProfile(email));

        if (request.getName() != null && !request.getName().isBlank()) {
            profile.setName(request.getName().trim());
        }

        /*
         * The authenticated email is the profile owner.
         * Do not allow the request body to move a profile to another user.
         */
        profile.setEmail(email);

        profile.setPhone(request.getPhone());
        profile.setPhoto(request.getPhoto());
        profile.setMonthlyIncome(request.getMonthlyIncome());
        profile.setSavingsGoal(request.getSavingsGoal());
        profile.setFinancialHealth(request.getFinancialHealth());

        Profile saved = repository.save(profile);

        return map(saved);
    }

    private Profile createDefaultProfile(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Profile profile = new Profile();

        String firstName = user.getFirstName() == null
                ? ""
                : user.getFirstName().trim();

        String lastName = user.getLastName() == null
                ? ""
                : user.getLastName().trim();

        String fullName = (firstName + " " + lastName).trim();

        profile.setName(
                fullName.isBlank()
                        ? email
                        : fullName
        );

        profile.setEmail(email);
        profile.setPhone(user.getPhoneNumber());
        profile.setPhoto(user.getProfileImage());
        profile.setMonthlyIncome(0.0);
        profile.setSavingsGoal(0.0);
        profile.setFinancialHealth(80);

        return repository.save(profile);
    }

    private String getCurrentUserEmail() {

        String email = SecurityUtil.getCurrentUserEmail();

        if (email == null || email.isBlank()) {
            throw new RuntimeException("Authenticated user not found");
        }

        return email;
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

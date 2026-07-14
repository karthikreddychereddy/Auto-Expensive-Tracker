package com.paisatrack.backend.service.impl;

import com.paisatrack.backend.dto.SavingsRequest;
import com.paisatrack.backend.dto.SavingsResponse;
import com.paisatrack.backend.entity.Savings;
import com.paisatrack.backend.entity.User;
import com.paisatrack.backend.repository.SavingsRepository;
import com.paisatrack.backend.repository.UserRepository;
import com.paisatrack.backend.service.SavingsService;
import com.paisatrack.backend.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SavingsServiceImpl implements SavingsService {

    private final SavingsRepository savingsRepository;
    private final UserRepository userRepository;

    @Override
    public SavingsResponse createSaving(SavingsRequest request) {

        String email = SecurityUtil.getCurrentUserEmail();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Savings saving = Savings.builder()
                .user(user)
                .amount(request.getAmount())
                .source(request.getSource())
                .description(request.getDescription())
                .savingDate(request.getSavingDate())
                .build();

        Savings saved = savingsRepository.save(saving);

        return SavingsResponse.builder()
                .id(saved.getId())
                .amount(saved.getAmount())
                .source(saved.getSource())
                .description(saved.getDescription())
                .savingDate(saved.getSavingDate())
                .build();
    }

    @Override
    public List<SavingsResponse> getAllSavings() {

        String email = SecurityUtil.getCurrentUserEmail();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<SavingsResponse> response = new ArrayList<>();

        savingsRepository.findByUser(user).forEach(saving -> {

            response.add(
                    SavingsResponse.builder()
                            .id(saving.getId())
                            .amount(saving.getAmount())
                            .source(saving.getSource())
                            .description(saving.getDescription())
                            .savingDate(saving.getSavingDate())
                            .build()
            );

        });

        return response;
    }

    @Override
    public SavingsResponse getSavingById(Long id) {

        String email = SecurityUtil.getCurrentUserEmail();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Savings saving = savingsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Saving not found"));

        if (!saving.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        return SavingsResponse.builder()
                .id(saving.getId())
                .amount(saving.getAmount())
                .source(saving.getSource())
                .description(saving.getDescription())
                .savingDate(saving.getSavingDate())
                .build();
    }

    @Override
    public SavingsResponse updateSaving(Long id, SavingsRequest request) {

        String email = SecurityUtil.getCurrentUserEmail();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Savings saving = savingsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Saving not found"));

        if (!saving.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        saving.setAmount(request.getAmount());
        saving.setSource(request.getSource());
        saving.setDescription(request.getDescription());
        saving.setSavingDate(request.getSavingDate());

        Savings updated = savingsRepository.save(saving);

        return SavingsResponse.builder()
                .id(updated.getId())
                .amount(updated.getAmount())
                .source(updated.getSource())
                .description(updated.getDescription())
                .savingDate(updated.getSavingDate())
                .build();
    }

    @Override
    public void deleteSaving(Long id) {

        String email = SecurityUtil.getCurrentUserEmail();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Savings saving = savingsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Saving not found"));

        if (!saving.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        savingsRepository.delete(saving);
    }
}
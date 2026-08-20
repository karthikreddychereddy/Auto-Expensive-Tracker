package com.paisatrack.backend.service;

import com.paisatrack.backend.dto.SavingsRequest;
import com.paisatrack.backend.dto.SavingsResponse;

import java.util.List;

public interface SavingsService {

    SavingsResponse createSaving(
            SavingsRequest request
    );

    List<SavingsResponse> getAllSavings(
            String month
    );

    SavingsResponse getSavingById(
            Long id
    );

    SavingsResponse updateSaving(
            Long id,
            SavingsRequest request
    );

    void deleteSaving(
            Long id
    );
}
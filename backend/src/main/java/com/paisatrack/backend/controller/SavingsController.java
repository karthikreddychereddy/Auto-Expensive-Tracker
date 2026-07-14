package com.paisatrack.backend.controller;

import com.paisatrack.backend.dto.SavingsRequest;
import com.paisatrack.backend.dto.SavingsResponse;
import com.paisatrack.backend.service.SavingsService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/savings")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class SavingsController {

    private final SavingsService savingsService;

    @PostMapping
    public SavingsResponse createSaving(
            @RequestBody SavingsRequest request) {

        return savingsService.createSaving(request);
    }

    @GetMapping
    public List<SavingsResponse> getAllSavings() {

        return savingsService.getAllSavings();
    }

    @GetMapping("/{id}")
    public SavingsResponse getSavingById(
            @PathVariable Long id) {

        return savingsService.getSavingById(id);
    }

    @PutMapping("/{id}")
    public SavingsResponse updateSaving(
            @PathVariable Long id,
            @RequestBody SavingsRequest request) {

        return savingsService.updateSaving(id, request);
    }

    @DeleteMapping("/{id}")
    public void deleteSaving(
            @PathVariable Long id) {

        savingsService.deleteSaving(id);
    }
}
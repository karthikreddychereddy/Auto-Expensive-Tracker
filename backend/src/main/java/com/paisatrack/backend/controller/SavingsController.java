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
@CrossOrigin(
        origins = "http://localhost:5173"
)
public class SavingsController {

    private final SavingsService
            savingsService;

    // ==========================================
    // CREATE
    // ==========================================

    @PostMapping
    public SavingsResponse createSaving(
            @RequestBody
            SavingsRequest request
    ) {

        return savingsService.createSaving(
                request
        );
    }

    // ==========================================
    // GET SAVINGS
    //
    // Example:
    // /api/savings?month=2026-08
    // ==========================================

    @GetMapping
    public List<SavingsResponse>
    getAllSavings(
            @RequestParam(
                    required = false
            )
            String month
    ) {

        return savingsService.getAllSavings(
                month
        );
    }

    // ==========================================
    // GET BY ID
    // ==========================================

    @GetMapping("/{id}")
    public SavingsResponse getSavingById(
            @PathVariable
            Long id
    ) {

        return savingsService.getSavingById(
                id
        );
    }

    // ==========================================
    // UPDATE
    // ==========================================

    @PutMapping("/{id}")
    public SavingsResponse updateSaving(
            @PathVariable
            Long id,

            @RequestBody
            SavingsRequest request
    ) {

        return savingsService.updateSaving(
                id,
                request
        );
    }

    // ==========================================
    // DELETE
    // ==========================================

    @DeleteMapping("/{id}")
    public void deleteSaving(
            @PathVariable
            Long id
    ) {

        savingsService.deleteSaving(
                id
        );
    }
}
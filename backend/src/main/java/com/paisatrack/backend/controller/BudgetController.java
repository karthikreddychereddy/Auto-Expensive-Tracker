package com.paisatrack.backend.controller;

import com.paisatrack.backend.dto.BudgetRequest;
import com.paisatrack.backend.dto.BudgetResponse;
import com.paisatrack.backend.dto.BudgetStatusResponse;

import com.paisatrack.backend.service.BudgetService;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/budgets")
@RequiredArgsConstructor
@CrossOrigin(
        origins = "http://localhost:5173"
)
public class BudgetController {

    private final BudgetService budgetService;

    // ==========================================
    // CREATE
    // ==========================================

    @PostMapping
    public BudgetResponse createBudget(
            @RequestBody
            BudgetRequest request
    ) {

        return budgetService.createBudget(
                request
        );
    }

    // ==========================================
    // GET BUDGETS
    //
    // Example:
    // /api/budgets?month=2026-08
    // ==========================================

    @GetMapping
    public List<BudgetResponse> getAllBudgets(
            @RequestParam(
                    required = false
            )
            String month
    ) {

        return budgetService.getAllBudgets(
                month
        );
    }

    // ==========================================
    // STATUS
    //
    // IMPORTANT:
    // Keep this before /{id} for clarity.
    // ==========================================

    @GetMapping("/status")
    public List<BudgetStatusResponse>
    getBudgetStatus(
            @RequestParam(
                    required = false
            )
            String month
    ) {

        return budgetService.getBudgetStatus(
                month
        );
    }

    // ==========================================
    // GET BY ID
    // ==========================================

    @GetMapping("/{id}")
    public BudgetResponse getBudgetById(
            @PathVariable
            Long id
    ) {

        return budgetService.getBudgetById(
                id
        );
    }

    // ==========================================
    // UPDATE
    // ==========================================

    @PutMapping("/{id}")
    public BudgetResponse updateBudget(
            @PathVariable
            Long id,

            @RequestBody
            BudgetRequest request
    ) {

        return budgetService.updateBudget(
                id,
                request
        );
    }

    // ==========================================
    // DELETE
    // ==========================================

    @DeleteMapping("/{id}")
    public void deleteBudget(
            @PathVariable
            Long id
    ) {

        budgetService.deleteBudget(
                id
        );
    }
}
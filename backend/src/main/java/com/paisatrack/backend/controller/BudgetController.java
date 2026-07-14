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
@CrossOrigin(origins = "http://localhost:5173")
public class BudgetController {

    private final BudgetService budgetService;

    @PostMapping
    public BudgetResponse createBudget(@RequestBody BudgetRequest request) {
        return budgetService.createBudget(request);
    }

    @GetMapping
    public List<BudgetResponse> getAllBudgets() {
        return budgetService.getAllBudgets();
    }

    @GetMapping("/{id}")
    public BudgetResponse getBudgetById(@PathVariable Long id) {
        return budgetService.getBudgetById(id);
    }

    @PutMapping("/{id}")
    public BudgetResponse updateBudget(
            @PathVariable Long id,
            @RequestBody BudgetRequest request) {

        return budgetService.updateBudget(id, request);
    }

    @DeleteMapping("/{id}")
    public void deleteBudget(@PathVariable Long id) {
        budgetService.deleteBudget(id);
    }

    @GetMapping("/status")
    public List<BudgetStatusResponse> getBudgetStatus() {
        return budgetService.getBudgetStatus();
    }
}
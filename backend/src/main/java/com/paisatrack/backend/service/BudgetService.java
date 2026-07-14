package com.paisatrack.backend.service;

import com.paisatrack.backend.dto.BudgetRequest;
import com.paisatrack.backend.dto.BudgetResponse;
import com.paisatrack.backend.dto.BudgetStatusResponse;

import java.util.List;

public interface BudgetService {

    BudgetResponse createBudget(BudgetRequest request);

    List<BudgetResponse> getAllBudgets();

    BudgetResponse getBudgetById(Long id);

    BudgetResponse updateBudget(Long id, BudgetRequest request);

    void deleteBudget(Long id);

    List<BudgetStatusResponse> getBudgetStatus();
}
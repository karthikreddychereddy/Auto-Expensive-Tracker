package com.paisatrack.backend.service;

import com.paisatrack.backend.dto.ExpenseRequest;
import com.paisatrack.backend.dto.ExpenseResponse;

import java.util.List;

public interface ExpenseService {

    ExpenseResponse addExpense(ExpenseRequest request);

    List<ExpenseResponse> getAllExpenses();

    ExpenseResponse getExpenseById(Long id);

    ExpenseResponse updateExpense(Long id, ExpenseRequest request);

    void deleteExpense(Long id);
}
package com.paisatrack.backend.controller;

import com.paisatrack.backend.dto.ExpenseRequest;
import com.paisatrack.backend.dto.ExpenseResponse;
import com.paisatrack.backend.service.ExpenseService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/expenses")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class ExpenseController {

    private final ExpenseService expenseService;

    @PostMapping
    public ExpenseResponse addExpense(
            @Valid @RequestBody ExpenseRequest request) {

        System.out.println("ADD EXPENSE CONTROLLER HIT");

        return expenseService.addExpense(request);
    }

    @GetMapping
    public List<ExpenseResponse> getAllExpenses(
            @RequestParam(required = false) String month) {

        return expenseService.getAllExpenses(month);
    }

    @GetMapping("/{id}")
    public ExpenseResponse getExpenseById(@PathVariable Long id) {

        return expenseService.getExpenseById(id);
    }

    @PutMapping("/{id}")
    public ExpenseResponse updateExpense(
            @PathVariable Long id,
            @Valid @RequestBody ExpenseRequest request) {

        return expenseService.updateExpense(id, request);
    }

    @DeleteMapping("/{id}")
    public void deleteExpense(@PathVariable Long id) {

        expenseService.deleteExpense(id);
    }
}
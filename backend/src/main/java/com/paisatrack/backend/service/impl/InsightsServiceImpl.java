package com.paisatrack.backend.service.impl;

import com.paisatrack.backend.dto.InsightsResponse;
import com.paisatrack.backend.repository.BudgetRepository;
import com.paisatrack.backend.repository.ExpenseRepository;
import com.paisatrack.backend.repository.IncomeRepository;
import com.paisatrack.backend.service.InsightsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

@Service
@RequiredArgsConstructor
public class InsightsServiceImpl implements InsightsService {

    private final ExpenseRepository expenseRepository;
    private final IncomeRepository incomeRepository;
    private final BudgetRepository budgetRepository;

    @Override
    public InsightsResponse getInsights() {

        BigDecimal income = incomeRepository.getTotalIncome();

        BigDecimal expense = expenseRepository.getTotalExpense();

        BigDecimal budget = budgetRepository.getTotalBudget();

        BigDecimal savings = income.subtract(expense);

        double budgetUsed = 0.0;

        if (budget.compareTo(BigDecimal.ZERO) > 0) {
            budgetUsed = expense
                    .multiply(BigDecimal.valueOf(100))
                    .divide(budget, 2, RoundingMode.HALF_UP)
                    .doubleValue();
        }

        List<String> categories = expenseRepository.getHighestExpenseCategory();

        String highestCategory = categories.isEmpty()
                ? "N/A"
                : categories.get(0);

        return new InsightsResponse(
                income.doubleValue(),
                expense.doubleValue(),
                savings.doubleValue(),
                budget.doubleValue(),
                budgetUsed,
                highestCategory
        );
    }
}
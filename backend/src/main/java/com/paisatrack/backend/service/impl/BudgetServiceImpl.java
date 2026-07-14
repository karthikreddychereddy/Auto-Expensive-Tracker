package com.paisatrack.backend.service.impl;

import com.paisatrack.backend.dto.BudgetRequest;
import com.paisatrack.backend.dto.BudgetResponse;
import com.paisatrack.backend.dto.BudgetStatusResponse;
import com.paisatrack.backend.entity.Budget;
import com.paisatrack.backend.entity.Expense;
import com.paisatrack.backend.entity.User;
import com.paisatrack.backend.repository.BudgetRepository;
import com.paisatrack.backend.repository.ExpenseRepository;
import com.paisatrack.backend.repository.UserRepository;
import com.paisatrack.backend.service.BudgetService;
import com.paisatrack.backend.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BudgetServiceImpl implements BudgetService {

    private final BudgetRepository budgetRepository;
    private final UserRepository userRepository;
    private final ExpenseRepository expenseRepository;

        @Override
        public BudgetResponse createBudget(BudgetRequest request) {

            String email = SecurityUtil.getCurrentUserEmail();

            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            Budget budget = Budget.builder()
                    .user(user)
                    .category(request.getCategory())
                    .budgetAmount(request.getBudgetAmount())
                    .startDate(request.getStartDate())
                    .endDate(request.getEndDate())
                    .build();

            Budget savedBudget = budgetRepository.save(budget);

            return BudgetResponse.builder()
                    .id(savedBudget.getId())
                    .category(savedBudget.getCategory())
                    .budgetAmount(savedBudget.getBudgetAmount())
                    .startDate(savedBudget.getStartDate())
                    .endDate(savedBudget.getEndDate())
                    .build();
        }
        @Override
        public List<BudgetResponse> getAllBudgets() {

            String email = SecurityUtil.getCurrentUserEmail();

            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            List<BudgetResponse> response = new ArrayList<>();

            budgetRepository.findByUser(user).forEach(budget -> {

                response.add(

                        BudgetResponse.builder()
                                .id(budget.getId())
                                .category(budget.getCategory())
                                .budgetAmount(budget.getBudgetAmount())
                                .startDate(budget.getStartDate())
                                .endDate(budget.getEndDate())
                                .build()
                );

            });

            return response;
        }
        @Override
        public BudgetResponse getBudgetById(Long id) {

            String email = SecurityUtil.getCurrentUserEmail();

            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            Budget budget = budgetRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Budget not found"));

            if (!budget.getUser().getId().equals(user.getId())) {
                throw new RuntimeException("Unauthorized");
            }

            return BudgetResponse.builder()
                    .id(budget.getId())
                    .category(budget.getCategory())
                    .budgetAmount(budget.getBudgetAmount())
                    .startDate(budget.getStartDate())
                    .endDate(budget.getEndDate())
                    .build();
        }
        @Override
        public BudgetResponse updateBudget(Long id, BudgetRequest request) {

            String email = SecurityUtil.getCurrentUserEmail();

            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            Budget budget = budgetRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Budget not found"));

            if (!budget.getUser().getId().equals(user.getId())) {
                throw new RuntimeException("Unauthorized");
            }

            budget.setCategory(request.getCategory());
            budget.setBudgetAmount(request.getBudgetAmount());
            budget.setStartDate(request.getStartDate());
            budget.setEndDate(request.getEndDate());

            Budget updated = budgetRepository.save(budget);

            return BudgetResponse.builder()
                    .id(updated.getId())
                    .category(updated.getCategory())
                    .budgetAmount(updated.getBudgetAmount())
                    .startDate(updated.getStartDate())
                    .endDate(updated.getEndDate())
                    .build();
        }
        @Override
        public void deleteBudget(Long id) {

            String email = SecurityUtil.getCurrentUserEmail();

            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            Budget budget = budgetRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Budget not found"));

            if (!budget.getUser().getId().equals(user.getId())) {
                throw new RuntimeException("Unauthorized");
            }

            budgetRepository.delete(budget);
        }
        @Override
        public List<BudgetStatusResponse> getBudgetStatus() {

            String email = SecurityUtil.getCurrentUserEmail();

            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            List<BudgetStatusResponse> response = new ArrayList<>();

            List<Budget> budgets = budgetRepository.findByUser(user);

            for (Budget budget : budgets) {

                List<Expense> expenses =
                        expenseRepository.findByUserAndCategoryAndExpenseDateBetween(
                                user,
                                budget.getCategory(),
                                budget.getStartDate(),
                                budget.getEndDate()
                        );

                BigDecimal spent = expenses.stream()
                        .map(Expense::getAmount)
                        .reduce(BigDecimal.ZERO, BigDecimal::add);

                BigDecimal remaining = budget.getBudgetAmount().subtract(spent);

                double percentage = 0;

                if (budget.getBudgetAmount().compareTo(BigDecimal.ZERO) > 0) {
                    percentage = spent
                            .multiply(BigDecimal.valueOf(100))
                            .divide(budget.getBudgetAmount(), 2, RoundingMode.HALF_UP)
                            .doubleValue();
                }

                response.add(
                        BudgetStatusResponse.builder()
                                .category(budget.getCategory())
                                .budgetAmount(budget.getBudgetAmount())
                                .spentAmount(spent)
                                .remainingAmount(remaining)
                                .percentageUsed(percentage)
                                .build()
                );
            }

            return response;
        }
}
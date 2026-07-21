package com.paisatrack.backend.service.impl;

import com.paisatrack.backend.dto.CategoryBreakdownResponse;
import com.paisatrack.backend.dto.InsightResponse;
import com.paisatrack.backend.dto.MonthlyTrendResponse;
import com.paisatrack.backend.dto.RecentTransactionResponse;
import com.paisatrack.backend.dto.WeeklyExpenseResponse;
import com.paisatrack.backend.entity.Expense;
import com.paisatrack.backend.entity.Goal;
import com.paisatrack.backend.entity.Income;
import com.paisatrack.backend.entity.User;
import com.paisatrack.backend.repository.ExpenseRepository;
import com.paisatrack.backend.repository.GoalRepository;
import com.paisatrack.backend.repository.IncomeRepository;
import com.paisatrack.backend.repository.SavingsRepository;
import com.paisatrack.backend.repository.UserRepository;
import com.paisatrack.backend.service.InsightService;
import com.paisatrack.backend.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.time.Month;
import java.time.temporal.WeekFields;
import java.util.Locale;
import java.util.LinkedHashMap;

@Service
@RequiredArgsConstructor
public class InsightServiceImpl implements InsightService {

    private final ExpenseRepository expenseRepository;
    private final IncomeRepository incomeRepository;
    private final SavingsRepository savingsRepository;
    private final GoalRepository goalRepository;
    private final UserRepository userRepository;

    private User getCurrentUser() {

        String email = SecurityUtil.getCurrentUserEmail();

        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Override
    public InsightResponse getInsights() {

        User user = getCurrentUser();

        List<Expense> expenses = expenseRepository.findByUser(user);
        List<Income> incomes = incomeRepository.findByUser(user);

        BigDecimal totalIncome = incomes.stream()
                .map(Income::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal totalExpense = expenses.stream()
                .map(Expense::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal totalSavings = savingsRepository.findByUser(user)
                .stream()
                .map(s -> s.getAmount())
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal balance = totalIncome
                .subtract(totalExpense)
                .subtract(totalSavings);

        List<Goal> goals = goalRepository.findByUser(user);

        long totalGoals = goals.size();

        long completedGoals = goals.stream()
                .filter(g -> "COMPLETED".equalsIgnoreCase(g.getStatus()))
                .count();

        String highestCategory = expenses.stream()
                .collect(Collectors.groupingBy(
                        Expense::getCategory,
                        Collectors.reducing(
                                BigDecimal.ZERO,
                                Expense::getAmount,
                                BigDecimal::add
                        )
                ))
                .entrySet()
                .stream()
                .max(Map.Entry.comparingByValue())
                .map(Map.Entry::getKey)
                .orElse("N/A");

        double savingsRate = 0;
        double expenseRate = 0;

        if (totalIncome.compareTo(BigDecimal.ZERO) > 0) {

            savingsRate = totalSavings
                    .multiply(BigDecimal.valueOf(100))
                    .divide(totalIncome, 2, RoundingMode.HALF_UP)
                    .doubleValue();

            expenseRate = totalExpense
                    .multiply(BigDecimal.valueOf(100))
                    .divide(totalIncome, 2, RoundingMode.HALF_UP)
                    .doubleValue();
        }

        String health;

        if (savingsRate >= 30) {
            health = "Excellent";
        } else if (savingsRate >= 20) {
            health = "Good";
        } else if (savingsRate >= 10) {
            health = "Average";
        } else {
            health = "Poor";
        }

        return InsightResponse.builder()
                .totalIncome(totalIncome)
                .totalExpense(totalExpense)
                .totalSavings(totalSavings)
                .balance(balance)
                .highestExpenseCategory(highestCategory)
                .totalGoals(totalGoals)
                .completedGoals(completedGoals)
                .savingsRate(savingsRate)
                .expenseRate(expenseRate)
                .financialHealth(health)
                .build();
    }

    @Override
    public List<CategoryBreakdownResponse> getCategoryBreakdown() {

        User user = getCurrentUser();

        return expenseRepository.findByUser(user)
                .stream()
                .collect(Collectors.groupingBy(
                        Expense::getCategory,
                        Collectors.reducing(
                                BigDecimal.ZERO,
                                Expense::getAmount,
                                BigDecimal::add
                        )
                ))
                .entrySet()
                .stream()
                .map(entry -> CategoryBreakdownResponse.builder()
                        .category(entry.getKey())
                        .amount(entry.getValue())
                        .build())
                .sorted(Comparator.comparing(CategoryBreakdownResponse::getAmount).reversed())
                .toList();
    }
        @Override
        public List<MonthlyTrendResponse> getMonthlyTrend() {

        User user = getCurrentUser();

        List<Expense> expenses = expenseRepository.findByUser(user);
        List<Income> incomes = incomeRepository.findByUser(user);

        Map<Month, BigDecimal> expenseMap = expenses.stream()
                .collect(Collectors.groupingBy(
                        expense -> expense.getExpenseDate().getMonth(),
                        Collectors.reducing(
                                BigDecimal.ZERO,
                                Expense::getAmount,
                                BigDecimal::add
                        )
                ));

        Map<Month, BigDecimal> incomeMap = incomes.stream()
                .collect(Collectors.groupingBy(
                        income -> income.getIncomeDate().getMonth(),
                        Collectors.reducing(
                                BigDecimal.ZERO,
                                Income::getAmount,
                                BigDecimal::add
                        )
                ));

        List<MonthlyTrendResponse> response = new java.util.ArrayList<>();

        for (Month month : Month.values()) {

                if (expenseMap.containsKey(month) || incomeMap.containsKey(month)) {

                response.add(
                        MonthlyTrendResponse.builder()
                                .month(month.name())
                                .income(incomeMap.getOrDefault(month, BigDecimal.ZERO))
                                .expense(expenseMap.getOrDefault(month, BigDecimal.ZERO))
                                .build()
                );
                }
        }

        return response;
        }
        @Override
        public List<WeeklyExpenseResponse> getWeeklyExpense() {

        User user = getCurrentUser();

        WeekFields weekFields = WeekFields.of(Locale.getDefault());

        Map<Integer, BigDecimal> weeklyData = expenseRepository.findByUser(user)
                .stream()
                .collect(Collectors.groupingBy(
                        expense -> expense.getExpenseDate().get(weekFields.weekOfMonth()),
                        Collectors.reducing(
                                BigDecimal.ZERO,
                                Expense::getAmount,
                                BigDecimal::add
                        )
                ));

        return weeklyData.entrySet()
                .stream()
                .sorted(Map.Entry.comparingByKey())
                .map(entry ->
                        WeeklyExpenseResponse.builder()
                                .week("Week " + entry.getKey())
                                .totalExpense(entry.getValue())
                                .build())
                .toList();
        }
        @Override
        public List<RecentTransactionResponse> getRecentTransactions() {

        User user = getCurrentUser();

        List<RecentTransactionResponse> transactions =
                new java.util.ArrayList<>();

        expenseRepository.findByUser(user)
                .forEach(expense ->

                        transactions.add(

                                RecentTransactionResponse.builder()
                                        .id(expense.getId())
                                        .transactionType("EXPENSE")
                                        .amount(expense.getAmount())
                                        .category(expense.getCategory())
                                        .description(expense.getDescription())
                                        .date(expense.getExpenseDate())
                                        .build()

                        )

                );

        incomeRepository.findByUser(user)
                .forEach(income ->

                        transactions.add(

                                RecentTransactionResponse.builder()
                                        .id(income.getId())
                                        .transactionType("INCOME")
                                        .amount(income.getAmount())
                                        .category(income.getCategory())
                                        .description(income.getDescription())
                                        .date(income.getIncomeDate())
                                        .build()

                        )

                );

        return transactions.stream()
                .sorted(
                        Comparator.comparing(RecentTransactionResponse::getDate)
                                .reversed()
                )
                .limit(10)
                .toList();
        }
}
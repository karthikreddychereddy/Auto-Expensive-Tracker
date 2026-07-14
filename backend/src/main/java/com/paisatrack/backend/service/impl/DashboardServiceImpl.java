package com.paisatrack.backend.service.impl;

import com.paisatrack.backend.dto.CategoryExpenseResponse;
import com.paisatrack.backend.dto.DashboardSummaryResponse;
import com.paisatrack.backend.dto.MonthlySummaryResponse;
import com.paisatrack.backend.dto.RecentTransactionResponse;
import com.paisatrack.backend.entity.Expense;
import com.paisatrack.backend.entity.Income;
import com.paisatrack.backend.entity.User;
import com.paisatrack.backend.repository.ExpenseRepository;
import com.paisatrack.backend.repository.IncomeRepository;
import com.paisatrack.backend.repository.UserRepository;
import com.paisatrack.backend.service.DashboardService;
import com.paisatrack.backend.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.paisatrack.backend.dto.WeeklyExpenseResponse;

import java.math.BigDecimal;
import java.time.format.DateTimeFormatter;
import java.time.LocalDate;
import java.time.temporal.WeekFields;
import java.util.*;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService {

    private final UserRepository userRepository;
    private final ExpenseRepository expenseRepository;
    private final IncomeRepository incomeRepository;


    @Override
    public DashboardSummaryResponse getDashboardSummary() {

        String email = SecurityUtil.getCurrentUserEmail();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));


        List<Expense> expenses = expenseRepository.findByUser(user);
        List<Income> incomes = incomeRepository.findByUser(user);


        BigDecimal totalExpense = expenses.stream()
                .map(Expense::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);


        BigDecimal totalIncome = incomes.stream()
                .map(Income::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);


        return DashboardSummaryResponse.builder()
                .totalIncome(totalIncome)
                .totalExpense(totalExpense)
                .currentBalance(totalIncome.subtract(totalExpense))
                .incomeCount(incomeRepository.countByUser(user))
                .expenseCount(expenseRepository.countByUser(user))
                .build();
    }


    @Override
    public List<RecentTransactionResponse> getRecentTransactions() {

        String email = SecurityUtil.getCurrentUserEmail();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));


        List<RecentTransactionResponse> transactions = new ArrayList<>();


        expenseRepository.findByUser(user).forEach(expense ->
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


        incomeRepository.findByUser(user).forEach(income ->
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


        transactions.sort(
                Comparator.comparing(RecentTransactionResponse::getDate)
                        .reversed()
        );


        return transactions;
    }


    @Override
    public List<CategoryExpenseResponse> getCategoryWiseExpenses() {

        String email = SecurityUtil.getCurrentUserEmail();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));


        Map<String, BigDecimal> categoryTotals = new HashMap<>();


        for (Expense expense : expenseRepository.findByUser(user)) {

            categoryTotals.put(
                    expense.getCategory(),
                    categoryTotals.getOrDefault(
                            expense.getCategory(),
                            BigDecimal.ZERO
                    ).add(expense.getAmount())
            );
        }


        List<CategoryExpenseResponse> response = new ArrayList<>();


        categoryTotals.forEach((category, amount) ->
                response.add(
                        CategoryExpenseResponse.builder()
                                .category(category)
                                .totalAmount(amount)
                                .build()
                )
        );


        return response;
    }


    @Override
    public List<MonthlySummaryResponse> getMonthlySummary() {

        String email = SecurityUtil.getCurrentUserEmail();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));


        Map<String, BigDecimal> incomeMap = new HashMap<>();
        Map<String, BigDecimal> expenseMap = new HashMap<>();

        DateTimeFormatter formatter =
                DateTimeFormatter.ofPattern("yyyy-MM");


        for (Income income : incomeRepository.findByUser(user)) {

            String month = income.getIncomeDate()
                    .format(formatter);

            incomeMap.put(
                    month,
                    incomeMap.getOrDefault(month, BigDecimal.ZERO)
                            .add(income.getAmount())
            );
        }


        for (Expense expense : expenseRepository.findByUser(user)) {

            String month = expense.getExpenseDate()
                    .format(formatter);

            expenseMap.put(
                    month,
                    expenseMap.getOrDefault(month, BigDecimal.ZERO)
                            .add(expense.getAmount())
            );
        }


        Set<String> months = new HashSet<>();

        months.addAll(incomeMap.keySet());
        months.addAll(expenseMap.keySet());


        List<MonthlySummaryResponse> response = new ArrayList<>();


        for (String month : months) {

            response.add(
                    MonthlySummaryResponse.builder()
                            .month(month)
                            .totalIncome(
                                    incomeMap.getOrDefault(
                                            month,
                                            BigDecimal.ZERO
                                    )
                            )
                            .totalExpense(
                                    expenseMap.getOrDefault(
                                            month,
                                            BigDecimal.ZERO
                                    )
                            )
                            .build()
            );
        }


        response.sort(
                Comparator.comparing(MonthlySummaryResponse::getMonth)
        );


        return response;
    }
    @Override
    public List<WeeklyExpenseResponse> getWeeklyExpenseSummary() {

        String email = SecurityUtil.getCurrentUserEmail();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Map<String, BigDecimal> weeklyExpenses = new HashMap<>();

        WeekFields weekFields = WeekFields.ISO;

        for (Expense expense : expenseRepository.findByUser(user)) {

            LocalDate date = expense.getExpenseDate();

            int weekNumber = date.get(weekFields.weekOfWeekBasedYear());

            String week = "Week " + weekNumber;

            weeklyExpenses.put(
                    week,
                    weeklyExpenses.getOrDefault(
                            week,
                            BigDecimal.ZERO
                    ).add(expense.getAmount())
            );
        }

        List<WeeklyExpenseResponse> response = new ArrayList<>();

        weeklyExpenses.forEach((week, amount) ->
                response.add(
                        WeeklyExpenseResponse.builder()
                                .week(week)
                                .totalExpense(amount)
                                .build()
                )
        );

        return response;
    }
}
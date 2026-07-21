package com.paisatrack.backend.service.impl;

import com.paisatrack.backend.dto.CategoryBreakdownResponse;
import com.paisatrack.backend.dto.DashboardSummaryResponse;
import com.paisatrack.backend.dto.MonthlyTrendResponse;
import com.paisatrack.backend.dto.RecentTransactionResponse;
import com.paisatrack.backend.dto.WeeklyExpenseResponse;
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

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.WeekFields;
import java.util.*;
import java.time.YearMonth;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService {

        private final UserRepository userRepository;
        private final ExpenseRepository expenseRepository;
        private final IncomeRepository incomeRepository;
        private YearMonth getSelectedMonth(String month) {

                if (month == null || month.isBlank()) {
                        return YearMonth.now();
                }

                return YearMonth.parse(month);
        }

        @Override
        public DashboardSummaryResponse getDashboardSummary(String month) {

        String email = SecurityUtil.getCurrentUserEmail();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        YearMonth selectedMonth = getSelectedMonth(month);

        List<Expense> expenses = expenseRepository.findByUser(user)
                .stream()
                .filter(e -> YearMonth.from(e.getExpenseDate()).equals(selectedMonth))
                .toList();

        List<Income> incomes = incomeRepository.findByUser(user)
                .stream()
                .filter(i -> YearMonth.from(i.getIncomeDate()).equals(selectedMonth))
                .toList();

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
                .incomeCount((long) incomes.size())
                .expenseCount((long) expenses.size())
                .build();
        }

        @Override
        public List<RecentTransactionResponse> getRecentTransactions(String month) {

        String email = SecurityUtil.getCurrentUserEmail();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        YearMonth selectedMonth = getSelectedMonth(month);

        List<RecentTransactionResponse> transactions = new ArrayList<>();

        expenseRepository.findByUser(user)
                .stream()
                .filter(e -> YearMonth.from(e.getExpenseDate()).equals(selectedMonth))
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
                        ));

        incomeRepository.findByUser(user)
                .stream()
                .filter(i -> YearMonth.from(i.getIncomeDate()).equals(selectedMonth))
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
                        ));

        transactions.sort(
                Comparator.comparing(RecentTransactionResponse::getDate).reversed());

        return transactions;
        }

        @Override
        public List<CategoryBreakdownResponse> getCategoryWiseExpenses(String month) {

        String email = SecurityUtil.getCurrentUserEmail();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        YearMonth selectedMonth = getSelectedMonth(month);

        Map<String, BigDecimal> categoryTotals = new HashMap<>();

        expenseRepository.findByUser(user)
                .stream()
                .filter(e -> YearMonth.from(e.getExpenseDate()).equals(selectedMonth))
                .forEach(expense ->

                        categoryTotals.put(
                                expense.getCategory(),
                                categoryTotals.getOrDefault(
                                        expense.getCategory(),
                                        BigDecimal.ZERO)
                                        .add(expense.getAmount())
                        )
                );

        List<CategoryBreakdownResponse> response = new ArrayList<>();

        categoryTotals.forEach((category, amount) ->
                response.add(
                        CategoryBreakdownResponse.builder()
                                .category(category)
                                .amount(amount)
                                .build()
                ));

        return response;
        }

        @Override
        public List<MonthlyTrendResponse> getMonthlySummary() {

                String email = SecurityUtil.getCurrentUserEmail();

                User user = userRepository.findByEmail(email)
                        .orElseThrow(() -> new RuntimeException("User not found"));

                Map<String, BigDecimal> incomeMap = new HashMap<>();
                Map<String, BigDecimal> expenseMap = new HashMap<>();

                DateTimeFormatter formatter =
                        DateTimeFormatter.ofPattern("yyyy-MM");

                for (Income income : incomeRepository.findByUser(user)) {

                String month = income.getIncomeDate().format(formatter);

                incomeMap.put(
                        month,
                        incomeMap.getOrDefault(month, BigDecimal.ZERO)
                                .add(income.getAmount())
                );
                }

                for (Expense expense : expenseRepository.findByUser(user)) {

                String month = expense.getExpenseDate().format(formatter);

                expenseMap.put(
                        month,
                        expenseMap.getOrDefault(month, BigDecimal.ZERO)
                                .add(expense.getAmount())
                );
                }

                Set<String> months = new HashSet<>();

                months.addAll(incomeMap.keySet());
                months.addAll(expenseMap.keySet());

                List<MonthlyTrendResponse> response = new ArrayList<>();

                for (String month : months) {

                response.add(
                        MonthlyTrendResponse.builder()
                                .month(month)
                                .income(
                                        incomeMap.getOrDefault(
                                                month,
                                                BigDecimal.ZERO
                                        )
                                )
                                .expense(
                                        expenseMap.getOrDefault(
                                                month,
                                                BigDecimal.ZERO
                                        )
                                )
                                .build()
                );
                }

                response.sort(
                        Comparator.comparing(MonthlyTrendResponse::getMonth)
                );

                return response;
        }

        @Override
        public List<WeeklyExpenseResponse> getWeeklyExpenseSummary(String month) {

        String email = SecurityUtil.getCurrentUserEmail();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        YearMonth selectedMonth = getSelectedMonth(month);

        Map<String, BigDecimal> weeklyExpenses = new HashMap<>();

        WeekFields weekFields = WeekFields.ISO;

        expenseRepository.findByUser(user)
                .stream()
                .filter(expense -> YearMonth.from(expense.getExpenseDate()).equals(selectedMonth))
                .forEach(expense -> {

                        int weekNumber = expense.getExpenseDate()
                                .get(weekFields.weekOfWeekBasedYear());

                        String week = "Week " + weekNumber;

                        weeklyExpenses.put(
                                week,
                                weeklyExpenses.getOrDefault(
                                        week,
                                        BigDecimal.ZERO
                                ).add(expense.getAmount())
                        );
                });

        List<WeeklyExpenseResponse> response = new ArrayList<>();

        weeklyExpenses.forEach((week, amount) ->
                response.add(
                        WeeklyExpenseResponse.builder()
                                .week(week)
                                .totalExpense(amount)
                                .build()
                ));

        response.sort(Comparator.comparing(WeeklyExpenseResponse::getWeek));

        return response;
        }
}
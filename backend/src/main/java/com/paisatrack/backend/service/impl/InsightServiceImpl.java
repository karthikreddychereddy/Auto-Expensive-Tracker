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
import com.paisatrack.backend.dto.PaymentMethodBreakdownResponse;

import com.paisatrack.backend.service.InsightService;

import com.paisatrack.backend.util.SecurityUtil;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;

import java.time.LocalDate;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;

import java.time.temporal.WeekFields;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InsightServiceImpl
        implements InsightService {

        private final ExpenseRepository
                expenseRepository;

        private final IncomeRepository
                incomeRepository;

        private final SavingsRepository
                savingsRepository;

        private final GoalRepository
                goalRepository;

        private final UserRepository
                userRepository;

        // ==========================================
        // CURRENT USER
        // ==========================================

        private User getCurrentUser() {

                String email =
                        SecurityUtil
                                .getCurrentUserEmail();

                return userRepository
                        .findByEmail(
                                email
                        )
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "User not found"
                                )
                        );
        }

        // ==========================================
        // RESOLVE MONTH
        // ==========================================

        private YearMonth resolveMonth(
                String month
        ) {

                if (
                        month == null ||
                        month.isBlank()
                ) {
                return YearMonth.now();
                }

                try {

                return YearMonth.parse(
                        month.trim()
                );

                } catch (
                        Exception exception
                ) {

                throw new RuntimeException(
                        "Invalid month. Expected format YYYY-MM."
                );
                }
        }

        // ==========================================
        // DATE BELONGS TO MONTH
        // ==========================================

        private boolean isInMonth(
                LocalDate date,
                YearMonth month
        ) {

                if (
                        date == null
                ) {
                return false;
                }

                return YearMonth
                        .from(
                                date
                        )
                        .equals(
                                month
                        );
        }

        // ==========================================
        // MONTH EXPENSES
        // ==========================================

        private List<Expense>
        getExpensesForMonth(
                User user,
                YearMonth month
        ) {

                return expenseRepository
                        .findByUser(
                                user
                        )
                        .stream()
                        .filter(
                                expense ->
                                        isInMonth(
                                                expense.getExpenseDate(),
                                                month
                                        )
                        )
                        .toList();
        }

        // ==========================================
        // MONTH INCOME
        // ==========================================

        private List<Income>
        getIncomeForMonth(
                User user,
                YearMonth month
        ) {

                return incomeRepository
                        .findByUser(
                                user
                        )
                        .stream()
                        .filter(
                                income ->
                                        isInMonth(
                                                income.getIncomeDate(),
                                                month
                                        )
                        )
                        .toList();
        }

        // ==========================================
        // OVERVIEW
        // ==========================================

        @Override
        public InsightResponse getInsights(
                String monthValue
        ) {

                User user =
                        getCurrentUser();

                YearMonth month =
                        resolveMonth(
                                monthValue
                        );

                List<Expense> expenses =
                        getExpensesForMonth(
                                user,
                                month
                        );

                List<Income> incomes =
                        getIncomeForMonth(
                                user,
                                month
                        );

                BigDecimal totalIncome =
                        incomes.stream()
                                .map(
                                        Income::getAmount
                                )
                                .reduce(
                                        BigDecimal.ZERO,
                                        BigDecimal::add
                                );

                BigDecimal totalExpense =
                        expenses.stream()
                                .map(
                                        Expense::getAmount
                                )
                                .reduce(
                                        BigDecimal.ZERO,
                                        BigDecimal::add
                                );

                BigDecimal totalSavings =
                        savingsRepository
                                .findByUser(
                                        user
                                )
                                .stream()
                                .filter(
                                        saving ->
                                                isInMonth(
                                                        saving.getSavingDate(),
                                                        month
                                                )
                                )
                                .map(
                                        saving ->
                                                saving.getAmount()
                                )
                                .reduce(
                                        BigDecimal.ZERO,
                                        BigDecimal::add
                                );

                BigDecimal balance =
                        totalIncome
                                .subtract(
                                        totalExpense
                                )
                                .subtract(
                                        totalSavings
                                );

                /*
                * Goals are not strictly monthly records,
                * so they remain account-level.
                */
                List<Goal> goals =
                        goalRepository
                                .findByUser(
                                        user
                                );

                long totalGoals =
                        goals.size();

                long completedGoals =
                        goals.stream()
                                .filter(
                                        goal ->
                                                "COMPLETED"
                                                        .equalsIgnoreCase(
                                                                goal.getStatus()
                                                        )
                                )
                                .count();

                String highestCategory =
                        expenses.stream()
                                .collect(
                                        Collectors.groupingBy(
                                                Expense::getCategory,

                                                Collectors.reducing(
                                                        BigDecimal.ZERO,
                                                        Expense::getAmount,
                                                        BigDecimal::add
                                                )
                                        )
                                )
                                .entrySet()
                                .stream()
                                .max(
                                        Map.Entry
                                                .comparingByValue()
                                )
                                .map(
                                        Map.Entry::getKey
                                )
                                .orElse(
                                        "N/A"
                                );

                double savingsRate =
                        0;

                double expenseRate =
                        0;

                if (
                        totalIncome.compareTo(
                                BigDecimal.ZERO
                        ) > 0
                ) {

                savingsRate =
                        totalSavings
                                .multiply(
                                        BigDecimal.valueOf(
                                                100
                                        )
                                )
                                .divide(
                                        totalIncome,
                                        2,
                                        RoundingMode.HALF_UP
                                )
                                .doubleValue();

                expenseRate =
                        totalExpense
                                .multiply(
                                        BigDecimal.valueOf(
                                                100
                                        )
                                )
                                .divide(
                                        totalIncome,
                                        2,
                                        RoundingMode.HALF_UP
                                )
                                .doubleValue();
                }

                String health;

                /*
                * For a month with no income,
                * do not incorrectly call it Excellent.
                */
                if (
                        totalIncome.compareTo(
                                BigDecimal.ZERO
                        ) <= 0
                ) {

                health =
                        "No Data";

                } else if (
                        savingsRate >= 30
                ) {

                health =
                        "Excellent";

                } else if (
                        savingsRate >= 20
                ) {

                health =
                        "Good";

                } else if (
                        savingsRate >= 10
                ) {

                health =
                        "Average";

                } else {

                health =
                        "Poor";
                }

                return InsightResponse
                        .builder()
                        .totalIncome(
                                totalIncome
                        )
                        .totalExpense(
                                totalExpense
                        )
                        .totalSavings(
                                totalSavings
                        )
                        .balance(
                                balance
                        )
                        .highestExpenseCategory(
                                highestCategory
                        )
                        .totalGoals(
                                totalGoals
                        )
                        .completedGoals(
                                completedGoals
                        )
                        .savingsRate(
                                savingsRate
                        )
                        .expenseRate(
                                expenseRate
                        )
                        .financialHealth(
                                health
                        )
                        .build();
        }

        // ==========================================
        // CATEGORY BREAKDOWN
        // ==========================================

        @Override
        public List<CategoryBreakdownResponse>
        getCategoryBreakdown(
                String monthValue
        ) {

                User user =
                        getCurrentUser();

                YearMonth month =
                        resolveMonth(
                                monthValue
                        );

                return getExpensesForMonth(
                        user,
                        month
                )
                        .stream()
                        .collect(
                                Collectors.groupingBy(
                                        Expense::getCategory,

                                        Collectors.reducing(
                                                BigDecimal.ZERO,
                                                Expense::getAmount,
                                                BigDecimal::add
                                        )
                                )
                        )
                        .entrySet()
                        .stream()
                        .map(
                                entry ->
                                        CategoryBreakdownResponse
                                                .builder()
                                                .category(
                                                        entry.getKey()
                                                )
                                                .amount(
                                                        entry.getValue()
                                                )
                                                .build()
                        )
                        .sorted(
                                Comparator
                                        .comparing(
                                                CategoryBreakdownResponse::getAmount
                                        )
                                        .reversed()
                        )
                        .toList();
        }

        // ==========================================
        // MONTHLY TREND
        //
        // Last 6 months ending at selected month.
        // ==========================================

        @Override
        public List<MonthlyTrendResponse>
        getMonthlyTrend(
                String monthValue
        ) {

                User user =
                        getCurrentUser();

                YearMonth selectedMonth =
                        resolveMonth(
                                monthValue
                        );

                List<Expense> expenses =
                        expenseRepository
                                .findByUser(
                                        user
                                );

                List<Income> incomes =
                        incomeRepository
                                .findByUser(
                                        user
                                );

                List<MonthlyTrendResponse>
                        response =
                        new ArrayList<>();

                DateTimeFormatter formatter =
                        DateTimeFormatter.ofPattern(
                                "MMM yyyy"
                        );

                for (
                        int offset = 5;
                        offset >= 0;
                        offset--
                ) {

                YearMonth month =
                        selectedMonth.minusMonths(
                                offset
                        );

                BigDecimal income =
                        incomes.stream()
                                .filter(
                                        item ->
                                                isInMonth(
                                                        item.getIncomeDate(),
                                                        month
                                                )
                                )
                                .map(
                                        Income::getAmount
                                )
                                .reduce(
                                        BigDecimal.ZERO,
                                        BigDecimal::add
                                );

                BigDecimal expense =
                        expenses.stream()
                                .filter(
                                        item ->
                                                isInMonth(
                                                        item.getExpenseDate(),
                                                        month
                                                )
                                )
                                .map(
                                        Expense::getAmount
                                )
                                .reduce(
                                        BigDecimal.ZERO,
                                        BigDecimal::add
                                );

                response.add(
                        MonthlyTrendResponse
                                .builder()
                                .month(
                                        month
                                                .atDay(
                                                        1
                                                )
                                                .format(
                                                        formatter
                                                )
                                )
                                .income(
                                        income
                                )
                                .expense(
                                        expense
                                )
                                .build()
                );
                }

                return response;
        }

        // ==========================================
        // WEEKLY EXPENSE
        // ==========================================

        @Override
        public List<WeeklyExpenseResponse>
        getWeeklyExpense(
                String monthValue
        ) {

                User user =
                        getCurrentUser();

                YearMonth month =
                        resolveMonth(
                                monthValue
                        );

                WeekFields weekFields =
                        WeekFields.of(
                                Locale.getDefault()
                        );

                Map<Integer, BigDecimal>
                        weeklyData =
                        getExpensesForMonth(
                                user,
                                month
                        )
                                .stream()
                                .collect(
                                        Collectors.groupingBy(
                                                expense ->
                                                        expense
                                                                .getExpenseDate()
                                                                .get(
                                                                        weekFields
                                                                                .weekOfMonth()
                                                                ),

                                                LinkedHashMap::new,

                                                Collectors.reducing(
                                                        BigDecimal.ZERO,
                                                        Expense::getAmount,
                                                        BigDecimal::add
                                                )
                                        )
                                );

                /*
                * Always return Weeks 1-5 so the
                * chart stays stable even when a
                * selected month has no data.
                */
                List<WeeklyExpenseResponse>
                        response =
                        new ArrayList<>();

                for (
                        int week = 1;
                        week <= 5;
                        week++
                ) {

                response.add(
                        WeeklyExpenseResponse
                                .builder()
                                .week(
                                        "Week " +
                                                week
                                )
                                .totalExpense(
                                        weeklyData
                                                .getOrDefault(
                                                        week,
                                                        BigDecimal.ZERO
                                                )
                                )
                                .build()
                );
                }

                return response;
        }

        // ==========================================
        // RECENT TRANSACTIONS
        // ==========================================

        @Override
        public List<RecentTransactionResponse>
        getRecentTransactions(
                String monthValue
        ) {

                User user =
                        getCurrentUser();

                YearMonth month =
                        resolveMonth(
                                monthValue
                        );

                List<RecentTransactionResponse>
                        transactions =
                        new ArrayList<>();

                getExpensesForMonth(
                        user,
                        month
                )
                        .forEach(
                                expense ->
                                        transactions.add(

                                                RecentTransactionResponse
                                                        .builder()
                                                        .id(
                                                                expense.getId()
                                                        )
                                                        .transactionType(
                                                                "EXPENSE"
                                                        )
                                                        .amount(
                                                                expense.getAmount()
                                                        )
                                                        .category(
                                                                expense.getCategory()
                                                        )
                                                        .description(
                                                                expense.getDescription()
                                                        )
                                                        .date(
                                                                expense.getExpenseDate()
                                                        )
                                                        .build()
                                        )
                        );

                getIncomeForMonth(
                        user,
                        month
                )
                        .forEach(
                                income ->
                                        transactions.add(

                                                RecentTransactionResponse
                                                        .builder()
                                                        .id(
                                                                income.getId()
                                                        )
                                                        .transactionType(
                                                                "INCOME"
                                                        )
                                                        .amount(
                                                                income.getAmount()
                                                        )
                                                        .category(
                                                                income.getCategory()
                                                        )
                                                        .description(
                                                                income.getDescription()
                                                        )
                                                        .date(
                                                                income.getIncomeDate()
                                                        )
                                                        .build()
                                        )
                        );

                return transactions
                        .stream()
                        .sorted(
                                Comparator
                                        .comparing(
                                                RecentTransactionResponse::getDate
                                        )
                                        .reversed()
                        )
                        .limit(
                                10
                        )
                        .toList();
        }
        @Override
        public List<PaymentMethodBreakdownResponse>
        getPaymentMethodBreakdown(
                String monthValue
        ) {

        User user =
                getCurrentUser();

        YearMonth month =
                resolveMonth(
                        monthValue
                );

        List<Expense> expenses =
                getExpensesForMonth(
                        user,
                        month
                );

        Map<String, List<Expense>>
                groupedExpenses =
                expenses.stream()
                        .collect(
                                Collectors.groupingBy(
                                        expense -> {

                                                String paymentMode =
                                                        expense.getPaymentMode();

                                                if (
                                                        paymentMode == null ||
                                                        paymentMode.isBlank()
                                                ) {
                                                return "Other";
                                                }

                                                return paymentMode.trim();
                                        }
                                )
                        );

        return groupedExpenses
                .entrySet()
                .stream()
                .map(
                        entry -> {

                                BigDecimal amount =
                                        entry.getValue()
                                                .stream()
                                                .map(
                                                        Expense::getAmount
                                                )
                                                .reduce(
                                                        BigDecimal.ZERO,
                                                        BigDecimal::add
                                                );

                                return PaymentMethodBreakdownResponse
                                        .builder()
                                        .paymentMethod(
                                                entry.getKey()
                                        )
                                        .amount(
                                                amount
                                        )
                                        .transactionCount(
                                                (long)
                                                        entry
                                                                .getValue()
                                                                .size()
                                        )
                                        .build();
                        }
                )
                .sorted(
                        Comparator
                                .comparing(
                                        PaymentMethodBreakdownResponse::getAmount
                                )
                                .reversed()
                )
                .toList();
        }
}
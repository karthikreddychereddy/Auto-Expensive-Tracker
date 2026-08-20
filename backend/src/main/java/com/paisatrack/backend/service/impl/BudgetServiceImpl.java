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

import java.time.LocalDate;
import java.time.YearMonth;

import java.time.format.DateTimeParseException;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BudgetServiceImpl
        implements BudgetService {

        private final BudgetRepository
                budgetRepository;

        private final UserRepository
                userRepository;

        private final ExpenseRepository
                expenseRepository;

        // ==========================================
        // CREATE
        // ==========================================

        @Override
        public BudgetResponse createBudget(
                BudgetRequest request
        ) {

                User user =
                        getCurrentUser();

                Budget budget =
                        Budget.builder()

                                .user(user)

                                .category(
                                        request.getCategory()
                                )

                                .budgetAmount(
                                        request.getBudgetAmount()
                                )

                                .startDate(
                                        request.getStartDate()
                                )

                                .endDate(
                                        request.getEndDate()
                                )

                                .build();

                Budget savedBudget =
                        budgetRepository.save(
                                budget
                        );

                return mapBudget(
                        savedBudget
                );
        }

        // ==========================================
        // GET BUDGETS
        // ==========================================

        @Override
        public List<BudgetResponse>
        getAllBudgets(
                String month
        ) {

                User user =
                        getCurrentUser();

                List<Budget> budgets =
                        budgetRepository.findByUser(
                                user
                        );

                /*
                * Preserve compatibility:
                *
                * When no month is supplied,
                * return all user's budgets.
                */
                if (
                        month == null ||
                        month.isBlank()
                ) {

                return budgets
                        .stream()
                        .map(this::mapBudget)
                        .toList();
                }

                YearMonth selectedMonth =
                        parseMonth(
                                month
                        );

                LocalDate monthStart =
                        selectedMonth.atDay(
                                1
                        );

                LocalDate monthEnd =
                        selectedMonth.atEndOfMonth();

                return budgets
                        .stream()

                        /*
                        * A budget belongs to the month
                        * if its active period overlaps
                        * the selected month.
                        *
                        * budget.start <= monthEnd
                        * AND
                        * budget.end >= monthStart
                        */
                        .filter(
                                budget ->
                                        belongsToMonth(
                                                budget,
                                                monthStart,
                                                monthEnd
                                        )
                        )

                        .map(
                                this::mapBudget
                        )

                        .toList();
        }

        // ==========================================
        // GET BY ID
        // ==========================================

        @Override
        public BudgetResponse getBudgetById(
                Long id
        ) {

                User user =
                        getCurrentUser();

                Budget budget =
                        budgetRepository
                                .findById(id)

                                .orElseThrow(() ->
                                        new RuntimeException(
                                                "Budget not found"
                                        )
                                );

                verifyOwnership(
                        budget,
                        user
                );

                return mapBudget(
                        budget
                );
        }

        // ==========================================
        // UPDATE
        // ==========================================

        @Override
        public BudgetResponse updateBudget(
                Long id,
                BudgetRequest request
        ) {

                User user =
                        getCurrentUser();

                Budget budget =
                        budgetRepository
                                .findById(id)

                                .orElseThrow(() ->
                                        new RuntimeException(
                                                "Budget not found"
                                        )
                                );

                verifyOwnership(
                        budget,
                        user
                );

                budget.setCategory(
                        request.getCategory()
                );

                budget.setBudgetAmount(
                        request.getBudgetAmount()
                );

                budget.setStartDate(
                        request.getStartDate()
                );

                budget.setEndDate(
                        request.getEndDate()
                );

                Budget updated =
                        budgetRepository.save(
                                budget
                        );

                return mapBudget(
                        updated
                );
        }

        // ==========================================
        // DELETE
        // ==========================================

        @Override
        public void deleteBudget(
                Long id
        ) {

                User user =
                        getCurrentUser();

                Budget budget =
                        budgetRepository
                                .findById(id)

                                .orElseThrow(() ->
                                        new RuntimeException(
                                                "Budget not found"
                                        )
                                );

                verifyOwnership(
                        budget,
                        user
                );

                budgetRepository.delete(
                        budget
                );
        }

        // ==========================================
        // BUDGET STATUS
        // ==========================================

        @Override
        public List<BudgetStatusResponse>
        getBudgetStatus(
                String month
        ) {

                User user =
                        getCurrentUser();

                List<Budget> allBudgets =
                        budgetRepository.findByUser(
                                user
                        );

                List<Budget> budgets;

                LocalDate monthStart = null;
                LocalDate monthEnd = null;

                if (
                        month != null &&
                        !month.isBlank()
                ) {

                YearMonth selectedMonth =
                        parseMonth(
                                month
                        );

                monthStart =
                        selectedMonth.atDay(
                                1
                        );

                monthEnd =
                        selectedMonth
                                .atEndOfMonth();

                LocalDate finalMonthStart =
                        monthStart;

                LocalDate finalMonthEnd =
                        monthEnd;

                budgets =
                        allBudgets
                                .stream()

                                .filter(
                                        budget ->
                                                belongsToMonth(
                                                        budget,
                                                        finalMonthStart,
                                                        finalMonthEnd
                                                )
                                )

                                .toList();

                } else {

                budgets =
                        allBudgets;
                }

                List<BudgetStatusResponse>
                        response =
                        new ArrayList<>();

                for (
                        Budget budget :
                        budgets
                ) {

                /*
                * Calculate expense date range.
                *
                * Normally it is the budget's own
                * start/end date.
                *
                * When a selected month is supplied,
                * restrict calculations to the
                * intersection of:
                *
                * budget period
                * +
                * selected month.
                */

                LocalDate expenseStart =
                        budget.getStartDate();

                LocalDate expenseEnd =
                        budget.getEndDate();

                if (
                        monthStart != null &&
                        monthEnd != null
                ) {

                        if (
                                expenseStart == null ||
                                expenseStart.isBefore(
                                        monthStart
                                )
                        ) {
                        expenseStart =
                                monthStart;
                        }

                        if (
                                expenseEnd == null ||
                                expenseEnd.isAfter(
                                        monthEnd
                                )
                        ) {
                        expenseEnd =
                                monthEnd;
                        }
                }

                List<Expense> expenses =
                        expenseRepository
                                .findByUserAndCategoryAndExpenseDateBetween(
                                        user,
                                        budget.getCategory(),
                                        expenseStart,
                                        expenseEnd
                                );

                BigDecimal spent =
                        expenses
                                .stream()

                                .map(
                                        Expense::getAmount
                                )

                                .reduce(
                                        BigDecimal.ZERO,
                                        BigDecimal::add
                                );

                BigDecimal budgetAmount =
                        budget.getBudgetAmount() != null
                                ? budget.getBudgetAmount()
                                : BigDecimal.ZERO;

                BigDecimal remaining =
                        budgetAmount.subtract(
                                spent
                        );

                double percentage =
                        0;

                if (
                        budgetAmount.compareTo(
                                BigDecimal.ZERO
                        ) > 0
                ) {

                        percentage =
                                spent
                                        .multiply(
                                                BigDecimal.valueOf(
                                                        100
                                                )
                                        )

                                        .divide(
                                                budgetAmount,
                                                2,
                                                RoundingMode.HALF_UP
                                        )

                                        .doubleValue();
                }

                response.add(

                        BudgetStatusResponse
                                .builder()

                                .category(
                                        budget.getCategory()
                                )

                                .budgetAmount(
                                        budgetAmount
                                )

                                .spentAmount(
                                        spent
                                )

                                .remainingAmount(
                                        remaining
                                )

                                .percentageUsed(
                                        percentage
                                )

                                .build()
                );
                }

                return response;
        }

        // ==========================================
        // MONTH FILTER
        // ==========================================

        private boolean belongsToMonth(
                Budget budget,
                LocalDate monthStart,
                LocalDate monthEnd
        ) {

                LocalDate start =
                        budget.getStartDate();

                LocalDate end =
                        budget.getEndDate();

                /*
                * Defensive support in case an
                * older budget has missing dates.
                */
                if (
                        start == null &&
                        end == null
                ) {
                return true;
                }

                if (start == null) {
                return !end.isBefore(
                        monthStart
                );
                }

                if (end == null) {
                return !start.isAfter(
                        monthEnd
                );
                }

                return (
                        !start.isAfter(
                                monthEnd
                        )
                        &&
                        !end.isBefore(
                                monthStart
                        )
                );
        }

        // ==========================================
        // PARSE YYYY-MM
        // ==========================================

        private YearMonth parseMonth(
                String month
        ) {

                try {

                return YearMonth.parse(
                        month
                );

                } catch (
                        DateTimeParseException exception
                ) {

                throw new RuntimeException(
                        "Invalid month. Expected format: YYYY-MM"
                );
                }
        }

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
        // OWNERSHIP
        // ==========================================

        private void verifyOwnership(
                Budget budget,
                User user
        ) {

                if (
                        budget.getUser() == null ||
                        !budget
                                .getUser()
                                .getId()
                                .equals(
                                        user.getId()
                                )
                ) {

                throw new RuntimeException(
                        "Unauthorized"
                );
                }
        }

        // ==========================================
        // MAP RESPONSE
        // ==========================================

        private BudgetResponse mapBudget(
                Budget budget
        ) {

                return BudgetResponse
                        .builder()

                        .id(
                                budget.getId()
                        )

                        .category(
                                budget.getCategory()
                        )

                        .budgetAmount(
                                budget.getBudgetAmount()
                        )

                        .startDate(
                                budget.getStartDate()
                        )

                        .endDate(
                                budget.getEndDate()
                        )

                        .build();
        }
}
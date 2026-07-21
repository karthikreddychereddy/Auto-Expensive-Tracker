package com.paisatrack.backend.service.impl;

import com.paisatrack.backend.dto.ExpenseRequest;
import com.paisatrack.backend.dto.ExpenseResponse;
import com.paisatrack.backend.entity.Expense;
import com.paisatrack.backend.entity.User;
import com.paisatrack.backend.repository.ExpenseRepository;
import com.paisatrack.backend.repository.UserRepository;
import com.paisatrack.backend.service.ExpenseService;
import com.paisatrack.backend.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.YearMonth;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ExpenseServiceImpl implements ExpenseService {

    private final ExpenseRepository expenseRepository;
    private final UserRepository userRepository;

    @Override
    public ExpenseResponse addExpense(ExpenseRequest request) {

        String email = SecurityUtil.getCurrentUserEmail();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Expense expense = Expense.builder()
                .user(user)
                .amount(request.getAmount())
                .category(request.getCategory())
                .paymentMode(request.getPaymentMode())
                .description(request.getDescription())
                .merchant(request.getMerchant())
                .expenseDate(request.getExpenseDate())
                .source(request.getSource())
                .build();

        Expense savedExpense = expenseRepository.save(expense);

        return ExpenseResponse.builder()
                .id(savedExpense.getId())
                .amount(savedExpense.getAmount())
                .category(savedExpense.getCategory())
                .paymentMode(savedExpense.getPaymentMode())
                .description(savedExpense.getDescription())
                .merchant(savedExpense.getMerchant())
                .expenseDate(savedExpense.getExpenseDate())
                .transactionType(savedExpense.getTransactionType())
                .source(savedExpense.getSource())
                .build();
    }

    @Override
        public List<ExpenseResponse> getAllExpenses(String month) {

        String email = SecurityUtil.getCurrentUserEmail();
        System.out.println("Current User Email: " + email);

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Expense> expenses =
                expenseRepository.findByUser(user);

        if (month != null && !month.isBlank()) {

        YearMonth ym = YearMonth.parse(month);

        expenses = expenses.stream()
                .filter(e ->
                        YearMonth.from(e.getExpenseDate())
                                .equals(ym))
                .toList();
        }


        return expenses.stream()
                .map(expense -> ExpenseResponse.builder()
                        .id(expense.getId())
                        .amount(expense.getAmount())
                        .category(expense.getCategory())
                        .paymentMode(expense.getPaymentMode())
                        .description(expense.getDescription())
                        .merchant(expense.getMerchant())
                        .expenseDate(expense.getExpenseDate())
                        .transactionType(expense.getTransactionType())
                        .source(expense.getSource())
                        .build())           
                .toList();
    }

    @Override
    public ExpenseResponse getExpenseById(Long id) {

        String email = SecurityUtil.getCurrentUserEmail();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Expense expense = expenseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Expense not found"));

        if (!expense.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Access denied");
        }

        return ExpenseResponse.builder()
                .id(expense.getId())
                .amount(expense.getAmount())
                .category(expense.getCategory())
                .paymentMode(expense.getPaymentMode())
                .description(expense.getDescription())
                .merchant(expense.getMerchant())
                .expenseDate(expense.getExpenseDate())
                .transactionType(expense.getTransactionType())
                .source(expense.getSource())
                .build();
    }

    @Override
    public ExpenseResponse updateExpense(Long id, ExpenseRequest request) {

        String email = SecurityUtil.getCurrentUserEmail();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Expense expense = expenseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Expense not found"));

        if (!expense.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Access denied");
        }

        expense.setAmount(request.getAmount());
        expense.setCategory(request.getCategory());
        expense.setPaymentMode(request.getPaymentMode());
        expense.setDescription(request.getDescription());
        expense.setMerchant(request.getMerchant());
        expense.setExpenseDate(request.getExpenseDate());
        expense.setSource(request.getSource());

        Expense updatedExpense = expenseRepository.save(expense);

        return ExpenseResponse.builder()
                .id(updatedExpense.getId())
                .amount(updatedExpense.getAmount())
                .category(updatedExpense.getCategory())
                .paymentMode(updatedExpense.getPaymentMode())
                .description(updatedExpense.getDescription())
                .merchant(updatedExpense.getMerchant())
                .expenseDate(updatedExpense.getExpenseDate())
                .transactionType(updatedExpense.getTransactionType())
                .source(updatedExpense.getSource())
                .build();
    }

    @Override
    public void deleteExpense(Long id) {

        String email = SecurityUtil.getCurrentUserEmail();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Expense expense = expenseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Expense not found"));

        if (!expense.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Access denied");
        }

        expenseRepository.delete(expense);
    }
}
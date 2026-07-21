package com.paisatrack.backend.ai.context.model;

import java.math.BigDecimal;

public class TransactionSummaryContext {

    private Integer totalTransactions;
    private BigDecimal largestExpense;
    private BigDecimal largestIncome;
    private String latestExpenseCategory;
    private String latestIncomeSource;

    public TransactionSummaryContext() {
    }

    public TransactionSummaryContext(Integer totalTransactions,
                                     BigDecimal largestExpense,
                                     BigDecimal largestIncome,
                                     String latestExpenseCategory,
                                     String latestIncomeSource) {
        this.totalTransactions = totalTransactions;
        this.largestExpense = largestExpense;
        this.largestIncome = largestIncome;
        this.latestExpenseCategory = latestExpenseCategory;
        this.latestIncomeSource = latestIncomeSource;
    }

    public Integer getTotalTransactions() {
        return totalTransactions;
    }

    public void setTotalTransactions(Integer totalTransactions) {
        this.totalTransactions = totalTransactions;
    }

    public BigDecimal getLargestExpense() {
        return largestExpense;
    }

    public void setLargestExpense(BigDecimal largestExpense) {
        this.largestExpense = largestExpense;
    }

    public BigDecimal getLargestIncome() {
        return largestIncome;
    }

    public void setLargestIncome(BigDecimal largestIncome) {
        this.largestIncome = largestIncome;
    }

    public String getLatestExpenseCategory() {
        return latestExpenseCategory;
    }

    public void setLatestExpenseCategory(String latestExpenseCategory) {
        this.latestExpenseCategory = latestExpenseCategory;
    }

    public String getLatestIncomeSource() {
        return latestIncomeSource;
    }

    public void setLatestIncomeSource(String latestIncomeSource) {
        this.latestIncomeSource = latestIncomeSource;
    }
}
package com.paisatrack.backend.ai.context.model;

import java.math.BigDecimal;

public class ExpenseContext {

    private BigDecimal totalExpense;
    private BigDecimal averageDailyExpense;
    private String highestCategory;
    private BigDecimal highestCategoryAmount;
    private Integer totalTransactions;

    public ExpenseContext() {
    }

    public ExpenseContext(BigDecimal totalExpense,
                        BigDecimal averageDailyExpense,
                        String highestCategory,
                        BigDecimal highestCategoryAmount,
                        Integer totalTransactions) {

        this.totalExpense = totalExpense;
        this.averageDailyExpense = averageDailyExpense;
        this.highestCategory = highestCategory;
        this.highestCategoryAmount = highestCategoryAmount;
        this.totalTransactions = totalTransactions;
    }

    public BigDecimal getTotalExpense() {
        return totalExpense;
    }

    public void setTotalExpense(BigDecimal totalExpense) {
        this.totalExpense = totalExpense;
    }

    public BigDecimal getAverageDailyExpense() {
        return averageDailyExpense;
    }

    public void setAverageDailyExpense(BigDecimal averageDailyExpense) {
        this.averageDailyExpense = averageDailyExpense;
    }

    public String getHighestCategory() {
        return highestCategory;
    }

    public void setHighestCategory(String highestCategory) {
        this.highestCategory = highestCategory;
    }

    public BigDecimal getHighestCategoryAmount() {
        return highestCategoryAmount;
    }

    public void setHighestCategoryAmount(BigDecimal highestCategoryAmount) {
        this.highestCategoryAmount = highestCategoryAmount;
    }

    public Integer getTotalTransactions() {
        return totalTransactions;
    }

    public void setTotalTransactions(Integer totalTransactions) {
        this.totalTransactions = totalTransactions;
    }
}
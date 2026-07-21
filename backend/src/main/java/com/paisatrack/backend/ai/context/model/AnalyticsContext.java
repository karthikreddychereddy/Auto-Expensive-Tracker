package com.paisatrack.backend.ai.context.model;

import java.math.BigDecimal;

public class AnalyticsContext {

    private BigDecimal monthlyIncome;
    private BigDecimal monthlyExpense;
    private BigDecimal monthlySavings;
    private String highestExpenseCategory;
    private BigDecimal highestExpenseAmount;

    public AnalyticsContext() {
    }

    public AnalyticsContext(BigDecimal monthlyIncome,
                            BigDecimal monthlyExpense,
                            BigDecimal monthlySavings,
                            String highestExpenseCategory,
                            BigDecimal highestExpenseAmount) {
        this.monthlyIncome = monthlyIncome;
        this.monthlyExpense = monthlyExpense;
        this.monthlySavings = monthlySavings;
        this.highestExpenseCategory = highestExpenseCategory;
        this.highestExpenseAmount = highestExpenseAmount;
    }

    public BigDecimal getMonthlyIncome() {
        return monthlyIncome;
    }

    public void setMonthlyIncome(BigDecimal monthlyIncome) {
        this.monthlyIncome = monthlyIncome;
    }

    public BigDecimal getMonthlyExpense() {
        return monthlyExpense;
    }

    public void setMonthlyExpense(BigDecimal monthlyExpense) {
        this.monthlyExpense = monthlyExpense;
    }

    public BigDecimal getMonthlySavings() {
        return monthlySavings;
    }

    public void setMonthlySavings(BigDecimal monthlySavings) {
        this.monthlySavings = monthlySavings;
    }

    public String getHighestExpenseCategory() {
        return highestExpenseCategory;
    }

    public void setHighestExpenseCategory(String highestExpenseCategory) {
        this.highestExpenseCategory = highestExpenseCategory;
    }

    public BigDecimal getHighestExpenseAmount() {
        return highestExpenseAmount;
    }

    public void setHighestExpenseAmount(BigDecimal highestExpenseAmount) {
        this.highestExpenseAmount = highestExpenseAmount;
    }
}
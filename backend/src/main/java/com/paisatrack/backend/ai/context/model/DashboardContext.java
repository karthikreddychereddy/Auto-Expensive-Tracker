package com.paisatrack.backend.ai.context.model;

import java.math.BigDecimal;

public class DashboardContext {

    private BigDecimal totalIncome;
    private BigDecimal totalExpense;
    private BigDecimal totalSavings;
    private BigDecimal currentBalance;
    private Integer financialHealth;

    public DashboardContext() {
    }

    public DashboardContext(BigDecimal totalIncome,
                            BigDecimal totalExpense,
                            BigDecimal totalSavings,
                            BigDecimal currentBalance,
                            Integer financialHealth) {

        this.totalIncome = totalIncome;
        this.totalExpense = totalExpense;
        this.totalSavings = totalSavings;
        this.currentBalance = currentBalance;
        this.financialHealth = financialHealth;
    }

    public BigDecimal getTotalIncome() {
        return totalIncome;
    }

    public void setTotalIncome(BigDecimal totalIncome) {
        this.totalIncome = totalIncome;
    }

    public BigDecimal getTotalExpense() {
        return totalExpense;
    }

    public void setTotalExpense(BigDecimal totalExpense) {
        this.totalExpense = totalExpense;
    }

    public BigDecimal getTotalSavings() {
        return totalSavings;
    }

    public void setTotalSavings(BigDecimal totalSavings) {
        this.totalSavings = totalSavings;
    }

    public BigDecimal getCurrentBalance() {
        return currentBalance;
    }

    public void setCurrentBalance(BigDecimal currentBalance) {
        this.currentBalance = currentBalance;
    }

    public Integer getFinancialHealth() {
        return financialHealth;
    }

    public void setFinancialHealth(Integer financialHealth) {
        this.financialHealth = financialHealth;
    }
}
package com.paisatrack.backend.ai.context.model;

import java.math.BigDecimal;

public class IncomeContext {

    private BigDecimal totalIncome;
    private BigDecimal averageMonthlyIncome;
    private String primaryIncomeSource;
    private Integer totalIncomeEntries;

    public IncomeContext() {
    }

    public IncomeContext(BigDecimal totalIncome,
                         BigDecimal averageMonthlyIncome,
                         String primaryIncomeSource,
                         Integer totalIncomeEntries) {
        this.totalIncome = totalIncome;
        this.averageMonthlyIncome = averageMonthlyIncome;
        this.primaryIncomeSource = primaryIncomeSource;
        this.totalIncomeEntries = totalIncomeEntries;
    }

    public BigDecimal getTotalIncome() {
        return totalIncome;
    }

    public void setTotalIncome(BigDecimal totalIncome) {
        this.totalIncome = totalIncome;
    }

    public BigDecimal getAverageMonthlyIncome() {
        return averageMonthlyIncome;
    }

    public void setAverageMonthlyIncome(BigDecimal averageMonthlyIncome) {
        this.averageMonthlyIncome = averageMonthlyIncome;
    }

    public String getPrimaryIncomeSource() {
        return primaryIncomeSource;
    }

    public void setPrimaryIncomeSource(String primaryIncomeSource) {
        this.primaryIncomeSource = primaryIncomeSource;
    }

    public Integer getTotalIncomeEntries() {
        return totalIncomeEntries;
    }

    public void setTotalIncomeEntries(Integer totalIncomeEntries) {
        this.totalIncomeEntries = totalIncomeEntries;
    }
}
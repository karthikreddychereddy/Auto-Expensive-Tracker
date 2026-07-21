package com.paisatrack.backend.ai.context.model;

import java.math.BigDecimal;

public class SavingsContext {

    private BigDecimal totalSavings;
    private BigDecimal monthlySavings;
    private BigDecimal savingsGrowth;
    private Integer savingsEntries;

    public SavingsContext() {
    }

    public SavingsContext(BigDecimal totalSavings,
                          BigDecimal monthlySavings,
                          BigDecimal savingsGrowth,
                          Integer savingsEntries) {
        this.totalSavings = totalSavings;
        this.monthlySavings = monthlySavings;
        this.savingsGrowth = savingsGrowth;
        this.savingsEntries = savingsEntries;
    }

    public BigDecimal getTotalSavings() {
        return totalSavings;
    }

    public void setTotalSavings(BigDecimal totalSavings) {
        this.totalSavings = totalSavings;
    }

    public BigDecimal getMonthlySavings() {
        return monthlySavings;
    }

    public void setMonthlySavings(BigDecimal monthlySavings) {
        this.monthlySavings = monthlySavings;
    }

    public BigDecimal getSavingsGrowth() {
        return savingsGrowth;
    }

    public void setSavingsGrowth(BigDecimal savingsGrowth) {
        this.savingsGrowth = savingsGrowth;
    }

    public Integer getSavingsEntries() {
        return savingsEntries;
    }

    public void setSavingsEntries(Integer savingsEntries) {
        this.savingsEntries = savingsEntries;
    }
}
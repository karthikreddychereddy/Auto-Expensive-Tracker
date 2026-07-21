package com.paisatrack.backend.ai.context.model;

import java.math.BigDecimal;

public class BudgetContext {

    private Integer totalBudgets;
    private Integer exceededBudgets;
    private Integer activeBudgets;
    private BigDecimal totalBudgetAmount;
    private BigDecimal totalBudgetUsed;

    public BudgetContext() {
    }

    public BudgetContext(Integer totalBudgets,
                         Integer exceededBudgets,
                         Integer activeBudgets,
                         BigDecimal totalBudgetAmount,
                         BigDecimal totalBudgetUsed) {
        this.totalBudgets = totalBudgets;
        this.exceededBudgets = exceededBudgets;
        this.activeBudgets = activeBudgets;
        this.totalBudgetAmount = totalBudgetAmount;
        this.totalBudgetUsed = totalBudgetUsed;
    }

    public Integer getTotalBudgets() {
        return totalBudgets;
    }

    public void setTotalBudgets(Integer totalBudgets) {
        this.totalBudgets = totalBudgets;
    }

    public Integer getExceededBudgets() {
        return exceededBudgets;
    }

    public void setExceededBudgets(Integer exceededBudgets) {
        this.exceededBudgets = exceededBudgets;
    }

    public Integer getActiveBudgets() {
        return activeBudgets;
    }

    public void setActiveBudgets(Integer activeBudgets) {
        this.activeBudgets = activeBudgets;
    }

    public BigDecimal getTotalBudgetAmount() {
        return totalBudgetAmount;
    }

    public void setTotalBudgetAmount(BigDecimal totalBudgetAmount) {
        this.totalBudgetAmount = totalBudgetAmount;
    }

    public BigDecimal getTotalBudgetUsed() {
        return totalBudgetUsed;
    }

    public void setTotalBudgetUsed(BigDecimal totalBudgetUsed) {
        this.totalBudgetUsed = totalBudgetUsed;
    }
}
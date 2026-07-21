package com.paisatrack.backend.ai.context.model;

public class FinancialContext {

    private UserProfileContext userProfile;
    private DashboardContext dashboard;
    private ExpenseContext expense;
    private IncomeContext income;
    private BudgetContext budget;
    private SavingsContext savings;
    private GoalContext goal;
    private FinancialHealthContext financialHealth;
    private AnalyticsContext analytics;
    private TransactionSummaryContext transactions;

    public FinancialContext() {
    }

    public UserProfileContext getUserProfile() {
        return userProfile;
    }

    public void setUserProfile(UserProfileContext userProfile) {
        this.userProfile = userProfile;
    }

    public DashboardContext getDashboard() {
        return dashboard;
    }

    public void setDashboard(DashboardContext dashboard) {
        this.dashboard = dashboard;
    }

    public ExpenseContext getExpense() {
        return expense;
    }

    public void setExpense(ExpenseContext expense) {
        this.expense = expense;
    }

    public IncomeContext getIncome() {
        return income;
    }

    public void setIncome(IncomeContext income) {
        this.income = income;
    }

    public BudgetContext getBudget() {
        return budget;
    }

    public void setBudget(BudgetContext budget) {
        this.budget = budget;
    }

    public SavingsContext getSavings() {
        return savings;
    }

    public void setSavings(SavingsContext savings) {
        this.savings = savings;
    }

    public GoalContext getGoal() {
        return goal;
    }

    public void setGoal(GoalContext goal) {
        this.goal = goal;
    }

    public FinancialHealthContext getFinancialHealth() {
        return financialHealth;
    }

    public void setFinancialHealth(FinancialHealthContext financialHealth) {
        this.financialHealth = financialHealth;
    }

    public AnalyticsContext getAnalytics() {
        return analytics;
    }

    public void setAnalytics(AnalyticsContext analytics) {
        this.analytics = analytics;
    }

    public TransactionSummaryContext getTransactions() {
        return transactions;
    }

    public void setTransactions(TransactionSummaryContext transactions) {
        this.transactions = transactions;
    }
}
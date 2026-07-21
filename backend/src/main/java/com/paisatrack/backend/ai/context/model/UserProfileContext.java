package com.paisatrack.backend.ai.context.model;

public class UserProfileContext {

    private Long userId;
    private String name;
    private String email;
    private String phone;
    private Double monthlyIncome;
    private Double savingsGoal;
    private Integer financialHealth;

    public UserProfileContext() {
    }

    public UserProfileContext(Long userId,
                              String name,
                              String email,
                              String phone,
                              Double monthlyIncome,
                              Double savingsGoal,
                              Integer financialHealth) {

        this.userId = userId;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.monthlyIncome = monthlyIncome;
        this.savingsGoal = savingsGoal;
        this.financialHealth = financialHealth;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Double getMonthlyIncome() {
        return monthlyIncome;
    }

    public void setMonthlyIncome(Double monthlyIncome) {
        this.monthlyIncome = monthlyIncome;
    }

    public Double getSavingsGoal() {
        return savingsGoal;
    }

    public void setSavingsGoal(Double savingsGoal) {
        this.savingsGoal = savingsGoal;
    }

    public Integer getFinancialHealth() {
        return financialHealth;
    }

    public void setFinancialHealth(Integer financialHealth) {
        this.financialHealth = financialHealth;
    }
}
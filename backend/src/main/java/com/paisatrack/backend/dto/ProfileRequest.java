package com.paisatrack.backend.dto;

public class ProfileRequest {

    private String name;
    private String email;
    private String phone;
    private String photo;
    private Double monthlyIncome;
    private Double savingsGoal;
    private Integer financialHealth;

    public ProfileRequest() {
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

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
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
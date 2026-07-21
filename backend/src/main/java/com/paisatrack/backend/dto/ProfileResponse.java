package com.paisatrack.backend.dto;

public class ProfileResponse {

    private Long id;
    private String name;
    private String email;
    private String phone;
    private String photo;
    private Double monthlyIncome;
    private Double savingsGoal;
    private Integer financialHealth;

    public ProfileResponse() {
    }

    public ProfileResponse(
            Long id,
            String name,
            String email,
            String phone,
            String photo,
            Double monthlyIncome,
            Double savingsGoal,
            Integer financialHealth
    ) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.photo = photo;
        this.monthlyIncome = monthlyIncome;
        this.savingsGoal = savingsGoal;
        this.financialHealth = financialHealth;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getPhone() {
        return phone;
    }

    public String getPhoto() {
        return photo;
    }

    public Double getMonthlyIncome() {
        return monthlyIncome;
    }

    public Double getSavingsGoal() {
        return savingsGoal;
    }

    public Integer getFinancialHealth() {
        return financialHealth;
    }
}
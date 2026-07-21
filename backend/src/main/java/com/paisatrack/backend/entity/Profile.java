package com.paisatrack.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "profiles")
public class Profile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    private String phone;

    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String photo;

    private Double monthlyIncome;

    private Double savingsGoal;

    private Integer financialHealth;

    public Profile() {
    }

    public Profile(
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

    public void setId(Long id) {
        this.id = id;
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
package com.paisatrack.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "expenses")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Expense {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private BigDecimal amount;

    @Column(nullable = false)
    private String category;

    @Column(nullable = false)
    private String paymentMode;

    @Column(nullable = false)
    private String description;

    private String merchant;

    @Column(nullable = false)
    private LocalDate expenseDate;

    @Column(nullable = false)
    private String transactionType;

    @Column(nullable = false)
    private String source;

    private String receiptImage;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @PrePersist
    public void onCreate() {

        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();

        if (transactionType == null)
            transactionType = "EXPENSE";

        if (source == null)
            source = "MANUAL";
    }

    @PreUpdate
    public void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
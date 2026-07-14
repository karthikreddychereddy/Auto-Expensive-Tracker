package com.paisatrack.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "savings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Savings {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private BigDecimal amount;

    @Column(nullable = false)
    private String source;

    private String description;

    @Column(nullable = false)
    private LocalDate savingDate;
}
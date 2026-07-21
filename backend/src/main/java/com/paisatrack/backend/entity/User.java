package com.paisatrack.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    private String phoneNumber;

    @Column(columnDefinition = "LONGTEXT")
    private String profileImage;

    @Column(nullable = false)
    private String currency;

    @Column(nullable = false)
    private String language;

    @Column(nullable = false)
    private String role;

    @Column(nullable = false)
    private Boolean enabled;

    @Column(nullable = false)
    private Boolean emailVerified;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @PrePersist
    public void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();

        if (currency == null)
            currency = "INR";

        if (language == null)
            language = "English";

        if (role == null)
            role = "USER";

        if (enabled == null)
            enabled = true;

        if (emailVerified == null)
            emailVerified = false;
    }

    @PreUpdate
    public void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
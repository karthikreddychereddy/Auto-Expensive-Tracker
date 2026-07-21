package com.paisatrack.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalTime;

@Entity
@Table(name = "notification_settings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NotificationSetting {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "user_id",
            nullable = false,
            unique = true
    )
    private User user;

    @Column(nullable = false)
    private LocalTime morningReminderTime;

    @Column(nullable = false)
    private LocalTime afternoonReminderTime;

    @Column(nullable = false)
    private LocalTime eveningReminderTime;

    @Column(nullable = false)
    private LocalTime nightReminderTime;

    @Builder.Default
    @Column(nullable = false)
    private Boolean enabled = true;

    @PrePersist
    public void onCreate() {

        if (morningReminderTime == null) {
            morningReminderTime = LocalTime.of(9, 0);
        }

        if (afternoonReminderTime == null) {
            afternoonReminderTime = LocalTime.of(13, 0);
        }

        if (eveningReminderTime == null) {
            eveningReminderTime = LocalTime.of(18, 0);
        }

        if (nightReminderTime == null) {
            nightReminderTime = LocalTime.of(22, 0);
        }

        if (enabled == null) {
            enabled = true;
        }
    }
}
package com.paisatrack.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "settings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Settings {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    private String currency;

    private String language;

    private Integer budgetWarning;

    private Integer budgetCritical;

    private Boolean budgetAlerts;

    private Boolean dailyReminder;

    private Boolean monthlyReport;

    private Boolean goalReminder;

    private Boolean aiSuggestions;

    private Boolean smartSuggestions;

    private Boolean weeklySummary;

    private Boolean aiInsights;

    private Boolean receiptEnabled;

    private Boolean autoCrop;

    private Boolean autoCategorize;

    private Boolean highQuality;

    private Boolean saveImages;

    private Boolean smsTracking;

    private Boolean autoExpense;

    private Boolean instantNotification;

    private Boolean syncHistory;

    private Boolean bankMessagesOnly;

    private Boolean autoBackup;

    private String backupFrequency;
}
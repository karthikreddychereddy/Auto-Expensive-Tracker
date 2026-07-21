package com.paisatrack.backend.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SettingsResponse {

    private Long id;

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
package com.paisatrack.backend.service.impl;

import com.paisatrack.backend.dto.ChangePasswordRequest;
import com.paisatrack.backend.dto.ChangePasswordResponse;
import com.paisatrack.backend.dto.SettingsRequest;
import com.paisatrack.backend.dto.SettingsResponse;
import com.paisatrack.backend.entity.NotificationSetting;
import com.paisatrack.backend.entity.Settings;
import com.paisatrack.backend.entity.User;
import com.paisatrack.backend.repository.NotificationSettingRepository;
import com.paisatrack.backend.repository.SettingsRepository;
import com.paisatrack.backend.repository.UserRepository;
import com.paisatrack.backend.service.SettingsService;
import com.paisatrack.backend.util.SecurityUtil;

import lombok.RequiredArgsConstructor;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalTime;

@Service
@RequiredArgsConstructor
@Transactional
public class SettingsServiceImpl implements SettingsService {

    private final SettingsRepository settingsRepository;

    private final NotificationSettingRepository
            notificationSettingRepository;

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    // ==========================================
    // Current User
    // ==========================================

    private User getCurrentUser() {
        String email =
                SecurityUtil.getCurrentUserEmail();

        return userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found"
                        )
                );
    }

    // ==========================================
    // Settings
    // ==========================================

    private Settings getOrCreateSettings(
            User user
    ) {
        return settingsRepository
                .findByUser(user)
                .orElseGet(() -> {

                    Settings settings =
                            Settings.builder()
                                    .user(user)

                                    .currency("INR")
                                    .language("English")

                                    .budgetWarning(70)
                                    .budgetCritical(90)

                                    .budgetAlerts(true)
                                    .dailyReminder(true)
                                    .monthlyReport(true)
                                    .goalReminder(true)
                                    .aiSuggestions(true)

                                    .smartSuggestions(true)
                                    .weeklySummary(true)
                                    .aiInsights(true)

                                    .receiptEnabled(true)
                                    .autoCrop(true)
                                    .autoCategorize(true)
                                    .highQuality(true)
                                    .saveImages(false)

                                    /*
                                     * Kept in backend for compatibility.
                                     *
                                     * SMS and backup sections can be
                                     * hidden from the website Settings UI
                                     * until those features are implemented.
                                     */
                                    .smsTracking(true)
                                    .autoExpense(true)
                                    .instantNotification(true)
                                    .syncHistory(false)
                                    .bankMessagesOnly(true)

                                    .autoBackup(true)
                                    .backupFrequency("Daily")

                                    .build();

                    Settings saved =
                            settingsRepository.save(
                                    settings
                            );

                    /*
                     * Create reminder settings at the
                     * same time so both systems start
                     * synchronized.
                     */
                    getOrCreateNotificationSetting(
                            user,
                            true
                    );

                    return saved;
                });
    }

    // ==========================================
    // Notification Reminder Settings
    // ==========================================

    private NotificationSetting
    getOrCreateNotificationSetting(
            User user,
            Boolean enabled
    ) {
        return notificationSettingRepository
                .findByUser(user)
                .orElseGet(() ->
                        notificationSettingRepository
                                .save(
                                        NotificationSetting.builder()
                                                .user(user)
                                                .enabled(
                                                        enabled != null
                                                                ? enabled
                                                                : true
                                                )
                                                .morningReminderTime(
                                                        LocalTime.of(
                                                                9,
                                                                0
                                                        )
                                                )
                                                .afternoonReminderTime(
                                                        LocalTime.of(
                                                                13,
                                                                0
                                                        )
                                                )
                                                .eveningReminderTime(
                                                        LocalTime.of(
                                                                18,
                                                                0
                                                        )
                                                )
                                                .nightReminderTime(
                                                        LocalTime.of(
                                                                22,
                                                                0
                                                        )
                                                )
                                                .build()
                                )
                );
    }

    // ==========================================
    // Response Mapping
    // ==========================================

    private SettingsResponse map(
            Settings settings
    ) {
        return SettingsResponse.builder()
                .id(
                        settings.getId()
                )

                .currency(
                        settings.getCurrency()
                )

                .language(
                        settings.getLanguage()
                )

                .budgetWarning(
                        settings.getBudgetWarning()
                )

                .budgetCritical(
                        settings.getBudgetCritical()
                )

                .budgetAlerts(
                        settings.getBudgetAlerts()
                )

                .dailyReminder(
                        settings.getDailyReminder()
                )

                .monthlyReport(
                        settings.getMonthlyReport()
                )

                .goalReminder(
                        settings.getGoalReminder()
                )

                .aiSuggestions(
                        settings.getAiSuggestions()
                )

                .smartSuggestions(
                        settings.getSmartSuggestions()
                )

                .weeklySummary(
                        settings.getWeeklySummary()
                )

                .aiInsights(
                        settings.getAiInsights()
                )

                .receiptEnabled(
                        settings.getReceiptEnabled()
                )

                .autoCrop(
                        settings.getAutoCrop()
                )

                .autoCategorize(
                        settings.getAutoCategorize()
                )

                .highQuality(
                        settings.getHighQuality()
                )

                .saveImages(
                        settings.getSaveImages()
                )

                .smsTracking(
                        settings.getSmsTracking()
                )

                .autoExpense(
                        settings.getAutoExpense()
                )

                .instantNotification(
                        settings.getInstantNotification()
                )

                .syncHistory(
                        settings.getSyncHistory()
                )

                .bankMessagesOnly(
                        settings.getBankMessagesOnly()
                )

                .autoBackup(
                        settings.getAutoBackup()
                )

                .backupFrequency(
                        settings.getBackupFrequency()
                )

                .build();
    }

    // ==========================================
    // GET SETTINGS
    // ==========================================

    @Override
    public SettingsResponse getSettings() {
        User user =
                getCurrentUser();

        Settings settings =
                getOrCreateSettings(
                        user
                );

        /*
         * Make sure reminder settings exist.
         */
        getOrCreateNotificationSetting(
                user,
                settings.getDailyReminder()
        );

        return map(
                settings
        );
    }

    // ==========================================
    // UPDATE SETTINGS
    // ==========================================

    @Override
    public SettingsResponse updateSettings(
            SettingsRequest request
    ) {
        User user =
                getCurrentUser();

        Settings settings =
                getOrCreateSettings(
                        user
                );

        // ------------------------------------------
        // Currency / Language
        // ------------------------------------------

        if (
                request.getCurrency() != null
        ) {
            settings.setCurrency(
                    request.getCurrency()
            );
        }

        if (
                request.getLanguage() != null
        ) {
            settings.setLanguage(
                    request.getLanguage()
            );
        }

        // ------------------------------------------
        // Budget Preferences
        // ------------------------------------------

        if (
                request.getBudgetWarning() != null
        ) {
            int warning =
                    request.getBudgetWarning();

            if (
                    warning < 1 ||
                    warning > 100
            ) {
                throw new IllegalArgumentException(
                        "Budget warning must be between 1 and 100."
                );
            }

            settings.setBudgetWarning(
                    warning
            );
        }

        if (
                request.getBudgetCritical() != null
        ) {
            int critical =
                    request.getBudgetCritical();

            if (
                    critical < 1 ||
                    critical > 100
            ) {
                throw new IllegalArgumentException(
                        "Budget critical threshold must be between 1 and 100."
                );
            }

            settings.setBudgetCritical(
                    critical
            );
        }

        /*
         * Critical should not be lower
         * than warning.
         */
        if (
                settings.getBudgetWarning() != null &&
                settings.getBudgetCritical() != null &&
                settings.getBudgetCritical()
                        <
                        settings.getBudgetWarning()
        ) {
            throw new IllegalArgumentException(
                    "Critical budget threshold cannot be lower than warning threshold."
            );
        }

        // ------------------------------------------
        // Notification Preferences
        // ------------------------------------------

        if (
                request.getBudgetAlerts() != null
        ) {
            settings.setBudgetAlerts(
                    request.getBudgetAlerts()
            );
        }

        if (
                request.getDailyReminder() != null
        ) {
            settings.setDailyReminder(
                    request.getDailyReminder()
            );

            /*
             * IMPORTANT:
             *
             * Main Settings Daily Reminder
             * and NotificationSetting.enabled
             * must always remain synchronized.
             */
            NotificationSetting
                    reminderSetting =
                    getOrCreateNotificationSetting(
                            user,
                            request.getDailyReminder()
                    );

            reminderSetting.setEnabled(
                    request.getDailyReminder()
            );

            notificationSettingRepository.save(
                    reminderSetting
            );
        }

        if (
                request.getMonthlyReport() != null
        ) {
            settings.setMonthlyReport(
                    request.getMonthlyReport()
            );
        }

        if (
                request.getGoalReminder() != null
        ) {
            settings.setGoalReminder(
                    request.getGoalReminder()
            );
        }

        if (
                request.getAiSuggestions() != null
        ) {
            settings.setAiSuggestions(
                    request.getAiSuggestions()
            );
        }

        // ------------------------------------------
        // AI Preferences
        // ------------------------------------------

        if (
                request.getSmartSuggestions() != null
        ) {
            settings.setSmartSuggestions(
                    request.getSmartSuggestions()
            );
        }

        if (
                request.getWeeklySummary() != null
        ) {
            settings.setWeeklySummary(
                    request.getWeeklySummary()
            );
        }

        if (
                request.getAiInsights() != null
        ) {
            settings.setAiInsights(
                    request.getAiInsights()
            );
        }

        // ------------------------------------------
        // Receipt Scanner
        // ------------------------------------------

        if (
                request.getReceiptEnabled() != null
        ) {
            settings.setReceiptEnabled(
                    request.getReceiptEnabled()
            );
        }

        if (
                request.getAutoCrop() != null
        ) {
            settings.setAutoCrop(
                    request.getAutoCrop()
            );
        }

        if (
                request.getAutoCategorize() != null
        ) {
            settings.setAutoCategorize(
                    request.getAutoCategorize()
            );
        }

        if (
                request.getHighQuality() != null
        ) {
            settings.setHighQuality(
                    request.getHighQuality()
            );
        }

        if (
                request.getSaveImages() != null
        ) {
            settings.setSaveImages(
                    request.getSaveImages()
            );
        }

        // ------------------------------------------
        // SMS
        //
        // Kept for compatibility.
        // ------------------------------------------

        if (
                request.getSmsTracking() != null
        ) {
            settings.setSmsTracking(
                    request.getSmsTracking()
            );
        }

        if (
                request.getAutoExpense() != null
        ) {
            settings.setAutoExpense(
                    request.getAutoExpense()
            );
        }

        if (
                request.getInstantNotification()
                        != null
        ) {
            settings.setInstantNotification(
                    request.getInstantNotification()
            );
        }

        if (
                request.getSyncHistory() != null
        ) {
            settings.setSyncHistory(
                    request.getSyncHistory()
            );
        }

        if (
                request.getBankMessagesOnly()
                        != null
        ) {
            settings.setBankMessagesOnly(
                    request.getBankMessagesOnly()
            );
        }

        // ------------------------------------------
        // Backup
        //
        // Kept for compatibility.
        // ------------------------------------------

        if (
                request.getAutoBackup() != null
        ) {
            settings.setAutoBackup(
                    request.getAutoBackup()
            );
        }

        if (
                request.getBackupFrequency() != null
        ) {
            settings.setBackupFrequency(
                    request.getBackupFrequency()
            );
        }

        Settings saved =
                settingsRepository.save(
                        settings
                );

        return map(
                saved
        );
    }

    // ==========================================
    // CHANGE PASSWORD
    // ==========================================

    @Override
    public ChangePasswordResponse changePassword(
            ChangePasswordRequest request
    ) {
        User user =
                getCurrentUser();

        if (
                request.getCurrentPassword() == null ||
                request.getCurrentPassword()
                        .isBlank()
        ) {
            return ChangePasswordResponse.builder()
                    .success(false)
                    .message(
                            "Current password is required."
                    )
                    .build();
        }

        if (
                request.getNewPassword() == null ||
                request.getNewPassword()
                        .isBlank()
        ) {
            return ChangePasswordResponse.builder()
                    .success(false)
                    .message(
                            "New password is required."
                    )
                    .build();
        }

        if (
                !passwordEncoder.matches(
                        request.getCurrentPassword(),
                        user.getPassword()
                )
        ) {
            return ChangePasswordResponse.builder()
                    .success(false)
                    .message(
                            "Current password is incorrect."
                    )
                    .build();
        }

        if (
                request.getNewPassword()
                        .length() < 8
        ) {
            return ChangePasswordResponse.builder()
                    .success(false)
                    .message(
                            "New password must contain at least 8 characters."
                    )
                    .build();
        }

        if (
                passwordEncoder.matches(
                        request.getNewPassword(),
                        user.getPassword()
                )
        ) {
            return ChangePasswordResponse.builder()
                    .success(false)
                    .message(
                            "New password must be different from the current password."
                    )
                    .build();
        }

        user.setPassword(
                passwordEncoder.encode(
                        request.getNewPassword()
                )
        );

        userRepository.save(
                user
        );

        return ChangePasswordResponse.builder()
                .success(true)
                .message(
                        "Password changed successfully."
                )
                .build();
    }
}
package com.paisatrack.backend.service.impl;

import com.paisatrack.backend.dto.ChangePasswordRequest;
import com.paisatrack.backend.dto.ChangePasswordResponse;
import com.paisatrack.backend.dto.SettingsRequest;
import com.paisatrack.backend.dto.SettingsResponse;
import com.paisatrack.backend.entity.Settings;
import com.paisatrack.backend.entity.User;
import com.paisatrack.backend.repository.SettingsRepository;
import com.paisatrack.backend.repository.UserRepository;
import com.paisatrack.backend.service.SettingsService;
import com.paisatrack.backend.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SettingsServiceImpl implements SettingsService {

    private final SettingsRepository settingsRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    private User getCurrentUser() {

        String email = SecurityUtil.getCurrentUserEmail();

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));
    }

    private Settings getOrCreateSettings(User user) {

        return settingsRepository.findByUser(user)
                .orElseGet(() -> {

                    Settings settings = Settings.builder()
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
                            .smsTracking(true)
                            .autoExpense(true)
                            .instantNotification(true)
                            .syncHistory(false)
                            .bankMessagesOnly(true)
                            .autoBackup(true)
                            .backupFrequency("Daily")
                            .build();

                    return settingsRepository.save(settings);
                });
    }

    private SettingsResponse map(Settings settings) {

        return SettingsResponse.builder()
                .id(settings.getId())
                .currency(settings.getCurrency())
                .language(settings.getLanguage())
                .budgetWarning(settings.getBudgetWarning())
                .budgetCritical(settings.getBudgetCritical())
                .budgetAlerts(settings.getBudgetAlerts())
                .dailyReminder(settings.getDailyReminder())
                .monthlyReport(settings.getMonthlyReport())
                .goalReminder(settings.getGoalReminder())
                .aiSuggestions(settings.getAiSuggestions())
                .smartSuggestions(settings.getSmartSuggestions())
                .weeklySummary(settings.getWeeklySummary())
                .aiInsights(settings.getAiInsights())
                .receiptEnabled(settings.getReceiptEnabled())
                .autoCrop(settings.getAutoCrop())
                .autoCategorize(settings.getAutoCategorize())
                .highQuality(settings.getHighQuality())
                .saveImages(settings.getSaveImages())
                .smsTracking(settings.getSmsTracking())
                .autoExpense(settings.getAutoExpense())
                .instantNotification(settings.getInstantNotification())
                .syncHistory(settings.getSyncHistory())
                .bankMessagesOnly(settings.getBankMessagesOnly())
                .autoBackup(settings.getAutoBackup())
                .backupFrequency(settings.getBackupFrequency())
                .build();
    }
        @Override
    public SettingsResponse getSettings() {

        User user = getCurrentUser();

        Settings settings = getOrCreateSettings(user);

        return map(settings);
    }

    @Override
    public SettingsResponse updateSettings(SettingsRequest request) {

        User user = getCurrentUser();

        Settings settings = getOrCreateSettings(user);

        settings.setCurrency(request.getCurrency());
        settings.setLanguage(request.getLanguage());

        settings.setBudgetWarning(request.getBudgetWarning());
        settings.setBudgetCritical(request.getBudgetCritical());

        settings.setBudgetAlerts(request.getBudgetAlerts());
        settings.setDailyReminder(request.getDailyReminder());
        settings.setMonthlyReport(request.getMonthlyReport());
        settings.setGoalReminder(request.getGoalReminder());

        settings.setAiSuggestions(request.getAiSuggestions());
        settings.setSmartSuggestions(request.getSmartSuggestions());
        settings.setWeeklySummary(request.getWeeklySummary());
        settings.setAiInsights(request.getAiInsights());

        settings.setReceiptEnabled(request.getReceiptEnabled());
        settings.setAutoCrop(request.getAutoCrop());
        settings.setAutoCategorize(request.getAutoCategorize());
        settings.setHighQuality(request.getHighQuality());
        settings.setSaveImages(request.getSaveImages());

        settings.setSmsTracking(request.getSmsTracking());
        settings.setAutoExpense(request.getAutoExpense());
        settings.setInstantNotification(request.getInstantNotification());
        settings.setSyncHistory(request.getSyncHistory());
        settings.setBankMessagesOnly(request.getBankMessagesOnly());

        settings.setAutoBackup(request.getAutoBackup());
        settings.setBackupFrequency(request.getBackupFrequency());

        settingsRepository.save(settings);

        return map(settings);
    }

    @Override
    public ChangePasswordResponse changePassword(
            ChangePasswordRequest request) {

        User user = getCurrentUser();

        if (!passwordEncoder.matches(
                request.getCurrentPassword(),
                user.getPassword())) {

            return ChangePasswordResponse.builder()
                    .success(false)
                    .message("Current password is incorrect.")
                    .build();
        }

        user.setPassword(
                passwordEncoder.encode(
                        request.getNewPassword()));

        userRepository.save(user);

        return ChangePasswordResponse.builder()
                .success(true)
                .message("Password changed successfully.")
                .build();
    }
}
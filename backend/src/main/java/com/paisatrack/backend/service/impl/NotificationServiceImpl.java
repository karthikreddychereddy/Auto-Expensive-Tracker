package com.paisatrack.backend.service.impl;

import com.paisatrack.backend.dto.NotificationResponse;
import com.paisatrack.backend.dto.NotificationSettingRequest;
import com.paisatrack.backend.dto.NotificationSettingResponse;
import com.paisatrack.backend.entity.Notification;
import com.paisatrack.backend.entity.NotificationSetting;
import com.paisatrack.backend.entity.NotificationType;
import com.paisatrack.backend.entity.User;
import com.paisatrack.backend.repository.ExpenseRepository;
import com.paisatrack.backend.repository.NotificationRepository;
import com.paisatrack.backend.repository.NotificationSettingRepository;
import com.paisatrack.backend.repository.UserRepository;
import com.paisatrack.backend.service.NotificationService;
import com.paisatrack.backend.util.SecurityUtil;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;

    private final NotificationSettingRepository settingRepository;

    private final UserRepository userRepository;

    private final ExpenseRepository expenseRepository;

    // ==========================================
    // Logged In User
    // ==========================================

    private User getLoggedInUser() {

        String email = SecurityUtil.getCurrentUserEmail();

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

    }

    // ==========================================
    // Get Notifications
    // ==========================================

    @Override
    @Transactional(readOnly = true)
    public List<NotificationResponse> getNotifications() {

        User user = getLoggedInUser();

        return notificationRepository
                .findByUserOrderByCreatedAtDesc(user)
                .stream()
                .map(this::mapNotification)
                .toList();

    }

    // ==========================================
    // Get Unread Count
    // ==========================================

    @Override
    @Transactional(readOnly = true)
    public Long getUnreadCount() {

        return notificationRepository
                .countByUserAndIsReadFalse(
                        getLoggedInUser()
                );

    }

    // ==========================================
    // Mark Notification Read
    // ==========================================

    @Override
    public void markAsRead(Long notificationId) {

        User user = getLoggedInUser();

        Notification notification =
                notificationRepository
                        .findByIdAndUser(notificationId, user)
                        .orElseThrow(() ->
                                new RuntimeException("Notification not found"));

        notification.setIsRead(true);

        notificationRepository.save(notification);

    }

    // ==========================================
    // Mark All Notifications Read
    // ==========================================

    @Override
    public void markAllAsRead() {

        notificationRepository.markAllAsRead(
                getLoggedInUser()
        );

    }

    // ==========================================
    // Delete Notification
    // ==========================================

    @Override
    public void deleteNotification(Long notificationId) {

        User user = getLoggedInUser();

        Notification notification =
                notificationRepository
                        .findByIdAndUser(notificationId, user)
                        .orElseThrow(() ->
                                new RuntimeException("Notification not found"));

        notificationRepository.delete(notification);

    }
        // ==========================================
    // Get Reminder Settings
    // ==========================================

    @Override
    @Transactional(readOnly = true)
    public NotificationSettingResponse getSettings() {

        User user = getLoggedInUser();

        NotificationSetting setting = settingRepository
                .findByUser(user)
                .orElseGet(() -> createDefaultSetting(user));

        return mapSetting(setting);

    }

    // ==========================================
    // Save Reminder Settings
    // ==========================================

    @Override
    public NotificationSettingResponse saveSettings(
            NotificationSettingRequest request
    ) {

        User user = getLoggedInUser();

        NotificationSetting setting = settingRepository
                .findByUser(user)
                .orElseGet(() -> createDefaultSetting(user));

        setting.setEnabled(request.getEnabled());

        setting.setMorningReminderTime(
                request.getMorningReminderTime()
        );

        setting.setAfternoonReminderTime(
                request.getAfternoonReminderTime()
        );

        setting.setEveningReminderTime(
                request.getEveningReminderTime()
        );

        setting.setNightReminderTime(
                request.getNightReminderTime()
        );

        settingRepository.save(setting);

        return mapSetting(setting);

    }

    // ==========================================
    // Create Default Notification Settings
    // ==========================================

    private NotificationSetting createDefaultSetting(
            User user
    ) {

        NotificationSetting setting =
                NotificationSetting.builder()
                        .user(user)
                        .enabled(true)
                        .morningReminderTime(LocalTime.of(9, 0))
                        .afternoonReminderTime(LocalTime.of(13, 0))
                        .eveningReminderTime(LocalTime.of(18, 0))
                        .nightReminderTime(LocalTime.of(22, 0))
                        .build();

        return settingRepository.save(setting);

    }

        // ==========================================
    // Create Reminder Notification
    // ==========================================

    @Override
    public void createReminderNotification(
            Long userId,
            String title,
            String message,
            String type
    ) {

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        NotificationType notificationType =
                NotificationType.valueOf(type);

        switch (notificationType) {

                case MORNING_REMINDER -> {

                        title = "Morning Expense Reminder";

                        message =
                                "Good morning! Start your day by recording today's expenses and stay on top of your finances.";
                }

                case AFTERNOON_REMINDER -> {

                        boolean morningUnread =
                                notificationRepository
                                        .findFirstByUserAndTypeAndIsReadFalseOrderByCreatedAtDesc(
                                                user,
                                                NotificationType.MORNING_REMINDER
                                        )
                                        .isPresent();

                        if (morningUnread) {

                        title = "Expense Check-in";

                        message =
                                "We noticed today's expenses may still need your attention. Take a moment to keep your records up to date.";

                        } else {

                        title = "Afternoon Expense Reminder";

                        message =
                                "Keep your expense records updated throughout the afternoon.";

                        }

                }

                case EVENING_REMINDER -> {

                        boolean afternoonUnread =
                                notificationRepository
                                        .findFirstByUserAndTypeAndIsReadFalseOrderByCreatedAtDesc(
                                                user,
                                                NotificationType.AFTERNOON_REMINDER
                                        )
                                        .isPresent();

                        if (afternoonUnread) {

                        title = "Daily Expense Review";

                        message =
                                "Before wrapping up your day, review and record any remaining expenses to keep your budget accurate.";

                        } else {

                        title = "Evening Expense Reminder";

                        message =
                                "Take a quick look at today's expenses and make sure everything is recorded.";

                        }

                }

                case NIGHT_REMINDER -> {

                        boolean eveningUnread =
                                notificationRepository
                                        .findFirstByUserAndTypeAndIsReadFalseOrderByCreatedAtDesc(
                                                user,
                                                NotificationType.EVENING_REMINDER
                                        )
                                        .isPresent();

                        if (eveningUnread) {

                        title = "End of Day Reminder";

                        message =
                                "Finish today's financial tracking by recording any pending expenses before the day ends.";

                        } else {

                        title = "Night Expense Reminder";

                        message =
                                "You're almost done for the day. Make sure today's expense records are complete.";

                        }

                }

                default -> {

                        title = "Expense Reminder";

                        message = "Please record today's expenses.";

                }

                }

        LocalDate today = LocalDate.now();

        LocalDateTime startOfDay =
                today.atStartOfDay();

        LocalDateTime endOfDay =
                today.plusDays(1).atStartOfDay();

        boolean alreadyExists =
                notificationRepository
                        .existsByUserAndTypeAndCreatedAtBetween(
                                user,
                                notificationType,
                                startOfDay,
                                endOfDay
                        );

        if (alreadyExists) {
            return;
        }

        Notification notification =
                Notification.builder()
                        .user(user)
                        .title(title)
                        .message(message)
                        .type(notificationType)
                        .isRead(false)
                        .createdAt(LocalDateTime.now())
                        .reminderTime(LocalDateTime.now())
                        .build();

        notificationRepository.save(notification);

    }
        // ==========================================
    // Notification -> Response
    // ==========================================

    private NotificationResponse mapNotification(
            Notification notification
    ) {

        return NotificationResponse.builder()
                .id(notification.getId())
                .title(notification.getTitle())
                .message(notification.getMessage())
                .read(notification.getIsRead())
                .type(notification.getType())
                .createdAt(notification.getCreatedAt())
                .build();

    }

    // ==========================================
    // Notification Setting -> Response
    // ==========================================

    private NotificationSettingResponse mapSetting(
            NotificationSetting setting
    ) {

        return NotificationSettingResponse.builder()
                .id(setting.getId())
                .enabled(setting.getEnabled())
                .morningReminderTime(
                        setting.getMorningReminderTime()
                )
                .afternoonReminderTime(
                        setting.getAfternoonReminderTime()
                )
                .eveningReminderTime(
                        setting.getEveningReminderTime()
                )
                .nightReminderTime(
                        setting.getNightReminderTime()
                )
                .build();

    }

}
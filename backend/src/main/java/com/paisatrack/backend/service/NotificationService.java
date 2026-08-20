package com.paisatrack.backend.service;

import com.paisatrack.backend.dto.NotificationResponse;
import com.paisatrack.backend.dto.NotificationSettingRequest;
import com.paisatrack.backend.dto.NotificationSettingResponse;

import java.util.List;

public interface NotificationService {

        // ==========================================
        // Notifications
        // ==========================================

        List<NotificationResponse> getNotifications();

        Long getUnreadCount();

        void markAsRead(Long notificationId);

        void markAllAsRead();

        void deleteNotification(Long notificationId);

        // ==========================================
        // Reminder Settings
        // ==========================================

        NotificationSettingResponse getSettings();

        NotificationSettingResponse saveSettings(
                NotificationSettingRequest request
        );

        // ==========================================
        // Scheduler Support
        // ==========================================

        void createReminderNotification(
                Long userId,
                String title,
                String message,
                String type
        );

        void createSystemNotification(
                Long userId,
                String title,
                String message,
                String type
        );
}
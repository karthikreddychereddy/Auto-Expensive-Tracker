package com.paisatrack.backend.controller;

import com.paisatrack.backend.dto.NotificationResponse;
import com.paisatrack.backend.dto.NotificationSettingRequest;
import com.paisatrack.backend.dto.NotificationSettingResponse;
import com.paisatrack.backend.service.NotificationService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    // ==========================================
    // Get Notifications
    // ==========================================

    @GetMapping
    public ResponseEntity<List<NotificationResponse>> getNotifications() {

        return ResponseEntity.ok(
                notificationService.getNotifications()
        );

    }

    // ==========================================
    // Unread Count
    // ==========================================

    @GetMapping("/unread-count")
    public ResponseEntity<Map<String, Long>> getUnreadCount() {

        return ResponseEntity.ok(
                Map.of(
                        "count",
                        notificationService.getUnreadCount()
                )
        );

    }

    // ==========================================
    // Mark Read
    // ==========================================

    @PutMapping("/{id}/read")
    public ResponseEntity<Void> markRead(
            @PathVariable Long id
    ) {

        notificationService.markAsRead(id);

        return ResponseEntity.ok().build();

    }

    // ==========================================
    // Mark All Read
    // ==========================================

    @PutMapping("/read-all")
    public ResponseEntity<Void> markAllRead() {

        notificationService.markAllAsRead();

        return ResponseEntity.ok().build();

    }

    // ==========================================
    // Delete Notification
    // ==========================================

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNotification(
            @PathVariable Long id
    ) {

        notificationService.deleteNotification(id);

        return ResponseEntity.noContent().build();

    }

    // ==========================================
    // Get Reminder Settings
    // ==========================================

    @GetMapping("/settings")
    public ResponseEntity<NotificationSettingResponse> getSettings() {

        return ResponseEntity.ok(
                notificationService.getSettings()
        );

    }

    // ==========================================
    // Save Reminder Settings
    // ==========================================

    @PutMapping("/settings")
    public ResponseEntity<NotificationSettingResponse> saveSettings(
            @RequestBody NotificationSettingRequest request
    ) {

        return ResponseEntity.ok(
                notificationService.saveSettings(request)
        );

    }

}
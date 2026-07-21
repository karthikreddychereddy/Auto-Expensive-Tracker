package com.paisatrack.backend.scheduler;

import com.paisatrack.backend.entity.NotificationSetting;
import com.paisatrack.backend.entity.NotificationType;
import com.paisatrack.backend.repository.NotificationSettingRepository;
import com.paisatrack.backend.service.NotificationService;

import lombok.RequiredArgsConstructor;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Component
@RequiredArgsConstructor
public class NotificationScheduler {

    private final NotificationSettingRepository settingRepository;

    private final NotificationService notificationService;

    // ==========================================
    // Runs Every Minute
    // ==========================================

    @Scheduled(cron = "0 * * * * *")
    public void sendReminders() {

        List<NotificationSetting> settings =
                settingRepository.findByEnabledTrue();

        LocalTime now = LocalTime.now().truncatedTo(ChronoUnit.MINUTES);

        for (NotificationSetting setting : settings) {

            System.out.println("==================================");
            System.out.println("Scheduler User ID : " + setting.getUser().getId());
            System.out.println("Reminder Time     : " + setting.getMorningReminderTime());
            System.out.println("Current Time      : " + now);

            if (match(now, setting.getMorningReminderTime())) {

                System.out.println("Morning Reminder Triggered For User : " + setting.getUser().getId());

                notificationService.createReminderNotification(
                        setting.getUser().getId(),
                        null,
                        null,
                        NotificationType.MORNING_REMINDER.name()
                );

            }

            if (match(now, setting.getAfternoonReminderTime())) {

                notificationService.createReminderNotification(
                        setting.getUser().getId(),
                        null,
                        null,
                        NotificationType.AFTERNOON_REMINDER.name()
                );

            }

            if (match(now, setting.getEveningReminderTime())) {

                notificationService.createReminderNotification(
                        setting.getUser().getId(),
                        null,
                        null,
                        NotificationType.EVENING_REMINDER.name()
                );

            }

            if (match(now, setting.getNightReminderTime())) {

                notificationService.createReminderNotification(
                        setting.getUser().getId(),
                        null,
                        null,
                        NotificationType.NIGHT_REMINDER.name()
                );

            }

        }

    }

    // ==========================================
    // Compare Time
    // ==========================================

    private boolean match(
            LocalTime now,
            LocalTime reminderTime
    ) {

        return now.getHour() == reminderTime.getHour()
                && now.getMinute() == reminderTime.getMinute();

    }

}
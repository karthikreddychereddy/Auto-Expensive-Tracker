package com.paisatrack.backend.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalTime;

@Getter
@Setter
public class NotificationSettingRequest {

    private LocalTime morningReminderTime;

    private LocalTime afternoonReminderTime;

    private LocalTime eveningReminderTime;

    private LocalTime nightReminderTime;

    private Boolean enabled;

}
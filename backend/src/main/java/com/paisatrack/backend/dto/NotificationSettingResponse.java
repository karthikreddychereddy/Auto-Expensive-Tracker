package com.paisatrack.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NotificationSettingResponse {

    private Long id;

    private LocalTime morningReminderTime;

    private LocalTime afternoonReminderTime;

    private LocalTime eveningReminderTime;

    private LocalTime nightReminderTime;

    private Boolean enabled;

}
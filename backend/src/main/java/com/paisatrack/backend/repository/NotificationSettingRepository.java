package com.paisatrack.backend.repository;

import com.paisatrack.backend.entity.NotificationSetting;
import com.paisatrack.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface NotificationSettingRepository
        extends JpaRepository<NotificationSetting, Long> {

    Optional<NotificationSetting> findByUser(User user);

    List<NotificationSetting> findByEnabledTrue();
}
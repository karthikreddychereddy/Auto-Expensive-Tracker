package com.paisatrack.backend.repository;

import com.paisatrack.backend.entity.Settings;
import com.paisatrack.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SettingsRepository extends JpaRepository<Settings, Long> {

    Optional<Settings> findByUser(User user);

}
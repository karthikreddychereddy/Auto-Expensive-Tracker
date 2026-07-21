package com.paisatrack.backend.repository;

import com.paisatrack.backend.entity.Notification;
import com.paisatrack.backend.entity.NotificationType;
import com.paisatrack.backend.entity.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface NotificationRepository
        extends JpaRepository<Notification, Long> {

    List<Notification> findByUserOrderByCreatedAtDesc(User user);

    long countByUserAndIsReadFalse(User user);

    Optional<Notification> findByIdAndUser(Long id, User user);

    boolean existsByUserAndTypeAndCreatedAtBetween(
            User user,
            NotificationType type,
            LocalDateTime start,
            LocalDateTime end
    );

    Optional<Notification> findFirstByUserAndTypeAndCreatedAtBetween(
            User user,
            NotificationType type,
            LocalDateTime start,
            LocalDateTime end
    );
    Optional<Notification> findFirstByUserAndTypeAndIsReadFalseOrderByCreatedAtDesc(
                User user,
                NotificationType type
    );

    Optional<Notification> findFirstByUserAndTypeOrderByCreatedAtDesc(
                User user,
                NotificationType type
    );

    // =====================================================
    // Mark All Notifications As Read
    // =====================================================

    @Modifying
    @Transactional
    @Query("""
            UPDATE Notification n
            SET n.isRead = true
            WHERE n.user = :user
              AND n.isRead = false
            """)
    void markAllAsRead(User user);

}
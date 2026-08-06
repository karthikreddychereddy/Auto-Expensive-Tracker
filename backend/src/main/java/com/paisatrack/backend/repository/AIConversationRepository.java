package com.paisatrack.backend.repository;

import com.paisatrack.backend.entity.AIConversation;
import com.paisatrack.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface AIConversationRepository extends JpaRepository<AIConversation, Long> {

    List<AIConversation> findByUserOrderByUpdatedAtDesc(User user);

    Optional<AIConversation> findByIdAndUser(Long id, User user);

    @Query("""
            SELECT DISTINCT c
            FROM AIConversation c
            LEFT JOIN c.messages m
            WHERE c.user = :user
            AND (
                LOWER(c.title) LIKE LOWER(CONCAT('%', :keyword, '%'))
                OR LOWER(m.content) LIKE LOWER(CONCAT('%', :keyword, '%'))
            )
            ORDER BY c.updatedAt DESC
            """)
    List<AIConversation> searchConversations(
            @Param("user") User user,
            @Param("keyword") String keyword
    );
}
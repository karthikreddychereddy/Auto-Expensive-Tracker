package com.paisatrack.backend.repository;

import com.paisatrack.backend.entity.Income;
import com.paisatrack.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface IncomeRepository extends JpaRepository<Income, Long> {

    // =====================================================
    // Basic Queries
    // =====================================================

        long countByUser(User user);

        List<Income> findByUser(User user);

        List<Income> findByUserAndCategory(
                User user,
                String category
        );

        List<Income> findByUserAndIncomeDateBetween(
                User user,
                LocalDate startDate,
                LocalDate endDate
        );

    // =====================================================
    // Dashboard Queries
    // =====================================================

        @Query("""
                SELECT COALESCE(SUM(i.amount),0)
                FROM Income i
                WHERE i.user = :user
                """)
        BigDecimal getTotalIncome(
                @Param("user") User user
        );

        // =====================================================
        // Notification Queries
        // =====================================================

        boolean existsByUserAndCreatedAtAfter(
                User user,
                LocalDateTime time
        );

        @Query("""
                SELECT COALESCE(AVG(i.amount),0)
                FROM Income i
                WHERE i.user=:user
                """)
        BigDecimal getAverageIncome(@Param("user") User user);

}
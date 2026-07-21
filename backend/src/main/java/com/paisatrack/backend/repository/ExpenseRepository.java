package com.paisatrack.backend.repository;

import com.paisatrack.backend.entity.Expense;
import com.paisatrack.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {

        // =====================================================
        // Basic Queries
        // =====================================================

        long countByUser(User user);

        List<Expense> findByUser(User user);

        List<Expense> findByUserAndCategory(
                User user,
                String category
        );

        List<Expense> findByUserAndExpenseDateBetween(
                User user,
                LocalDate startDate,
                LocalDate endDate
        );

        List<Expense> findByUserAndCategoryAndExpenseDateBetween(
                User user,
                String category,
                LocalDate startDate,
                LocalDate endDate
        );

        // =====================================================
        // Dashboard Queries
        // =====================================================

        @Query("""
                SELECT COALESCE(SUM(e.amount),0)
                FROM Expense e
                WHERE e.user = :user
                """)
        BigDecimal getTotalExpense(
                @Param("user") User user
        );

        @Query("""
                SELECT e.category
                FROM Expense e
                WHERE e.user = :user
                GROUP BY e.category
                ORDER BY SUM(e.amount) DESC
                """)
        List<String> getHighestExpenseCategory(
                @Param("user") User user
        );

        // =====================================================
        // Notification Queries
        // =====================================================

        boolean existsByUserAndCreatedAtAfter(
                User user,
                LocalDate expenseDate
        );
        @Query("""
                SELECT COALESCE(AVG(e.amount), 0)
                FROM Expense e
                WHERE e.user = :user
                """)
        BigDecimal getAverageExpense(@Param("user") User user);

}
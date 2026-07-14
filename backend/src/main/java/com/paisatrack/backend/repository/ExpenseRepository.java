package com.paisatrack.backend.repository;

import com.paisatrack.backend.entity.Expense;
import com.paisatrack.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {

        long countByUser(User user);

        List<Expense> findByUser(User user);

        List<Expense> findByUserAndCategory(User user, String category);

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

        @Query("SELECT COALESCE(SUM(e.amount), 0) FROM Expense e")
        BigDecimal getTotalExpense();

        @Query("""
        SELECT e.category
        FROM Expense e
        GROUP BY e.category
        ORDER BY SUM(e.amount) DESC
        """)
        List<String> getHighestExpenseCategory();
}
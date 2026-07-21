package com.paisatrack.backend.repository;

import com.paisatrack.backend.entity.Budget;
import com.paisatrack.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.List;

public interface BudgetRepository extends JpaRepository<Budget, Long> {

    List<Budget> findByUser(User user);

    @Query("""
        SELECT COALESCE(SUM(b.budgetAmount),0)
        FROM Budget b
        WHERE b.user = :user
        """)
    BigDecimal getTotalBudget(@Param("user") User user);
}
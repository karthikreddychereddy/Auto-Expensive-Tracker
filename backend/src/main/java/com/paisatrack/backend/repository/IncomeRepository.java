package com.paisatrack.backend.repository;

import com.paisatrack.backend.entity.Income;
import com.paisatrack.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public interface IncomeRepository extends JpaRepository<Income, Long> {

    long countByUser(User user);

    List<Income> findByUser(User user);

    List<Income> findByUserAndCategory(User user, String category);

    List<Income> findByUserAndIncomeDateBetween(
            User user,
            LocalDate startDate,
            LocalDate endDate
    );

    @Query("SELECT COALESCE(SUM(i.amount), 0) FROM Income i")
    BigDecimal getTotalIncome();
}
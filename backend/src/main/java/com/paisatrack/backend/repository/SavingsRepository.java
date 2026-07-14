package com.paisatrack.backend.repository;

import com.paisatrack.backend.entity.Savings;
import com.paisatrack.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SavingsRepository extends JpaRepository<Savings, Long> {

    List<Savings> findByUser(User user);

    long countByUser(User user);
}
package com.paisatrack.backend.repository;

import com.paisatrack.backend.entity.Goal;
import com.paisatrack.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GoalRepository extends JpaRepository<Goal, Long> {

    List<Goal> findByUser(User user);

}
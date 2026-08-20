package com.paisatrack.backend.repository;

import com.paisatrack.backend.entity.Category;
import com.paisatrack.backend.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CategoryRepository
        extends JpaRepository<Category, Long> {

    List<Category> findByUserOrderByNameAsc(
            User user
    );

    Optional<Category> findByIdAndUser(
            Long id,
            User user
    );

    Optional<Category> findByUserAndNameIgnoreCase(
            User user,
            String name
    );

    boolean existsByUserAndNameIgnoreCase(
            User user,
            String name
    );
}
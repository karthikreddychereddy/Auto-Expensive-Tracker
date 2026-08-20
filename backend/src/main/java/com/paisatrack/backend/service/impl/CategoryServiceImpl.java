package com.paisatrack.backend.service.impl;

import com.paisatrack.backend.dto.CategoryRequest;
import com.paisatrack.backend.dto.CategoryResponse;

import com.paisatrack.backend.entity.Category;
import com.paisatrack.backend.entity.User;

import com.paisatrack.backend.repository.CategoryRepository;
import com.paisatrack.backend.repository.UserRepository;

import com.paisatrack.backend.service.CategoryService;

import com.paisatrack.backend.util.SecurityUtil;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl
        implements CategoryService {

    private final CategoryRepository
            categoryRepository;

    private final UserRepository
            userRepository;

    // ==========================================
    // CREATE
    // ==========================================

    @Override
    @Transactional
    public CategoryResponse createCategory(
            CategoryRequest request
    ) {

        User user =
                getCurrentUser();

        String name =
                request
                        .getName()
                        .trim();

        if (
                categoryRepository
                        .existsByUserAndNameIgnoreCase(
                                user,
                                name
                        )
        ) {

            throw new RuntimeException(
                    "Category already exists"
            );
        }

        Category category =
                Category.builder()

                        .user(user)

                        .name(name)

                        .description(
                                clean(
                                        request.getDescription()
                                )
                        )

                        .color(
                                clean(
                                        request.getColor()
                                )
                        )

                        .icon(
                                clean(
                                        request.getIcon()
                                )
                        )

                        .build();

        Category saved =
                categoryRepository.save(
                        category
                );

        return mapToResponse(
                saved
        );
    }

    // ==========================================
    // GET ALL CURRENT USER CATEGORIES
    // ==========================================

    @Override
    public List<CategoryResponse>
    getAllCategories() {

        User user =
                getCurrentUser();

        return categoryRepository
                .findByUserOrderByNameAsc(
                        user
                )

                .stream()

                .map(
                        this::mapToResponse
                )

                .toList();
    }

    // ==========================================
    // GET BY ID
    // ==========================================

    @Override
    public CategoryResponse getCategoryById(
            Long id
    ) {

        User user =
                getCurrentUser();

        Category category =
                categoryRepository
                        .findByIdAndUser(
                                id,
                                user
                        )

                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Category not found"
                                )
                        );

        return mapToResponse(
                category
        );
    }

    // ==========================================
    // UPDATE
    // ==========================================

    @Override
    @Transactional
    public CategoryResponse updateCategory(
            Long id,
            CategoryRequest request
    ) {

        User user =
                getCurrentUser();

        Category category =
                categoryRepository
                        .findByIdAndUser(
                                id,
                                user
                        )

                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Category not found"
                                )
                        );

        String name =
                request
                        .getName()
                        .trim();

        categoryRepository
                .findByUserAndNameIgnoreCase(
                        user,
                        name
                )
                .ifPresent(existing -> {

                    if (
                            !existing
                                    .getId()
                                    .equals(
                                            category.getId()
                                    )
                    ) {

                        throw new RuntimeException(
                                "Category already exists"
                        );
                    }
                });

        category.setName(
                name
        );

        category.setDescription(
                clean(
                        request.getDescription()
                )
        );

        category.setColor(
                clean(
                        request.getColor()
                )
        );

        category.setIcon(
                clean(
                        request.getIcon()
                )
        );

        Category updated =
                categoryRepository.save(
                        category
                );

        return mapToResponse(
                updated
        );
    }

    // ==========================================
    // DELETE
    // ==========================================

    @Override
    @Transactional
    public void deleteCategory(
            Long id
    ) {

        User user =
                getCurrentUser();

        Category category =
                categoryRepository
                        .findByIdAndUser(
                                id,
                                user
                        )

                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Category not found"
                                )
                        );

        categoryRepository.delete(
                category
        );
    }

    // ==========================================
    // CURRENT USER
    // ==========================================

    private User getCurrentUser() {

        String email =
                SecurityUtil
                        .getCurrentUserEmail();

        return userRepository
                .findByEmail(
                        email
                )

                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found"
                        )
                );
    }

    // ==========================================
    // CLEAN OPTIONAL STRING
    // ==========================================

    private String clean(
            String value
    ) {

        if (
                value == null
        ) {
            return null;
        }

        String cleaned =
                value.trim();

        return cleaned.isEmpty()
                ? null
                : cleaned;
    }

    // ==========================================
    // RESPONSE
    // ==========================================

    private CategoryResponse mapToResponse(
            Category category
    ) {

        return CategoryResponse
                .builder()

                .id(
                        category.getId()
                )

                .name(
                        category.getName()
                )

                .description(
                        category.getDescription()
                )

                .color(
                        category.getColor()
                )

                .icon(
                        category.getIcon()
                )

                .build();
    }
}
package com.paisatrack.backend.service;

import com.paisatrack.backend.entity.Category;
import com.paisatrack.backend.entity.User;
import com.paisatrack.backend.repository.CategoryRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DefaultCategoryService {

    private final CategoryRepository categoryRepository;

    private record DefaultCategory(
            String name,
            String description,
            String icon,
            String color
    ) {}

    private static final List<DefaultCategory>
            DEFAULT_CATEGORIES =
            List.of(

                    new DefaultCategory(
                            "Food",
                            "Meals, restaurants and food orders",
                            "🍔",
                            "#FF6B6B"
                    ),

                    new DefaultCategory(
                            "Shopping",
                            "Clothing, electronics and general shopping",
                            "🛒",
                            "#4ECDC4"
                    ),

                    new DefaultCategory(
                            "Travel",
                            "Transport, cabs and travel expenses",
                            "🚕",
                            "#45B7D1"
                    ),

                    new DefaultCategory(
                            "Bills",
                            "Utilities, electricity, internet and household bills",
                            "🏠",
                            "#F7B731"
                    ),

                    new DefaultCategory(
                            "Entertainment",
                            "Movies, games and entertainment",
                            "🎬",
                            "#9B59B6"
                    ),

                    new DefaultCategory(
                            "Health",
                            "Medical, healthcare and wellness expenses",
                            "🏥",
                            "#2ECC71"
                    ),

                    new DefaultCategory(
                            "Education",
                            "Courses, books and education expenses",
                            "📚",
                            "#3498DB"
                    ),

                    new DefaultCategory(
                            "Investment",
                            "Investments and wealth-building expenses",
                            "📈",
                            "#16A085"
                    ),

                    new DefaultCategory(
                            "Gift",
                            "Gifts and special occasion expenses",
                            "🎁",
                            "#E84393"
                    ),

                    new DefaultCategory(
                            "Other",
                            "Expenses that do not fit another category",
                            "📦",
                            "#95A5A6"
                    )
            );

    @Transactional
    public void ensureDefaultCategories(
            User user
    ) {

        for (
                DefaultCategory item :
                DEFAULT_CATEGORIES
        ) {

            boolean exists =
                    categoryRepository
                            .existsByUserAndNameIgnoreCase(
                                    user,
                                    item.name()
                            );

            if (exists) {
                continue;
            }

            Category category =
                    Category.builder()
                            .user(user)
                            .name(
                                    item.name()
                            )
                            .description(
                                    item.description()
                            )
                            .icon(
                                    item.icon()
                            )
                            .color(
                                    item.color()
                            )
                            .build();

            categoryRepository.save(
                    category
            );
        }
    }
}
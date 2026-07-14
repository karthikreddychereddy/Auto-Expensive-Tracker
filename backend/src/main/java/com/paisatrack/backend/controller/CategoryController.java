package com.paisatrack.backend.controller;

import com.paisatrack.backend.dto.CategoryRequest;
import com.paisatrack.backend.dto.CategoryResponse;
import com.paisatrack.backend.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class CategoryController {

    private final CategoryService categoryService;

    @PostMapping
    public ResponseEntity<CategoryResponse> createCategory(@RequestBody CategoryRequest request) {

        return new ResponseEntity<>(categoryService.createCategory(request), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<CategoryResponse>> getAllCategories() {

        return ResponseEntity.ok(categoryService.getAllCategories());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CategoryResponse> getCategoryById(@PathVariable Long id) {

        return ResponseEntity.ok(categoryService.getCategoryById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CategoryResponse> updateCategory(
            @PathVariable Long id,
            @RequestBody CategoryRequest request) {

        return ResponseEntity.ok(categoryService.updateCategory(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCategory(@PathVariable Long id) {

        categoryService.deleteCategory(id);

        return ResponseEntity.ok("Category deleted successfully");
    }
}
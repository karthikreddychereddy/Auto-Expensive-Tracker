package com.paisatrack.backend.controller;

import com.paisatrack.backend.dto.IncomeRequest;
import com.paisatrack.backend.dto.IncomeResponse;
import com.paisatrack.backend.service.IncomeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/income")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class IncomeController {

    private final IncomeService incomeService;

    @PostMapping
    public IncomeResponse addIncome(
            @Valid @RequestBody IncomeRequest request) {

        return incomeService.addIncome(request);
    }

    @GetMapping
    public List<IncomeResponse> getAllIncome() {

        return incomeService.getAllIncome();
    }

    @GetMapping("/{id}")
    public IncomeResponse getIncomeById(@PathVariable Long id) {

        return incomeService.getIncomeById(id);
    }

    @PutMapping("/{id}")
    public IncomeResponse updateIncome(
            @PathVariable Long id,
            @Valid @RequestBody IncomeRequest request) {

        return incomeService.updateIncome(id, request);
    }

    @DeleteMapping("/{id}")
    public void deleteIncome(@PathVariable Long id) {

        incomeService.deleteIncome(id);
    }
}
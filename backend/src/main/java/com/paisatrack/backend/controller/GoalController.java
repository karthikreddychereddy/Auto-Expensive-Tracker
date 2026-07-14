package com.paisatrack.backend.controller;

import com.paisatrack.backend.dto.GoalRequest;
import com.paisatrack.backend.dto.GoalResponse;
import com.paisatrack.backend.service.GoalService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/goals")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class GoalController {

    private final GoalService goalService;


    @PostMapping
    public GoalResponse createGoal(@RequestBody GoalRequest request) {

        return goalService.createGoal(request);

    }


    @GetMapping
    public List<GoalResponse> getAllGoals() {

        return goalService.getAllGoals();

    }


    @GetMapping("/{id}")
    public GoalResponse getGoalById(@PathVariable Long id) {

        return goalService.getGoalById(id);

    }


    @PutMapping("/{id}")
    public GoalResponse updateGoal(
            @PathVariable Long id,
            @RequestBody GoalRequest request) {

        return goalService.updateGoal(id, request);

    }


    @DeleteMapping("/{id}")
    public void deleteGoal(@PathVariable Long id) {

        goalService.deleteGoal(id);

    }


    @GetMapping("/progress")
    public List<GoalResponse> getGoalProgress() {

        return goalService.getGoalProgress();

    }

}
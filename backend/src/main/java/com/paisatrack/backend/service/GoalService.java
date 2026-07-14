package com.paisatrack.backend.service;

import com.paisatrack.backend.dto.GoalRequest;
import com.paisatrack.backend.dto.GoalResponse;

import java.util.List;

public interface GoalService {

    GoalResponse createGoal(GoalRequest request);

    List<GoalResponse> getAllGoals();

    GoalResponse getGoalById(Long id);

    GoalResponse updateGoal(Long id, GoalRequest request);

    void deleteGoal(Long id);

    List<GoalResponse> getGoalProgress();
}
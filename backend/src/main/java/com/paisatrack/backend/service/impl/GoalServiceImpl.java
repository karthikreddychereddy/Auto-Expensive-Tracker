package com.paisatrack.backend.service.impl;

import com.paisatrack.backend.dto.GoalRequest;
import com.paisatrack.backend.dto.GoalResponse;
import com.paisatrack.backend.entity.Goal;
import com.paisatrack.backend.entity.User;
import com.paisatrack.backend.repository.GoalRepository;
import com.paisatrack.backend.repository.UserRepository;
import com.paisatrack.backend.service.GoalService;
import com.paisatrack.backend.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GoalServiceImpl implements GoalService {

    private final GoalRepository goalRepository;
    private final UserRepository userRepository;

    @Override
    public GoalResponse createGoal(GoalRequest request) {

        String email = SecurityUtil.getCurrentUserEmail();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Goal goal = Goal.builder()
                .user(user)
                .goalName(request.getGoalName())
                .targetAmount(request.getTargetAmount())
                .savedAmount(request.getSavedAmount() == null
                        ? BigDecimal.ZERO
                        : request.getSavedAmount())
                .targetDate(request.getTargetDate())
                .status("IN_PROGRESS")
                .build();

        Goal savedGoal = goalRepository.save(goal);

        return mapToResponse(savedGoal);
    }

    @Override
    public List<GoalResponse> getAllGoals() {

        String email = SecurityUtil.getCurrentUserEmail();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<GoalResponse> response = new ArrayList<>();

        goalRepository.findByUser(user).forEach(goal ->
                response.add(mapToResponse(goal))
        );

        return response;
    }

    @Override
    public GoalResponse getGoalById(Long id) {

        String email = SecurityUtil.getCurrentUserEmail();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Goal goal = goalRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Goal not found"));

        if (!goal.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        return mapToResponse(goal);
    }

    @Override
    public GoalResponse updateGoal(Long id, GoalRequest request) {

        String email = SecurityUtil.getCurrentUserEmail();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Goal goal = goalRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Goal not found"));

        if (!goal.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        goal.setGoalName(request.getGoalName());
        goal.setTargetAmount(request.getTargetAmount());

        if (request.getSavedAmount() != null) {
            goal.setSavedAmount(request.getSavedAmount());
        }

        goal.setTargetDate(request.getTargetDate());

        if (goal.getSavedAmount().compareTo(goal.getTargetAmount()) >= 0) {
            goal.setStatus("COMPLETED");
        } else {
            goal.setStatus("IN_PROGRESS");
        }

        Goal updated = goalRepository.save(goal);

        return mapToResponse(updated);
    }

    @Override
    public void deleteGoal(Long id) {

        String email = SecurityUtil.getCurrentUserEmail();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Goal goal = goalRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Goal not found"));

        if (!goal.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        goalRepository.delete(goal);
    }

    @Override
    public List<GoalResponse> getGoalProgress() {

        String email = SecurityUtil.getCurrentUserEmail();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<GoalResponse> response = new ArrayList<>();

        goalRepository.findByUser(user).forEach(goal ->
                response.add(mapToResponse(goal))
        );

        return response;
    }

    private GoalResponse mapToResponse(Goal goal) {

        BigDecimal remaining =
                goal.getTargetAmount().subtract(goal.getSavedAmount());

        if (remaining.compareTo(BigDecimal.ZERO) < 0) {
            remaining = BigDecimal.ZERO;
        }

        double progress = 0;

        if (goal.getTargetAmount().compareTo(BigDecimal.ZERO) > 0) {

            progress = goal.getSavedAmount()
                    .multiply(BigDecimal.valueOf(100))
                    .divide(goal.getTargetAmount(), 2, RoundingMode.HALF_UP)
                    .doubleValue();
        }

        String status =
                goal.getSavedAmount().compareTo(goal.getTargetAmount()) >= 0
                        ? "COMPLETED"
                        : "IN_PROGRESS";

        return GoalResponse.builder()
                .id(goal.getId())
                .goalName(goal.getGoalName())
                .targetAmount(goal.getTargetAmount())
                .savedAmount(goal.getSavedAmount())
                .remainingAmount(remaining)
                .progress(progress)
                .status(status)
                .targetDate(goal.getTargetDate())
                .build();
    }
}
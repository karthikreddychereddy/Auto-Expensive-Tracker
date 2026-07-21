package com.paisatrack.backend.ai.context.model;

import java.math.BigDecimal;

public class GoalContext {

    private Integer totalGoals;
    private Integer completedGoals;
    private Integer activeGoals;
    private String nearestGoal;
    private BigDecimal nearestGoalProgress;

    public GoalContext() {
    }

    public GoalContext(Integer totalGoals,
                       Integer completedGoals,
                       Integer activeGoals,
                       String nearestGoal,
                       BigDecimal nearestGoalProgress) {
        this.totalGoals = totalGoals;
        this.completedGoals = completedGoals;
        this.activeGoals = activeGoals;
        this.nearestGoal = nearestGoal;
        this.nearestGoalProgress = nearestGoalProgress;
    }

    public Integer getTotalGoals() {
        return totalGoals;
    }

    public void setTotalGoals(Integer totalGoals) {
        this.totalGoals = totalGoals;
    }

    public Integer getCompletedGoals() {
        return completedGoals;
    }

    public void setCompletedGoals(Integer completedGoals) {
        this.completedGoals = completedGoals;
    }

    public Integer getActiveGoals() {
        return activeGoals;
    }

    public void setActiveGoals(Integer activeGoals) {
        this.activeGoals = activeGoals;
    }

    public String getNearestGoal() {
        return nearestGoal;
    }

    public void setNearestGoal(String nearestGoal) {
        this.nearestGoal = nearestGoal;
    }

    public BigDecimal getNearestGoalProgress() {
        return nearestGoalProgress;
    }

    public void setNearestGoalProgress(BigDecimal nearestGoalProgress) {
        this.nearestGoalProgress = nearestGoalProgress;
    }
}
package com.paisatrack.backend.ai.context;

import com.paisatrack.backend.ai.context.model.BudgetContext;
import com.paisatrack.backend.ai.context.model.ExpenseContext;
import com.paisatrack.backend.ai.context.model.FinancialContext;
import com.paisatrack.backend.ai.context.model.GoalContext;
import com.paisatrack.backend.ai.context.model.IncomeContext;
import com.paisatrack.backend.ai.context.model.SavingsContext;
import com.paisatrack.backend.ai.context.model.UserProfileContext;
import com.paisatrack.backend.entity.Budget;
import com.paisatrack.backend.entity.Goal;
import com.paisatrack.backend.entity.Income;
import com.paisatrack.backend.entity.Profile;
import com.paisatrack.backend.entity.Savings;
import com.paisatrack.backend.entity.User;
import com.paisatrack.backend.repository.BudgetRepository;
import com.paisatrack.backend.repository.ExpenseRepository;
import com.paisatrack.backend.repository.GoalRepository;
import com.paisatrack.backend.repository.IncomeRepository;
import com.paisatrack.backend.repository.ProfileRepository;
import com.paisatrack.backend.repository.SavingsRepository;
import com.paisatrack.backend.repository.UserRepository;
import com.paisatrack.backend.util.SecurityUtil;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

@Component
public class FinancialContextBuilder {

    private final UserRepository userRepository;
    private final ProfileRepository profileRepository;
    private final ExpenseRepository expenseRepository;
    private final IncomeRepository incomeRepository;
    private final BudgetRepository budgetRepository;
    private final SavingsRepository savingsRepository;
    private final GoalRepository goalRepository;

    public FinancialContextBuilder(
            UserRepository userRepository,
            ProfileRepository profileRepository,
            ExpenseRepository expenseRepository,
            IncomeRepository incomeRepository,
            BudgetRepository budgetRepository,
            SavingsRepository savingsRepository,
            GoalRepository goalRepository
    ) {
        this.userRepository = userRepository;
        this.profileRepository = profileRepository;
        this.expenseRepository = expenseRepository;
        this.incomeRepository = incomeRepository;
        this.budgetRepository = budgetRepository;
        this.savingsRepository = savingsRepository;
        this.goalRepository = goalRepository;
    }

    public FinancialContext buildCurrentUserContext() {

        String email = SecurityUtil.getCurrentUserEmail();

        if (email == null) {
            throw new RuntimeException("Authenticated user not found.");
        }

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found."));

        FinancialContext context = new FinancialContext();

        UserProfileContext profileContext = new UserProfileContext();

        profileRepository.findByEmail(email)
                .ifPresent(profile -> populateProfile(profileContext, profile));

        context.setUserProfile(profileContext);

        context.setExpense(buildExpenseContext(user));
        context.setIncome(buildIncomeContext(user));
        context.setBudget(buildBudgetContext(user));
        context.setSavings(buildSavingsContext(user));
        context.setGoal(buildGoalContext(user));

        return context;
    }

    private void populateProfile(UserProfileContext context,
                                 Profile profile) {

        context.setName(profile.getName());
        context.setEmail(profile.getEmail());
        context.setPhone(profile.getPhone());
        context.setMonthlyIncome(profile.getMonthlyIncome());
        context.setSavingsGoal(profile.getSavingsGoal());
    }

    private ExpenseContext buildExpenseContext(User user) {

        ExpenseContext context = new ExpenseContext();

        BigDecimal totalExpense =
                expenseRepository.getTotalExpense(user);

        BigDecimal averageExpense =
                expenseRepository.getAverageExpense(user);

        long totalTransactions =
                expenseRepository.countByUser(user);

        List<String> categories =
                expenseRepository.getHighestExpenseCategory(user);

        context.setTotalExpense(totalExpense);
        context.setAverageDailyExpense(averageExpense);
        context.setTotalTransactions((int) totalTransactions);

        if (!categories.isEmpty()) {
            context.setHighestCategory(categories.get(0));
        }

        return context;
    }

    private IncomeContext buildIncomeContext(User user) {

        IncomeContext context = new IncomeContext();

        BigDecimal totalIncome =
                incomeRepository.getTotalIncome(user);

        BigDecimal averageIncome =
                incomeRepository.getAverageIncome(user);

        long totalEntries =
                incomeRepository.countByUser(user);

        List<Income> incomes =
                incomeRepository.findByUser(user);

        context.setTotalIncome(totalIncome);
        context.setAverageMonthlyIncome(averageIncome);
        context.setTotalIncomeEntries((int) totalEntries);

        if (!incomes.isEmpty()) {
            context.setPrimaryIncomeSource(
                    incomes.get(0).getCategory()
            );
        }

        return context;
    }

    private BudgetContext buildBudgetContext(User user) {

        BudgetContext context = new BudgetContext();

        List<Budget> budgets =
                budgetRepository.findByUser(user);

        context.setTotalBudgets(budgets.size());
        context.setActiveBudgets(budgets.size());
        context.setExceededBudgets(0);

        context.setTotalBudgetAmount(
                budgetRepository.getTotalBudget(user)
        );

        context.setTotalBudgetUsed(BigDecimal.ZERO);

        return context;
    }

    private SavingsContext buildSavingsContext(User user) {

        SavingsContext context = new SavingsContext();

        List<Savings> savingsList =
                savingsRepository.findByUser(user);

        BigDecimal totalSavings = BigDecimal.ZERO;

        for (Savings savings : savingsList) {
            totalSavings = totalSavings.add(savings.getAmount());
        }

        context.setTotalSavings(totalSavings);
        context.setSavingsEntries(savingsList.size());
        context.setMonthlySavings(BigDecimal.ZERO);
        context.setSavingsGrowth(BigDecimal.ZERO);

        return context;
    }

    private GoalContext buildGoalContext(User user) {

        GoalContext context = new GoalContext();

        List<Goal> goals =
                goalRepository.findByUser(user);

        context.setTotalGoals(goals.size());

        int completed = 0;
        int active = 0;

        String nearestGoal = null;
        BigDecimal nearestProgress = BigDecimal.ZERO;

        for (Goal goal : goals) {

            if ("COMPLETED".equalsIgnoreCase(goal.getStatus())) {
                completed++;
            } else {
                active++;
            }

            if (nearestGoal == null) {

                nearestGoal = goal.getGoalName();

                if (goal.getTargetAmount().compareTo(BigDecimal.ZERO) > 0) {

                    nearestProgress =
                            goal.getSavedAmount()
                                    .multiply(BigDecimal.valueOf(100))
                                    .divide(
                                            goal.getTargetAmount(),
                                            2,
                                            RoundingMode.HALF_UP
                                    );
                }
            }
        }

        context.setCompletedGoals(completed);
        context.setActiveGoals(active);
        context.setNearestGoal(nearestGoal);
        context.setNearestGoalProgress(nearestProgress);

        return context;
    }
}
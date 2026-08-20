package com.paisatrack.backend.scheduler;

import com.paisatrack.backend.entity.Budget;
import com.paisatrack.backend.entity.Goal;
import com.paisatrack.backend.entity.NotificationSetting;
import com.paisatrack.backend.entity.NotificationType;
import com.paisatrack.backend.entity.Settings;
import com.paisatrack.backend.entity.User;
import com.paisatrack.backend.repository.BudgetRepository;
import com.paisatrack.backend.repository.ExpenseRepository;
import com.paisatrack.backend.repository.GoalRepository;
import com.paisatrack.backend.repository.IncomeRepository;
import com.paisatrack.backend.repository.NotificationSettingRepository;
import com.paisatrack.backend.repository.SettingsRepository;
import com.paisatrack.backend.service.NotificationService;

import lombok.RequiredArgsConstructor;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.YearMonth;
import java.time.temporal.ChronoUnit;
import java.util.Comparator;
import java.util.List;

@Component
@RequiredArgsConstructor
public class NotificationScheduler {

    private final NotificationSettingRepository
            notificationSettingRepository;

    private final SettingsRepository
            settingsRepository;

    private final BudgetRepository
            budgetRepository;

    private final GoalRepository
            goalRepository;

    private final ExpenseRepository
            expenseRepository;

    private final IncomeRepository
            incomeRepository;

    private final NotificationService
            notificationService;

    /*
     * Runs every minute.
     */
    @Scheduled(cron = "0 * * * * *")
    public void processNotifications() {
        LocalTime now =
                LocalTime.now()
                        .truncatedTo(
                                ChronoUnit.MINUTES
                        );

        LocalDate today =
                LocalDate.now();

        List<NotificationSetting>
                reminderSettings =
                notificationSettingRepository
                        .findAll();

        for (
                NotificationSetting reminderSetting
                : reminderSettings
        ) {
            User user =
                    reminderSetting.getUser();

            Settings settings =
                    settingsRepository
                            .findByUser(user)
                            .orElse(null);

            if (settings == null) {
                continue;
            }

            /*
             * Four configurable daily reminders.
             */
            processDailyReminders(
                    user,
                    settings,
                    reminderSetting,
                    now
            );

            /*
             * Goal reminder check once daily.
             */
            if (
                    match(
                            now,
                            LocalTime.of(
                                    9,
                                    5
                            )
                    )
            ) {
                processGoalReminder(
                        user,
                        settings,
                        today
                );
            }

            /*
             * Budget + AI suggestion checks
             * once daily.
             */
            if (
                    match(
                            now,
                            LocalTime.of(
                                    18,
                                    5
                            )
                    )
            ) {
                processBudgetAlert(
                        user,
                        settings,
                        today
                );

                processAiSuggestion(
                        user,
                        settings,
                        today
                );
            }

            /*
             * Previous month's report is generated
             * on the first day of each month.
             */
            if (
                    today.getDayOfMonth() == 1 &&
                    match(
                            now,
                            LocalTime.of(
                                    9,
                                    10
                            )
                    )
            ) {
                processMonthlyReport(
                        user,
                        settings,
                        today
                );
            }
        }
    }

    // ==========================================
    // Daily Expense Reminders
    // ==========================================

    private void processDailyReminders(
            User user,
            Settings settings,
            NotificationSetting reminderSetting,
            LocalTime now
    ) {
        /*
         * Both settings must be enabled.
         *
         * This fixes the old problem where
         * disabling Daily Reminder from the
         * Settings page did not stop the
         * four reminder scheduler.
         */
        if (
                !Boolean.TRUE.equals(
                        settings.getDailyReminder()
                ) ||
                !Boolean.TRUE.equals(
                        reminderSetting.getEnabled()
                )
        ) {
            return;
        }

        if (
                match(
                        now,
                        reminderSetting
                                .getMorningReminderTime()
                )
        ) {
            createReminder(
                    user,
                    NotificationType.MORNING_REMINDER
            );
        }

        if (
                match(
                        now,
                        reminderSetting
                                .getAfternoonReminderTime()
                )
        ) {
            createReminder(
                    user,
                    NotificationType.AFTERNOON_REMINDER
            );
        }

        if (
                match(
                        now,
                        reminderSetting
                                .getEveningReminderTime()
                )
        ) {
            createReminder(
                    user,
                    NotificationType.EVENING_REMINDER
            );
        }

        if (
                match(
                        now,
                        reminderSetting
                                .getNightReminderTime()
                )
        ) {
            createReminder(
                    user,
                    NotificationType.NIGHT_REMINDER
            );
        }
    }

    private void createReminder(
            User user,
            NotificationType type
    ) {
        notificationService
                .createReminderNotification(
                        user.getId(),
                        null,
                        null,
                        type.name()
                );
    }

    // ==========================================
    // Budget Alerts
    // ==========================================

    private void processBudgetAlert(
            User user,
            Settings settings,
            LocalDate today
    ) {
        if (
                !Boolean.TRUE.equals(
                        settings.getBudgetAlerts()
                )
        ) {
            return;
        }

        List<Budget> activeBudgets =
                budgetRepository
                        .findByUser(user)
                        .stream()
                        .filter(
                                budget ->
                                        budget.getStartDate()
                                                != null &&
                                        budget.getEndDate()
                                                != null
                        )
                        .filter(
                                budget ->
                                        !today.isBefore(
                                                budget.getStartDate()
                                        ) &&
                                        !today.isAfter(
                                                budget.getEndDate()
                                        )
                        )
                        .toList();

        BudgetAlertCandidate highest =
                null;

        for (
                Budget budget
                : activeBudgets
        ) {
            if (
                    budget.getBudgetAmount()
                            == null ||
                    budget.getBudgetAmount()
                            .compareTo(
                                    BigDecimal.ZERO
                            )
                            <= 0
            ) {
                continue;
            }

            BigDecimal spent =
                    expenseRepository
                            .getTotalExpenseByCategoryAndDateRange(
                                    user,
                                    budget.getCategory(),
                                    budget.getStartDate(),
                                    budget.getEndDate()
                            );

            BigDecimal percent =
                    spent
                            .multiply(
                                    BigDecimal.valueOf(
                                            100
                                    )
                            )
                            .divide(
                                    budget.getBudgetAmount(),
                                    2,
                                    RoundingMode.HALF_UP
                            );

            if (
                    highest == null ||
                    percent.compareTo(
                            highest.percent()
                    ) > 0
            ) {
                highest =
                        new BudgetAlertCandidate(
                                budget,
                                spent,
                                percent
                        );
            }
        }

        if (highest == null) {
            return;
        }

        int warning =
                settings.getBudgetWarning()
                        != null
                        ? settings.getBudgetWarning()
                        : 70;

        int critical =
                settings.getBudgetCritical()
                        != null
                        ? settings.getBudgetCritical()
                        : 90;

        /*
         * Prevent bad threshold configuration.
         */
        if (critical < warning) {
            critical = warning;
        }

        if (
                highest.percent()
                        .compareTo(
                                BigDecimal.valueOf(
                                        critical
                                )
                        )
                        >= 0
        ) {
            notificationService
                    .createSystemNotification(
                            user.getId(),

                            "Critical Budget Alert",

                            highest.budget()
                                    .getCategory()
                                    +
                                    " spending has reached "
                                    +
                                    highest.percent()
                                            .setScale(
                                                    0,
                                                    RoundingMode.HALF_UP
                                            )
                                    +
                                    "% of your budget. Review your spending now.",

                            NotificationType
                                    .BUDGET_CRITICAL
                                    .name()
                    );

        } else if (
                highest.percent()
                        .compareTo(
                                BigDecimal.valueOf(
                                        warning
                                )
                        )
                        >= 0
        ) {
            notificationService
                    .createSystemNotification(
                            user.getId(),

                            "Budget Warning",

                            highest.budget()
                                    .getCategory()
                                    +
                                    " spending has reached "
                                    +
                                    highest.percent()
                                            .setScale(
                                                    0,
                                                    RoundingMode.HALF_UP
                                            )
                                    +
                                    "% of your budget.",

                            NotificationType
                                    .BUDGET_WARNING
                                    .name()
                    );
        }
    }

    // ==========================================
    // Goal Reminders
    // ==========================================

    private void processGoalReminder(
            User user,
            Settings settings,
            LocalDate today
    ) {
        if (
                !Boolean.TRUE.equals(
                        settings.getGoalReminder()
                )
        ) {
            return;
        }

        Goal goal =
                goalRepository
                        .findByUser(user)
                        .stream()

                        .filter(
                                item ->
                                        !"COMPLETED"
                                                .equalsIgnoreCase(
                                                        item.getStatus()
                                                )
                        )

                        .filter(
                                item ->
                                        item.getTargetDate()
                                                != null
                        )

                        /*
                         * Deadline must be today
                         * or in the next 7 days.
                         */
                        .filter(
                                item ->
                                        !item.getTargetDate()
                                                .isBefore(
                                                        today
                                                )
                        )

                        .filter(
                                item ->
                                        !item.getTargetDate()
                                                .isAfter(
                                                        today.plusDays(
                                                                7
                                                        )
                                                )
                        )

                        .min(
                                Comparator.comparing(
                                        Goal::getTargetDate
                                )
                        )

                        .orElse(null);

        if (goal == null) {
            return;
        }

        long daysLeft =
                ChronoUnit.DAYS.between(
                        today,
                        goal.getTargetDate()
                );

        String dayText =
                daysLeft == 0
                        ? "today"
                        : daysLeft == 1
                        ? "tomorrow"
                        : "in "
                        + daysLeft
                        + " days";

        BigDecimal savedAmount =
                goal.getSavedAmount()
                        != null
                        ? goal.getSavedAmount()
                        : BigDecimal.ZERO;

        notificationService
                .createSystemNotification(
                        user.getId(),

                        "Goal Reminder",

                        "Your goal \""
                                + goal.getGoalName()
                                + "\" is due "
                                + dayText
                                + ". You have saved ₹"
                                + savedAmount
                                + " of ₹"
                                + goal.getTargetAmount()
                                + ".",

                        NotificationType
                                .GOAL_REMINDER
                                .name()
                );
    }

    // ==========================================
    // Monthly Report Notification
    // ==========================================

    private void processMonthlyReport(
            User user,
            Settings settings,
            LocalDate today
    ) {
        if (
                !Boolean.TRUE.equals(
                        settings.getMonthlyReport()
                )
        ) {
            return;
        }

        YearMonth previousMonth =
                YearMonth
                        .from(today)
                        .minusMonths(1);

        LocalDate start =
                previousMonth.atDay(1);

        LocalDate end =
                previousMonth
                        .atEndOfMonth();

        BigDecimal income =
                incomeRepository
                        .getTotalIncomeByDateRange(
                                user,
                                start,
                                end
                        );

        BigDecimal expenses =
                expenseRepository
                        .getTotalExpenseByDateRange(
                                user,
                                start,
                                end
                        );

        BigDecimal balance =
                income.subtract(
                        expenses
                );

        notificationService
                .createSystemNotification(
                        user.getId(),

                        formatMonthName(
                                previousMonth
                        )
                                +
                                " Financial Summary",

                        "Income: ₹"
                                + income
                                + " • Expenses: ₹"
                                + expenses
                                + " • Net: ₹"
                                + balance
                                + ". Open Reports for the full breakdown.",

                        NotificationType
                                .MONTHLY_REPORT
                                .name()
                );
    }

    // ==========================================
    // AI Suggestions
    // ==========================================

    private void processAiSuggestion(
            User user,
            Settings settings,
            LocalDate today
    ) {
        if (
                !Boolean.TRUE.equals(
                        settings.getAiSuggestions()
                )
        ) {
            return;
        }

        LocalDate start =
                today.withDayOfMonth(
                        1
                );

        BigDecimal income =
                incomeRepository
                        .getTotalIncomeByDateRange(
                                user,
                                start,
                                today
                        );

        BigDecimal expenses =
                expenseRepository
                        .getTotalExpenseByDateRange(
                                user,
                                start,
                                today
                        );

        String message;

        if (
                income.compareTo(
                        BigDecimal.ZERO
                ) <= 0
        ) {
            message =
                    "Add your income entries to get more useful personalized financial suggestions.";
        } else {
            BigDecimal ratio =
                    expenses
                            .multiply(
                                    BigDecimal.valueOf(
                                            100
                                    )
                            )
                            .divide(
                                    income,
                                    0,
                                    RoundingMode.HALF_UP
                            );

            if (
                    ratio.compareTo(
                            BigDecimal.valueOf(
                                    80
                            )
                    ) >= 0
            ) {
                message =
                        "You have used about "
                                + ratio
                                + "% of this month's income. Consider slowing discretionary spending.";

            } else if (
                    ratio.compareTo(
                            BigDecimal.valueOf(
                                    50
                            )
                    ) >= 0
            ) {
                message =
                        "Your spending is around "
                                + ratio
                                + "% of this month's income. Review category budgets to stay on track.";

            } else {
                message =
                        "Your spending is currently below half of this month's income. Consider directing part of the remaining balance toward savings or goals.";
            }
        }

        notificationService
                .createSystemNotification(
                        user.getId(),

                        "PaisaTrack AI Suggestion",

                        message,

                        NotificationType
                                .AI_SUGGESTION
                                .name()
                );
    }

    // ==========================================
    // Helpers
    // ==========================================

    private boolean match(
            LocalTime now,
            LocalTime target
    ) {
        return target != null &&
                now.getHour()
                        == target.getHour() &&
                now.getMinute()
                        == target.getMinute();
    }

    private String formatMonthName(
            YearMonth month
    ) {
        String value =
                month.getMonth()
                        .name()
                        .toLowerCase();

        return Character
                .toUpperCase(
                        value.charAt(0)
                )
                +
                value.substring(1);
    }

    private record BudgetAlertCandidate(
            Budget budget,
            BigDecimal spent,
            BigDecimal percent
    ) {
    }
}
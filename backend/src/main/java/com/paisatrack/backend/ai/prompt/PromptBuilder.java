package com.paisatrack.backend.ai.prompt;

import com.paisatrack.backend.ai.context.model.*;
import org.springframework.stereotype.Component;

@Component
public class PromptBuilder {

    public String buildPrompt(FinancialContext context, String question) {

        StringBuilder prompt = new StringBuilder();

        prompt.append("""
You are PaisaTrack AI Advisor.

You are an AI financial assistant.

Always answer using ONLY the authenticated user's financial information.

Never invent balances.

Never invent expenses.

Never invent transactions.

Never assume missing information.

If data is unavailable, clearly mention it.

Provide practical, personalized financial advice.

======================================================

USER PROFILE

""");

        appendUser(prompt, context.getUserProfile());

        prompt.append("""

======================================================

EXPENSE SUMMARY

""");

        appendExpense(prompt, context.getExpense());

        prompt.append("""

======================================================

INCOME SUMMARY

""");

        appendIncome(prompt, context.getIncome());

        prompt.append("""

======================================================

BUDGET SUMMARY

""");

        appendBudget(prompt, context.getBudget());

        prompt.append("""

======================================================

SAVINGS SUMMARY

""");

        appendSavings(prompt, context.getSavings());

        prompt.append("""

======================================================

GOALS

""");

        appendGoal(prompt, context.getGoal());

        prompt.append("""

======================================================

USER QUESTION

""");

        prompt.append(question);

        return prompt.toString();
    }

    private void appendUser(StringBuilder sb, UserProfileContext user) {

        if (user == null) return;

        sb.append("Name : ").append(user.getName()).append("\n");
        sb.append("Email : ").append(user.getEmail()).append("\n");
        sb.append("Monthly Income : ").append(user.getMonthlyIncome()).append("\n");
        sb.append("Savings Goal : ").append(user.getSavingsGoal()).append("\n");
        sb.append("Financial Health : ").append(user.getFinancialHealth()).append("\n");
    }

    private void appendExpense(StringBuilder sb, ExpenseContext expense) {

        if (expense == null) return;

        sb.append("Total Expense : ").append(expense.getTotalExpense()).append("\n");
        sb.append("Highest Category : ").append(expense.getHighestCategory()).append("\n");
        sb.append("Transactions : ").append(expense.getTotalTransactions()).append("\n");
    }

    private void appendIncome(StringBuilder sb, IncomeContext income) {

        if (income == null) return;

        sb.append("Total Income : ").append(income.getTotalIncome()).append("\n");
        sb.append("Primary Source : ").append(income.getPrimaryIncomeSource()).append("\n");
        sb.append("Income Entries : ").append(income.getTotalIncomeEntries()).append("\n");
    }

    private void appendBudget(StringBuilder sb, BudgetContext budget) {

        if (budget == null) return;

        sb.append("Budgets : ").append(budget.getTotalBudgets()).append("\n");
        sb.append("Budget Amount : ").append(budget.getTotalBudgetAmount()).append("\n");
        sb.append("Active Budgets : ").append(budget.getActiveBudgets()).append("\n");
    }

    private void appendSavings(StringBuilder sb, SavingsContext savings) {

        if (savings == null) return;

        sb.append("Total Savings : ").append(savings.getTotalSavings()).append("\n");
        sb.append("Savings Entries : ").append(savings.getSavingsEntries()).append("\n");
    }

    private void appendGoal(StringBuilder sb, GoalContext goal) {

        if (goal == null) return;

        sb.append("Total Goals : ").append(goal.getTotalGoals()).append("\n");
        sb.append("Completed Goals : ").append(goal.getCompletedGoals()).append("\n");
        sb.append("Active Goals : ").append(goal.getActiveGoals()).append("\n");
        sb.append("Nearest Goal : ").append(goal.getNearestGoal()).append("\n");
        sb.append("Nearest Goal Progress : ")
                .append(goal.getNearestGoalProgress())
                .append("%\n");
    }

}
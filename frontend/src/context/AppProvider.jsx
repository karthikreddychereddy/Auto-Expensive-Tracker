import { AuthProvider } from "./AuthContext";
import { ExpenseProvider } from "./ExpenseContext";
import { BudgetProvider } from "./BudgetContext";
import { ReportProvider } from "./ReportContext";
import { ModalProvider } from "./ModalContext";
import { IncomeProvider } from "./IncomeContext";
import { SavingsProvider } from "./SavingsContext";
import { CategoryProvider } from "./CategoryContext";
import { GoalProvider } from "./GoalContext";
import { ProfileProvider } from "./ProfileContext";
import { SettingsProvider } from "./SettingsContext";
import { ThemeProvider } from "./ThemeContext";
import Dashboard from "../pages/Dashboard";
import { DashboardProvider } from "./DashboardContext";
import { MonthProvider } from "./MonthContext";

export default function AppProvider({ children }) {

  return (

    <AuthProvider>
      <MonthProvider>

        <DashboardProvider>

          <ExpenseProvider>

            <IncomeProvider>

              <SavingsProvider>

                <CategoryProvider>

                  <GoalProvider>

                    <ProfileProvider>

                      <SettingsProvider>

                        <BudgetProvider>

                          <ReportProvider>

                            <ThemeProvider>

                              <ModalProvider>

                                {children}

                              </ModalProvider>

                            </ThemeProvider>

                          </ReportProvider>

                        </BudgetProvider>

                      </SettingsProvider>

                    </ProfileProvider>

                  </GoalProvider>

                </CategoryProvider>

              </SavingsProvider>

            </IncomeProvider>

          </ExpenseProvider>

        </DashboardProvider>

      </MonthProvider>
    </AuthProvider>

  );

}
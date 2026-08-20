import { AuthProvider } from "./AuthContext";
import { ExpenseProvider } from "./ExpenseContext";
import { BudgetProvider } from "./BudgetContext";
import { InsightProvider } from "./InsightContext";
import { ModalProvider } from "./ModalContext";
import { IncomeProvider } from "./IncomeContext";
import { SavingsProvider } from "./SavingsContext";
import { CategoryProvider } from "./CategoryContext";
import { GoalProvider } from "./GoalContext";
import { ProfileProvider } from "./ProfileContext";
import { SettingsProvider } from "./SettingsContext";
import { ThemeProvider } from "./ThemeContext";
import { DashboardProvider } from "./DashboardContext";
import { MonthProvider } from "./MonthContext";
import { UserProvider } from "./UserContext";
import { SearchProvider } from "./SearchContext";
import { NotificationProvider } from "./NotificationContext";
import { AIProvider } from "./AIContext";

export default function AppProvider({ children }) {
  return (
    <AuthProvider>
      <AIProvider>
        <NotificationProvider>
          <SearchProvider>
            <UserProvider>
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
                                  <InsightProvider>
                                    <ThemeProvider>
                                      <ModalProvider>
                                        {children}
                                      </ModalProvider>
                                    </ThemeProvider>
                                  </InsightProvider>
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
            </UserProvider>
          </SearchProvider>
        </NotificationProvider>
      </AIProvider>
    </AuthProvider>
  );
}
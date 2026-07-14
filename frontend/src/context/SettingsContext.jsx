import { createContext, useContext, useEffect, useState } from "react";

const SettingsContext = createContext();

const defaultSettings = {
  theme: "light",
  notifications: {
    budgetAlerts: true,
    dailyReminder: true,
    monthlyReport: true,
    goalReminder: true,
  },
  ai: {
    smartSuggestions: true,
    weeklySummary: true,
    aiInsights: true,
  },
  budget: {
    warning: 70,
    critical: 90,
  },
  currency: "INR",
  language: "English",
};

export function SettingsProvider({ children }) {

  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem("settings");
    return saved ? JSON.parse(saved) : defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem(
      "settings",
      JSON.stringify(settings)
    );
  }, [settings]);

  useEffect(() => {

    if (settings.theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

  }, [settings.theme]);

  const updateTheme = (theme) => {
    setSettings(prev => ({
      ...prev,
      theme,
    }));
  };

  const updateNotifications = (key, value) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: value,
      },
    }));
  };

  const updateAI = (key, value) => {
    setSettings(prev => ({
      ...prev,
      ai: {
        ...prev.ai,
        [key]: value,
      },
    }));
  };

  const updateBudget = (key, value) => {
    setSettings(prev => ({
      ...prev,
      budget: {
        ...prev.budget,
        [key]: Number(value),
      },
    }));
  };

  const updateCurrency = (currency) => {
    setSettings(prev => ({
      ...prev,
      currency,
    }));
  };

  const updateLanguage = (language) => {
    setSettings(prev => ({
      ...prev,
      language,
    }));
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        updateTheme,
        updateNotifications,
        updateAI,
        updateBudget,
        updateCurrency,
        updateLanguage,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );

}

export const useSettings = () => useContext(SettingsContext);
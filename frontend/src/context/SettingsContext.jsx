import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import settingsService from "../services/settingsService";

const SettingsContext = createContext(null);

const defaultSettings = {
  theme: "light",

  notifications: {
    budgetAlerts: true,
    dailyReminder: true,
    monthlyReport: true,
    goalReminder: true,
    aiSuggestions: true,
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

  receipt: {
    enabled: true,
    autoCrop: true,
    autoCategorize: true,
    highQuality: true,
    saveImages: false,
  },

  sms: {
    smsTracking: true,
    autoExpense: true,
    instantNotification: true,
    syncHistory: false,
    bankMessagesOnly: true,
  },

  backup: {
    autoBackup: true,
    frequency: "Daily",
  },
};

export function SettingsProvider({ children }) {

  const [settings, setSettings] =
    useState(defaultSettings);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    loadSettings();

  }, []);

  useEffect(() => {

    const root =
      document.documentElement;

    root.classList.remove(
      "light",
      "dark"
    );

    if (settings.theme === "dark") {

      root.classList.add("dark");

    }
    else {

      root.classList.add("light");

    }

  }, [settings.theme]);

  const loadSettings = async () => {

    try {

      const data =
        await settingsService.getSettings();

      setSettings({

        ...defaultSettings,

        currency:
          data.currency,

        language:
          data.language,

        budget: {

          warning:
            data.budgetWarning,

          critical:
            data.budgetCritical,

        },

        notifications: {

          budgetAlerts:
            data.budgetAlerts,

          dailyReminder:
            data.dailyReminder,

          monthlyReport:
            data.monthlyReport,

          goalReminder:
            data.goalReminder,

          aiSuggestions:
            data.aiSuggestions,

        },

        ai: {

          smartSuggestions:
            data.smartSuggestions,

          weeklySummary:
            data.weeklySummary,

          aiInsights:
            data.aiInsights,

        },

        receipt: {

          enabled:
            data.receiptEnabled,

          autoCrop:
            data.autoCrop,

          autoCategorize:
            data.autoCategorize,

          highQuality:
            data.highQuality,

          saveImages:
            data.saveImages,

        },

        sms: {

          smsTracking:
            data.smsTracking,

          autoExpense:
            data.autoExpense,

          instantNotification:
            data.instantNotification,

          syncHistory:
            data.syncHistory,

          bankMessagesOnly:
            data.bankMessagesOnly,

        },

        backup: {

          autoBackup:
            data.autoBackup,

          frequency:
            data.backupFrequency,

        },

      });

    }
    catch (error) {

      console.error(
        "Failed to load settings",
        error
      );

    }
    finally {

      setLoading(false);

    }

  };
    const updateTheme = (theme) => {
    setSettings((prev) => ({
      ...prev,
      theme,
    }));
  };

  const updateNotifications = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: value,
      },
    }));
  };

  const updateAI = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      ai: {
        ...prev.ai,
        [key]: value,
      },
    }));
  };

  const updateBudget = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      budget: {
        ...prev.budget,
        [key]: Number(value),
      },
    }));
  };

  const updateCurrency = (currency) => {
    setSettings((prev) => ({
      ...prev,
      currency,
    }));
  };

  const updateLanguage = (language) => {
    setSettings((prev) => ({
      ...prev,
      language,
    }));
  };

  const updateReceipt = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      receipt: {
        ...prev.receipt,
        [key]: value,
      },
    }));
  };

  const updateSMS = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      sms: {
        ...prev.sms,
        [key]: value,
      },
    }));
  };

  const updateBackup = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      backup: {
        ...prev.backup,
        [key]: value,
      },
    }));
  };

  const saveSettings = async () => {

    try {

      const payload = {

        currency: settings.currency,
        language: settings.language,

        budgetWarning: settings.budget.warning,
        budgetCritical: settings.budget.critical,

        budgetAlerts: settings.notifications.budgetAlerts,
        dailyReminder: settings.notifications.dailyReminder,
        monthlyReport: settings.notifications.monthlyReport,
        goalReminder: settings.notifications.goalReminder,
        aiSuggestions: settings.notifications.aiSuggestions,

        smartSuggestions: settings.ai.smartSuggestions,
        weeklySummary: settings.ai.weeklySummary,
        aiInsights: settings.ai.aiInsights,

        receiptEnabled: settings.receipt.enabled,
        autoCrop: settings.receipt.autoCrop,
        autoCategorize: settings.receipt.autoCategorize,
        highQuality: settings.receipt.highQuality,
        saveImages: settings.receipt.saveImages,

        smsTracking: settings.sms.smsTracking,
        autoExpense: settings.sms.autoExpense,
        instantNotification: settings.sms.instantNotification,
        syncHistory: settings.sms.syncHistory,
        bankMessagesOnly: settings.sms.bankMessagesOnly,

        autoBackup: settings.backup.autoBackup,
        backupFrequency: settings.backup.frequency,

      };

      const data =
        await settingsService.updateSettings(payload);

      console.log(
        "Settings Saved",
        data
      );

      return true;

    }
    catch (error) {

      console.error(
        "Failed to save settings",
        error
      );

      return false;

    }

  };

  const changePassword = async (payload) => {

    try {

      return await settingsService.changePassword(
        payload
      );

    }
    catch (error) {

      console.error(error);

      throw error;

    }

  };

  const resetSettings = async () => {

    try {

      setSettings(defaultSettings);

      await settingsService.updateSettings({

        currency: "INR",
        language: "English",

        budgetWarning: 70,
        budgetCritical: 90,

        budgetAlerts: true,
        dailyReminder: true,
        monthlyReport: true,
        goalReminder: true,
        aiSuggestions: true,

        smartSuggestions: true,
        weeklySummary: true,
        aiInsights: true,

        receiptEnabled: true,
        autoCrop: true,
        autoCategorize: true,
        highQuality: true,
        saveImages: false,

        smsTracking: true,
        autoExpense: true,
        instantNotification: true,
        syncHistory: false,
        bankMessagesOnly: true,

        autoBackup: true,
        backupFrequency: "Daily",

      });

      return true;

    } catch (error) {

      console.error("Failed to reset settings", error);

      return false;

    }

  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        loading,

        loadSettings,

        updateTheme,
        updateNotifications,
        updateAI,
        updateBudget,
        updateCurrency,
        updateLanguage,
        updateReceipt,
        updateSMS,
        updateBackup,

        saveSettings,
        resetSettings,
        changePassword,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );

}

export const useSettings = () =>
  useContext(SettingsContext);
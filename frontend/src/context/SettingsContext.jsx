import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import settingsService from "../services/settingsService";

import {
  useAuth,
} from "./AuthContext";

const SettingsContext =
  createContext(null);

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

function mapBackendSettings(
  data,
  previousTheme = "light"
) {
  return {
    ...defaultSettings,

    theme:
      previousTheme ||
      defaultSettings.theme,

    currency:
      data?.currency ??
      defaultSettings.currency,

    language:
      data?.language ??
      defaultSettings.language,

    budget: {
      warning:
        data?.budgetWarning ??
        defaultSettings.budget.warning,

      critical:
        data?.budgetCritical ??
        defaultSettings.budget.critical,
    },

    notifications: {
      budgetAlerts:
        data?.budgetAlerts ??
        defaultSettings.notifications.budgetAlerts,

      dailyReminder:
        data?.dailyReminder ??
        defaultSettings.notifications.dailyReminder,

      monthlyReport:
        data?.monthlyReport ??
        defaultSettings.notifications.monthlyReport,

      goalReminder:
        data?.goalReminder ??
        defaultSettings.notifications.goalReminder,

      aiSuggestions:
        data?.aiSuggestions ??
        defaultSettings.notifications.aiSuggestions,
    },

    ai: {
      smartSuggestions:
        data?.smartSuggestions ??
        defaultSettings.ai.smartSuggestions,

      weeklySummary:
        data?.weeklySummary ??
        defaultSettings.ai.weeklySummary,

      aiInsights:
        data?.aiInsights ??
        defaultSettings.ai.aiInsights,
    },

    receipt: {
      enabled:
        data?.receiptEnabled ??
        defaultSettings.receipt.enabled,

      autoCrop:
        data?.autoCrop ??
        defaultSettings.receipt.autoCrop,

      autoCategorize:
        data?.autoCategorize ??
        defaultSettings.receipt.autoCategorize,

      highQuality:
        data?.highQuality ??
        defaultSettings.receipt.highQuality,

      saveImages:
        data?.saveImages ??
        defaultSettings.receipt.saveImages,
    },

    sms: {
      smsTracking:
        data?.smsTracking ??
        defaultSettings.sms.smsTracking,

      autoExpense:
        data?.autoExpense ??
        defaultSettings.sms.autoExpense,

      instantNotification:
        data?.instantNotification ??
        defaultSettings.sms.instantNotification,

      syncHistory:
        data?.syncHistory ??
        defaultSettings.sms.syncHistory,

      bankMessagesOnly:
        data?.bankMessagesOnly ??
        defaultSettings.sms.bankMessagesOnly,
    },

    backup: {
      autoBackup:
        data?.autoBackup ??
        defaultSettings.backup.autoBackup,

      frequency:
        data?.backupFrequency ??
        defaultSettings.backup.frequency,
    },
  };
}

export function SettingsProvider({
  children,
}) {
  const {
    user,
  } = useAuth();

  const [
    settings,
    setSettings,
  ] = useState(() => ({
    ...defaultSettings,
    theme:
      localStorage.getItem("pt_theme") ||
      defaultSettings.theme,
  }));

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    saving,
    setSaving,
  ] = useState(false);

  const budgetTimerRef =
    useRef(null);

  // ==========================================
  // LOAD SETTINGS
  // ==========================================

  const loadSettings =
    useCallback(async () => {
      if (!user) {
        setSettings(
          previous => ({
            ...defaultSettings,

            theme:
              previous.theme ||
              defaultSettings.theme,
          })
        );

        setLoading(false);

        return;
      }

      try {
        setLoading(true);

        const data =
          await settingsService
            .getSettings();

        setSettings(
          previous =>
            mapBackendSettings(
              data,
              previous.theme
            )
        );

      } catch (error) {
        console.error(
          "Failed to load settings:",
          error
        );

      } finally {
        setLoading(false);
      }
    }, [
      user,
    ]);

  useEffect(() => {
    loadSettings();
  }, [
    loadSettings,
  ]);

  // ==========================================
  // THEME
  // ==========================================

  useEffect(() => {
    const root =
      document.documentElement;

    const mediaQuery =
      window.matchMedia(
        "(prefers-color-scheme: dark)"
      );

    const applyTheme = () => {
      const shouldUseDark =
        settings.theme === "dark" ||
        (
          settings.theme === "system" &&
          mediaQuery.matches
        );

      root.classList.toggle(
        "dark",
        shouldUseDark
      );

      root.classList.toggle(
        "light",
        !shouldUseDark
      );

      root.style.colorScheme =
        shouldUseDark
          ? "dark"
          : "light";
    };

    localStorage.setItem(
      "pt_theme",
      settings.theme
    );

    applyTheme();

    if (
      settings.theme !== "system"
    ) {
      return undefined;
    }

    const handleSystemThemeChange =
      () => applyTheme();

    mediaQuery.addEventListener(
      "change",
      handleSystemThemeChange
    );

    return () => {
      mediaQuery.removeEventListener(
        "change",
        handleSystemThemeChange
      );
    };
  }, [
    settings.theme,
  ]);

  // ==========================================
  // REMINDER SYNCHRONIZATION
  // ==========================================

  useEffect(() => {
    const handleReminderSettingsUpdated =
      event => {
        const enabled =
          event?.detail?.enabled;

        if (
          typeof enabled !==
          "boolean"
        ) {
          return;
        }

        setSettings(
          previous => ({
            ...previous,

            notifications: {
              ...previous.notifications,

              dailyReminder:
                enabled,
            },
          })
        );
      };

    window.addEventListener(
      "notification-reminder-settings-updated",
      handleReminderSettingsUpdated
    );

    return () => {
      window.removeEventListener(
        "notification-reminder-settings-updated",
        handleReminderSettingsUpdated
      );
    };
  }, []);

  // ==========================================
  // PARTIAL BACKEND UPDATE
  // ==========================================

  const persistPatch =
    useCallback(
      async payload => {
        if (!user) {
          return null;
        }

        try {
          setSaving(true);

          return await settingsService
            .updateSettings(
              payload
            );

        } catch (error) {
          console.error(
            "Failed to persist settings:",
            error
          );

          throw error;

        } finally {
          setSaving(false);
        }
      },
      [
        user,
      ]
    );

  // ==========================================
  // THEME
  // ==========================================

  const updateTheme =
    theme => {
      setSettings(
        previous => ({
          ...previous,
          theme,
        })
      );
    };

  // ==========================================
  // CURRENCY
  // ==========================================

  const updateCurrency =
    async currency => {
      const previous =
        settings.currency;

      setSettings(
        current => ({
          ...current,
          currency,
        })
      );

      try {
        await persistPatch({
          currency,
        });

      } catch {
        setSettings(
          current => ({
            ...current,
            currency:
              previous,
          })
        );
      }
    };

  // ==========================================
  // LANGUAGE
  // ==========================================

  const updateLanguage =
    async language => {
      const previous =
        settings.language;

      setSettings(
        current => ({
          ...current,
          language,
        })
      );

      try {
        await persistPatch({
          language,
        });

      } catch {
        setSettings(
          current => ({
            ...current,
            language:
              previous,
          })
        );
      }
    };

  // ==========================================
  // AI
  // ==========================================

  const updateAI =
    async (
      key,
      value
    ) => {
      const previous =
        settings.ai?.[key];

      setSettings(
        current => ({
          ...current,

          ai: {
            ...current.ai,
            [key]: value,
          },
        })
      );

      const fieldMap = {
        smartSuggestions:
          "smartSuggestions",

        weeklySummary:
          "weeklySummary",

        aiInsights:
          "aiInsights",
      };

      const backendField =
        fieldMap[key];

      if (!backendField) {
        return;
      }

      try {
        await persistPatch({
          [backendField]:
            value,
        });

      } catch {
        setSettings(
          current => ({
            ...current,

            ai: {
              ...current.ai,
              [key]:
                previous,
            },
          })
        );
      }
    };

  // ==========================================
  // RECEIPT
  // ==========================================

  const updateReceipt =
    async (
      key,
      value
    ) => {
      const previous =
        settings.receipt?.[key];

      setSettings(
        current => ({
          ...current,

          receipt: {
            ...current.receipt,
            [key]: value,
          },
        })
      );

      const fieldMap = {
        enabled:
          "receiptEnabled",

        autoCrop:
          "autoCrop",

        autoCategorize:
          "autoCategorize",

        highQuality:
          "highQuality",

        saveImages:
          "saveImages",
      };

      const backendField =
        fieldMap[key];

      if (!backendField) {
        return;
      }

      try {
        await persistPatch({
          [backendField]:
            value,
        });

      } catch {
        setSettings(
          current => ({
            ...current,

            receipt: {
              ...current.receipt,

              [key]:
                previous,
            },
          })
        );
      }
    };

  // ==========================================
  // BUDGET
  // ==========================================

  const updateBudget =
    (
      key,
      value
    ) => {
      const numberValue =
        Number(value);

      setSettings(
        previous => ({
          ...previous,

          budget: {
            ...previous.budget,

            [key]:
              numberValue,
          },
        })
      );

      if (
        budgetTimerRef.current
      ) {
        clearTimeout(
          budgetTimerRef.current
        );
      }

      budgetTimerRef.current =
        setTimeout(
          async () => {
            try {
              if (
                key ===
                "warning"
              ) {
                await persistPatch({
                  budgetWarning:
                    numberValue,
                });
              }

              if (
                key ===
                "critical"
              ) {
                await persistPatch({
                  budgetCritical:
                    numberValue,
                });
              }

            } catch (error) {
              console.error(
                "Failed to save budget preference:",
                error
              );

              await loadSettings();
            }
          },
          500
        );
    };

  useEffect(() => {
    return () => {
      if (
        budgetTimerRef.current
      ) {
        clearTimeout(
          budgetTimerRef.current
        );
      }
    };
  }, []);

  // ==========================================
  // NOTIFICATIONS
  //
  // Kept local until Save Changes is pressed.
  // ==========================================

  const updateNotifications =
    (
      key,
      value
    ) => {
      setSettings(
        previous => ({
          ...previous,

          notifications: {
            ...previous.notifications,
            [key]: value,
          },
        })
      );
    };

  // ==========================================
  // SMS
  // ==========================================

  const updateSMS =
    (
      key,
      value
    ) => {
      setSettings(
        previous => ({
          ...previous,

          sms: {
            ...previous.sms,
            [key]: value,
          },
        })
      );
    };

  // ==========================================
  // BACKUP
  // ==========================================

  const updateBackup =
    (
      key,
      value
    ) => {
      setSettings(
        previous => ({
          ...previous,

          backup: {
            ...previous.backup,
            [key]: value,
          },
        })
      );
    };

  // ==========================================
  // BUILD COMPLETE PAYLOAD
  // ==========================================

  const buildSettingsPayload =
    currentSettings => ({
      currency:
        currentSettings.currency,

      language:
        currentSettings.language,

      budgetWarning:
        currentSettings.budget
          .warning,

      budgetCritical:
        currentSettings.budget
          .critical,

      budgetAlerts:
        currentSettings.notifications
          .budgetAlerts,

      dailyReminder:
        currentSettings.notifications
          .dailyReminder,

      monthlyReport:
        currentSettings.notifications
          .monthlyReport,

      goalReminder:
        currentSettings.notifications
          .goalReminder,

      aiSuggestions:
        currentSettings.notifications
          .aiSuggestions,

      smartSuggestions:
        currentSettings.ai
          .smartSuggestions,

      weeklySummary:
        currentSettings.ai
          .weeklySummary,

      aiInsights:
        currentSettings.ai
          .aiInsights,

      receiptEnabled:
        currentSettings.receipt
          .enabled,

      autoCrop:
        currentSettings.receipt
          .autoCrop,

      autoCategorize:
        currentSettings.receipt
          .autoCategorize,

      highQuality:
        currentSettings.receipt
          .highQuality,

      saveImages:
        currentSettings.receipt
          .saveImages,

      smsTracking:
        currentSettings.sms
          .smsTracking,

      autoExpense:
        currentSettings.sms
          .autoExpense,

      instantNotification:
        currentSettings.sms
          .instantNotification,

      syncHistory:
        currentSettings.sms
          .syncHistory,

      bankMessagesOnly:
        currentSettings.sms
          .bankMessagesOnly,

      autoBackup:
        currentSettings.backup
          .autoBackup,

      backupFrequency:
        currentSettings.backup
          .frequency,
    });

  // ==========================================
  // SAVE COMPLETE SETTINGS
  // ==========================================

  const saveSettings =
    async () => {
      if (
        settings.budget.warning <
          1 ||
        settings.budget.warning >
          100
      ) {
        throw new Error(
          "Budget warning must be between 1 and 100."
        );
      }

      if (
        settings.budget.critical <
          1 ||
        settings.budget.critical >
          100
      ) {
        throw new Error(
          "Budget critical threshold must be between 1 and 100."
        );
      }

      if (
        settings.budget.critical <
        settings.budget.warning
      ) {
        throw new Error(
          "Critical threshold cannot be lower than warning threshold."
        );
      }

      try {
        const payload =
          buildSettingsPayload(
            settings
          );

        const data =
          await settingsService
            .updateSettings(
              payload
            );

        window.dispatchEvent(
          new CustomEvent(
            "settings-daily-reminder-updated",
            {
              detail: {
                enabled:
                  Boolean(
                    data?.dailyReminder
                  ),
              },
            }
          )
        );

        return true;

      } catch (error) {
        console.error(
          "Failed to save settings:",
          error
        );

        throw error;
      }
    };

  // ==========================================
  // RESET NOTIFICATIONS
  // ==========================================

  const resetNotificationSettings =
    async () => {
      const previousNotifications =
        settings.notifications;

      const resetNotifications = {
        ...defaultSettings.notifications,
      };

      const updatedSettings = {
        ...settings,

        notifications:
          resetNotifications,
      };

      try {
        setSettings(
          updatedSettings
        );

        await settingsService
          .updateSettings(
            buildSettingsPayload(
              updatedSettings
            )
          );

        window.dispatchEvent(
          new CustomEvent(
            "settings-daily-reminder-updated",
            {
              detail: {
                enabled:
                  resetNotifications
                    .dailyReminder,
              },
            }
          )
        );

        return true;

      } catch (error) {
        console.error(
          "Failed to reset notification settings:",
          error
        );

        setSettings(
          previous => ({
            ...previous,

            notifications:
              previousNotifications,
          })
        );

        return false;
      }
    };

  // ==========================================
  // RESET EVERYTHING
  // ==========================================

  const resetSettings =
    async () => {
      const previousSettings =
        settings;

      const resetValue = {
        ...defaultSettings,

        theme:
          settings.theme,

        notifications: {
          ...defaultSettings.notifications,
        },

        ai: {
          ...defaultSettings.ai,
        },

        budget: {
          ...defaultSettings.budget,
        },

        receipt: {
          ...defaultSettings.receipt,
        },

        sms: {
          ...defaultSettings.sms,
        },

        backup: {
          ...defaultSettings.backup,
        },
      };

      try {
        setSettings(
          resetValue
        );

        await settingsService
          .updateSettings(
            buildSettingsPayload(
              resetValue
            )
          );

        return true;

      } catch (error) {
        console.error(
          "Failed to reset settings:",
          error
        );

        setSettings(
          previousSettings
        );

        return false;
      }
    };

  // ==========================================
  // CHANGE PASSWORD
  // ==========================================

  const changePassword =
    async payload => {
      try {
        return await settingsService
          .changePassword(
            payload
          );

      } catch (error) {
        console.error(
          "Failed to change password:",
          error
        );

        throw error;
      }
    };

  return (
    <SettingsContext.Provider
      value={{
        settings,

        loading,
        saving,

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

        resetNotificationSettings,

        resetSettings,

        changePassword,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings =
  () => {
    const context =
      useContext(
        SettingsContext
      );

    if (!context) {
      throw new Error(
        "useSettings must be used within SettingsProvider"
      );
    }

    return context;
  };
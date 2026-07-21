import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

import { notificationSettingService } from "../services/notificationSettingService";
import { useAuth } from "./AuthContext";

const NotificationSettingContext = createContext(null);

export function NotificationSettingProvider({ children }) {

  const { user } = useAuth();

  const [settings, setSettings] = useState(null);

  const [loading, setLoading] = useState(false);

  // ==========================================
  // Fetch Settings
  // ==========================================

  const fetchSettings = useCallback(async () => {

    if (!user) return;

    setLoading(true);

    try {

      const data =
        await notificationSettingService.getSettings();

      setSettings(data);

    } catch (error) {

      console.error(
        "Failed to load notification settings",
        error
      );

    } finally {

      setLoading(false);

    }

  }, [user]);

  // ==========================================
  // Update Settings
  // ==========================================

  const updateSettings = async (payload) => {

    try {

      setLoading(true);

      const updated =
        await notificationSettingService.updateSettings(
          payload
        );

      setSettings(updated);

      return true;

    } catch (error) {

      console.error(
        "Failed to update notification settings",
        error
      );

      return false;

    } finally {

      setLoading(false);

    }

  };

  // ==========================================
  // Initial Load
  // ==========================================

  useEffect(() => {

    if (!user) {

      setSettings(null);

      return;

    }

    fetchSettings();

  }, [user, fetchSettings]);

  return (

    <NotificationSettingContext.Provider
      value={{

        settings,

        loading,

        fetchSettings,

        updateSettings,

      }}
    >

      {children}

    </NotificationSettingContext.Provider>

  );

}

export function useNotificationSettings() {

  return useContext(NotificationSettingContext);

}
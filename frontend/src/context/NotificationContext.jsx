import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

import { notificationService } from "../services/notificationService";
import { useAuth } from "./AuthContext";

const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {

  const { user } = useAuth();

  const [notifications, setNotifications] = useState([]);

  const [unreadCount, setUnreadCount] = useState(0);

  const [settings, setSettings] = useState(null);

  const [loading, setLoading] = useState(false);

  const [savingSettings, setSavingSettings] =
    useState(false);

  // ==========================================
  // Fetch Notifications
  // ==========================================

  const fetchNotifications = useCallback(async () => {

    if (!user) return;

    setLoading(true);

    try {

      const data =
        await notificationService.getNotifications();

      setNotifications(data);

    } catch (error) {

      console.error(
        "Failed to fetch notifications",
        error
      );

    } finally {

      setLoading(false);

    }

  }, [user]);

  // ==========================================
  // Fetch Unread Count
  // ==========================================

  const fetchUnreadCount = useCallback(async () => {

    if (!user) return;

    try {

      const count =
        await notificationService.getUnreadCount();

      setUnreadCount(count);

    } catch (error) {

      console.error(
        "Failed to fetch unread count",
        error
      );

    }

  }, [user]);

  // ==========================================
  // Fetch Notification Settings
  // ==========================================

  const fetchSettings = useCallback(async () => {

    if (!user) return;

    try {

      const data =
        await notificationService.getSettings();

      setSettings(data);

    } catch (error) {

      console.error(
        "Failed to fetch notification settings",
        error
      );

    }

  }, [user]);

  // ==========================================
  // Save Notification Settings
  // ==========================================

  const saveSettings = async (payload) => {

    setSavingSettings(true);

    try {

      const updated =
        await notificationService.updateSettings(
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

      setSavingSettings(false);

    }

  };

  // ==========================================
  // Mark Notification Read
  // ==========================================

  const markAsRead = async (id) => {

    try {

      await notificationService.markAsRead(id);

      setNotifications((prev) =>
        prev.filter((notification) => notification.id !== id)
      );

      setUnreadCount((prev) => Math.max(prev - 1, 0));

    } catch (error) {

      console.error(
        "Failed to mark notification as read",
        error
      );

    }

  };

  const markAllAsRead = async () => {

    try {

      await notificationService.markAllAsRead();

      setNotifications([]);

      setUnreadCount(0);

    } catch (error) {

      console.error(error);

    }

  };

  // ==========================================
  // Delete Notification
  // ==========================================

  const deleteNotification = async (id) => {

    try {

      await notificationService.deleteNotification(id);

      setNotifications((prev) =>
        prev.filter((notification) =>
          notification.id !== id
        )
      );

      setUnreadCount((prev) =>
        Math.max(
          prev -
            (
              notifications.find(
                (notification) =>
                  notification.id === id &&
                  !notification.read
              )
                ? 1
                : 0
            ),
          0
        )
      );

    } catch (error) {

      console.error(
        "Failed to delete notification",
        error
      );

    }

  };
    // ==========================================
  // Initial Load
  // ==========================================

  useEffect(() => {

    if (!user) {

      setNotifications([]);

      setUnreadCount(0);

      setSettings(null);

      return;

    }

    fetchNotifications();

    fetchUnreadCount();

    fetchSettings();

  }, [
    user,
    fetchNotifications,
    fetchUnreadCount,
    fetchSettings,
  ]);

  // ==========================================
  // Auto Refresh Every 30 sec
  // ==========================================

  useEffect(() => {

    fetchNotifications();

    fetchUnreadCount();

    const interval = setInterval(() => {

      fetchNotifications();

      fetchUnreadCount();

    }, 5000);

    return () => clearInterval(interval);

  }, [
    user,
    fetchNotifications,
    fetchUnreadCount,
  ]);
  useEffect(() => {

      const handleFocus = () => {

          fetchNotifications();

          fetchUnreadCount();

      };

      window.addEventListener("focus", handleFocus);

      return () => {

          window.removeEventListener(
              "focus",
              handleFocus
          );

      };

  }, []);
  useEffect(() => {

      const handleVisibility = () => {

          if (!document.hidden) {

              fetchNotifications();

              fetchUnreadCount();

          }

      };

      document.addEventListener(
          "visibilitychange",
          handleVisibility
      );

      return () => {

          document.removeEventListener(
              "visibilitychange",
              handleVisibility
          );

      };

  }, []);

  return (

    <NotificationContext.Provider
      value={{

        // Notifications
        notifications,
        unreadCount,
        loading,

        // Notification Settings
        settings,
        savingSettings,

        // Notification APIs
        fetchNotifications,
        fetchUnreadCount,
        markAsRead,
        markAllAsRead,
        deleteNotification,

        // Settings APIs
        fetchSettings,
        saveSettings,

      }}
    >

      {children}

    </NotificationContext.Provider>

  );

}

export function useNotifications() {

  const context = useContext(NotificationContext);

  if (!context) {

    throw new Error(
      "useNotifications must be used within NotificationProvider"
    );

  }

  return context;

}
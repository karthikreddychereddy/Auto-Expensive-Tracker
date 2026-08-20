import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  notificationService,
} from "../services/notificationService";

import {
  useAuth,
} from "./AuthContext";

const NotificationContext =
  createContext(null);

export function NotificationProvider({
  children,
}) {
  const {
    user,
  } = useAuth();

  const [
    notifications,
    setNotifications,
  ] = useState([]);

  const [
    unreadCount,
    setUnreadCount,
  ] = useState(0);

  const [
    settings,
    setSettings,
  ] = useState(null);

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    savingSettings,
    setSavingSettings,
  ] = useState(false);

  // ==========================================
  // FETCH UNREAD NOTIFICATIONS ONLY
  // ==========================================

  const fetchNotifications =
    useCallback(async () => {
      if (!user) {
        setNotifications([]);
        return;
      }

      setLoading(true);

      try {
        const data =
          await notificationService
            .getNotifications();

        const allNotifications =
          Array.isArray(data)
            ? data
            : [];

        /*
         * Notification panel should contain
         * unread notifications only.
         */
        const unreadNotifications =
          allNotifications.filter(
            notification =>
              !notification.read
          );

        setNotifications(
          unreadNotifications
        );

        /*
         * Keep badge synchronized with
         * actual unread list.
         */
        setUnreadCount(
          unreadNotifications.length
        );

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
  // FETCH UNREAD COUNT
  // ==========================================

  const fetchUnreadCount =
    useCallback(async () => {
      if (!user) {
        setUnreadCount(0);
        return;
      }

      try {
        const count =
          await notificationService
            .getUnreadCount();

        setUnreadCount(
          Number(count) || 0
        );

      } catch (error) {
        console.error(
          "Failed to fetch unread count",
          error
        );
      }
    }, [user]);

  // ==========================================
  // FETCH SETTINGS
  // ==========================================

  const fetchSettings =
    useCallback(async () => {
      if (!user) {
        setSettings(null);
        return;
      }

      try {
        const data =
          await notificationService
            .getSettings();

        setSettings(data);

      } catch (error) {
        console.error(
          "Failed to fetch notification settings",
          error
        );
      }
    }, [user]);

  // ==========================================
  // SAVE SETTINGS
  // ==========================================

  const saveSettings =
    async payload => {
      setSavingSettings(true);

      try {
        const updated =
          await notificationService
            .updateSettings(
              payload
            );

        setSettings(updated);

        window.dispatchEvent(
          new CustomEvent(
            "notification-reminder-settings-updated",
            {
              detail: {
                enabled:
                  Boolean(
                    updated?.enabled
                  ),
              },
            }
          )
        );

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
  // MARK ONE AS READ
  // ==========================================

  const markAsRead =
    async id => {
      try {
        const target =
          notifications.find(
            notification =>
              notification.id ===
              id
          );

        await notificationService
          .markAsRead(id);

        /*
         * Remove immediately from panel.
         */
        setNotifications(
          previous =>
            previous.filter(
              notification =>
                notification.id !==
                id
            )
        );

        if (target) {
          setUnreadCount(
            previous =>
              Math.max(
                previous - 1,
                0
              )
          );
        }

        return true;

      } catch (error) {
        console.error(
          "Failed to mark notification as read",
          error
        );

        return false;
      }
    };

  // ==========================================
  // MARK ALL AS READ
  // ==========================================

  const markAllAsRead =
    async () => {
      try {
        await notificationService
          .markAllAsRead();

        /*
         * All notifications disappear
         * immediately from dropdown.
         */
        setNotifications([]);

        setUnreadCount(0);

        return true;

      } catch (error) {
        console.error(
          "Failed to mark all notifications as read",
          error
        );

        return false;
      }
    };

  // ==========================================
  // DELETE NOTIFICATION
  // ==========================================

  const deleteNotification =
    async id => {
      try {
        const target =
          notifications.find(
            notification =>
              notification.id ===
              id
          );

        await notificationService
          .deleteNotification(id);

        setNotifications(
          previous =>
            previous.filter(
              notification =>
                notification.id !==
                id
            )
        );

        if (target) {
          setUnreadCount(
            previous =>
              Math.max(
                previous - 1,
                0
              )
          );
        }

        return true;

      } catch (error) {
        console.error(
          "Failed to delete notification",
          error
        );

        return false;
      }
    };

  // ==========================================
  // USER INITIAL LOAD
  // ==========================================

  useEffect(() => {
    if (!user) {
      setNotifications([]);
      setUnreadCount(0);
      setSettings(null);

      return;
    }

    fetchNotifications();

    fetchSettings();

  }, [
    user,
    fetchNotifications,
    fetchSettings,
  ]);

  // ==========================================
  // PERIODIC REFRESH
  // ==========================================

  useEffect(() => {
    if (!user) {
      return undefined;
    }

    const interval =
      setInterval(() => {
        fetchNotifications();
      }, 30000);

    return () =>
      clearInterval(
        interval
      );

  }, [
    user,
    fetchNotifications,
  ]);

  // ==========================================
  // REFRESH WHEN APP GAINS FOCUS
  // ==========================================

  useEffect(() => {
    if (!user) {
      return undefined;
    }

    const refresh = () => {
      fetchNotifications();
    };

    const handleVisibility =
      () => {
        if (
          !document.hidden
        ) {
          refresh();
        }
      };

    window.addEventListener(
      "focus",
      refresh
    );

    document.addEventListener(
      "visibilitychange",
      handleVisibility
    );

    return () => {
      window.removeEventListener(
        "focus",
        refresh
      );

      document.removeEventListener(
        "visibilitychange",
        handleVisibility
      );
    };

  }, [
    user,
    fetchNotifications,
  ]);

  return (
    <NotificationContext.Provider
      value={{
        notifications,

        unreadCount,

        loading,

        settings,

        savingSettings,

        fetchNotifications,

        fetchUnreadCount,

        markAsRead,

        markAllAsRead,

        deleteNotification,

        fetchSettings,

        saveSettings,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context =
    useContext(
      NotificationContext
    );

  if (!context) {
    throw new Error(
      "useNotifications must be used within NotificationProvider"
    );
  }

  return context;
}
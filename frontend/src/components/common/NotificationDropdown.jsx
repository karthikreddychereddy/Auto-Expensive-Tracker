import {
  FaBell,
  FaWallet,
  FaMoneyBillWave,
  FaSun,
  FaCloudSun,
  FaCloudMoon,
  FaMoon,
  FaClock,
  FaCheckCircle,
  FaCog,
} from "react-icons/fa";

import {
  useNavigate,
} from "react-router-dom";

import {
  useNotifications,
} from "../../context/NotificationContext";

export default function NotificationDropdown({
  onClose,
  onOpenSettings,
}) {
  const navigate =
    useNavigate();

  const {
    notifications,
    unreadCount,
    loading,
    markAsRead,
    markAllAsRead,
  } = useNotifications();

  // ==========================================
  // OPEN EXPENSE
  // ==========================================

  const openExpense =
    async notification => {
      await markAsRead(
        notification.id
      );

      onClose?.();

      navigate(
        "/expenses"
      );
    };

  // ==========================================
  // OPEN INCOME
  // ==========================================

  const openIncome =
    async notification => {
      await markAsRead(
        notification.id
      );

      onClose?.();

      navigate(
        "/income"
      );
    };

  // ==========================================
  // MARK READ
  // ==========================================

  const readNotification =
    async notification => {
      await markAsRead(
        notification.id
      );
    };

  // ==========================================
  // MARK ALL READ
  // ==========================================

  const handleMarkAllRead =
    async () => {
      await markAllAsRead();
    };

  // ==========================================
  // REMINDER ICON
  // ==========================================

  const getReminderIcon =
    type => {
      switch (type) {
        case "MORNING_REMINDER":
          return (
            <FaSun className="text-xl text-yellow-500" />
          );

        case "AFTERNOON_REMINDER":
          return (
            <FaCloudSun className="text-xl text-orange-500" />
          );

        case "EVENING_REMINDER":
          return (
            <FaCloudMoon className="text-xl text-purple-500" />
          );

        case "NIGHT_REMINDER":
          return (
            <FaMoon className="text-xl text-blue-500" />
          );

        default:
          return (
            <FaBell className="text-xl text-slate-500" />
          );
      }
    };

  // ==========================================
  // CARD STYLE
  // ==========================================

  const getCardStyle =
    notification => {
      switch (
        notification.type
      ) {
        case "MORNING_REMINDER":
          return "bg-yellow-50 dark:bg-yellow-900/10";

        case "AFTERNOON_REMINDER":
          return "bg-orange-50 dark:bg-orange-900/10";

        case "EVENING_REMINDER":
          return "bg-purple-50 dark:bg-purple-900/10";

        case "NIGHT_REMINDER":
          return "bg-blue-50 dark:bg-blue-900/10";

        default:
          return "bg-white dark:bg-slate-800";
      }
    };

  // ==========================================
  // FORMAT DATE
  // ==========================================

  const formatDate =
    date => {
      const value =
        new Date(date);

      const today =
        new Date();

      const yesterday =
        new Date();

      yesterday.setDate(
        today.getDate() - 1
      );

      const sameDay =
        (a, b) =>
          a.getDate() ===
            b.getDate() &&
          a.getMonth() ===
            b.getMonth() &&
          a.getFullYear() ===
            b.getFullYear();

      const time =
        value.toLocaleTimeString(
          [],
          {
            hour:
              "2-digit",
            minute:
              "2-digit",
          }
        );

      if (
        sameDay(
          value,
          today
        )
      ) {
        return `Today • ${time}`;
      }

      if (
        sameDay(
          value,
          yesterday
        )
      ) {
        return `Yesterday • ${time}`;
      }

      return (
        value.toLocaleDateString(
          [],
          {
            day:
              "numeric",
            month:
              "short",
            year:
              "numeric",
          }
        ) +
        ` • ${time}`
      );
    };

  // ==========================================
  // DATE GROUPS
  // ==========================================

  const isToday =
    date => {
      const today =
        new Date();

      const value =
        new Date(date);

      return (
        value.getDate() ===
          today.getDate() &&
        value.getMonth() ===
          today.getMonth() &&
        value.getFullYear() ===
          today.getFullYear()
      );
    };

  const isYesterday =
    date => {
      const yesterday =
        new Date();

      yesterday.setDate(
        yesterday.getDate() -
          1
      );

      const value =
        new Date(date);

      return (
        value.getDate() ===
          yesterday.getDate() &&
        value.getMonth() ===
          yesterday.getMonth() &&
        value.getFullYear() ===
          yesterday.getFullYear()
      );
    };

  /*
   * Context already provides unread
   * notifications only.
   */
  const todayNotifications =
    notifications.filter(
      notification =>
        isToday(
          notification.createdAt
        )
    );

  const yesterdayNotifications =
    notifications.filter(
      notification =>
        isYesterday(
          notification.createdAt
        )
    );

  const earlierNotifications =
    notifications.filter(
      notification =>
        !isToday(
          notification.createdAt
        ) &&
        !isYesterday(
          notification.createdAt
        )
    );

  // ==========================================
  // NOTIFICATION CARD
  // ==========================================

  const renderNotification =
    notification => (
      <div
        key={
          notification.id
        }
        className={`
          border-b
          border-slate-100
          p-5
          transition
          hover:bg-slate-50
          dark:border-slate-700
          dark:hover:bg-slate-700/40
          ${getCardStyle(
            notification
          )}
        `}
      >
        <div className="flex justify-between gap-3">

          <div className="flex min-w-0 flex-1 gap-3">

            <div className="mt-1 shrink-0">
              {getReminderIcon(
                notification.type
              )}
            </div>

            <div className="min-w-0 flex-1">

              <h3 className="font-semibold text-slate-800 dark:text-white">
                {
                  notification.title
                }
              </h3>

              <p className="mt-1 whitespace-pre-line text-sm leading-6 text-slate-600 dark:text-slate-300">
                {
                  notification.message
                }
              </p>

              <div className="mt-3 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">

                <FaClock />

                {formatDate(
                  notification.createdAt
                )}

              </div>

            </div>

          </div>

          <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[#0B6B57]" />

        </div>

        <div className="mt-5 flex flex-wrap gap-2">

          <button
            type="button"
            onClick={() =>
              readNotification(
                notification
              )
            }
            className="
              flex
              min-w-[110px]
              flex-1
              items-center
              justify-center
              gap-2
              rounded-lg
              border
              border-[#0B6B57]
              px-3
              py-2
              text-sm
              font-medium
              text-[#0B6B57]
              transition
              hover:bg-[#0B6B57]
              hover:text-white
            "
          >
            <FaCheckCircle />

            Mark Read
          </button>

          <button
            type="button"
            onClick={() =>
              openExpense(
                notification
              )
            }
            className="
              flex
              min-w-[100px]
              flex-1
              items-center
              justify-center
              gap-2
              rounded-lg
              bg-[#0B6B57]
              px-3
              py-2
              text-sm
              font-medium
              text-white
              transition
              hover:bg-[#085443]
            "
          >
            <FaWallet />

            Expense
          </button>

          <button
            type="button"
            onClick={() =>
              openIncome(
                notification
              )
            }
            className="
              flex
              min-w-[100px]
              flex-1
              items-center
              justify-center
              gap-2
              rounded-lg
              border
              border-[#0B6B57]
              px-3
              py-2
              text-sm
              font-medium
              text-[#0B6B57]
              transition
              hover:bg-[#0B6B57]
              hover:text-white
            "
          >
            <FaMoneyBillWave />

            Income
          </button>

        </div>

      </div>
    );

  return (
    <div
      className="
        absolute
        right-0
        mt-3
        w-[420px]
        max-w-[calc(100vw-1.5rem)]
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white
        shadow-2xl
        dark:border-slate-700
        dark:bg-slate-800
      "
    >
      {/* HEADER */}

      <div className="flex items-center justify-between gap-4 border-b border-slate-200 px-5 py-4 dark:border-slate-700">

        <div>

          <h2 className="text-lg font-bold text-slate-800 dark:text-white">
            Notifications
          </h2>

          <p className="mt-1 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">

            {unreadCount >
              0 && (
              <span className="h-2 w-2 rounded-full bg-red-500" />
            )}

            {unreadCount} unread{" "}
            {unreadCount === 1
              ? "notification"
              : "notifications"}

          </p>

        </div>

        <div className="flex items-center gap-3">

          {unreadCount > 0 && (
            <button
              type="button"
              onClick={
                handleMarkAllRead
              }
              className="whitespace-nowrap text-sm font-medium text-[#0B6B57] hover:underline"
            >
              Mark All Read
            </button>
          )}

          <button
            type="button"
            onClick={
              onOpenSettings
            }
            aria-label="Notification settings"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
          >
            <FaCog />
          </button>

        </div>

      </div>

      {/* LIST */}

      <div className="max-h-[520px] overflow-y-auto">

        {loading &&
        notifications.length ===
          0 ? (
          <div className="px-6 py-14 text-center text-sm text-slate-500">
            Loading notifications...
          </div>

        ) : notifications.length ===
          0 ? (
          <div className="px-6 py-14 text-center">

            <FaCheckCircle className="mx-auto mb-4 text-5xl text-emerald-500" />

            <h3 className="font-semibold text-slate-700 dark:text-white">
              You're all caught up!
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
              You don't have any unread notifications.
            </p>

          </div>

        ) : (
          <>
            {todayNotifications.length >
              0 && (
              <NotificationGroup
                title="Today"
              >
                {todayNotifications.map(
                  renderNotification
                )}
              </NotificationGroup>
            )}

            {yesterdayNotifications.length >
              0 && (
              <NotificationGroup
                title="Yesterday"
              >
                {yesterdayNotifications.map(
                  renderNotification
                )}
              </NotificationGroup>
            )}

            {earlierNotifications.length >
              0 && (
              <NotificationGroup
                title="Earlier"
              >
                {earlierNotifications.map(
                  renderNotification
                )}
              </NotificationGroup>
            )}
          </>
        )}

      </div>

      {/* FOOTER */}

      <div className="border-t border-slate-200 bg-slate-50 px-5 py-3 text-center dark:border-slate-700 dark:bg-slate-900">

        <button
          type="button"
          onClick={
            onOpenSettings
          }
          className="flex w-full items-center justify-center gap-2 text-sm font-medium text-[#0B6B57] hover:underline"
        >
          <FaCog />

          Reminder Settings
        </button>

      </div>

    </div>
  );
}

function NotificationGroup({
  title,
  children,
}) {
  return (
    <>
      <div className="bg-slate-100 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:bg-slate-900 dark:text-slate-400">
        {title}
      </div>

      {children}
    </>
  );
}
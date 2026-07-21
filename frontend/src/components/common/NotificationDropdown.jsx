import React, { useState } from "react";
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

import { useNavigate } from "react-router-dom";

import { useNotifications } from "../../context/NotificationContext";
import NotificationDeleteModal from "./NotificationDeleteModal";

export default function NotificationDropdown({
  onClose,
  onOpenSettings,
}) {
  const navigate = useNavigate();

  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    fetchNotifications,
    fetchUnreadCount,
  } = useNotifications();

  // ==========================================
  // Open Expense
  // ==========================================

  const openExpense = async (notification) => {
    if (!notification.read) {
      await markAsRead(notification.id);
      await fetchNotifications();
      await fetchUnreadCount();
    }

    onClose();
    navigate("/expenses");
  };

  // ==========================================
  // Open Income
  // ==========================================

  const openIncome = async (notification) => {
    if (!notification.read) {
      await markAsRead(notification.id);
      await fetchNotifications();
      await fetchUnreadCount();
    }

    onClose();
    navigate("/income");
  };

  // ==========================================
  // Mark Notification Read
  // ==========================================

  const readNotification = async (notification) => {

    if (notification.read) return;

    await markAsRead(notification.id);

    setNotifications((prev) =>
      prev.filter((n) => n.id !== notification.id)
    );

  };

  // ==========================================
  // Reminder Icons
  // ==========================================

  const getReminderIcon = (type) => {
    switch (type) {
      case "MORNING_REMINDER":
        return <FaSun className="text-yellow-500 text-xl" />;

      case "AFTERNOON_REMINDER":
        return <FaCloudSun className="text-orange-500 text-xl" />;

      case "EVENING_REMINDER":
        return <FaCloudMoon className="text-purple-500 text-xl" />;

      case "NIGHT_REMINDER":
        return <FaMoon className="text-blue-500 text-xl" />;

      default:
        return <FaBell className="text-gray-500 text-xl" />;
    }
  };

  // ==========================================
  // Card Colors
  // ==========================================

  const getCardStyle = (notification) => {
    switch (notification.type) {
      case "MORNING_REMINDER":
        return notification.read
          ? "bg-yellow-50 dark:bg-slate-800"
          : "bg-yellow-100/70 dark:bg-yellow-900/20";

      case "AFTERNOON_REMINDER":
        return notification.read
          ? "bg-orange-50 dark:bg-slate-800"
          : "bg-orange-100/70 dark:bg-orange-900/20";

      case "EVENING_REMINDER":
        return notification.read
          ? "bg-purple-50 dark:bg-slate-800"
          : "bg-purple-100/70 dark:bg-purple-900/20";

      case "NIGHT_REMINDER":
        return notification.read
          ? "bg-blue-50 dark:bg-slate-800"
          : "bg-blue-100/70 dark:bg-blue-900/20";

      default:
        return notification.read
          ? "bg-white dark:bg-slate-800"
          : "bg-green-50 dark:bg-slate-700";
    }
  };

  // ==========================================
  // Date Formatter
  // ==========================================

  const formatDate = (date) => {
    const value = new Date(date);
    const today = new Date();
    const yesterday = new Date();

    yesterday.setDate(today.getDate() - 1);

    const sameDay = (a, b) =>
      a.getDate() === b.getDate() &&
      a.getMonth() === b.getMonth() &&
      a.getFullYear() === b.getFullYear();

    const time = value.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    if (sameDay(value, today)) return `Today • ${time}`;

    if (sameDay(value, yesterday)) return `Yesterday • ${time}`;

    return (
      value.toLocaleDateString([], {
        day: "numeric",
        month: "short",
        year: "numeric",
      }) + ` • ${time}`
    );
  };

    // ==========================================
  // Notification Groups
  // ==========================================

  const isToday = (date) => {
    const today = new Date();
    const value = new Date(date);

    return value.getDate() === today.getDate() &&
      value.getMonth() === today.getMonth() &&
      value.getFullYear() === today.getFullYear();
  };

  const isYesterday = (date) => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const value = new Date(date);

    return value.getDate() === yesterday.getDate() &&
      value.getMonth() === yesterday.getMonth() &&
      value.getFullYear() === yesterday.getFullYear();
  };

  const todayNotifications = notifications.filter(n => isToday(n.createdAt));
  const yesterdayNotifications = notifications.filter(n => isYesterday(n.createdAt));
  const earlierNotifications = notifications.filter(
    n => !isToday(n.createdAt) && !isYesterday(n.createdAt)
  );

  // ==========================================
  // Notification Card
  // ==========================================

  const renderNotification = (notification) => (
    <div
      key={notification.id}
      className={`p-5 border-b border-gray-100 dark:border-slate-700 transition hover:shadow-md ${getCardStyle(notification)}`}
    >
      <div className="flex justify-between gap-3">

        <div className="flex gap-3 flex-1">

          <div className="mt-1">
            {getReminderIcon(notification.type)}
          </div>

          <div className="flex-1">

            <h3 className="font-semibold text-slate-800 dark:text-white">
              {notification.title}
            </h3>

            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300 whitespace-pre-line leading-6">
              {notification.message}
            </p>

            <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
              <FaClock />
              {formatDate(notification.createdAt)}
            </div>

          </div>

        </div>

        {!notification.read && (
          <span className="w-3 h-3 mt-2 rounded-full bg-[#0B6B57] animate-pulse"></span>
        )}

      </div>

      <div className="flex gap-2 mt-5">

        {!notification.read && (
          <button
            onClick={() => readNotification(notification)}
            className="flex-1 py-2 rounded-lg border border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition flex items-center justify-center gap-2"
          >
            <FaCheckCircle />
            Mark Read
          </button>
        )}

        <button
          onClick={() => openExpense(notification)}
          className="flex-1 py-2 rounded-lg bg-[#0B6B57] text-white hover:bg-[#085443] transition flex items-center justify-center gap-2"
        >
          <FaWallet />
          Expense
        </button>

        <button
          onClick={() => openIncome(notification)}
          className="flex-1 py-2 rounded-lg border border-[#0B6B57] text-[#0B6B57] hover:bg-[#0B6B57] hover:text-white transition flex items-center justify-center gap-2"
        >
          <FaMoneyBillWave />
          Income
        </button>

      </div>

    </div>
  );
  return (
  <>
    <div className="absolute right-0 mt-3 w-[420px] bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-slate-700 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">

      {/* Header */}

      <div className="px-5 py-4 border-b border-gray-200 dark:border-slate-700 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold text-slate-800 dark:text-white">
            Notifications
          </h2>

          <p className="text-sm text-gray-500 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
          </p>
        </div>

        <div className="flex items-center gap-3">

          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-sm font-medium text-[#0B6B57] hover:underline"
            >
              Mark All Read
            </button>
          )}

          <button
            onClick={onOpenSettings}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition"
          >
            <FaCog />
          </button>

        </div>
      </div>

      {/* Notification List */}

      <div className="max-h-[520px] overflow-y-auto">

        {notifications.length === 0 ? (

          <div className="py-16 px-6 text-center">
            <FaCheckCircle className="text-5xl text-green-500 mx-auto mb-4" />

            <h3 className="font-semibold text-slate-700 dark:text-white">
              You're all caught up!
            </h3>

            <p className="mt-2 text-gray-500 text-sm">
              We'll notify you whenever it's time to review your finances.
            </p>
          </div>

        ) : (

          <>
            {todayNotifications.length > 0 && (
              <>
                <div className="px-5 py-2 bg-gray-100 dark:bg-slate-900 text-xs uppercase tracking-wider font-semibold text-gray-500">
                  Today
                </div>

                {todayNotifications.map(renderNotification)}
              </>
            )}

            {yesterdayNotifications.length > 0 && (
              <>
                <div className="px-5 py-2 bg-gray-100 dark:bg-slate-900 text-xs uppercase tracking-wider font-semibold text-gray-500">
                  Yesterday
                </div>

                {yesterdayNotifications.map(renderNotification)}
              </>
            )}

            {earlierNotifications.length > 0 && (
              <>
                <div className="px-5 py-2 bg-gray-100 dark:bg-slate-900 text-xs uppercase tracking-wider font-semibold text-gray-500">
                  Earlier
                </div>

                {earlierNotifications.map(renderNotification)}
              </>
            )}
          </>

        )}

      </div>

      {/* Footer */}

      <div className="px-5 py-3 border-t border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-center">

        <button
          onClick={onOpenSettings}
          className="text-sm font-medium text-[#0B6B57] hover:underline flex items-center justify-center gap-2 w-full"
        >
          <FaCog />
          Reminder Settings
        </button>

      </div>

    </div>
  </>
);
}
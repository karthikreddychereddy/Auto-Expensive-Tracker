import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";

import {
  FaBell,
  FaSearch,
  FaUser,
  FaSignOutAlt,
  FaMoon,
  FaSun,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { useUser } from "../../context/UserContext";
import { useTheme } from "../../context/ThemeContext";
import { useSearch } from "../../context/SearchContext";
import { useNotifications } from "../../context/NotificationContext";
import { useMonth } from "../../context/MonthContext";

import LogoutConfirmModal from "../common/LogoutConfirmModal";
import NotificationDropdown from "../common/NotificationDropdown";
import ReminderSettingsModal from "../common/ReminderSettingsModal";
import MonthSelector from "../common/MonthSelector";

export default function TopNavbar() {

  const navigate = useNavigate();

  const { logout } = useAuth();

  const { profile } = useUser();

  const { darkMode, toggleTheme } = useTheme();

  const { searchText, setSearchText } = useSearch();

  const {
    selectedMonth,
    setSelectedMonth,
  } = useMonth();

  const {
    unreadCount,
    fetchNotifications,
    fetchUnreadCount,
  } = useNotifications();

  const [openProfile, setOpenProfile] = useState(false);

  const [openNotifications, setOpenNotifications] =
    useState(false);

  const [showLogoutModal, setShowLogoutModal] =
    useState(false);

  const [showReminderSettings, setShowReminderSettings] =
    useState(false);

  const profileRef = useRef(null);

  const notificationRef = useRef(null);

  // ==========================================
  // Close Dropdowns
  // ==========================================

  useEffect(() => {

    const handleClickOutside = (event) => {

      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setOpenProfile(false);
      }

      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setOpenNotifications(false);
      }

    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

  }, []);

  // ==========================================
  // Refresh Notifications
  // ==========================================

  useEffect(() => {

    if (!openNotifications) return;

    fetchNotifications();

    fetchUnreadCount();

  }, [
    openNotifications,
    fetchNotifications,
    fetchUnreadCount,
  ]);

  // ==========================================
  // Profile Initials
  // ==========================================

  const getInitials = useCallback(() => {

    if (!profile) return "KR";

    const first =
      profile.firstName?.charAt(0) || "";

    const last =
      profile.lastName?.charAt(0) || "";

    return (first + last).toUpperCase();

  }, [profile]);

  // ==========================================
  // Navigation
  // ==========================================

  const openProfilePage = () => {

    setOpenProfile(false);

    navigate("/profile");

  };

  const logoutUser = () => {

    setOpenProfile(false);

    setShowLogoutModal(true);

  };

  const confirmLogout = () => {

    setShowLogoutModal(false);

    logout();

    navigate("/login");

  };

  const badgeText =
    unreadCount > 99
      ? "99+"
      : unreadCount;

  return (

    <>

      <header
        className="
        sticky
        top-0
        z-30
        h-20
        bg-white/90
        dark:bg-slate-900/90
        backdrop-blur-md
        border-b
        border-gray-200
        dark:border-slate-700
        flex
        items-center
        justify-between
        px-8
        transition-colors
        duration-300
        "
      >

        {/* Search */}

        <div className="relative flex-1 max-w-lg">

          <FaSearch
            className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-gray-400
            dark:text-gray-500
            "
          />

          <input
            type="text"
            value={searchText}
            onChange={(e) =>
              setSearchText(e.target.value)
            }
            placeholder="Search expenses, categories..."
            className="
            w-full
            pl-12
            pr-4
            py-3
            rounded-xl
            border
            border-gray-200
            dark:border-slate-700
            bg-gray-50
            dark:bg-slate-800
            text-slate-800
            dark:text-white
            placeholder:text-gray-400
            outline-none
            focus:border-[#0B6B57]
            transition
            "
          />

        </div>

        {/* Right Section */}

        <div
          className="
          flex
          items-center
          gap-4
          ml-8
          "
        >

          <MonthSelector
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
          />

          {/* Notifications */}

          <div
            className="relative"
            ref={notificationRef}
          >

            <button
              onClick={() =>
                setOpenNotifications(
                  prev => !prev
                )
              }
              className="
              relative
              transition-transform
              hover:scale-110
              "
            >

              <FaBell
                className={`
                  text-2xl
                  transition
                  duration-300
                  ${
                    unreadCount > 0
                      ? "text-[#0B6B57] animate-pulse"
                      : "text-gray-600 dark:text-gray-300"
                  }
                `}
              />

              {unreadCount > 0 && (

                <span
                  className="
                  absolute
                  -top-2
                  -right-2
                  min-w-[22px]
                  h-[22px]
                  px-1
                  rounded-full
                  bg-red-500
                  text-white
                  text-[10px]
                  font-semibold
                  flex
                  items-center
                  justify-center
                  shadow
                  "
                >
                  {badgeText}
                </span>

              )}

            </button>

            {openNotifications && (

              <NotificationDropdown
                onClose={() =>
                  setOpenNotifications(false)
                }
                onOpenSettings={() => {
                  setOpenNotifications(false);
                  setShowReminderSettings(true);
                }}
              />

            )}

          </div>
                    {/* ==========================================
              Profile Avatar
          ========================================== */}

          <div
            className="relative"
            ref={profileRef}
          >

            <button
              onClick={() =>
                setOpenProfile(
                  (prev) => !prev
                )
              }
              className="
              flex
              items-center
              gap-3
              cursor-pointer
              "
            >

              {profile?.profileImage ? (

                <img
                  src={profile.profileImage}
                  alt="Profile"
                  className="
                  w-11
                  h-11
                  rounded-full
                  object-cover
                  border-2
                  border-[#0B6B57]
                  "
                />

              ) : (

                <div
                  className="
                  w-11
                  h-11
                  rounded-full
                  bg-[#0B6B57]
                  text-white
                  flex
                  items-center
                  justify-center
                  font-semibold
                  "
                >
                  {getInitials()}
                </div>

              )}

            </button>

            {/* ==========================================
                Profile Dropdown
            ========================================== */}

            {openProfile && (

              <div
                className="
                absolute
                right-0
                mt-3
                w-64
                bg-white
                dark:bg-slate-800
                rounded-xl
                shadow-xl
                border
                border-gray-200
                dark:border-slate-700
                overflow-hidden
                "
              >

                {/* User Info */}

                <div
                  className="
                  px-5
                  py-4
                  border-b
                  border-gray-200
                  dark:border-slate-700
                  "
                >

                  <h3
                    className="
                    font-semibold
                    text-slate-800
                    dark:text-white
                    "
                  >
                    {profile?.firstName} {profile?.lastName}
                  </h3>

                  <p
                    className="
                    text-sm
                    text-gray-500
                    break-all
                    "
                  >
                    {profile?.email}
                  </p>

                </div>

                {/* Profile */}

                <button
                  onClick={openProfilePage}
                  className="
                  w-full
                  px-5
                  py-3
                  flex
                  items-center
                  gap-3
                  hover:bg-gray-100
                  dark:hover:bg-slate-700
                  transition
                  "
                >
                  <FaUser />
                  My Profile
                </button>

                {/* Theme */}

                <button
                  onClick={toggleTheme}
                  className="
                  w-full
                  px-5
                  py-3
                  flex
                  items-center
                  gap-3
                  hover:bg-gray-100
                  dark:hover:bg-slate-700
                  transition
                  "
                >

                  {darkMode ? <FaSun /> : <FaMoon />}

                  {darkMode
                    ? "Light Mode"
                    : "Dark Mode"}

                </button>

                {/* Logout */}

                <button
                  onClick={logoutUser}
                  className="
                  w-full
                  px-5
                  py-3
                  flex
                  items-center
                  gap-3
                  text-red-500
                  hover:bg-red-50
                  dark:hover:bg-slate-700
                  transition
                  "
                >
                  <FaSignOutAlt />
                  Logout
                </button>

              </div>

            )}

          </div>

        </div>

      </header>

      {/* ==========================================
          Reminder Settings
      ========================================== */}

      <ReminderSettingsModal
        open={showReminderSettings}
        onClose={() =>
          setShowReminderSettings(false)
        }
      />

      {/* ==========================================
          Logout Confirmation
      ========================================== */}

      {showLogoutModal && (

        <LogoutConfirmModal
          onClose={() =>
            setShowLogoutModal(false)
          }
          onConfirm={confirmLogout}
        />

      )}

    </>

  );

}
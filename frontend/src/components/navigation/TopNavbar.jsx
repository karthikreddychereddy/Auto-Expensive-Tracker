import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  FaBell,
  FaSearch,
  FaUser,
  FaSignOutAlt,
  FaMoon,
  FaSun,
  FaBars,
} from "react-icons/fa";

import {
  useNavigate,
} from "react-router-dom";

import {
  useAuth,
} from "../../context/AuthContext";

import {
  useUser,
} from "../../context/UserContext";

import {
  useTheme,
} from "../../context/ThemeContext";

import {
  useSearch,
} from "../../context/SearchContext";

import {
  useNotifications,
} from "../../context/NotificationContext";

import {
  useMonth,
} from "../../context/MonthContext";

import LogoutConfirmModal from "../common/LogoutConfirmModal";
import NotificationDropdown from "../common/NotificationDropdown";
import ReminderSettingsModal from "../common/ReminderSettingsModal";
import MonthSelector from "../common/MonthSelector";

export default function TopNavbar({
  onMenuClick,
  sidebarOpen = false,
}) {
  const navigate =
    useNavigate();

  const {
    logout,
  } = useAuth();

  const {
    profile,
  } = useUser();

  const {
    darkMode,
    toggleTheme,
  } = useTheme();

  const {
    searchText,
    setSearchText,
  } = useSearch();

  const {
    selectedMonth,
    setSelectedMonth,
  } = useMonth();

  const {
    unreadCount,
    fetchNotifications,
    fetchUnreadCount,
  } = useNotifications();

  const [
    openProfile,
    setOpenProfile,
  ] = useState(false);

  const [
    openNotifications,
    setOpenNotifications,
  ] = useState(false);

  const [
    showLogoutModal,
    setShowLogoutModal,
  ] = useState(false);

  const [
    showReminderSettings,
    setShowReminderSettings,
  ] = useState(false);

  const profileRef =
    useRef(null);

  const notificationRef =
    useRef(null);

  useEffect(() => {
    const handleClickOutside =
      event => {
        if (
          profileRef.current &&
          !profileRef.current.contains(
            event.target
          )
        ) {
          setOpenProfile(false);
        }

        if (
          notificationRef.current &&
          !notificationRef.current.contains(
            event.target
          )
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

  useEffect(() => {
    if (!openNotifications) {
      return;
    }

    fetchNotifications();
    fetchUnreadCount();
  }, [
    openNotifications,
    fetchNotifications,
    fetchUnreadCount,
  ]);

  const getInitials =
    useCallback(() => {
      if (!profile) {
        return "PT";
      }

      const first =
        profile.firstName?.charAt(0) ||
        "";

      const last =
        profile.lastName?.charAt(0) ||
        "";

      return (
        first + last
      ).toUpperCase() || "PT";
    }, [profile]);

  const openProfilePage = () => {
    setOpenProfile(false);
    navigate("/profile");
  };

  const logoutUser = () => {
    setOpenProfile(false);
    setShowLogoutModal(true);
  };

  const confirmLogout =
    async () => {
      setShowLogoutModal(false);

      await logout();

      navigate(
        "/login",
        {
          replace: true,
        }
      );
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
          flex
          h-16 sm:h-20
          shrink-0
          items-center
          justify-between
          border-b
          border-slate-200
          bg-white/95
          px-3 sm:px-4 lg:px-8
          backdrop-blur-md
          transition-colors
          duration-300
          dark:border-slate-700
          dark:bg-slate-900/95
        "
      >

        {/* Mobile menu */}

        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open navigation"
          aria-expanded={sidebarOpen}
          aria-controls="primary-sidebar"
          className="mr-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-slate-600 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B6B57] dark:text-slate-300 dark:hover:bg-slate-800 sm:mr-3 lg:hidden"
        >
          <FaBars size={18} />
        </button>

        {/* Search */}

        <div className="relative hidden min-w-0 flex-1 md:block md:max-w-lg">

          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

          <input
            type="search"
            value={searchText}
            onChange={event =>
              setSearchText(
                event.target.value
              )
            }
            placeholder="Search expenses, categories..."
            aria-label="Search"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-slate-800 outline-none transition focus:border-[#0B6B57] focus:ring-2 focus:ring-[#0B6B57]/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"
          />

        </div>

        {/* Mobile brand */}

        <div className="min-w-0 flex-1 md:hidden">
          <p className="truncate text-lg font-bold text-[#0B6B57]">
            PaisaTrack
          </p>
        </div>

        {/* Right controls */}

        <div className="ml-3 flex shrink-0 items-center gap-2 sm:ml-6 sm:gap-3 lg:ml-8 lg:gap-4">

          <div className="hidden sm:block">
            <MonthSelector
              selectedMonth={selectedMonth}
              setSelectedMonth={setSelectedMonth}
            />
          </div>

          {/* Notifications */}

          <div
            className="relative"
            ref={notificationRef}
          >

            <button
              type="button"
              aria-label="Notifications"
              aria-expanded={openNotifications}
              onClick={() =>
                setOpenNotifications(
                  previous =>
                    !previous
                )
              }
              className="relative flex h-11 w-11 items-center justify-center rounded-xl transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B6B57] dark:hover:bg-slate-800"
            >

              <FaBell
                className={`
                  text-xl
                  transition
                  ${
                    unreadCount > 0
                      ? "text-[#0B6B57]"
                      : "text-slate-600 dark:text-slate-300"
                  }
                `}
              />

              {unreadCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-[20px] min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-bold text-white shadow">
                  {badgeText}
                </span>
              )}

            </button>

            {openNotifications && (
              <div className="fixed left-3 right-3 top-16 z-50 sm:absolute sm:left-auto sm:right-0 sm:top-auto sm:mt-3">
                <NotificationDropdown
                  onClose={() =>
                    setOpenNotifications(
                      false
                    )
                  }
                  onOpenSettings={() => {
                    setOpenNotifications(
                      false
                    );

                    setShowReminderSettings(
                      true
                    );
                  }}
                />
              </div>
            )}

          </div>

          {/* Profile */}

          <div
            className="relative"
            ref={profileRef}
          >

            <button
              type="button"
              aria-label="Open profile menu"
              aria-expanded={openProfile}
              onClick={() =>
                setOpenProfile(
                  previous =>
                    !previous
                )
              }
              className="flex h-11 w-11 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B6B57]"
            >

              {profile?.profileImage ? (
                <img
                  src={profile.profileImage}
                  alt="Profile"
                  className="h-10 w-10 rounded-full sm:h-11 sm:w-11 border-2 border-[#0B6B57] object-cover"
                />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0B6B57] sm:h-11 sm:w-11 font-semibold text-white">
                  {getInitials()}
                </div>
              )}

            </button>

            {openProfile && (
              <div className="absolute right-0 mt-3 w-[min(16rem,calc(100vw-1.5rem))] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-800">

                <div className="border-b border-slate-200 px-5 py-4 dark:border-slate-700">

                  <h3 className="truncate font-semibold text-slate-800 dark:text-white">
                    {profile?.firstName}{" "}
                    {profile?.lastName}
                  </h3>

                  <p className="mt-1 truncate text-sm text-slate-500">
                    {profile?.email}
                  </p>

                </div>

                <button
                  type="button"
                  onClick={openProfilePage}
                  className="flex w-full items-center gap-3 px-5 py-3 text-left text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-700"
                >
                  <FaUser />

                  My Profile
                </button>

                <button
                  type="button"
                  onClick={toggleTheme}
                  className="flex w-full items-center gap-3 px-5 py-3 text-left text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-700"
                >
                  {darkMode ? (
                    <FaSun />
                  ) : (
                    <FaMoon />
                  )}

                  {darkMode
                    ? "Light Mode"
                    : "Dark Mode"}
                </button>

                <button
                  type="button"
                  onClick={logoutUser}
                  className="flex w-full items-center gap-3 px-5 py-3 text-left text-red-500 transition hover:bg-red-50 dark:hover:bg-slate-700"
                >
                  <FaSignOutAlt />

                  Logout
                </button>

              </div>
            )}

          </div>

        </div>

      </header>

      <ReminderSettingsModal
        open={showReminderSettings}
        onClose={() =>
          setShowReminderSettings(
            false
          )
        }
      />

      {showLogoutModal && (
        <LogoutConfirmModal
          onClose={() =>
            setShowLogoutModal(
              false
            )
          }
          onConfirm={
            confirmLogout
          }
        />
      )}
    </>
  );
}
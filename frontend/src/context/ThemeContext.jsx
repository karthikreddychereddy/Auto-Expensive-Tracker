import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { useSettings } from "./SettingsContext";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const {
    settings,
    updateTheme,
  } = useSettings();

  const [systemDark, setSystemDark] = useState(() =>
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = event => {
      setSystemDark(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  const darkMode =
    settings.theme === "dark" ||
    (settings.theme === "system" && systemDark);

  const toggleTheme = () => {
    updateTheme(darkMode ? "light" : "dark");
  };

  const value = useMemo(
    () => ({
      darkMode,
      theme: settings.theme,
      toggleTheme,
      setTheme: updateTheme,
    }),
    [darkMode, settings.theme, updateTheme]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
}

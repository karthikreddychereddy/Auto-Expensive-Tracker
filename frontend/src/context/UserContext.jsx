import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import api from "../services/api";
import { useAuth } from "./AuthContext";

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const { user } = useAuth();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadProfile = useCallback(async () => {
    if (!user) {
      setProfile(null);
      setLoading(false);
      return null;
    }

    try {
      setLoading(true);

      const response = await api.get("/user/profile");

      setProfile(response.data);

      return response.data;
    } catch (error) {
      console.error("Failed to load profile", error);
      setProfile(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, [user]);

  const updateProfile = async payload => {
    try {
      const response = await api.put("/user/profile", payload);
      setProfile(response.data);
      return response.data;
    } catch (error) {
      console.error("Profile update failed", error);
      throw error;
    }
  };

  const clearProfile = () => {
    setProfile(null);
  };

  useEffect(() => {
    if (!user) {
      setProfile(null);
      setLoading(false);
      return;
    }

    setProfile(null);
    loadProfile();
  }, [user, loadProfile]);

  return (
    <UserContext.Provider
      value={{
        profile,
        loading,
        setProfile,
        loadProfile,
        updateProfile,
        clearProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within UserProvider");
  }

  return context;
};

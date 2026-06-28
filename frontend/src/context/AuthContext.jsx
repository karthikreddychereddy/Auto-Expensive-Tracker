
import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState({
    id: 1,
    name: "Karthik Reddy",
    email: "karthikreddychereddy@gmail.com",
    role: "USER",
  });

  const [loading] = useState(false);

  const login = async (email, password) => {
    // Temporary login (no backend)
    const loggedInUser = {
      id: 1,
      name: "Karthik",
      email: email,
      role: "ADMIN",
    };

    localStorage.setItem("pt_token", "dummy_token");
    localStorage.setItem("pt_user", JSON.stringify(loggedInUser));

    setUser(loggedInUser);

    return loggedInUser;
  };

  const register = async (payload) => {
    // Temporary registration
    const newUser = {
      id: 2,
      name: payload.name || "New User",
      email: payload.email,
      role: "USER",
    };

    localStorage.setItem("pt_token", "dummy_token");
    localStorage.setItem("pt_user", JSON.stringify(newUser));

    setUser(newUser);

    return newUser;
  };

  const logout = () => {
    localStorage.removeItem("pt_token");
    localStorage.removeItem("pt_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
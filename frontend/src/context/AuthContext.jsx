import {
  createContext,
  useContext,
  useState,
} from "react";

import api from "../services/api";

const AuthContext =
  createContext(null);

export function AuthProvider({
  children,
}) {
  const [user, setUser] =
    useState(() => {
      const stored =
        localStorage.getItem(
          "pt_user"
        );

      try {
        return stored
          ? JSON.parse(stored)
          : null;
      } catch {
        localStorage.removeItem(
          "pt_user"
        );

        return null;
      }
    });

  const [loading] =
    useState(false);

  // ==========================================
  // SAVE USER
  // ==========================================

  const saveUser =
    userData => {
      if (!userData) {
        localStorage.removeItem(
          "pt_user"
        );

        setUser(null);

        return;
      }

      localStorage.setItem(
        "pt_user",
        JSON.stringify(
          userData
        )
      );

      setUser(userData);
    };

  // ==========================================
  // SAVE AUTH TOKENS
  // ==========================================

  const saveTokens = (
    token,
    refreshToken
  ) => {
    if (token) {
      localStorage.setItem(
        "pt_token",
        token
      );
    }

    if (refreshToken) {
      localStorage.setItem(
        "pt_refresh_token",
        refreshToken
      );
    }
  };

  // ==========================================
  // CLEAR AUTH SESSION
  // ==========================================

  const clearSession = () => {
    localStorage.removeItem(
      "pt_token"
    );

    localStorage.removeItem(
      "pt_refresh_token"
    );

    localStorage.removeItem(
      "pt_user"
    );

    sessionStorage.removeItem(
      "verification_email"
    );

    sessionStorage.removeItem(
      "reset_email"
    );

    setUser(null);
  };

  // ==========================================
  // LOGIN
  // ==========================================

  const login = async (
    email,
    password
  ) => {
    const response =
      await api.post(
        "/auth/login",
        {
          email,
          password,
        }
      );

    const {
      token,
      refreshToken,
      user: loggedInUser,
    } = response.data;

    if (!token) {
      throw new Error(
        "Login did not return an access token."
      );
    }

    if (!refreshToken) {
      throw new Error(
        "Login did not return a refresh token."
      );
    }

    saveTokens(
      token,
      refreshToken
    );

    saveUser(
      loggedInUser
    );

    return response.data;
  };

  // ==========================================
  // REGISTER
  // ==========================================

  const register =
    async payload => {
      const response =
        await api.post(
          "/auth/register",
          payload
        );

      /*
       * Registration stays unauthenticated
       * until OTP verification.
       */
      clearSession();

      return response.data;
    };

  // ==========================================
  // VERIFY EMAIL + AUTO LOGIN
  // ==========================================

  const verifyEmail = async (
    email,
    otp
  ) => {
    const response =
      await api.post(
        "/auth/verify-email",
        {
          email,
          otp,
        }
      );

    const {
      token,
      refreshToken,
      user: verifiedUser,
    } = response.data;

    if (!token) {
      throw new Error(
        "Email verification did not return an access token."
      );
    }

    if (!refreshToken) {
      throw new Error(
        "Email verification did not return a refresh token."
      );
    }

    saveTokens(
      token,
      refreshToken
    );

    saveUser(
      verifiedUser
    );

    return response.data;
  };

  // ==========================================
  // RESEND VERIFICATION OTP
  // ==========================================

  const resendOtp =
    async email => {
      const response =
        await api.post(
          "/auth/resend-otp",
          {
            email,
          }
        );

      return response.data;
    };

  // ==========================================
  // FORGOT PASSWORD
  // ==========================================

  const forgotPassword =
    async email => {
      const response =
        await api.post(
          "/auth/forgot-password",
          {
            email,
          }
        );

      return response.data;
    };

  // ==========================================
  // VERIFY RESET OTP
  // ==========================================

  const verifyResetOtp =
    async (
      email,
      otp
    ) => {
      const response =
        await api.post(
          "/auth/verify-reset-otp",
          {
            email,
            otp,
          }
        );

      return response.data;
    };

  // ==========================================
  // RESET PASSWORD
  // ==========================================

  const resetPassword =
    async (
      email,
      newPassword
    ) => {
      const response =
        await api.post(
          "/auth/reset-password",
          {
            email,
            newPassword,
          }
        );

      return response.data;
    };


  // ==========================================
  // COMPLETE GOOGLE OAUTH LOGIN
  // ==========================================

  const completeGoogleLogin =
    async code => {

      const response =
        await api.post(
          "/auth/oauth/exchange",
          {
            code,
          }
        );

      const {
        token,
        refreshToken,
        user: googleUser,
      } = response.data;

      if (!token) {
        throw new Error(
          "Google login did not return an access token."
        );
      }

      if (!refreshToken) {
        throw new Error(
          "Google login did not return a refresh token."
        );
      }

      saveTokens(
        token,
        refreshToken
      );

      saveUser(
        googleUser
      );

      return response.data;
    };

  // ==========================================
  // LOGOUT
  // ==========================================

  const logout = async () => {
    const refreshToken =
      localStorage.getItem(
        "pt_refresh_token"
      );

    /*
     * Clear frontend immediately.
     *
     * Even if the backend request fails,
     * the user should still be logged out
     * locally.
     */
    clearSession();

    if (!refreshToken) {
      return;
    }

    try {
      await api.post(
        "/auth/logout",
        {
          refreshToken,
        }
      );
    } catch (error) {
      /*
       * Local logout has already happened.
       * Backend revocation failure should
       * not restore the session.
       */
      console.error(
        "Logout request failed:",
        error
      );
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,

        login,
        register,

        verifyEmail,
        resendOtp,

        forgotPassword,
        verifyResetOtp,
        resetPassword,

        completeGoogleLogin,

        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () =>
  useContext(AuthContext);
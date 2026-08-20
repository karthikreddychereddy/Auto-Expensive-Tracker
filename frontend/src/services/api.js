import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:8080/api";

const api = axios.create({
  baseURL: API_BASE_URL,
});

const refreshClient =
  axios.create({
    baseURL: API_BASE_URL,
  });

let isRefreshing = false;

let refreshQueue = [];

// ==========================================
// REFRESH QUEUE
// ==========================================

function processQueue(
  error,
  token = null
) {
  refreshQueue.forEach(
    promise => {
      if (error) {
        promise.reject(error);
      } else {
        promise.resolve(token);
      }
    }
  );

  refreshQueue = [];
}

// ==========================================
// SESSION
// ==========================================

function clearSession() {
  localStorage.removeItem(
    "pt_token"
  );

  localStorage.removeItem(
    "pt_refresh_token"
  );

  localStorage.removeItem(
    "pt_user"
  );
}

// ==========================================
// PUBLIC FRONTEND PAGES
// ==========================================

function isPublicFrontendPage() {
  const path =
    window.location.pathname;

  return (
    path === "/" ||
    path === "/login" ||
    path === "/register" ||
    path === "/verify-email" ||
    path === "/forgot-password" ||
    path === "/reset-password" ||
    path === "/oauth-success"
  );
}

// ==========================================
// AUTH API ENDPOINTS
// ==========================================

function isAuthenticationEndpoint(
  url = ""
) {
  return (
    url.includes(
      "/auth/login"
    ) ||
    url.includes(
      "/auth/register"
    ) ||
    url.includes(
      "/auth/verify-email"
    ) ||
    url.includes(
      "/auth/resend-otp"
    ) ||
    url.includes(
      "/auth/forgot-password"
    ) ||
    url.includes(
      "/auth/verify-reset-otp"
    ) ||
    url.includes(
      "/auth/reset-password"
    ) ||
    url.includes(
      "/auth/oauth/exchange"
    ) ||
    url.includes(
      "/auth/refresh"
    ) ||
    url.includes(
      "/auth/logout"
    )
  );
}

// ==========================================
// REDIRECT
// ==========================================

function redirectToLogin() {
  /*
   * Never interrupt an OAuth/authentication
   * page while it is establishing a session.
   */
  if (
    isPublicFrontendPage()
  ) {
    return;
  }

  if (
    window.location.pathname !==
    "/login"
  ) {
    window.location.replace(
      "/login"
    );
  }
}

// ==========================================
// REQUEST INTERCEPTOR
// ==========================================

api.interceptors.request.use(
  config => {
    const token =
      localStorage.getItem(
        "pt_token"
      );

    if (token) {
      config.headers =
        config.headers || {};

      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },

  error =>
    Promise.reject(
      error
    )
);

// ==========================================
// RESPONSE INTERCEPTOR
// ==========================================

api.interceptors.response.use(
  response =>
    response,

  async error => {
    const originalRequest =
      error.config;

    const status =
      error?.response?.status;

    if (
      status !== 401 ||
      !originalRequest
    ) {
      return Promise.reject(
        error
      );
    }

    const url =
      originalRequest.url || "";

    // ========================================
    // AUTH ENDPOINTS
    //
    // Never attempt token refresh here.
    // Especially important for:
    //
    // /auth/oauth/exchange
    //
    // because no JWT exists yet.
    // ========================================

    if (
      isAuthenticationEndpoint(
        url
      )
    ) {
      return Promise.reject(
        error
      );
    }

    // ========================================
    // ALREADY RETRIED
    // ========================================

    if (
      originalRequest._retry
    ) {
      clearSession();

      redirectToLogin();

      return Promise.reject(
        error
      );
    }

    const refreshToken =
      localStorage.getItem(
        "pt_refresh_token"
      );

    // ========================================
    // NO SESSION YET
    //
    // On public pages this can happen while
    // OAuth/login/register is still running.
    //
    // Do NOT force navigation to /login.
    // ========================================

    if (!refreshToken) {
      /*
       * If there was an old broken session,
       * clear it.
       */
      clearSession();

      /*
       * Only protected pages should be
       * redirected.
       */
      redirectToLogin();

      return Promise.reject(
        error
      );
    }

    // ========================================
    // REFRESH ALREADY RUNNING
    // ========================================

    if (isRefreshing) {
      return new Promise(
        (
          resolve,
          reject
        ) => {
          refreshQueue.push({
            resolve,
            reject,
          });
        }
      ).then(token => {
        originalRequest.headers =
          originalRequest.headers ||
          {};

        originalRequest
          .headers
          .Authorization =
          `Bearer ${token}`;

        return api(
          originalRequest
        );
      });
    }

    // ========================================
    // REFRESH TOKEN
    // ========================================

    originalRequest._retry =
      true;

    isRefreshing =
      true;

    try {
      const response =
        await refreshClient.post(
          "/auth/refresh",
          {
            refreshToken,
          }
        );

      const newAccessToken =
        response.data?.token ||
        response.data?.accessToken;

      const newRefreshToken =
        response.data
          ?.refreshToken;

      if (
        !newAccessToken ||
        !newRefreshToken
      ) {
        throw new Error(
          "Invalid refresh-token response."
        );
      }

      localStorage.setItem(
        "pt_token",
        newAccessToken
      );

      localStorage.setItem(
        "pt_refresh_token",
        newRefreshToken
      );

      processQueue(
        null,
        newAccessToken
      );

      originalRequest.headers =
        originalRequest.headers ||
        {};

      originalRequest
        .headers
        .Authorization =
        `Bearer ${newAccessToken}`;

      return api(
        originalRequest
      );

    } catch (
      refreshError
    ) {
      processQueue(
        refreshError,
        null
      );

      clearSession();

      redirectToLogin();

      return Promise.reject(
        refreshError
      );

    } finally {
      isRefreshing =
        false;
    }
  }
);

export default api;
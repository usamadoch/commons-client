
import { ApiError, ApiResponse } from "@/types";

// API base URL
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Custom error class for API errors
export class ApiClientError extends Error {
    public readonly code: string;
    public readonly status: number;
    public readonly details?: Record<string, string[]>;

    constructor(error: ApiError, status: number) {
        super(error.message);
        this.name = 'ApiClientError';
        this.code = error.code;
        this.status = status;
        this.details = error.details;
    }
}

// Track if we're currently refreshing to prevent multiple refresh calls
let isRefreshing = false;
let refreshPromise: Promise<boolean> | null = null;

let cachedCsrfToken: string | null = null;
let csrfPromise: Promise<string | null> | null = null;

/**
 * Fetch and cache CSRF token from the server
 */
async function getCsrfToken(): Promise<string | null> {
    if (cachedCsrfToken) return cachedCsrfToken;
    if (csrfPromise) return csrfPromise;

    csrfPromise = fetch(`${API_BASE_URL}/auth/csrf`, {
        credentials: 'include'
    }).then(res => res.json())
      .then(data => {
          if (data.success && data.data?.csrfToken) {
              cachedCsrfToken = data.data.csrfToken;
              return cachedCsrfToken;
          }
          return null;
      })
      .catch(() => null)
      .finally(() => {
          csrfPromise = null;
      });

    return csrfPromise;
}

/**
 * Core fetch wrapper with error handling and auto-refresh
 */
export async function fetchApi<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;

    const defaultHeaders: HeadersInit = {
        'Content-Type': 'application/json',
    };

    const config: RequestInit = {
        ...options,
        headers: {
            ...defaultHeaders,
            ...options.headers,
        },
        credentials: 'include', // Always send cookies
    };

    // Don't set Content-Type for FormData (browser sets it with boundary)
    if (options.body instanceof FormData) {
        delete (config.headers as Record<string, string>)['Content-Type'];
    }

    // Attach CSRF token for mutating requests
    const isMutatingMethod = ['POST', 'PUT', 'DELETE', 'PATCH'].includes(options.method?.toUpperCase() || 'GET');
    const isCsrfEndpoint = endpoint === '/auth/csrf';
    
    if (isMutatingMethod && !isCsrfEndpoint) {
        const token = await getCsrfToken();
        if (token) {
            config.headers = {
                ...config.headers,
                'x-csrf-token': token
            };
        }
    }

    let response: Response;

    try {
        response = await fetch(url, config);
    } catch (error) {
        console.error('[API] Network error:', error);
        throw new ApiClientError(
            { code: 'NETWORK_ERROR', message: 'Unable to connect to server' },
            0
        );
    }

    // Handle 403 CSRF Token Invalid - Clear cache and retry once
    if (response.status === 403) {
        let isCsrfError = false;
        try {
            // Clone to peek at the error without consuming the body
            const peekData = await response.clone().json();
            if (peekData?.error?.message === 'Invalid CSRF token') {
                isCsrfError = true;
            }
        } catch { }

        if (isCsrfError) {
            cachedCsrfToken = null; // Clear stale token
            const newToken = await getCsrfToken();
            if (newToken) {
                config.headers = {
                    ...config.headers,
                    'x-csrf-token': newToken
                };
                try {
                    response = await fetch(url, config); // Retry request
                } catch (error) {
                    console.error('[API] Network error on CSRF retry:', error);
                    throw new ApiClientError(
                        { code: 'NETWORK_ERROR', message: 'Unable to connect to server' },
                        0
                    );
                }
            }
        }
    }

    // Handle 401 - try to refresh token (but not for auth endpoints)
    const NO_REFRESH_ENDPOINTS = [
        '/auth/login',
        '/auth/signup',
        '/auth/check-email',
        '/auth/google',
        '/auth/refresh'
    ];

    const skipRefresh = NO_REFRESH_ENDPOINTS.some(path => endpoint.startsWith(path));
    if (response.status === 401 && !skipRefresh) {
        const refreshed = await refreshTokens();
        if (refreshed) {
            try {
                response = await fetch(url, config);
            } catch (error) {
                console.error('[API] Network error on retry:', error);
                throw new ApiClientError(
                    { code: 'NETWORK_ERROR', message: 'Unable to connect to server' },
                    0
                );
            }
        } else {
            // Token refresh failed (e.g. refresh token expired or revoked)
            // Dynamically import the store to avoid circular dependencies
            import('@/store/auth').then(({ useAuthStore }) => {
                const state = useAuthStore.getState();
                if (state.isAuthenticated) {
                    console.log('[API] Token refresh failed, logging out user');
                    state.logout();
                }
            });
        }
    }

    let data: ApiResponse<T>;
    try {
        data = await response.json() as ApiResponse<T>;
    } catch {
        throw new ApiClientError(
            { code: 'PARSE_ERROR', message: 'Invalid response from server' },
            response.status
        );
    }

    if (!data.success) {
        throw new ApiClientError(data.error, response.status);
    }

    return data.data;
}

/**
 * Refresh access token using refresh token
 */
async function refreshTokens(): Promise<boolean> {
    if (isRefreshing && refreshPromise) {
        return refreshPromise;
    }

    isRefreshing = true;
    refreshPromise = (async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
                method: 'POST',
                credentials: 'include',
            });
            return response.ok;
        } catch {
            return false;
        } finally {
            isRefreshing = false;
            refreshPromise = null;
        }
    })();

    return refreshPromise;
}

// src/utils/auth.ts
import api from "../api";
let _cachedAuth: boolean | null = null;
let _cachedAt = 0;
const AUTH_TTL_MS = 10_000; // 10 seconds

// ---------------------------------------------------------------------------
// Types & helpers
// ---------------------------------------------------------------------------

export interface CurrentUser {
        id: string;
        email: string;
        role: string;
        fullName?: string;
}

export function setAuthToken(token: string | null) {
        if (token) {
                localStorage.setItem("jwtToken", token);
        } else {
                localStorage.removeItem("jwtToken");
        }
}

export function getAuthToken(): string | null {
        return localStorage.getItem("jwtToken");
}

/**
 * Fetches the current authenticated user (if any).
 * Returns `null` if the request is not authenticated (401) so callers can
 * decide how to react (redirect, show a prompt, etc.).
 */
export async function getUser(): Promise<CurrentUser | null> {
        try {
                const res = await api.get<{ user: CurrentUser }>("/account");
                return res.data.user;
        } catch (err: any) {
                if (err.response?.status === 401) {
                        return null;
                }
                // Bubble up anything else so the caller can handle/log it
                throw err;
        }
}

export async function isAuthenticated(): Promise<boolean> {
        const token = getAuthToken();
        if (!token) {
                return false;
        }
        try {
                const res = await api.get<{ user: CurrentUser }>("/account");
                // if we got a user object with an id, we’re good
                return Boolean(res.data.user?.id);
        } catch {
                // on 401 or any error, just return false
                return false;
        }
}

export async function logout() {
        _cachedAuth = null;
        _cachedAt = 0;
        sessionStorage.removeItem("homeRedirected");
        localStorage.removeItem("nonPersistentAuth");
        localStorage.removeItem("tabCount");
        setAuthToken(null); // Clear the token from localStorage
        await api.post("/auth/logout"); // clears HttpOnly cookie on server
}

export async function logoutAndRedirect(redirectTo: string | null = "/signin") {
        try {
                await logout();

                localStorage.removeItem("nonPersistentAuth");

                window.dispatchEvent(
                        new CustomEvent("authchange", {
                                detail: { authenticated: false },
                        })
                );
        } finally {
                if (redirectTo) {
                        window.location.assign(redirectTo);
                }
        }
}

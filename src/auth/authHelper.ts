// src/utils/auth.ts
import api from "../api";
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

export async function logout() {
        setAuthToken(null); // Clear the token from localStorage

        // Clear form-related localStorage items
        localStorage.removeItem("formSchema");
        localStorage.removeItem("formId");

        try {
                await api.post("/auth/logout"); // clears HttpOnly cookie on server
        } catch (error) {
                console.error("Logout API call failed:", error);
        }
}

export async function logoutAndRedirect(redirectTo: string | null = "/signin") {
        try {
                await logout();

                localStorage.removeItem("nonPersistentAuth");

                // Clear any additional form data or user-specific data
                localStorage.removeItem("formSchema");
                localStorage.removeItem("formId");
                localStorage.removeItem("pendingGoogleAuthCallback");

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

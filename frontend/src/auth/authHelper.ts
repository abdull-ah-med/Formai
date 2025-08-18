// src/utils/auth.ts
import api from "../api";

export interface CurrentUser {
	_id: string;
	email: string;
	fullName: string;
	role: "user" | "admin";
	googleId?: string;
	hasPassword: boolean;
	createdAt: string;
	updatedAt: string;
	isGoogleLinked: boolean;
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
        setAuthToken(null);
        localStorage.removeItem("formSchema");
        localStorage.removeItem("formId");

        try {
                await api.post("/auth/logout");
        } catch {
                // Silently ignore logout errors
        }
}

export async function logoutAndRedirect(redirectTo: string | null = "/signin") {
        try {
                await logout();

                localStorage.removeItem("nonPersistentAuth");
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

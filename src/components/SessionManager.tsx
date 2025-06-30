import React, { useEffect, useState } from "react";
import { logoutAndRedirect, isAuthenticated } from "../auth/authHelper";
import api from "../api";

interface AuthDebugInfo {
        message: string;
        user: any;
        hasCookies: boolean;
        hasAuthHeader: boolean;
        cookies?: Record<string, string>;
}

const SessionManager: React.FC = () => {
        const [debugInfo, setDebugInfo] = useState<AuthDebugInfo | null>(null);
        const [error, setError] = useState<string | null>(null);

        const checkAuthStatus = async () => {
                try {
                        const response = await api.get<AuthDebugInfo>(
                                "/auth-debug"
                        );
                        setDebugInfo(response.data);
                        setError(null);
                } catch (err: any) {
                        setError(`Auth error: ${err.message}`);
                        setDebugInfo(null);
                }
        };

        useEffect(() => {
                const nonPersistent =
                        localStorage.getItem("nonPersistentAuth") === "true";

                if (nonPersistent) {
                        const tabCount = parseInt(
                                localStorage.getItem("tabCount") || "0"
                        );
                        if (tabCount <= 1) {
                                // Last tab is closing, log out
                                logoutAndRedirect();
                        }
                }

                const handleBeforeUnload = () => {
                        const tabCount = parseInt(
                                localStorage.getItem("tabCount") || "0"
                        );
                        localStorage.setItem(
                                "tabCount",
                                Math.max(0, tabCount - 1).toString()
                        );
                };

                window.addEventListener("beforeunload", handleBeforeUnload);

                // Check if we need to increment the tab count
                const tabCount = parseInt(
                        localStorage.getItem("tabCount") || "0"
                );
                localStorage.setItem("tabCount", (tabCount + 1).toString());

                return () => {
                        window.removeEventListener(
                                "beforeunload",
                                handleBeforeUnload
                        );
                };
        }, []);

        useEffect(() => {
                // Check auth status when component mounts
                checkAuthStatus();
        }, []);

        return (
                <div className="p-4 border rounded-md bg-gray-50 my-4">
                        <h2 className="text-lg font-semibold mb-2">
                                Session Status
                        </h2>

                        <button
                                onClick={checkAuthStatus}
                                className="px-4 py-2 bg-blue-500 text-white rounded mb-4"
                        >
                                Check Auth Status
                        </button>

                        {error && (
                                <div className="p-2 bg-red-100 text-red-700 rounded mb-2">
                                        {error}
                                </div>
                        )}

                        {debugInfo && (
                                <div className="space-y-2">
                                        <p>
                                                <strong>Status:</strong>{" "}
                                                {debugInfo.message}
                                        </p>
                                        <p>
                                                <strong>Has Cookie:</strong>{" "}
                                                {debugInfo.hasCookies
                                                        ? "Yes"
                                                        : "No"}
                                        </p>
                                        <p>
                                                <strong>
                                                        Has Auth Header:
                                                </strong>{" "}
                                                {debugInfo.hasAuthHeader
                                                        ? "Yes"
                                                        : "No"}
                                        </p>
                                        {debugInfo.user && (
                                                <div>
                                                        <p>
                                                                <strong>
                                                                        User ID:
                                                                </strong>{" "}
                                                                {
                                                                        debugInfo
                                                                                .user
                                                                                .sub
                                                                }
                                                        </p>
                                                        <p>
                                                                <strong>
                                                                        Email:
                                                                </strong>{" "}
                                                                {
                                                                        debugInfo
                                                                                .user
                                                                                .email
                                                                }
                                                        </p>
                                                        <p>
                                                                <strong>
                                                                        Role:
                                                                </strong>{" "}
                                                                {
                                                                        debugInfo
                                                                                .user
                                                                                .role
                                                                }
                                                        </p>
                                                </div>
                                        )}
                                </div>
                        )}
                </div>
        );
};

export default SessionManager;

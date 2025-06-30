import { useEffect } from "react";
import { logoutAndRedirect, isAuthenticated } from "../auth/authHelper";

const SessionManager: React.FC = () => {
        useEffect(() => {
                const nonPersistent =
                        localStorage.getItem("nonPersistentAuth") === "true";
                if (!nonPersistent) return;

                // Increment tab count
                const incrementTabs = () => {
                        const current =
                                Number(localStorage.getItem("tabCount")) || 0;
                        localStorage.setItem("tabCount", String(current + 1));
                };

                const decrementTabs = async () => {
                        const current =
                                Number(localStorage.getItem("tabCount")) || 1;
                        const newCount = Math.max(current - 1, 0);
                        localStorage.setItem("tabCount", String(newCount));

                        if (newCount === 0) {
                                // Double-check auth status in case user already logged out.
                                if (await isAuthenticated()) {
                                        // Use navigator.sendBeacon for reliability in unload.
                                        try {
                                                const url = "/api/auth/logout";
                                                const blob = new Blob([], {
                                                        type: "application/json",
                                                });
                                                navigator.sendBeacon(url, blob);
                                                // Update client-side auth state in this tab.
                                                logoutAndRedirect(null);
                                        } catch {
                                                // fallback
                                                logoutAndRedirect(null);
                                        }
                                }
                                // Clean up
                                localStorage.removeItem("nonPersistentAuth");
                                localStorage.removeItem("tabCount");
                        }
                };

                incrementTabs();

                window.addEventListener("beforeunload", decrementTabs);

                // Also listen for storage changes from other tabs (e.g., user logs out)
                const handleStorage = (e: StorageEvent) => {
                        if (
                                e.key === "nonPersistentAuth" &&
                                e.newValue === null
                        ) {
                                // user logged out elsewhere; remove listener
                                window.removeEventListener(
                                        "beforeunload",
                                        decrementTabs
                                );
                        }
                };
                window.addEventListener("storage", handleStorage);

                return () => {
                        window.removeEventListener(
                                "beforeunload",
                                decrementTabs
                        );
                        window.removeEventListener("storage", handleStorage);
                };
        }, []);

        return null;
};

export default SessionManager;

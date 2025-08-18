import React, { useEffect } from "react";
import { logoutAndRedirect } from "../auth/authHelper";

const SessionManager: React.FC = () => {
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

                // Increment the tab count for the current tab
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

        // No UI needed for this helper component
        return null;
};

export default SessionManager;

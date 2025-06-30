// src/components/ui/ProtectedRoute.tsx
import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated, logoutAndRedirect } from "../../auth/authHelper";

const ProtectedRoute: React.FC = () => {
        const [status, setStatus] = useState<"loading" | "ok" | "nope">(
                "loading"
        );

        useEffect(() => {
                isAuthenticated()
                        .then((auth) => {
                                setStatus(auth ? "ok" : "nope");
                                if (!auth) logoutAndRedirect("/signin");
                        })
                        .catch(() => {
                                setStatus("nope");
                                logoutAndRedirect("/signin");
                        });
        }, []);

        if (status === "loading") {
                return <div className="spinner">Loading…</div>;
        }
        if (status === "nope") {
                return <Navigate to="/signin" replace />;
        }
        return <Outlet />;
};

export default ProtectedRoute;

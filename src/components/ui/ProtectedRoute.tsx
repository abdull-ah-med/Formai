// src/components/ui/ProtectedRoute.tsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const ProtectedRoute: React.FC = () => {
        const { isAuthenticated, loading } = useAuth();

        if (loading) {
                return <div className="spinner">Loading…</div>;
        }

        if (!isAuthenticated) {
                return <Navigate to="/signin" replace />;
        }

        return <Outlet />;
};

export default ProtectedRoute;

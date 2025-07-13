// src/components/ui/ProtectedRoute.tsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Loader } from "./loader";

const ProtectedRoute: React.FC = () => {
        const { isAuthenticated, loading } = useAuth();

        if (loading) {
                return (
                        <div className="min-h-screen flex items-center justify-center">
                                <Loader variant="dots" size="lg" />
                        </div>
                );
        }

        if (!isAuthenticated) {
                return <Navigate to="/signin" replace />;
        }

        return <Outlet />;
};

export default ProtectedRoute;

import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../api";
import { useAuth } from "../contexts/AuthContext";

const GoogleAuthCallback: React.FC = () => {
        const navigate = useNavigate();
        const location = useLocation();
        const { login } = useAuth();

        useEffect(() => {
                const handleCallback = async () => {
                        const params = new URLSearchParams(location.search);
                        const code = params.get("code");

                        if (code) {
                                try {
                                        const res = await api.get<{ token: string }>("/auth/google/callback", {
                                                params: { code },
                                        });
                                        await login(res.data.token);
                                        navigate("/dashboard", { replace: true });
                                } catch (error) {
                                        console.error("Google OAuth callback failed:", error);
                                        navigate("/signin", { replace: true });
                                }
                        } else {
                                navigate("/signin", { replace: true });
                        }
                };

                handleCallback();
        }, [navigate, location, login]);

        return (
                <div className="flex items-center justify-center h-screen">
                        <div>Loading...</div>
                </div>
        );
};

export default GoogleAuthCallback;

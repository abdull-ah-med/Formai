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
                <div className="flex items-center justify-center h-screen bg-black">
                        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl ring-1 ring-white/10 shadow-[0_0_30px_rgba(120,120,255,0.15)] w-full max-w-md text-center">
                                <div className="flex flex-col items-center">
                                        <div className="w-16 h-16 rounded-full bg-blue-500/20 backdrop-blur-sm flex items-center justify-center mb-6">
                                                <svg
                                                        className="w-8 h-8 text-blue-400 animate-pulse"
                                                        fill="currentColor"
                                                        viewBox="0 0 24 24"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                >
                                                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22c-5.523 0-10-4.477-10-10S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-8v-6h2v6h4l-5 5-5-5h4z"></path>
                                                </svg>
                                        </div>
                                        <h2 className="text-2xl font-semibold text-white mb-3">Connecting to Google</h2>
                                        <p className="text-gray-300 mb-6">
                                                Please wait while we securely connect your Google account...
                                        </p>

                                        <div className="flex justify-center space-x-2">
                                                <div
                                                        className="w-3 h-3 rounded-full bg-blue-500 animate-bounce"
                                                        style={{ animationDelay: "0ms" }}
                                                ></div>
                                                <div
                                                        className="w-3 h-3 rounded-full bg-blue-500 animate-bounce"
                                                        style={{ animationDelay: "150ms" }}
                                                ></div>
                                                <div
                                                        className="w-3 h-3 rounded-full bg-blue-500 animate-bounce"
                                                        style={{ animationDelay: "300ms" }}
                                                ></div>
                                        </div>
                                </div>
                        </div>
                </div>
        );
};

export default GoogleAuthCallback;

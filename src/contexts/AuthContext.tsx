import React, { createContext, useState, useEffect, useContext, useCallback } from "react";
import { getAuthToken, setAuthToken, CurrentUser, logout as logoutUser } from "../auth/authHelper";
import api from "../api";

interface AuthContextType {
        isAuthenticated: boolean;
        user: CurrentUser | null;
        loading: boolean;
        login: (token: string) => Promise<void>;
        logout: () => void;
        reloadUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
        const [user, setUser] = useState<CurrentUser | null>(null);
        const [loading, setLoading] = useState(true);

        const fetchUser = useCallback(async () => {
                const token = getAuthToken();
                if (!token) {
                        setLoading(false);
                        setUser(null);
                        return;
                }

                try {
                        console.log("Fetching user data...");
                        const res = await api.get<{ user: CurrentUser }>("/account");
                        console.log("User data response:", res.data);
                        if (res.data.user) {
                                setUser(res.data.user);
                        } else {
                                console.error("No user data in response");
                                setUser(null);
                                setAuthToken(null); // Token is invalid, remove it
                        }
                } catch (error: any) {
                        console.error("Failed to fetch user:", error);
                        console.error("Error details:", error.response?.data || error.message);
                        setUser(null);
                        setAuthToken(null); // Token is invalid, remove it
                } finally {
                        setLoading(false);
                }
        }, []);

        useEffect(() => {
                fetchUser();
        }, [fetchUser]);

        const login = async (token: string) => {
                setAuthToken(token);
                setLoading(true);
                await fetchUser();
        };

        const logout = () => {
                logoutUser();
                setUser(null);
        };

        const reloadUser = async () => {
                setLoading(true);
                await fetchUser();
        };

        return (
                <AuthContext.Provider
                        value={{
                                isAuthenticated: !!user,
                                user,
                                loading,
                                login,
                                logout,
                                reloadUser,
                        }}
                >
                        {children}
                </AuthContext.Provider>
        );
};

export const useAuth = () => {
        const context = useContext(AuthContext);
        if (context === undefined) {
                throw new Error("useAuth must be used within an AuthProvider");
        }
        return context;
};

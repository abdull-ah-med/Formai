import React, { createContext, useState, useEffect, useContext, useCallback, useMemo } from "react";
import api from "../api";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { IUser as User } from "@formai/types";

// Define a type for the decoded token
interface DecodedToken extends JwtPayload {
	role: "user" | "admin";
	// Add other properties from your token payload here
}

interface AuthContextType {
	user: User | null;
	isLoading: boolean;
	login: (token: string) => Promise<User>; // Return the user object
	logout: () => void;
	isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	const login = useCallback(async (token: string) => {
		localStorage.setItem("token", token);
		api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
		try {
			// Fetch fresh user data from the server
			const response = await api.get<{ success: boolean; data: User }>("/account/me");
			if (response.data.success) {
				const userData = {
					...response.data.data,
					isGoogleLinked: !!response.data.data.googleId,
				};
				setUser(userData);
				return userData; // Return the fresh user data
			} else {
				throw new Error("Failed to fetch user data after login.");
			}
		} catch (error) {
			console.error("Failed to decode token or fetch user", error);
			logout(); // Ensure logout is called on failure
			throw error;
		}
	}, []);

	const logout = useCallback(() => {
		localStorage.removeItem("token");
		delete api.defaults.headers.common["Authorization"];
		setUser(null);
	}, []);

	useEffect(() => {
		const initAuth = async () => {
			const token = localStorage.getItem("token");
			if (token) {
				try {
					await login(token);
				} catch (error) {
					console.error("Session token is invalid or expired.", error);
					logout();
				}
			}
			setIsLoading(false);
		};
		initAuth();
	}, [login, logout]);

	const authContextValue = useMemo(
		() => ({
			user,
			isLoading,
			login,
			logout,
			isAuthenticated: !!user,
		}),
		[user, isLoading, login, logout]
	);

	return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};

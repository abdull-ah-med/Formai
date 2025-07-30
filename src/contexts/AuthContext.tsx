import React, { useState, useEffect, useCallback } from "react";
import { getAuthToken, setAuthToken, CurrentUser, logout as logoutUser } from "../auth/authHelper";
import api from "../api";
import { AuthContext } from "./AuthContextDefinition";

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
			const res = await api.get<{ user: CurrentUser }>("/account");
			if (res.data.user) {
				setUser(res.data.user);
			} else {
				setUser(null);
				setAuthToken(null); // Token is invalid, remove it
			}
		} catch {
			// Token is invalid or network error, clear auth state
			setUser(null);
			setAuthToken(null);
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

	const logout = (callback?: () => void) => {
		logoutUser();
		setUser(null);
		if (callback) {
			callback();
		}
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
			}}>
			{children}
		</AuthContext.Provider>
	);
};

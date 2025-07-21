import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../api";
import { useAuth } from "../contexts/AuthContext";
import { useDocumentTitle } from "../utils/useDocumentTitle";
import { Loader } from "./ui/loader";

const GoogleAuthCallback: React.FC = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { login } = useAuth();
	useDocumentTitle("Google Authentication");
	const [error, setError] = useState<string | null>(null);
	const [isProcessing, setIsProcessing] = useState(true);
	const codeProcessed = useRef(false);

	useEffect(() => {
		const handleCallback = async () => {
			if (codeProcessed.current) return;
			codeProcessed.current = true; // Mark as processed immediately

			const params = new URLSearchParams(location.search);
			const code = params.get("code");
			const errorParam = params.get("error");

			if (errorParam) {
				setError(`Google authentication failed: ${errorParam}`);
				setIsProcessing(false);
				return;
			}

			if (!code) {
				setError("No authorization code received from Google.");
				setIsProcessing(false);
				return;
			}

			try {
				const res = await api.get<{
					token: string;
					success: boolean;
					error?: string;
					message?: string;
					hasFormsScope?: boolean;
					hasRefreshToken?: boolean;
				}>("/auth/google/callback", {
					params: { code },
				});

				if (!res.data.success || !res.data.token) {
					setError(res.data.message || "Authentication failed. No token received.");
					setIsProcessing(false);
					return;
				}

				// Check if the required 'forms' scope was granted
				if (!res.data.hasFormsScope) {
					setError(
						"Form creation permission was not granted. Please re-authenticate and approve access to Google Forms."
					);
					setIsProcessing(false);
					return;
				}

				await login(res.data.token);

				// Redirect to dashboard on successful login
				navigate("/dashboard", { replace: true });
			} catch (error: any) {
				const errorMessage =
					error.response?.data?.message ||
					"An unexpected error occurred during Google authentication.";
				setError(errorMessage);
				setIsProcessing(false);
			}
		};

		handleCallback();
	}, [navigate, location, login]);

	if (isProcessing) {
		return (
			<div className="flex items-center justify-center h-screen bg-black text-white">
				<Loader variant="spinner" size="lg" />
				<p className="ml-4">Connecting to Google...</p>
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex flex-col items-center justify-center h-screen bg-black text-white">
				<div className="bg-red-900/50 p-6 rounded-lg text-center">
					<h2 className="text-2xl font-semibold mb-4">Connection Failed</h2>
					<p className="text-red-300 mb-6">{error}</p>
					<button
						onClick={() => navigate("/signin", { replace: true })}
						className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
						Return to Sign In
					</button>
				</div>
			</div>
		);
	}

	return null; // Should not be reached if logic is correct
};

export default GoogleAuthCallback;

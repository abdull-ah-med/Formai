export function getGoogleOAuthURL(userId?: string) {
	const env = (import.meta as unknown as { env: Record<string, string> }).env;
	const clientId = env?.VITE_GOOGLE_CLIENT_ID;
	const redirectUri = (env?.VITE_FRONTEND_URL || "").replace(/\/$/, "") + "/auth/google/callback";

	if (!clientId) {
		throw new Error("Missing VITE_GOOGLE_CLIENT_ID env variable");
	}
	
	// Create state parameter with userId if provided
	const state = userId ? JSON.stringify({ userId }) : undefined;
	
	const params = new URLSearchParams({
		client_id: clientId,
		redirect_uri: redirectUri,
		response_type: "code",
		scope: "openid email profile https://www.googleapis.com/auth/forms https://www.googleapis.com/auth/drive.file",
		access_type: "offline",
		include_granted_scopes: "true",
	});

	// Add state parameter if we have one
	if (state) {
		params.set("state", state);
	}

	return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
}

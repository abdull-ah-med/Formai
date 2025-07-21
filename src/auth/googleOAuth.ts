/// <reference types="vite/client" />

export function getGoogleOAuthURL() {
	const env = (import.meta as unknown as { env: Record<string, string> }).env;
	const clientId = env?.VITE_GOOGLE_CLIENT_ID;
	const redirectUri = (env?.VITE_FRONTEND_URL || "").replace(/\/$/, "") + "/auth/google/callback";

	if (!clientId) {
		throw new Error("Missing VITE_GOOGLE_CLIENT_ID env variable");
	}
	const params = new URLSearchParams({
		client_id: clientId,
		redirect_uri: redirectUri,
		response_type: "code",
		scope: "openid email profile https://www.googleapis.com/auth/forms https://www.googleapis.com/auth/drive.file",
		access_type: "offline",
		include_granted_scopes: "true",
	});

	return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
}

export const handleGoogleLogin = () => {
	const rootUrl = `https://accounts.google.com/o/oauth2/v2/auth`;
	const options = {
		redirect_uri: `${window.location.origin}/auth/google/callback`,
		client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
		access_type: "offline",
		response_type: "code",
		prompt: "consent",
		scope: [
			"https://www.googleapis.com/auth/userinfo.profile",
			"https://www.googleapis.com/auth/userinfo.email",
			"https://www.googleapis.com/auth/forms.body",
			"https://www.googleapis.com/auth/drive.file",
		].join(" "),
	};

	const qs = new URLSearchParams(options);
	const googleLoginUrl = `${rootUrl}?${qs.toString()}`;

	// Redirect the user to the Google OAuth consent screen
	window.location.href = googleLoginUrl;
};

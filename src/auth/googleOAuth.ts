/// <reference types="vite/client" />

export function getGoogleOAuthURL() {
	const rootUrl = `https://accounts.google.com/o/oauth2/v2/auth`;

	const options = {
		redirect_uri: import.meta.env.VITE_GOOGLE_REDIRECT_URI,
		client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
		access_type: "offline",
		response_type: "code",
		prompt: "consent",
		scope: [
			"https://www.googleapis.com/auth/userinfo.profile",
			"https://www.googleapis.com/auth/userinfo.email",
			"https://www.googleapis.com/auth/forms.body",
		].join(" "),
	};

	const params = new URLSearchParams(options);
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

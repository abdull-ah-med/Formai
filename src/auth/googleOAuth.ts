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
                scope: "openid email profile https://www.googleapis.com/auth/forms",
                access_type: "offline",
                prompt: "consent",
                include_granted_scopes: "true",
        });

        return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
}

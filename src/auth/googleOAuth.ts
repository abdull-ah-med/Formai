export interface GoogleOAuthOptions {
        remember?: boolean;
        mode?: "login" | "signup";
}

// New helper that conforms to backend expectations
export function getGoogleOAuthURL(remember: boolean, nonce: string) {
        const env = (import.meta as unknown as { env: Record<string, string> })
                .env;
        const clientId = env?.VITE_GOOGLE_CLIENT_ID;
        const redirectUri =
                env?.VITE_GOOGLE_REDIRECT_URI ||
                // Fall back to backend /auth/google/callback when env var missing
                `${(env?.VITE_API_BASE_URL || "/api").replace(
                        /\/api$/i,
                        ""
                )}/api/auth/google/callback`;

        if (!clientId) {
                throw new Error("Missing VITE_GOOGLE_CLIENT_ID env variable");
        }

        const params = new URLSearchParams({
                client_id: clientId,
                redirect_uri: redirectUri,
                response_type: "code",
                scope: "openid email profile",
                access_type: "offline",
                include_granted_scopes: "true",
                state: btoa(
                        JSON.stringify({
                                remember: remember ? 1 : 0,
                                nonce,
                        })
                ),
        });

        return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
}

// Legacy function kept for backward-compatibility in case other parts of the
// codebase still import it. This now delegates to the new helper.
export function buildGoogleOAuthURL(options: GoogleOAuthOptions = {}) {
        const nonce =
                typeof crypto !== "undefined" && "randomUUID" in crypto
                        ? (
                                  crypto as unknown as {
                                          randomUUID: () => string;
                                  }
                          ).randomUUID()
                        : Math.random().toString(36).substring(2, 15);

        return getGoogleOAuthURL(Boolean(options.remember), nonce);
}

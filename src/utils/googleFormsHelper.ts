import api from "../api";

export interface GoogleFormsPermissionResponse {
        success: boolean;
        hasPermission: boolean;
        reason?: "NOT_CONNECTED" | "TOKEN_EXPIRED" | "PERMISSION_DENIED" | "API_ERROR";
        message?: string;
        error?: string;
}

/**
 * Checks if the current user has permissions to use Google Forms
 * @returns Permission check result
 */
export async function checkGoogleFormsPermission(): Promise<GoogleFormsPermissionResponse> {
        try {
                const response = await api.get<GoogleFormsPermissionResponse>("/account/google-forms-permission");
                return response.data;
        } catch (error: any) {
                console.error("Failed to check Google Forms permissions:", error);
                return {
                        success: false,
                        hasPermission: false,
                        reason: "API_ERROR",
                        message: error.response?.data?.message || "Error checking Google Forms permissions",
                        error: error.message,
                };
        }
}

/**
 * Helper function to get a user-friendly message based on the permission check result
 */
export function getPermissionErrorMessage(permissionCheck: GoogleFormsPermissionResponse): string {
        if (permissionCheck.hasPermission) {
                return "";
        }

        switch (permissionCheck.reason) {
                case "NOT_CONNECTED":
                        return "Your Google account is not connected. Please connect your Google account in account settings.";
                case "TOKEN_EXPIRED":
                        return "Your Google authorization has expired. Please reconnect your Google account.";
                case "PERMISSION_DENIED":
                        return "You need to grant permission to access Google Forms. Please reconnect your Google account and make sure to allow access to Google Forms.";
                case "API_ERROR":
                default:
                        return "Something went wrong checking your Google Forms permissions. Please try again later.";
        }
}

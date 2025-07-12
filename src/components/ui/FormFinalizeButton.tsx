import React, { useState } from "react";
import { Button } from "./button";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import { checkGoogleFormsPermission, getPermissionErrorMessage } from "../../utils/googleFormsHelper";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./dialog";

interface FormFinalizeButtonProps {
        formId: string;
        onSuccess?: (googleFormUrl: string) => void;
        className?: string;
}

interface FormFinalizeResponse {
        success: boolean;
        data?: {
                formId: string;
                googleFormUrl: string;
                schema: any;
        };
        error?: string;
}

const FormFinalizeButton: React.FC<FormFinalizeButtonProps> = ({ formId, onSuccess, className }) => {
        const [isLoading, setIsLoading] = useState(false);
        const [error, setError] = useState<string | null>(null);
        const [showPermissionDialog, setShowPermissionDialog] = useState(false);
        const [permissionError, setPermissionError] = useState<string>("");
        const navigate = useNavigate();

        const handleFinalize = async () => {
                setIsLoading(true);
                setError(null);

                try {
                        // First check if user has Google Forms permissions
                        const permissionCheck = await checkGoogleFormsPermission();

                        if (!permissionCheck.hasPermission) {
                                setPermissionError(getPermissionErrorMessage(permissionCheck));
                                setShowPermissionDialog(true);
                                setIsLoading(false);
                                return;
                        }

                        // If they have permission, proceed with form finalization
                        const response = await api.post<FormFinalizeResponse>(`/forms/${formId}/finalize`);

                        if (response.data.success && response.data.data) {
                                const googleFormUrl = response.data.data.googleFormUrl;
                                if (onSuccess) {
                                        onSuccess(googleFormUrl);
                                } else {
                                        // Redirect to the form or show success message
                                        window.open(googleFormUrl, "_blank");
                                }
                        } else {
                                setError(response.data.error || "Failed to finalize form");
                        }
                } catch (err: any) {
                        if (err.response?.data?.error === "CONNECT_GOOGLE") {
                                setPermissionError("Please connect your Google account to create forms.");
                                setShowPermissionDialog(true);
                        } else if (err.response?.data?.error === "GOOGLE_TOKEN_EXPIRED") {
                                setPermissionError(
                                        "Your Google authorization has expired. Please reconnect your Google account."
                                );
                                setShowPermissionDialog(true);
                        } else {
                                setError(err.response?.data?.message || err.message || "An error occurred");
                        }
                } finally {
                        setIsLoading(false);
                }
        };

        const handleConnectGoogle = () => {
                // Store current location to redirect back after Google auth
                localStorage.setItem("redirectAfterAuth", window.location.pathname);

                // Redirect to Google auth
                const googleOAuthURL = "/api/auth/google";
                window.location.href = googleOAuthURL;
        };

        const handleGoToSettings = () => {
                navigate("/account-settings");
        };

        return (
                <>
                        <Button onClick={handleFinalize} disabled={isLoading} className={className}>
                                {isLoading ? "Creating Form..." : "Create Google Form"}
                        </Button>

                        {error && <p className="text-red-500 mt-2">{error}</p>}

                        <Dialog open={showPermissionDialog} onOpenChange={setShowPermissionDialog}>
                                <DialogContent>
                                        <DialogHeader>
                                                <DialogTitle>Google Forms Permission Required</DialogTitle>
                                                <DialogDescription>{permissionError}</DialogDescription>
                                        </DialogHeader>
                                        <DialogFooter>
                                                <Button
                                                        variant="outline"
                                                        onClick={() => setShowPermissionDialog(false)}
                                                >
                                                        Cancel
                                                </Button>
                                                <Button onClick={handleConnectGoogle}>Connect Google Account</Button>
                                                <Button variant="secondary" onClick={handleGoToSettings}>
                                                        Go to Settings
                                                </Button>
                                        </DialogFooter>
                                </DialogContent>
                        </Dialog>
                </>
        );
};

export default FormFinalizeButton;

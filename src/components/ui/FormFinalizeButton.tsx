import React, { useState, useEffect } from "react";
import { Button } from "./button";
import { useNavigate } from "react-router-dom";
import { getGoogleOAuthURL } from "../../auth/googleOAuth";
import { finalizeForm } from "../../api";
import { useAuth } from "../../contexts/AuthContext";

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
        message?: string;
}

const FormFinalizeButton: React.FC<FormFinalizeButtonProps> = ({ formId, onSuccess, className }) => {
        const [isLoading, setIsLoading] = useState(false);
        const [error, setError] = useState<string | null>(null);
        const [showPermissionDialog, setShowPermissionDialog] = useState(false);
        const [permissionError, setPermissionError] = useState<string>("");
        const navigate = useNavigate();
        const { user } = useAuth();

        // Prevent scrolling when dialog is open
        useEffect(() => {
                if (showPermissionDialog) {
                        document.body.style.overflow = "hidden";
                } else {
                        document.body.style.overflow = "";
                }

                return () => {
                        document.body.style.overflow = "";
                };
        }, [showPermissionDialog]);

        const handleFinalize = async () => {
                setIsLoading(true);
                setError(null);
                setPermissionError("");

                try {
                        const response = (await finalizeForm(formId)) as FormFinalizeResponse;

                        if (response.success && response.data) {
                                const googleFormUrl = response.data.googleFormUrl;
                                if (onSuccess) {
                                        onSuccess(googleFormUrl);
                                } else {
                                        window.open(googleFormUrl, "_blank");
                                }
                        } else {
                                if (response.error === "CONNECT_GOOGLE") {
                                        setPermissionError("Please connect your Google account to create forms.");
                                        setShowPermissionDialog(true);
                                } else if (response.error === "GOOGLE_TOKEN_EXPIRED") {
                                        setPermissionError(
                                                "Your Google authorization has expired. Please reconnect your Google account."
                                        );
                                        setShowPermissionDialog(true);
                                } else if (response.error === "GOOGLE_PERMISSION_DENIED") {
                                        setPermissionError(
                                                "You don't have permission to create Google Forms. Please reconnect your Google account with the required permissions."
                                        );
                                        setShowPermissionDialog(true);
                                } else {
                                        setError(response.message || response.error || "Failed to finalize form");
                                }
                        }
                } catch (err: any) {
                        const errData = err.response?.data;

                        if (errData?.error === "CONNECT_GOOGLE") {
                                setPermissionError("Please connect your Google account to create forms.");
                                setShowPermissionDialog(true);
                        } else if (errData?.error === "GOOGLE_TOKEN_EXPIRED") {
                                setPermissionError(
                                        "Your Google authorization has expired. Please reconnect your Google account."
                                );
                                setShowPermissionDialog(true);
                        } else if (errData?.error === "GOOGLE_PERMISSION_DENIED") {
                                setPermissionError(
                                        "You don't have permission to create Google Forms. Please reconnect your Google account with the required permissions."
                                );
                                setShowPermissionDialog(true);
                        } else {
                                setError(errData?.message || err.message || "An error occurred creating your form. Please try reconnecting your Google account.");
                        }
                } finally {
                        setIsLoading(false);
                }
        };

        const handleConnectGoogle = () => {
                localStorage.setItem("redirectAfterAuth", window.location.pathname);
                // Force the OAuth consent screen to appear again by adding a timestamp
                // This ensures we get a fresh token with appropriate permissions
                const timestamp = new Date().getTime();
                console.log('User object:', user);
                console.log('User ID being passed:', user?._id);
                const googleOAuthURL = getGoogleOAuthURL(user?._id) + `&prompt_time=${timestamp}`;
                console.log('Generated OAuth URL:', googleOAuthURL);

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

                        {showPermissionDialog && (
                                <div
                                        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999]"
                                        style={{ position: "fixed" }}
                                >
                                        <div className="bg-black/30 backdrop-blur-xl border border-white/10 rounded-xl p-6 w-full max-w-sm text-center shadow-2xl">
                                                <h3 className="text-2xl font-bold mb-2">Google Permission Required</h3>
                                                <p className="text-gray-300 mb-6">{permissionError}</p>
                                                <div className="flex flex-col gap-3">
                                                        <Button
                                                                onClick={handleConnectGoogle}
                                                                className="bg-blue-600 hover:bg-blue-700 w-full transition-colors duration-300 shadow-lg"
                                                                size="lg"
                                                        >
                                                                Connect Google Account
                                                        </Button>
                                                        <Button
                                                                variant="ghost"
                                                                onClick={() => setShowPermissionDialog(false)}
                                                                className="w-full hover:bg-white/10"
                                                                size="sm"
                                                        >
                                                                Cancel
                                                        </Button>
                                                </div>
                                        </div>
                                </div>
                        )}
                </>
        );
};

export default FormFinalizeButton;

import React, { useState } from "react";
import { Button } from "./button";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./dialog";
import { getGoogleOAuthURL } from "../../auth/googleOAuth";
import { finalizeForm } from "../../api";

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
                        } else {
                                setError(errData?.message || err.message || "An error occurred");
                        }
                } finally {
                        setIsLoading(false);
                }
        };

        const handleConnectGoogle = () => {
                localStorage.setItem("redirectAfterAuth", window.location.pathname);
                const googleOAuthURL = getGoogleOAuthURL();
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
                                                <div className="flex items-center mb-2">
                                                        <div className="w-10 h-10 rounded-full bg-blue-500/20 backdrop-blur-sm flex items-center justify-center mr-4">
                                                                <svg
                                                                        className="w-5 h-5 text-blue-400"
                                                                        fill="currentColor"
                                                                        viewBox="0 0 24 24"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                >
                                                                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22c-5.523 0-10-4.477-10-10S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm1-11v6h-2v-6H7l5-5 5 5h-4z"></path>
                                                                </svg>
                                                        </div>
                                                        <DialogTitle>Google Permission Required</DialogTitle>
                                                </div>
                                                <DialogDescription>{permissionError}</DialogDescription>
                                        </DialogHeader>
                                        <DialogFooter>
                                                <Button
                                                        variant="outline"
                                                        onClick={() => setShowPermissionDialog(false)}
                                                        className="border-white/20 hover:bg-white/5 transition-colors duration-300 min-w-[80px]"
                                                        size="sm"
                                                >
                                                        Cancel
                                                </Button>
                                                <Button
                                                        onClick={handleConnectGoogle}
                                                        className="bg-blue-600 hover:bg-blue-700 transition-colors duration-300 shadow-lg"
                                                        size="sm"
                                                >
                                                        Connect Google
                                                </Button>
                                                <Button
                                                        variant="secondary"
                                                        onClick={handleGoToSettings}
                                                        className="bg-white/10 hover:bg-white/20 transition-colors duration-300"
                                                        size="sm"
                                                >
                                                        Settings
                                                </Button>
                                        </DialogFooter>
                                </DialogContent>
                        </Dialog>
                </>
        );
};

export default FormFinalizeButton;

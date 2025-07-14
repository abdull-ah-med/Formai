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
                                                <DialogTitle className="text-2xl text-center font-bold mb-2">
                                                        Google Permission Required
                                                </DialogTitle>
                                                <DialogDescription className="text-center text-gray-400">
                                                        {permissionError}
                                                </DialogDescription>
                                        </DialogHeader>
                                        <div className="flex flex-col gap-3 mt-4">
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
                                </DialogContent>
                        </Dialog>
                </>
        );
};

export default FormFinalizeButton;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./button";
import api, { deleteAccount } from "../../api";
import GoogleSignInButton from "./GoogleSignInButton";
import { logoutAndRedirect } from "../../auth/authHelper";
import { useDocumentTitle } from "../../utils/useDocumentTitle";
import { getGoogleOAuthURL } from "../../auth/googleOAuth";

import {
        Dialog,
        DialogContent,
        DialogHeader,
        DialogFooter,
        DialogTitle,
        DialogDescription,
} from "./dialog";

interface SubscriptionInfo {
        tier: "free" | "premium" | "enterprise";
        status?: string;
        currentPeriodEnd?: string; // ISO string from server
        paymentMethod?: {
                brand?: string;
                last4?: string;
                expMonth?: number;
                expYear?: number;
        };
}

interface UserResponse {
        success: boolean;
        user: {
                _id: string;
                fullName: string;
                email: string;
                subscription?: SubscriptionInfo;
                createdAt: string;
                googleId?: string;
                hasPassword?: boolean;
                hasApiKey?: boolean;
        };
}

const AccountSettings: React.FC = () => {
        useDocumentTitle("Account Settings");

        const [loading, setLoading] = useState(true);
        const [saving, setSaving] = useState(false);
        const [error, setError] = useState<string | null>(null);

        const [fullName, setFullName] = useState("");
        const [email, setEmail] = useState("");
        const [userId, setUserId] = useState<string>("");
        const [subscription, setSubscription] = useState<SubscriptionInfo | null>(null);
        const [googleLinked, setGoogleLinked] = useState<boolean>(false);
        const [hasPassword, setHasPassword] = useState<boolean>(false);
        const [delinkStatus, setDelinkStatus] = useState<{
                loading: boolean;
                error: string | null;
        }>({ loading: false, error: null });

        // Password form state
        const [currentPassword, setCurrentPassword] = useState("");
        const [newPassword, setNewPassword] = useState("");
        const [confirmPassword, setConfirmPassword] = useState("");
        const [passwordError, setPasswordError] = useState<string | null>(null);
        const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);

        const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

        // API Key state
        const [hasApiKey, setHasApiKey] = useState<boolean>(false);
        const [apiKeyInput, setApiKeyInput] = useState("");
        const [apiKeyError, setApiKeyError] = useState<string | null>(null);
        const [apiKeySuccess, setApiKeySuccess] = useState<string | null>(null);
        const [apiKeySaving, setApiKeySaving] = useState(false);

        const handleDeleteAccount = async () => {
                setSaving(true); // Use saving state for delete operation
                setError(null);
                try {
                        await deleteAccount();
                        logoutAndRedirect("/signin");
                } catch (err: any) {
                        setError(err.response?.data?.message || "Failed to delete account");
                } finally {
                        setSaving(false);
                        setShowDeleteConfirm(false);
                }
        };

        // Fetch user info on mount
        useEffect(() => {
                (async () => {
                        try {
                                const { data } = await api.get<UserResponse>("/account");
                                const { user } = data;
                                setFullName(user.fullName);
                                setEmail(user.email);
                                setUserId(user._id);
                                setSubscription(user.subscription || null);
                                setGoogleLinked(Boolean(user.googleId));
                                setHasPassword(user.hasPassword || false);
                                setHasApiKey(user.hasApiKey || false);
                        } catch (err: any) {
                                setError(err.response?.data?.message || err.message || "Failed to load account data");
                        } finally {
                                setLoading(false);
                        }
                })();
        }, []);

        const handleSave = async () => {
                setSaving(true);
                setError(null);
                try {
                        await api.put("/account", { fullName });
                } catch (err: any) {
                        setError(err.response?.data?.message || err.message || "Failed to save changes");
                } finally {
                        setSaving(false);
                }
        };

        const handleDelinkGoogle = async () => {
                setDelinkStatus({ loading: true, error: null });

                if (
                        !window.confirm(
                                "Are you sure you want to delink your Google account? You will need to use your password to sign in."
                        )
                ) {
                        setDelinkStatus({ loading: false, error: null });
                        return;
                }

                try {
                        await api.delete("/account/google-link");
                        setGoogleLinked(false);
                } catch (err: any) {
                        setDelinkStatus({
                                loading: false,
                                error: err.response?.data?.message || "Failed to delink Google account.",
                        });
                } finally {
                        setDelinkStatus((s) => ({ ...s, loading: false }));
                }
        };

        const handlePasswordUpdate = async () => {
                setPasswordError(null);
                setPasswordSuccess(null);

                if (!currentPassword || !newPassword || !confirmPassword) {
                        setPasswordError("Please fill in all fields.");
                        return;
                }
                if (newPassword !== confirmPassword) {
                        setPasswordError("New passwords do not match.");
                        return;
                }
                // Basic strength check: replicate backend regex
                const strong = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
                if (!strong.test(newPassword)) {
                        setPasswordError("Password must be 8+ chars with upper, lower and number.");
                        return;
                }

                try {
                        await api.put("/account-password", {
                                currentPassword,
                                newPassword,
                        });
                        setPasswordSuccess("Password updated successfully!");
                        setCurrentPassword("");
                        setNewPassword("");
                        setConfirmPassword("");
                } catch (err: any) {
                        setPasswordError(err.response?.data?.message || err.message || "Failed to update password");
                }
        };

        const handleSaveApiKey = async () => {
                setApiKeyError(null);
                setApiKeySuccess(null);

                if (!apiKeyInput.trim()) {
                        setApiKeyError("Please enter your API key.");
                        return;
                }

                if (!apiKeyInput.startsWith("sk-ant-")) {
                        setApiKeyError("Invalid API key format. Anthropic API keys start with 'sk-ant-'");
                        return;
                }

                setApiKeySaving(true);
                try {
                        await api.post("/account/api-key", { apiKey: apiKeyInput });
                        setApiKeySuccess("API key saved successfully!");
                        setHasApiKey(true);
                        setApiKeyInput("");
                } catch (err: any) {
                        setApiKeyError(err.response?.data?.message || "Failed to save API key");
                } finally {
                        setApiKeySaving(false);
                }
        };

        const handleDeleteApiKey = async () => {
                if (!window.confirm("Are you sure you want to delete your API key? You won't be able to generate forms until you add a new one.")) {
                        return;
                }

                setApiKeyError(null);
                setApiKeySuccess(null);
                setApiKeySaving(true);
                try {
                        await api.delete("/account/api-key");
                        setApiKeySuccess("API key deleted successfully.");
                        setHasApiKey(false);
                } catch (err: any) {
                        setApiKeyError(err.response?.data?.message || "Failed to delete API key");
                } finally {
                        setApiKeySaving(false);
                }
        };

        if (loading) {
                return <div className="min-h-screen flex items-center justify-center">Loading account…</div>;
        }

        if (error) {
                return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
        }

        return (
                <div className="w-full max-w-4xl mx-auto p-6 pt-20">
                        <h1 className="text-3xl font-bold mb-6 text-white">Account Settings</h1>

                        <div className="space-y-8">
                                {/* Profile Section */}
                                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                                        <h2 className="text-xl font-medium text-white mb-4">Profile Information</h2>
                                        <div className="space-y-4">
                                                <div>
                                                        <label className="block text-sm text-gray-400 mb-1">
                                                                Full Name
                                                        </label>
                                                        <input
                                                                type="text"
                                                                className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                                                                value={fullName}
                                                                onChange={(e) => setFullName(e.target.value)}
                                                        />
                                                </div>
                                                <div>
                                                        <label className="block text-sm text-gray-400 mb-1">
                                                                Email Address
                                                        </label>
                                                        <input
                                                                type="email"
                                                                className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-2 text-white opacity-60 cursor-not-allowed"
                                                                value={email}
                                                                disabled
                                                        />
                                                        <p className="text-xs text-gray-500 mt-1">
                                                                Email cannot be changed
                                                        </p>
                                                </div>
                                        </div>
                                        <div className="mt-6 flex gap-3">
                                                <Button
                                                        className="bg-white text-black hover:bg-gray-200"
                                                        onClick={handleSave}
                                                        disabled={saving}
                                                >
                                                        {saving ? "Saving…" : "Save Changes"}
                                                </Button>
                                                {error && (
                                                        <span className="text-sm text-red-500 self-center">
                                                                {error}
                                                        </span>
                                                )}
                                        </div>
                                </div>

                                {/* API Key Section */}
                                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                                        <h2 className="text-xl font-medium text-white mb-4">Anthropic API Key</h2>
                                        <p className="text-gray-400 text-sm mb-4">
                                                Formai uses your own Anthropic API key to generate forms with Claude AI.
                                                Your API key is encrypted and stored securely.{" "}
                                                <Link to="/api-key-policy" className="text-blue-400 hover:underline">
                                                        Learn more about our API Key Policy
                                                </Link>
                                        </p>
                                        
                                        {hasApiKey ? (
                                                <div className="space-y-4">
                                                        <div className="flex items-center gap-3 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                                                                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                                                                <span className="text-green-400 text-sm">API key configured</span>
                                                        </div>
                                                        <p className="text-gray-400 text-sm">
                                                                You can update your API key by entering a new one below, or delete it.
                                                        </p>
                                                        <div>
                                                                <label className="block text-sm text-gray-400 mb-1">
                                                                        New API Key (optional)
                                                                </label>
                                                                <input
                                                                        type="password"
                                                                        placeholder="sk-ant-..."
                                                                        className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                                                                        value={apiKeyInput}
                                                                        onChange={(e) => setApiKeyInput(e.target.value)}
                                                                />
                                                        </div>
                                                        <div className="flex gap-3">
                                                                <Button
                                                                        className="bg-white text-black hover:bg-gray-200"
                                                                        onClick={handleSaveApiKey}
                                                                        disabled={apiKeySaving || !apiKeyInput.trim()}
                                                                >
                                                                        {apiKeySaving ? "Saving…" : "Update Key"}
                                                                </Button>
                                                                <Button
                                                                        variant="destructive"
                                                                        onClick={handleDeleteApiKey}
                                                                        disabled={apiKeySaving}
                                                                >
                                                                        Delete Key
                                                                </Button>
                                                        </div>
                                                </div>
                                        ) : (
                                                <div className="space-y-4">
                                                        <div className="flex items-center gap-3 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                                                                <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                                                                <span className="text-yellow-400 text-sm">No API key configured - you need to add one to generate forms</span>
                                                        </div>
                                                        <p className="text-gray-400 text-sm">
                                                                Get your API key from{" "}
                                                                <a 
                                                                        href="https://console.anthropic.com/settings/keys" 
                                                                        target="_blank" 
                                                                        rel="noopener noreferrer"
                                                                        className="text-blue-400 hover:underline"
                                                                >
                                                                        Anthropic Console
                                                                </a>
                                                        </p>
                                                        <div>
                                                                <label className="block text-sm text-gray-400 mb-1">
                                                                        API Key
                                                                </label>
                                                                <input
                                                                        type="password"
                                                                        placeholder="sk-ant-..."
                                                                        className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                                                                        value={apiKeyInput}
                                                                        onChange={(e) => setApiKeyInput(e.target.value)}
                                                                />
                                                        </div>
                                                        <Button
                                                                className="bg-white text-black hover:bg-gray-200"
                                                                onClick={handleSaveApiKey}
                                                                disabled={apiKeySaving || !apiKeyInput.trim()}
                                                        >
                                                                {apiKeySaving ? "Saving…" : "Save API Key"}
                                                        </Button>
                                                </div>
                                        )}
                                        
                                        {apiKeyError && (
                                                <p className="text-red-500 text-sm mt-3">{apiKeyError}</p>
                                        )}
                                        {apiKeySuccess && (
                                                <p className="text-green-400 text-sm mt-3">{apiKeySuccess}</p>
                                        )}
                                </div>

                                {/* Subscription Section */}
                                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                                        <h2 className="text-xl font-medium text-white mb-4">Subscription</h2>
                                        {subscription ? (
                                                <div className="space-y-2 text-white/90">
                                                        <p>
                                                                Plan:{" "}
                                                                <span className="font-semibold capitalize">
                                                                        {subscription.tier}
                                                                </span>
                                                        </p>
                                                        {subscription.status && <p>Status: {subscription.status}</p>}
                                                        {subscription.currentPeriodEnd && (
                                                                <p>
                                                                        Renewal:{" "}
                                                                        {new Date(
                                                                                subscription.currentPeriodEnd
                                                                        ).toLocaleDateString()}
                                                                </p>
                                                        )}
                                                        {subscription.paymentMethod && (
                                                                <p>
                                                                        Card: {subscription.paymentMethod.brand} ••••
                                                                        {subscription.paymentMethod.last4} exp{" "}
                                                                        {subscription.paymentMethod.expMonth}/
                                                                        {subscription.paymentMethod.expYear}
                                                                </p>
                                                        )}
                                                </div>
                                        ) : (
                                                <p className="text-gray-400">No subscription data available.</p>
                                        )}
                                </div>

                                {/* Linked Accounts Section */}
                                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                                        <h2 className="text-xl font-medium text-white mb-4">Linked Accounts</h2>
                                        <div className="space-y-4">
                                                <GoogleSignInButton
                                                        variant="signup"
                                                        label={
                                                                googleLinked
                                                                        ? "Google account linked"
                                                                        : "Connect your Google account"
                                                        }
                                                        disabled={googleLinked}
                                                        className={googleLinked ? "opacity-60 cursor-not-allowed" : ""}
                                                        userId={userId}
                                                />
                                                {googleLinked && (
                                                        <>
                                                                <p className="text-gray-400 text-sm mb-3">
                                                                        Your account is already linked with Google.
                                                                </p>
                                                                <Button
                                                                        onClick={() => {
                                                                                localStorage.setItem("redirectAfterAuth", "/account-settings");
                                                                                const timestamp = new Date().getTime();
                                                                                const googleOAuthURL = getGoogleOAuthURL() + `&prompt_time=${timestamp}`;
                                                                                window.location.href = googleOAuthURL;
                                                                        }}
                                                                        className="w-full bg-white text-black border-0 hover:bg-black hover:text-white hover:border hover:border-white transition-all duration-300"
                                                                >
                                                                        Reconnect Google Account
                                                                </Button>
                                                                <p className="text-gray-400 text-sm mt-2">
                                                                        Use this if you're experiencing permission issues with Google Forms.
                                                                </p>
                                                        </>
                                                )}
                                        </div>
                                </div>

                                {/* Password Section */}
                                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                                        <h2 className="text-xl font-medium text-white mb-4">Password</h2>
                                        {googleLinked ? (
                                                <p className="text-gray-400">
                                                        You signed in with Google, which means no password juggling
                                                        here! Let Google be your bouncer at the door. 🕺
                                                </p>
                                        ) : (
                                                <div className="space-y-4 max-w-sm">
                                                        <div>
                                                                <label className="block text-sm text-gray-400 mb-1">
                                                                        Current Password
                                                                </label>
                                                                <input
                                                                        type="password"
                                                                        className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                                                                        value={currentPassword}
                                                                        onChange={(e) =>
                                                                                setCurrentPassword(e.target.value)
                                                                        }
                                                                />
                                                        </div>
                                                        <div>
                                                                <label className="block text-sm text-gray-400 mb-1">
                                                                        New Password
                                                                </label>
                                                                <input
                                                                        type="password"
                                                                        className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                                                                        value={newPassword}
                                                                        onChange={(e) => setNewPassword(e.target.value)}
                                                                />
                                                        </div>
                                                        <div>
                                                                <label className="block text-sm text-gray-400 mb-1">
                                                                        Confirm New Password
                                                                </label>
                                                                <input
                                                                        type="password"
                                                                        className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                                                                        value={confirmPassword}
                                                                        onChange={(e) =>
                                                                                setConfirmPassword(e.target.value)
                                                                        }
                                                                />
                                                        </div>
                                                        {passwordError && (
                                                                <p className="text-red-500 text-sm">{passwordError}</p>
                                                        )}
                                                        {passwordSuccess && (
                                                                <p className="text-green-400 text-sm">
                                                                        {passwordSuccess}
                                                                </p>
                                                        )}
                                                        <Button
                                                                className="bg-white text-black hover:bg-gray-200"
                                                                onClick={handlePasswordUpdate}
                                                        >
                                                                Update Password
                                                        </Button>
                                                </div>
                                        )}
                                </div>

                                {/* Delete Account Section */}
                                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                                        <h2 className="text-xl font-medium text-white mb-4">Danger Zone</h2>
                                        <p className="text-gray-400 mb-4">
                                                Permanently delete your account and all associated data.
                                                This action cannot be undone.
                                        </p>
                                        <Button
                                                variant="destructive"
                                                onClick={() => setShowDeleteConfirm(true)}
                                        >
                                                Delete Account
                                        </Button>
                                </div>
                        </div>

                        <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
                                <DialogContent>
                                        <DialogHeader>
                                                <DialogTitle>Confirm Account Deletion</DialogTitle>
                                                <DialogDescription>
                                                        Are you sure you want to delete your account? This action is
                                                        irreversible and will delete all your forms and data.
                                                </DialogDescription>
                                        </DialogHeader>
                                        <DialogFooter>
                                                <Button
                                                        onClick={() => setShowDeleteConfirm(false)}
                                                        className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600"
                                                >
                                                        Cancel
                                                </Button>
                                                <Button
                                                        onClick={handleDeleteAccount}
                                                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                                                        disabled={saving}
                                                >
                                                        {saving ? "Deleting..." : "Delete Account"}
                                                </Button>
                                        </DialogFooter>
                                </DialogContent>
                        </Dialog>
                </div>
        );
};

export default AccountSettings;

import { Button } from "./button";
import { getGoogleOAuthURL } from "../../auth/googleOAuth";
import { cn } from "../../lib/utils";

interface GoogleSignInButtonProps
        extends React.ButtonHTMLAttributes<HTMLButtonElement> {
        variant?: "signin" | "signup"; // Controls label rendering
        label?: string; // Optional custom label
        disabled?: boolean;
}

const GoogleSignInButton: React.FC<GoogleSignInButtonProps> = ({
        variant = "signin",
        label: customLabel,
        className,
        disabled,
        ...rest
}) => {
        const handleGoogleSignIn = () => {
                if (disabled) return;
                localStorage.removeItem("nonPersistentAuth");
                const googleOAuthURL = getGoogleOAuthURL();
                window.location.href = googleOAuthURL;
        };

        const label =
                customLabel ||
                (variant === "signup"
                        ? "Sign up with Google"
                        : "Sign in with Google");

        return (
                <Button
                        type="button"
                        onClick={handleGoogleSignIn}
                        className={cn(
                                "w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700",
                                className
                        )}
                        {...rest}
                >
                        {/* Google G logo */}
                        <svg
                                className="h-5 w-5 mr-2"
                                viewBox="0 0 533.5 544.3"
                                xmlns="http://www.w3.org/2000/svg"
                        >
                                <path
                                        fill="#4285F4"
                                        d="M533.5 278.4c0-17.4-1.6-34-4.7-50.2H272v95h146.7c-6.4 34.3-25.1 63.4-53.5 83v68h86.7c50.7-46.7 81.6-115.5 81.6-195.8z"
                                />
                                <path
                                        fill="#34A853"
                                        d="M272 544.3c72.9 0 134.1-24.1 178.8-65.4l-86.7-68c-24.1 16.1-55 25.7-92.1 25.7-70.8 0-130.7-47.9-152.1-112.5h-90.2v70.6C66.3 483 161.2 544.3 272 544.3z"
                                />
                                <path
                                        fill="#FBBC04"
                                        d="M119.9 323.9c-10.4-30.5-10.4-63.6 0-94.1V159.2h-90.2c-35.4 70.7-35.4 154 0 224.7l90.2-70z"
                                />
                                <path
                                        fill="#EA4335"
                                        d="M272 107.9c39 0 74.2 13.4 101.9 39.6l76.3-76.3C373.9 23.5 322.1 0 272 0 161.2 0 66.3 61.3 29.8 159.2l90.2 70c21.4-64.6 81.4-112.5 152-112.5z"
                                />
                        </svg>
                        {label}
                </Button>
        );
};

export default GoogleSignInButton;

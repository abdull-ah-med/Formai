import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import FormaiLogo from "@/assets/Formai.svg";
import { useAuth } from "../../hooks/useAuth";

const Footer = () => {
        const { isAuthenticated, logout } = useAuth();

        return (
                <footer className="relative bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden z-40">
                        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
                        <div className="absolute inset-0">
                                <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
                                <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                        </div>

                        {/* Main content */}
                        <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                                {/* Footer content in horizontal layout */}
                                <div className="flex flex-col md:flex-row justify-center md:justify-between items-center md:items-start gap-8">
                                        {/* Brand and Tagline - Left side */}
                                        <div className="text-center">
                                                <Link to="/">
                                                        <img
                                                                src={FormaiLogo}
                                                                alt="Formai"
                                                                className="h-8 w-auto mb-3 mx-auto md:mx-0 cursor-pointer hover:opacity-80 transition-opacity"
                                                        />
                                                </Link>
                                                <p className="text-base md:text-lg text-gray-300 font-light">
                                                        forms redefined.
                                                </p>
                                        </div>

                                        {/* Three sections - Right side with even spacing */}
                                        <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-36 text-sm w-full md:w-auto">
                                                {/* Sitemap */}
                                                <div className="space-y-3 text-center md:text-left">
                                                        <h3 className="text-white font-semibold mb-4">Sitemap</h3>
                                                        <div className="space-y-2">
                                                                {!isAuthenticated ? (
                                                                        <>
                                                                                <Link
                                                                                        to="/"
                                                                                        className="block text-gray-400 hover:text-white transition-colors"
                                                                                >
                                                                                        Home
                                                                                </Link>
                                                                                <Link
                                                                                        to="/signup"
                                                                                        className="block text-gray-400 hover:text-white transition-colors"
                                                                                >
                                                                                        Sign Up
                                                                                </Link>
                                                                                <Link
                                                                                        to="/signin"
                                                                                        className="block text-gray-400 hover:text-white transition-colors"
                                                                                >
                                                                                        Sign In
                                                                                </Link>
                                                                        </>
                                                                ) : (
                                                                        <Link
                                                                                to="/"
                                                                                className="block text-gray-400 hover:text-white transition-colors"
                                                                                onClick={(e) => {
                                                                                        e.preventDefault();
                                                                                        logout();
                                                                                }}
                                                                        >
                                                                                Logout
                                                                        </Link>
                                                                )}
                                                                <Link
                                                                        to="/about"
                                                                        className="block text-gray-400 hover:text-white transition-colors"
                                                                >
                                                                        About
                                                                </Link>
                                                        </div>
                                                </div>

                                                {/* Legal */}
                                                <div className="space-y-3 text-center md:text-left">
                                                        <h3 className="text-white font-semibold mb-4">Legal</h3>
                                                        <div className="space-y-2">
                                                                <a
                                                                        href="/privacy"
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="block text-gray-400 hover:text-white transition-colors"
                                                                >
                                                                        Privacy Policy
                                                                </a>

                                                                <a
                                                                        href="/terms"
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="block text-gray-400 hover:text-white transition-colors"
                                                                >
                                                                        Terms of Service
                                                                </a>

                                                                <a
                                                                        href="/cookies"
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="block text-gray-400 hover:text-white transition-colors"
                                                                >
                                                                        Cookie Policy
                                                                </a>
                                                        </div>
                                                </div>

                                                {/* Contact & Social */}
                                                <div className="space-y-3 text-center md:text-left">
                                                        <h3 className="text-white font-semibold mb-4">Contact</h3>
                                                        <div className="space-y-4">
                                                                <a
                                                                        href="mailto:reachformaihere@gmail.com"
                                                                        className="flex items-center justify-center md:justify-start gap-2 text-gray-400 hover:text-white transition-colors"
                                                                >
                                                                        <Mail size={16} />
                                                                        reachformaihere@gmail.com
                                                                </a>
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                        </div>

                        {/* Beta Notice */}
                        <div className="w-full flex justify-center mt-2">
                                <span className="text-xs text-white/60 bg-black/40 px-3 py-1 rounded-full shadow-sm backdrop-blur-sm">
                                        beta version: some features may not work
                                </span>
                        </div>
                </footer>
        );
};

export default Footer;

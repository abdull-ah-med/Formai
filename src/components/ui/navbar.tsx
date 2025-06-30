import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "./button";
import {
        Menu,
        X,
        Home,
        Users,
        FileText,
        TrendingUp,
        UserPlus,
        LogIn,
        LogOut,
        DollarSign,
        LayoutDashboard,
        History,
        Settings,
        MessageSquare,
} from "lucide-react";
import FormaiLogo from "../../assets/Formai.svg";
import { isAuthenticated, logoutAndRedirect } from "../../auth/authHelper";

const Navbar = () => {
        const [isMenuOpen, setIsMenuOpen] = useState(false);
        const [isAnimating, setIsAnimating] = useState(false);
        const [isAuthenticatedState, setIsAuthenticatedState] = useState(false);
        const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
        const menuRef = useRef<HTMLDivElement | null>(null);
        const location = useLocation();
        const navigate = useNavigate();

        useEffect(() => {
                const checkAuth = async () => {
                        const isValid = await isAuthenticated();
                        setIsAuthenticatedState((prev) =>
                                prev !== isValid ? isValid : prev
                        );
                };

                checkAuth();

                // Listen for storage changes (logout in another tab or auth flag removed)
                const handleStorageChange = (e: StorageEvent) => {
                        if (
                                e.key === "nonPersistentAuth" ||
                                e.key === "token"
                        ) {
                                checkAuth();
                        }
                };

                // Also refresh auth state when tab/window regains focus
                const handleVisibility = () => {
                        if (!document.hidden) {
                                checkAuth();
                        }
                };

                // Refresh on browser navigation (back/forward)
                const handlePopState = () => {
                        checkAuth();
                };

                const handleAuthChange = () => {
                        checkAuth();
                };

                window.addEventListener("storage", handleStorageChange);
                window.addEventListener("authchange", handleAuthChange);
                document.addEventListener("visibilitychange", handleVisibility);
                window.addEventListener("popstate", handlePopState);

                return () => {
                        window.removeEventListener(
                                "storage",
                                handleStorageChange
                        );
                        window.removeEventListener(
                                "authchange",
                                handleAuthChange
                        );
                        document.removeEventListener(
                                "visibilitychange",
                                handleVisibility
                        );
                        window.removeEventListener("popstate", handlePopState);
                };
        }, [location]);

        const handleLogout = async () => {
                setShowLogoutConfirm(false);
                // Broadcast logout and redirect to home. The helper triggers full
                // page load, so navbar state will reset on reload.
                await logoutAndRedirect("/");
        };

        const toggleMenu = () => {
                if (!isAnimating) {
                        setIsAnimating(true);
                        setIsMenuOpen(!isMenuOpen);
                }
        };

        const closeMenu = () => {
                if (!isAnimating) {
                        setIsAnimating(true);
                        setIsMenuOpen(false);
                }
        };

        // Handle animation completion
        useEffect(() => {
                if (isAnimating) {
                        const timer = setTimeout(() => {
                                setIsAnimating(false);
                        }, 500); // Match the transition duration
                        return () => clearTimeout(timer);
                }
        }, [isAnimating]);

        // Handle click outside
        useEffect(() => {
                const handleClickOutside = (event: MouseEvent) => {
                        if (
                                menuRef.current &&
                                !(menuRef.current as HTMLDivElement).contains(
                                        event.target as Node
                                )
                        ) {
                                closeMenu();
                        }
                };

                if (isMenuOpen) {
                        document.addEventListener(
                                "mousedown",
                                handleClickOutside
                        );
                }

                return () => {
                        document.removeEventListener(
                                "mousedown",
                                handleClickOutside
                        );
                };
        }, [isMenuOpen]);

        const navItems = isAuthenticatedState
                ? [
                          {
                                  name: "Chat",
                                  href: "/dashboard",
                                  isRouterLink: true,
                                  icon: <MessageSquare className="w-5 h-5" />,
                          },
                          {
                                  name: "History",
                                  href: "/history",
                                  isRouterLink: true,
                                  icon: <History className="w-5 h-5" />,
                          },
                          {
                                  name: "Settings",
                                  href: "/account-settings",
                                  isRouterLink: true,
                                  icon: <Settings className="w-5 h-5" />,
                          },
                          {
                                  name: "Logout",
                                  href: "#",
                                  isRouterLink: false,
                                  onClick: () => setShowLogoutConfirm(true),
                                  icon: <LogOut className="w-5 h-5" />,
                          },
                  ]
                : [
                          {
                                  name: "Getting Started",
                                  href: "/pricing",
                                  isRouterLink: true,
                                  icon: <DollarSign className="w-5 h-5" />,
                          },
                          {
                                  name: "Sign In",
                                  href: "/signin",
                                  isRouterLink: true,
                                  icon: <LogIn className="w-5 h-5" />,
                          },
                          {
                                  name: "Sign Up",
                                  href: "/signup",
                                  isRouterLink: true,
                                  icon: <TrendingUp className="w-5 h-5" />,
                          },
                          {
                                  name: "About",
                                  href: "/about",
                                  isRouterLink: true,
                                  icon: <Users className="w-5 h-5" />,
                          },
                  ];

        return (
                <>
                        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md">
                                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                        <div className="flex justify-between items-center h-16 relative">
                                                {/* Logo/Brand */}
                                                <div className="flex-shrink-0">
                                                        <Link to="/">
                                                                <img
                                                                        src={
                                                                                FormaiLogo
                                                                        }
                                                                        alt="Formai"
                                                                        className="h-6 w-auto cursor-pointer hover:opacity-80 transition-opacity"
                                                                />
                                                        </Link>
                                                </div>

                                                {/* Desktop Navigation - Centered Pill Shaped */}
                                                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
                                                        <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-full px-6 py-2">
                                                                <div className="flex items-center space-x-4 md:space-x-8">
                                                                        {navItems.map(
                                                                                (
                                                                                        item
                                                                                ) => {
                                                                                        const isActive =
                                                                                                location.pathname ===
                                                                                                item.href;
                                                                                        return item.isRouterLink ? (
                                                                                                <Link
                                                                                                        key={
                                                                                                                item.name
                                                                                                        }
                                                                                                        to={
                                                                                                                item.href
                                                                                                        }
                                                                                                        className={`px-3 md:px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 hover:bg-white/10 hover:scale-105 ${
                                                                                                                isActive
                                                                                                                        ? "bg-white/20 text-white shadow-inner"
                                                                                                                        : "text-white/80 hover:text-white"
                                                                                                        }`}
                                                                                                >
                                                                                                        {
                                                                                                                item.name
                                                                                                        }
                                                                                                </Link>
                                                                                        ) : (
                                                                                                <button
                                                                                                        key={
                                                                                                                item.name
                                                                                                        }
                                                                                                        onClick={
                                                                                                                item.onClick
                                                                                                        }
                                                                                                        className="text-white/80 hover:text-white px-3 md:px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 hover:bg-white/10 hover:scale-105"
                                                                                                >
                                                                                                        {
                                                                                                                item.name
                                                                                                        }
                                                                                                </button>
                                                                                        );
                                                                                }
                                                                        )}
                                                                </div>
                                                        </div>
                                                </div>

                                                {/* Mobile menu button */}
                                                <div className="md:hidden">
                                                        <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                onClick={
                                                                        toggleMenu
                                                                }
                                                                className="navbar-button relative group"
                                                                disabled={
                                                                        isAnimating
                                                                }
                                                        >
                                                                <div
                                                                        className={`w-6 h-6 flex flex-col justify-center items-center transition-all duration-300 ease-out ${
                                                                                isMenuOpen
                                                                                        ? "rotate-180"
                                                                                        : ""
                                                                        }`}
                                                                >
                                                                        <span
                                                                                className={`w-5 h-0.5 bg-white rounded-full transition-all duration-300 ease-out ${
                                                                                        isMenuOpen
                                                                                                ? "rotate-45 translate-y-1"
                                                                                                : "-translate-y-1"
                                                                                }`}
                                                                        ></span>
                                                                        <span
                                                                                className={`w-5 h-0.5 bg-white rounded-full transition-all duration-300 ease-out ${
                                                                                        isMenuOpen
                                                                                                ? "opacity-0 scale-0"
                                                                                                : "opacity-100 scale-100"
                                                                                }`}
                                                                        ></span>
                                                                        <span
                                                                                className={`w-5 h-0.5 bg-white rounded-full transition-all duration-300 ease-out ${
                                                                                        isMenuOpen
                                                                                                ? "-rotate-45 -translate-y-1"
                                                                                                : "translate-y-1"
                                                                                }`}
                                                                        ></span>
                                                                </div>
                                                        </Button>
                                                </div>

                                                {/* Beta Notice - Overlay */}
                                                <div className="absolute left-1/2 -translate-x-1/2 bottom-0 mb-[-18px] z-50 pointer-events-none select-none hidden md:block">
                                                        <span className="text-xs text-white/70 bg-black/70 px-3 py-1 rounded-full shadow-sm backdrop-blur-sm">
                                                                beta version:
                                                                some features
                                                                may not work
                                                        </span>
                                                </div>
                                        </div>
                                </div>
                        </nav>

                        {/* Mobile Navigation - Enhanced Slide-in Menu */}
                        <div
                                className={`fixed inset-0 z-50 md:hidden transition-all duration-400 ease-out ${
                                        isMenuOpen
                                                ? "opacity-100 pointer-events-auto"
                                                : "opacity-0 pointer-events-none"
                                }`}
                        >
                                {/* Backdrop */}
                                <div
                                        className={`absolute inset-0 bg-black/60 backdrop-blur-md transition-all duration-400 ease-out ${
                                                isMenuOpen
                                                        ? "opacity-100"
                                                        : "opacity-0"
                                        }`}
                                        onClick={closeMenu}
                                />

                                {/* Slide-in Menu */}
                                <div
                                        className={`absolute right-0 top-0 h-full w-80 bg-black/95 backdrop-blur-xl border-l border-white/10 transform transition-all duration-400 ease-out ${
                                                isMenuOpen
                                                        ? "translate-x-0"
                                                        : "translate-x-full"
                                        }`}
                                >
                                        <div
                                                ref={menuRef}
                                                className="h-full flex flex-col"
                                        >
                                                {/* Header */}
                                                <div className="flex items-center justify-between p-6 border-b border-white/10">
                                                        <Link
                                                                to="/"
                                                                onClick={
                                                                        closeMenu
                                                                }
                                                                className="flex items-center space-x-3 group"
                                                        >
                                                                <img
                                                                        src={
                                                                                FormaiLogo
                                                                        }
                                                                        alt="Formai"
                                                                        className="h-8 w-auto group-hover:opacity-80 transition-opacity"
                                                                />
                                                        </Link>
                                                        <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                onClick={
                                                                        closeMenu
                                                                }
                                                                className="text-white/60 hover:text-white hover:bg-white/10 transition-all duration-200"
                                                        >
                                                                <X size={20} />
                                                        </Button>
                                                </div>

                                                {/* Navigation Items */}
                                                <div className="flex-1 px-6 py-8">
                                                        <div className="space-y-2">
                                                                {/* Removed Home link for mobile menu */}

                                                                {/* Navigation Items */}
                                                                {navItems.map(
                                                                        (
                                                                                item,
                                                                                index
                                                                        ) => {
                                                                                const isActive =
                                                                                        location.pathname ===
                                                                                        item.href;
                                                                                return (
                                                                                        <div
                                                                                                key={
                                                                                                        item.name
                                                                                                }
                                                                                                className="relative"
                                                                                                style={{
                                                                                                        animationDelay: `${
                                                                                                                index *
                                                                                                                100
                                                                                                        }ms`,
                                                                                                }}
                                                                                        >
                                                                                                {item.isRouterLink ? (
                                                                                                        <Link
                                                                                                                to={
                                                                                                                        item.href
                                                                                                                }
                                                                                                                onClick={
                                                                                                                        closeMenu
                                                                                                                }
                                                                                                                className={`flex items-center space-x-4 p-4 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200 group transform hover:scale-105 ${
                                                                                                                        isActive
                                                                                                                                ? "bg-white/20 text-white"
                                                                                                                                : ""
                                                                                                                }`}
                                                                                                        >
                                                                                                                <div className="p-2 rounded-lg bg-white/10 group-hover:bg-white/20 transition-all duration-200 group-hover:scale-110">
                                                                                                                        {
                                                                                                                                item.icon
                                                                                                                        }
                                                                                                                </div>
                                                                                                                <span className="font-medium">
                                                                                                                        {
                                                                                                                                item.name
                                                                                                                        }
                                                                                                                </span>
                                                                                                        </Link>
                                                                                                ) : (
                                                                                                        <button
                                                                                                                onClick={() => {
                                                                                                                        if (
                                                                                                                                item.onClick
                                                                                                                        )
                                                                                                                                item.onClick();
                                                                                                                        closeMenu();
                                                                                                                }}
                                                                                                                className="flex items-center space-x-4 p-4 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200 group transform hover:scale-105"
                                                                                                        >
                                                                                                                <div className="p-2 rounded-lg bg-white/10 group-hover:bg-white/20 transition-all duration-200 group-hover:scale-110">
                                                                                                                        {
                                                                                                                                item.icon
                                                                                                                        }
                                                                                                                </div>
                                                                                                                <span className="font-medium">
                                                                                                                        {
                                                                                                                                item.name
                                                                                                                        }
                                                                                                                </span>
                                                                                                        </button>
                                                                                                )}
                                                                                        </div>
                                                                                );
                                                                        }
                                                                )}
                                                        </div>
                                                </div>

                                                {/* Footer */}
                                                <div className="p-6 border-t border-white/10">
                                                        <div className="text-center">
                                                                <p className="text-white/40 text-sm mb-2">
                                                                        beta
                                                                        version:
                                                                        some
                                                                        features
                                                                        may not
                                                                        work
                                                                </p>
                                                                <p className="text-white/40 text-sm mb-4">
                                                                        Revolutionizing
                                                                        form
                                                                        creation
                                                                        with AI
                                                                </p>
                                                                <div className="flex justify-center space-x-4">
                                                                        <div className="w-2 h-2 bg-white/20 rounded-full animate-pulse"></div>
                                                                        <div className="w-2 h-2 bg-white/20 rounded-full animate-pulse delay-150"></div>
                                                                        <div className="w-2 h-2 bg-white/20 rounded-full animate-pulse delay-300"></div>
                                                                </div>
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                        </div>

                        {/* Logout Confirmation Modal */}
                        {showLogoutConfirm && (
                                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60]">
                                        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 max-w-md mx-4">
                                                <h3 className="text-xl font-bold text-white mb-4">
                                                        Confirm Logout
                                                </h3>
                                                <p className="text-gray-300 mb-6">
                                                        This action will log you
                                                        out and redirect you to
                                                        the home page. Are you
                                                        sure you want to
                                                        continue?
                                                </p>
                                                <div className="flex space-x-4">
                                                        <Button
                                                                onClick={() =>
                                                                        setShowLogoutConfirm(
                                                                                false
                                                                        )
                                                                }
                                                                className="bg-gray-600 text-white hover:bg-gray-700"
                                                        >
                                                                Cancel
                                                        </Button>
                                                        <Button
                                                                onClick={
                                                                        handleLogout
                                                                }
                                                                className="bg-red-600 text-white hover:bg-red-700"
                                                        >
                                                                Logout
                                                        </Button>
                                                </div>
                                        </div>
                                </div>
                        )}
                </>
        );
};

export default Navbar;

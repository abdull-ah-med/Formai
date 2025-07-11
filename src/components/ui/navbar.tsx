import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "./button";
import { LogOut, Settings, User, ChevronDown, Menu, X, MessageSquare, History } from "lucide-react";
import FormaiLogo from "../../assets/Formai.svg";
import { useAuth } from "../../contexts/AuthContext";

const Navbar = () => {
        const navigate = useNavigate();
        const { isAuthenticated, user, logout } = useAuth();
        const [isScrolled, setIsScrolled] = useState(false);
        const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
        const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
        const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

        const handleScroll = () => {
                const offset = window.scrollY;
                setIsScrolled(offset > 10);
        };

        useEffect(() => {
                window.addEventListener("scroll", handleScroll);
                return () => {
                        window.removeEventListener("scroll", handleScroll);
                };
        }, []);

        const handleLogout = () => {
                logout();
                setShowLogoutConfirm(false);
                navigate("/");
        };

        const navItems = isAuthenticated
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
                                  name: "Pricing",
                                  href: "/pricing",
                                  isRouterLink: true,
                                  icon: null,
                                  onClick: undefined,
                          },
                          {
                                  name: "About",
                                  href: "/about",
                                  isRouterLink: true,
                                  icon: null,
                                  onClick: undefined,
                          },
                          {
                                  name: "Sign In",
                                  href: "/signin",
                                  isRouterLink: true,
                                  icon: null,
                                  onClick: undefined,
                          },
                          {
                                  name: "Sign Up",
                                  href: "/signup",
                                  isRouterLink: true,
                                  icon: null,
                                  onClick: undefined,
                          },
                  ];

        const closeAllMenus = () => {
                setIsMobileMenuOpen(false);
                setIsProfileMenuOpen(false);
        };

        return (
                <>
                        <header
                                className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
                                        isScrolled ? "bg-black/20 backdrop-blur-md" : ""
                                }`}
                        >
                                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                        <div className="flex justify-between items-center h-16 relative">
                                                {/* Logo/Brand */}
                                                <div className="flex-shrink-0">
                                                        <Link to="/">
                                                                <img
                                                                        src={FormaiLogo}
                                                                        alt="Formai"
                                                                        className="h-6 w-auto cursor-pointer hover:opacity-80 transition-opacity"
                                                                />
                                                        </Link>
                                                </div>

                                                {/* Desktop Navigation - Centered Pill Shaped */}
                                                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
                                                        <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-full px-6 py-2">
                                                                <div className="flex items-center space-x-4 md:space-x-8">
                                                                        {navItems.map((item) => {
                                                                                const isActive =
                                                                                        window.location.pathname ===
                                                                                        item.href;
                                                                                return item.isRouterLink ? (
                                                                                        <Link
                                                                                                key={item.name}
                                                                                                to={item.href}
                                                                                                onClick={closeAllMenus}
                                                                                                className={`px-3 md:px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 hover:bg-white/10 hover:scale-105 ${
                                                                                                        isActive
                                                                                                                ? "bg-white/20 text-white shadow-inner"
                                                                                                                : "text-white/80 hover:text-white"
                                                                                                }`}
                                                                                        >
                                                                                                {item.name}
                                                                                        </Link>
                                                                                ) : (
                                                                                        <button
                                                                                                key={item.name}
                                                                                                onClick={
                                                                                                        item.onClick ||
                                                                                                        closeAllMenus
                                                                                                }
                                                                                                className="text-white/80 hover:text-white px-3 md:px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 hover:bg-white/10 hover:scale-105"
                                                                                        >
                                                                                                {item.name}
                                                                                        </button>
                                                                                );
                                                                        })}
                                                                </div>
                                                        </div>
                                                </div>

                                                {/* Mobile menu button */}
                                                <div className="md:hidden">
                                                        <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                                                className="navbar-button relative group"
                                                        >
                                                                <div
                                                                        className={`w-6 h-6 flex flex-col justify-center items-center transition-all duration-300 ease-out ${
                                                                                isMobileMenuOpen ? "rotate-180" : ""
                                                                        }`}
                                                                >
                                                                        <span
                                                                                className={`w-5 h-0.5 bg-white rounded-full transition-all duration-300 ease-out ${
                                                                                        isMobileMenuOpen
                                                                                                ? "rotate-45 translate-y-1"
                                                                                                : "-translate-y-1"
                                                                                }`}
                                                                        ></span>
                                                                        <span
                                                                                className={`w-5 h-0.5 bg-white rounded-full transition-all duration-300 ease-out ${
                                                                                        isMobileMenuOpen
                                                                                                ? "opacity-0 scale-0"
                                                                                                : "opacity-100 scale-100"
                                                                                }`}
                                                                        ></span>
                                                                        <span
                                                                                className={`w-5 h-0.5 bg-white rounded-full transition-all duration-300 ease-out ${
                                                                                        isMobileMenuOpen
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
                                                                beta version: some features may not work
                                                        </span>
                                                </div>
                                        </div>
                                </div>
                        </header>

                        {/* Mobile Navigation - Enhanced Slide-in Menu */}
                        {isMobileMenuOpen && (
                                <div
                                        className={`fixed inset-0 z-50 md:hidden transition-all duration-400 ease-out ${
                                                isMobileMenuOpen
                                                        ? "opacity-100 pointer-events-auto"
                                                        : "opacity-0 pointer-events-none"
                                        }`}
                                >
                                        {/* Backdrop */}
                                        <div
                                                className={`absolute inset-0 bg-black/60 backdrop-blur-md transition-all duration-400 ease-out ${
                                                        isMobileMenuOpen ? "opacity-100" : "opacity-0"
                                                }`}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                        />

                                        {/* Slide-in Menu */}
                                        <div
                                                className={`absolute right-0 top-0 h-full w-80 bg-black/95 backdrop-blur-xl border-l border-white/10 transform transition-all duration-400 ease-out ${
                                                        isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
                                                }`}
                                        >
                                                <div className="h-full flex flex-col">
                                                        {/* Header */}
                                                        <div className="flex items-center justify-between p-6 border-b border-white/10">
                                                                <Link
                                                                        to="/"
                                                                        onClick={() => setIsMobileMenuOpen(false)}
                                                                        className="flex items-center space-x-3 group"
                                                                >
                                                                        <img
                                                                                src={FormaiLogo}
                                                                                alt="Formai"
                                                                                className="h-8 w-auto group-hover:opacity-80 transition-opacity"
                                                                        />
                                                                </Link>
                                                                <Button
                                                                        variant="ghost"
                                                                        size="icon"
                                                                        onClick={() => setIsMobileMenuOpen(false)}
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
                                                                        {navItems.map((item, index) => {
                                                                                const isActive =
                                                                                        window.location.pathname ===
                                                                                        item.href;
                                                                                return (
                                                                                        <div
                                                                                                key={item.name}
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
                                                                                                                onClick={() =>
                                                                                                                        setIsMobileMenuOpen(
                                                                                                                                false
                                                                                                                        )
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
                                                                                                                        setIsMobileMenuOpen(
                                                                                                                                false
                                                                                                                        );
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
                                                                        })}
                                                                </div>
                                                        </div>

                                                        {/* Footer */}
                                                        <div className="p-6 border-t border-white/10">
                                                                <div className="text-center">
                                                                        <p className="text-white/40 text-sm mb-2">
                                                                                beta version: some features may not work
                                                                        </p>
                                                                        <p className="text-white/40 text-sm mb-4">
                                                                                Revolutionizing form creation with AI
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
                        )}

                        {/* Profile Menu */}
                        {isAuthenticated && (
                                <div className="hidden md:block">
                                        <div className="relative">
                                                <Button
                                                        variant="ghost"
                                                        onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                                                        className="flex items-center space-x-2 text-white hover:bg-white/10"
                                                >
                                                        <User className="h-5 w-5" />
                                                        <ChevronDown
                                                                className={`h-4 w-4 transition-transform ${
                                                                        isProfileMenuOpen ? "rotate-180" : ""
                                                                }`}
                                                        />
                                                </Button>
                                                {isProfileMenuOpen && (
                                                        <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-md shadow-lg py-1 z-50">
                                                                <Link
                                                                        to="/account-settings"
                                                                        onClick={() => {
                                                                                setIsProfileMenuOpen(false);
                                                                                closeAllMenus();
                                                                        }}
                                                                        className="flex items-center px-4 py-2 text-sm text-white hover:bg-gray-700"
                                                                >
                                                                        <Settings className="w-4 h-4 mr-2" />
                                                                        Settings
                                                                </Link>
                                                                <button
                                                                        onClick={() => {
                                                                                setShowLogoutConfirm(true);
                                                                                closeAllMenus();
                                                                        }}
                                                                        className="w-full text-left flex items-center px-4 py-2 text-sm text-red-400 hover:bg-red-500/10"
                                                                >
                                                                        <LogOut className="w-4 h-4 mr-2" />
                                                                        Logout
                                                                </button>
                                                        </div>
                                                )}
                                        </div>
                                </div>
                        )}

                        {/* Logout Confirmation Modal */}
                        {showLogoutConfirm && (
                                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100]">
                                        <div className="bg-black/30 backdrop-blur-xl border border-white/10 rounded-xl p-6 w-full max-w-sm text-center shadow-2xl">
                                                <h3 className="text-xl font-semibold text-white mb-4">Are you sure?</h3>
                                                <p className="text-gray-300 mb-6">
                                                        You will be logged out of your account.
                                                </p>
                                                <div className="flex justify-center gap-4">
                                                        <Button
                                                                variant="outline"
                                                                onClick={() => setShowLogoutConfirm(false)}
                                                                className="bg-white/90 hover:bg-white text-black"
                                                        >
                                                                Cancel
                                                        </Button>
                                                        <Button
                                                                onClick={handleLogout}
                                                                className="bg-red-600 hover:bg-red-700 text-white"
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

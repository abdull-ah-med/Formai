import React from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import { Home, Settings, History } from "lucide-react";

const DashboardLayout: React.FC = () => {
        const location = useLocation();

        const dashboardLinks = [
                { name: "Dashboard", path: "/dashboard", icon: <Home className="w-5 h-5" /> },
                { name: "History", path: "/history", icon: <History className="w-5 h-5" /> },
                { name: "Settings", path: "/account-settings", icon: <Settings className="w-5 h-5" /> },
        ];

        return (
                <div className="min-h-screen bg-black text-white">
                        <div className="pt-20 pb-4 px-4 md:px-8 max-w-7xl mx-auto">
                                <div className="mb-6 border-b border-white/10 pb-4">
                                        <nav className="flex space-x-4">
                                                {dashboardLinks.map((link) => (
                                                        <NavLink
                                                                key={link.path}
                                                                to={link.path}
                                                                className={({ isActive }) =>
                                                                        `flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                                                                                isActive
                                                                                        ? "bg-white/20 text-white"
                                                                                        : "text-white/70 hover:bg-white/10 hover:text-white"
                                                                        }`
                                                                }
                                                        >
                                                                {link.icon}
                                                                <span>{link.name}</span>
                                                        </NavLink>
                                                ))}
                                        </nav>
                                </div>
                                <Outlet />
                        </div>
                </div>
        );
};

export default DashboardLayout;

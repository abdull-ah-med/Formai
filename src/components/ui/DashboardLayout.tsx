import React from "react";
import { Outlet } from "react-router-dom";

const DashboardLayout: React.FC = () => {
        return (
                <div className="min-h-screen bg-black text-white">
                        <Outlet />
                </div>
        );
};

export default DashboardLayout;

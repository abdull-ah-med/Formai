import { Routes, Route } from "react-router-dom";
import Home from "./components/ui/home";
import Signup from "./components/ui/signup";
import Signin from "./components/ui/signin";
import About from "./components/ui/about";
import Privacy from "./components/ui/privacy";
import Terms from "./components/ui/terms";
import Cookies from "./components/ui/cookies";
import Pricing from "./components/ui/pricing";
import UserDashboard from "./components/ui/userdashboard";
import History from "./components/ui/history";
import AccountSettings from "./components/ui/accountSettings";
import ProtectedRoute from "./components/ui/ProtectedRoute";
import DashboardLayout from "./components/ui/DashboardLayout";
import GoogleAuthCallback from "./components/GoogleAuthCallback";

export default function AppRoutes() {
        return (
                <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/signin" element={<Signin />} />
                        <Route
                                path="/auth/google/callback"
                                element={<GoogleAuthCallback />}
                        />
                        <Route path="/about" element={<About />} />
                        <Route path="/privacy" element={<Privacy />} />
                        <Route path="/terms" element={<Terms />} />
                        <Route path="/cookies" element={<Cookies />} />
                        <Route path="/pricing" element={<Pricing />} />
                        <Route element={<DashboardLayout />}>
                                <Route element={<ProtectedRoute />}>
                                        <Route
                                                path="/dashboard"
                                                element={<UserDashboard />}
                                        />
                                        <Route
                                                path="/history"
                                                element={<History />}
                                        />
                                        <Route
                                                path="/account-settings"
                                                element={<AccountSettings />}
                                        />
                                </Route>
                        </Route>
                </Routes>
        );
}

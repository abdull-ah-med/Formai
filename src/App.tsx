import { BrowserRouter as Router } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/ui/navbar";
import Footer from "./components/ui/footer";
import SmoothScroll from "./components/ui/smooth-scroll";
import AppRoutes from "./routes";
import ErrorBoundary from "./components/ui/ErrorBoundary";
import SessionManager from "./components/SessionManager";
import { AuthProvider } from "./contexts/AuthContext";
import { FormProvider } from "./contexts/FormContext";

function App() {
        useEffect(() => {
                // Global authentication check on app initialization
                // Removed legacy token migration and validation logic
        }, []);

        return (
                <ErrorBoundary>
                        <Router>
                                <AuthProvider>
                                        <FormProvider>
                                                <SmoothScroll>
                                                        <div className="min-h-screen bg-black text-white">
                                                                <SessionManager />
                                                                <Navbar />
                                                                <AppRoutes />
                                                                <Footer />
                                                        </div>
                                                </SmoothScroll>
                                        </FormProvider>
                                </AuthProvider>
                        </Router>
                </ErrorBoundary>
        );
}

export default App;

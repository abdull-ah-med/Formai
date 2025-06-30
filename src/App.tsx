import { BrowserRouter as Router } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/ui/navbar";
import Footer from "./components/ui/footer";
import SmoothScroll from "./components/ui/smooth-scroll";
import AppRoutes from "./routes";
import ErrorBoundary from "./components/ui/ErrorBoundary";
import SessionManager from "./components/SessionManager";

function App() {
        useEffect(() => {
                // Global authentication check on app initialization
                // Removed legacy token migration and validation logic
        }, []);

        return (
                <ErrorBoundary>
                        <Router>
                                <SmoothScroll>
                                        <div className="min-h-screen bg-black text-white">
                                                <SessionManager />
                                                <Navbar />
                                                <AppRoutes />
                                                <Footer />
                                        </div>
                                </SmoothScroll>
                        </Router>
                </ErrorBoundary>
        );
}

export default App;

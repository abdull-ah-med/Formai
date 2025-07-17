import { BrowserRouter as Router } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/ui/navbar";
import Footer from "./components/ui/footer";
import SmoothScroll from "./components/ui/smooth-scroll";
import AppRoutes from "./routes";
import ErrorBoundary from "./components/ui/ErrorBoundary";
import SessionManager from "./components/SessionManager";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { FormProvider } from "./contexts/FormContext";

function AppContent() {
	const { isAuthenticated } = useAuth();
	return (
		<div className={`min-h-screen ${!isAuthenticated ? "bg-dark-gradient" : "bg-black"}`}>
			<SessionManager />
			<Navbar />
			<AppRoutes />
			<Footer />
		</div>
	);
}

function App() {
	return (
		<ErrorBoundary>
			<Router>
				<AuthProvider>
					<FormProvider>
						<SmoothScroll>
							<AppContent />
						</SmoothScroll>
					</FormProvider>
				</AuthProvider>
			</Router>
		</ErrorBoundary>
	);
}

export default App;

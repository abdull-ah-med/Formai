import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "./button";
import {
	LogOut,
	Settings,
	User,
	X,
	MessageSquare,
	History,
	Home,
	Info,
	Menu,
	Sparkles,
} from "lucide-react";
import FormaiLogo from "../../assets/Formai.svg";
import { useAuth } from "../../hooks/useAuth";

type NavItem = {
	name: string;
	href: string;
	isRouterLink: boolean;
	icon: JSX.Element;
	onClick?: () => void;
	variant?: "default" | "primary" | "danger";
};

const Navbar = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { isAuthenticated, logout } = useAuth();
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

	const handleScroll = () => {
		const offset = window.scrollY;
		setIsScrolled(offset > 20);
	};

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	const handleLogout = () => {
		logout(() => {
			setShowLogoutConfirm(false);
			navigate("/");
		});
	};

	const navItems: NavItem[] = isAuthenticated
		? [
				{
					name: "Chat",
					href: "/dashboard",
					isRouterLink: true,
					icon: <MessageSquare className="w-4 h-4" />,
				},
				{
					name: "History",
					href: "/history",
					isRouterLink: true,
					icon: <History className="w-4 h-4" />,
				},
				{
					name: "Settings",
					href: "/account-settings",
					isRouterLink: true,
					icon: <Settings className="w-4 h-4" />,
				},
				{
					name: "Logout",
					href: "#",
					isRouterLink: false,
					onClick: () => setShowLogoutConfirm(true),
					icon: <LogOut className="w-4 h-4" />,
					variant: "danger",
				},
		  ]
		: [
				{
					name: "Home",
					href: "/",
					isRouterLink: true,
					icon: <Home className="w-4 h-4" />,
				},
				{
					name: "About",
					href: "/about",
					isRouterLink: true,
					icon: <Info className="w-4 h-4" />,
				},
				{
					name: "Sign In",
					href: "/signin",
					isRouterLink: true,
					icon: <User className="w-4 h-4" />,
				},
				{
					name: "Get Started",
					href: "/signup",
					isRouterLink: true,
					icon: <Sparkles className="w-4 h-4" />,
					variant: "primary",
				},
		  ];

	return (
		<>
			<div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
				<nav
					className={`
            pointer-events-auto
            flex items-center justify-between
            bg-background/80 backdrop-blur-2xl
            border border-white/10
            shadow-[0_8px_32px_rgba(0,0,0,0.12)]
            rounded-full
            						px-4 py-2 md:px-6 md:py-3
						transition-all duration-500 ease-nebula
						${isScrolled
							? "w-[min(90%,650px)] py-2 bg-background/90 backdrop-blur-3xl shadow-xl"
							: "w-[min(95%,900px)] bg-background/60"}
					`}>
					{/* Logo */}
					<Link to="/" className="flex items-center gap-2 group mr-2 sm:mr-4 shrink-0">
						<div className="relative w-8 h-8 flex items-center justify-center bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
							<img
								src={FormaiLogo}
								alt="Formai"
								className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12"
							/>
						</div>
						<span className="font-heading font-semibold text-lg tracking-tight hidden sm:block">
							Formai
						</span>
					</Link>

					{/* Desktop Nav */}
					<div className="hidden md:flex items-center gap-1 flex-shrink-0">
						{navItems.map((item) => {
							const isActive = location.pathname === item.href;
							
							if (item.variant === "primary") {
								return (
									<Link
										key={item.name}
										to={item.href}
										className="ml-2 bg-primary text-primary-foreground hover:bg-primary/90 px-5 py-2 rounded-full text-sm font-medium transition-all hover:scale-105 active:scale-95 flex items-center gap-2 shadow-lg shadow-primary/25 whitespace-nowrap">
										{item.name}
										{item.icon}
									</Link>
								);
							}

							const content = (
								<>
									{item.icon}
									<span>{item.name}</span>
								</>
							);

							const className = `
                flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap
                ${isActive 
                  ? "bg-white/10 text-white shadow-inner" 
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5"}
                ${item.variant === "danger" ? "hover:text-red-400 hover:bg-red-500/10" : ""}
              `;

							return item.isRouterLink ? (
								<Link key={item.name} to={item.href} className={className}>
									{content}
								</Link>
							) : (
								<button key={item.name} onClick={item.onClick} className={className}>
									{content}
								</button>
							);
						})}
					</div>

					{/* Mobile Menu Toggle */}
					<button
						className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
						onClick={() => setIsMobileMenuOpen(true)}>
						<Menu className="w-6 h-6" />
					</button>
				</nav>
			</div>

			{/* Mobile Menu Overlay */}
			<div
				className={`fixed inset-0 z-[60] bg-black/80 backdrop-blur-xl transition-all duration-300 ${
					isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
				}`}
				onClick={() => setIsMobileMenuOpen(false)}>
				
				<div
					className={`absolute right-4 top-4 left-4 bg-[#0a0a0a] border border-white/10 rounded-3xl p-6 shadow-2xl transform transition-all duration-300 ${
						isMobileMenuOpen ? "translate-y-0 scale-100" : "-translate-y-10 scale-95"
					}`}
					onClick={(e) => e.stopPropagation()}>
					
					<div className="flex justify-between items-center mb-6">
						<span className="font-heading font-semibold text-xl text-white">Menu</span>
						<button
							onClick={() => setIsMobileMenuOpen(false)}
							className="p-2 hover:bg-white/5 text-white/70 hover:text-white rounded-full transition-colors">
							<X className="w-6 h-6" />
						</button>
					</div>

					<div className="flex flex-col gap-2">
						{navItems.map((item) => {
							const isActive = location.pathname === item.href;
							const className = `
								flex items-center gap-3 p-4 rounded-xl transition-all text-base font-medium
								${isActive ? "bg-white/10 text-white" : "text-muted-foreground hover:bg-white/5 hover:text-foreground"}
								${item.variant === "primary" ? "bg-white text-black hover:bg-neutral-200 justify-center mt-4 shadow-lg shadow-white/5" : ""}
							`;

							const content = (
								<>
									{item.icon}
									<span>{item.name}</span>
								</>
							);

							if (item.isRouterLink) {
								return (
									<Link
										key={item.name}
										to={item.href}
										className={className}
										onClick={() => setIsMobileMenuOpen(false)}>
										{content}
									</Link>
								);
							}

							return (
								<button
									key={item.name}
									onClick={() => {
										item.onClick?.();
										setIsMobileMenuOpen(false);
									}}
									className={className}>
									{content}
								</button>
							);
						})}
					</div>
				</div>
			</div>

			{/* Logout Confirmation */}
			{showLogoutConfirm && (
				<div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
					<div className="bg-card border border-border w-full max-w-sm p-6 rounded-2xl shadow-2xl animate-in zoom-in-95 duration-200">
						<h3 className="text-xl font-heading font-semibold mb-2">Log out?</h3>
						<p className="text-muted-foreground mb-6">
							Are you sure you want to sign out of your account?
						</p>
						<div className="flex justify-end gap-3">
							<Button variant="ghost" onClick={() => setShowLogoutConfirm(false)}>
								Cancel
							</Button>
							<Button variant="destructive" onClick={handleLogout}>
								Log out
							</Button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Navbar;

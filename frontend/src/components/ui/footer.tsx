import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import FormaiLogo from "@/assets/Formai.svg";

const Footer = () => {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="relative py-16 overflow-hidden" style={{ background: 'linear-gradient(160deg, #0f0f12 0%, #151318 20%, #1a1520 40%, #181420 60%, #14121a 80%, #0f0f12 100%)' }}>
			{/* Ambient background glow - soft purple/blue and rose tones */}
			<div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-800/10 rounded-full blur-[150px] pointer-events-none" />
			<div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-800/10 rounded-full blur-[150px] pointer-events-none" />
			<div className="absolute top-1/2 right-1/3 w-64 h-64 bg-rose-800/8 rounded-full blur-[120px] pointer-events-none" />

			<div className="relative z-10 max-w-7xl mx-auto px-6">
				<div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-16">
					{/* Brand Column */}
					<div className="md:col-span-4 flex flex-col gap-6">
						<Link to="/" className="flex items-center gap-2 group w-fit">
							<div className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-xl group-hover:bg-white/10 transition-colors">
								<img
									src={FormaiLogo}
									alt="Formai"
									className="h-6 w-6"
								/>
							</div>
							<span className="font-heading font-semibold text-xl">Formai</span>
						</Link>
						<p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
							Revolutionizing the way you create and manage forms with the power of artificial intelligence. Simple, fast, and beautiful.
						</p>
					</div>

					{/* Links Columns */}
					<div className="md:col-span-2 md:col-start-7">
						<h4 className="font-medium mb-6">Get Started</h4>
						<ul className="space-y-3 text-sm text-muted-foreground">
							<li><Link to="/signup" className="hover:text-primary transition-colors">Sign Up</Link></li>
							<li><Link to="/signin" className="hover:text-primary transition-colors">Sign In</Link></li>
						</ul>
					</div>

					<div className="md:col-span-2">
						<h4 className="font-medium mb-6">Company</h4>
						<ul className="space-y-3 text-sm text-muted-foreground">
							<li><Link to="/about" className="hover:text-primary transition-colors">About</Link></li>
							<li><Link to="/pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
						</ul>
					</div>

					<div className="md:col-span-2">
						<h4 className="font-medium mb-6">Legal</h4>
						<ul className="space-y-3 text-sm text-muted-foreground">
							<li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy</Link></li>
							<li><Link to="/terms" className="hover:text-primary transition-colors">Terms</Link></li>
							<li><Link to="/cookies" className="hover:text-primary transition-colors">Cookies</Link></li>
							<li><Link to="/api-key-policy" className="hover:text-primary transition-colors">API Key Policy</Link></li>
						</ul>
					</div>
				</div>

				{/* Bottom Bar */}
				<div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
					<p className="text-xs text-muted-foreground">
						© {currentYear} Formai Inc. All rights reserved.
					</p>
					
					<div className="flex items-center gap-6">
						<a href="mailto:contact@formai.com" className="text-muted-foreground hover:text-foreground transition-colors"><Mail size={18} /></a>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;

import { ArrowRight, CheckCircle, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { isAuthenticated, logoutAndRedirect } from "@/auth/authHelper";

const Home = () => {
        const navigate = useNavigate();

        // Decide behavior based on session type when an authenticated user lands on Home.
        useEffect(() => {
                (async () => {
                        const auth = await isAuthenticated();
                        if (auth) {
                                const nonPersistent =
                                        localStorage.getItem(
                                                "nonPersistentAuth"
                                        ) === "true";

                                if (nonPersistent) {
                                        // End session for non-persistent users
                                        await logoutAndRedirect(null);
                                } else {
                                        // Persistent user – send them back to dashboard
                                        navigate("/dashboard", {
                                                replace: true,
                                        });
                                }
                        }
                })();
        }, [navigate]);

        const features = [
                {
                        icon: <Sparkles className="w-6 h-6 text-white" />,
                        title: "AI-Powered Generation",
                        description:
                                "Create forms instantly with natural language prompts",
                },
                {
                        icon: <CheckCircle className="w-6 h-6 text-white" />,
                        title: "Seamless Integration",
                        description:
                                "Connect with Google Forms and other popular platforms",
                },
                {
                        icon: <CheckCircle className="w-6 h-6 text-white" />,
                        title: "Smart Customization",
                        description:
                                "AI automatically adapts forms to your specific needs",
                },
        ];

        return (
                <div className="min-h-screen">
                        {/* Hero Section */}
                        <section className="relative min-h-screen flex items-center px-4 sm:px-6 lg:px-8">
                                {/* Background Elements */}
                                <div className="absolute inset-0 overflow-hidden">
                                        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
                                        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
                                </div>

                                <div className="relative z-10 max-w-7xl mx-auto w-full">
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                                                {/* Left Side - Tagline */}
                                                <div className="text-left">
                                                        <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-tight leading-none">
                                                                forms.
                                                                <br />
                                                                redefined.
                                                        </h1>
                                                </div>

                                                {/* Right Side - Content */}
                                                <div className="text-left">
                                                        <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
                                                                Create
                                                                professional
                                                                forms instantly
                                                                with AI. Simply
                                                                describe what
                                                                you need, and
                                                                watch as
                                                                intelligent
                                                                forms are
                                                                generated and
                                                                integrated with
                                                                your favorite
                                                                platforms.
                                                        </p>
                                                        <Button
                                                                size="lg"
                                                                className="bg-white text-black hover:bg-gray-200 px-8 py-3 text-lg font-semibold"
                                                                onClick={() =>
                                                                        navigate(
                                                                                "/signup"
                                                                        )
                                                                }
                                                        >
                                                                Sign Up
                                                                <ArrowRight className="ml-2 w-5 h-5" />
                                                        </Button>
                                                </div>
                                        </div>
                                </div>
                        </section>

                        {/* Features Section */}
                        <section className="py-20 px-4 sm:px-6 lg:px-8">
                                <div className="max-w-7xl mx-auto">
                                        <div className="text-center mb-16">
                                                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                                                        AI-Powered Form Creation
                                                </h2>
                                                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                                                        Transform how you create
                                                        forms with intelligent
                                                        AI that understands your
                                                        needs and generates
                                                        professional forms in
                                                        seconds.
                                                </p>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                                {features.map(
                                                        (feature, index) => (
                                                                <div
                                                                        key={
                                                                                index
                                                                        }
                                                                        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 hover:bg-white/10 transition-all duration-300"
                                                                >
                                                                        <div className="mb-4">
                                                                                {
                                                                                        feature.icon
                                                                                }
                                                                        </div>
                                                                        <h3 className="text-xl font-semibold text-white mb-3">
                                                                                {
                                                                                        feature.title
                                                                                }
                                                                        </h3>
                                                                        <p className="text-gray-300 leading-relaxed">
                                                                                {
                                                                                        feature.description
                                                                                }
                                                                        </p>
                                                                </div>
                                                        )
                                                )}
                                        </div>
                                </div>
                        </section>

                        {/* How It Works Section */}
                        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-black/20">
                                <div className="max-w-7xl mx-auto">
                                        <div className="text-center mb-16">
                                                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                                                        How It Works
                                                </h2>
                                                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                                                        Creating forms has never
                                                        been easier. Just
                                                        describe, generate, and
                                                        deploy.
                                                </p>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                                <div className="text-center">
                                                        <div className="bg-white/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                                                                <span className="text-2xl font-bold text-white">
                                                                        1
                                                                </span>
                                                        </div>
                                                        <h3 className="text-xl font-semibold text-white mb-3">
                                                                Describe Your
                                                                Form
                                                        </h3>
                                                        <p className="text-gray-300">
                                                                Simply tell our
                                                                AI what kind of
                                                                form you need.
                                                                Be as detailed
                                                                or simple as you
                                                                want.
                                                        </p>
                                                </div>
                                                <div className="text-center">
                                                        <div className="bg-white/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                                                                <span className="text-2xl font-bold text-white">
                                                                        2
                                                                </span>
                                                        </div>
                                                        <h3 className="text-xl font-semibold text-white mb-3">
                                                                AI Generates
                                                        </h3>
                                                        <p className="text-gray-300">
                                                                Our intelligent
                                                                AI creates a
                                                                professional
                                                                form tailored to
                                                                your
                                                                specifications.
                                                        </p>
                                                </div>
                                                <div className="text-center">
                                                        <div className="bg-white/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                                                                <span className="text-2xl font-bold text-white">
                                                                        3
                                                                </span>
                                                        </div>
                                                        <h3 className="text-xl font-semibold text-white mb-3">
                                                                Deploy &
                                                                Integrate
                                                        </h3>
                                                        <p className="text-gray-300">
                                                                Seamlessly
                                                                integrate with
                                                                Google Forms,
                                                                Typeform, or
                                                                export to your
                                                                platform.
                                                        </p>
                                                </div>
                                        </div>
                                </div>
                        </section>

                        {/* CTA Section */}
                        <section className="py-20 px-4 sm:px-6 lg:px-8">
                                <div className="max-w-4xl mx-auto text-center">
                                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                                                Ready to Revolutionize Form
                                                Creation?
                                        </h2>
                                        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                                                Be among the first to experience
                                                AI-powered form generation. Sign
                                                up for early access.
                                        </p>
                                        <Button
                                                size="lg"
                                                className="bg-white text-black hover:bg-gray-200 px-8 py-3 text-lg font-semibold"
                                                onClick={() =>
                                                        navigate("/signup")
                                                }
                                        >
                                                Sign Up
                                                <ArrowRight className="ml-2 w-5 h-5" />
                                        </Button>
                                </div>
                        </section>
                </div>
        );
};

export default Home;

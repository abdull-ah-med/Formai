import { ArrowRight, CheckCircle, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { logoutAndRedirect } from "@/auth/authHelper";

const Home = () => {
        const navigate = useNavigate();
        const { isAuthenticated, loading } = useAuth();

        // Decide behavior based on session type when an authenticated user lands on Home.
        useEffect(() => {
                if (loading) {
                        return; // Wait until authentication status is resolved
                }

                if (isAuthenticated) {
                        const nonPersistent = localStorage.getItem("nonPersistentAuth") === "true";

                        if (nonPersistent) {
                                // End session for non-persistent users
                                (async () => {
                                        await logoutAndRedirect(null);
                                })();
                        } else {
                                // Persistent user – send them back to dashboard
                                navigate("/dashboard", { replace: true });
                        }
                }
        }, [isAuthenticated, loading, navigate]);

        const features = [
                {
                        icon: <Sparkles className="w-6 h-6 text-white" />,
                        title: "Revolutionary AI Form Creation",
                        description: "Create sophisticated Google Forms in seconds with a simple text prompt",
                },
                {
                        icon: <CheckCircle className="w-6 h-6 text-white" />,
                        title: "Seamless Google Integration",
                        description: "Forms appear instantly in your Google account with zero manual setup",
                },
                {
                        icon: <CheckCircle className="w-6 h-6 text-white" />,
                        title: "Advanced Question Intelligence",
                        description: "Our AI crafts perfect questions, conditional logic, and response validation",
                },
        ];

        return (
                <div className="bg-black text-white min-h-screen">
                        {/* Hero Section */}
                        <section className="relative min-h-screen flex items-center px-4 sm:px-6 lg:px-8">
                                {/* Background Elements */}
                                <div className="absolute inset-0 overflow-hidden">
                                        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/20 rounded-full blur-3xl animate-pulse"></div>
                                        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-white/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                                </div>

                                <div className="relative z-10 max-w-7xl mx-auto w-full">
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                                                {/* Left Side - Tagline */}
                                                <div className="text-left">
                                                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-none">
                                                                forms.
                                                                <br />
                                                                <span className="bg-gradient-to-r from-white/40 to-white text-transparent bg-clip-text">
                                                                        reimagined.
                                                                </span>
                                                        </h1>
                                                </div>

                                                {/* Right Side - Content */}
                                                <div className="text-left">
                                                        <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
                                                                Harness the power of AI to create stunning Google Forms
                                                                in seconds. Just describe what you need, and watch as
                                                                our advanced AI instantly crafts the perfect form
                                                                directly in your Google account.
                                                        </p>
                                                        <div className="flex flex-wrap gap-4">
                                                                <Button
                                                                        size="lg"
                                                                        className="bg-gradient-to-r from-white/80 to-white hover:from-white/90 hover:to-white text-black px-8 py-3 text-lg font-semibold"
                                                                        onClick={() => navigate("/signup")}
                                                                >
                                                                        Get Started Free
                                                                        <ArrowRight className="ml-2 w-5 h-5" />
                                                                </Button>
                                                                <Button
                                                                        size="lg"
                                                                        variant="outline"
                                                                        className="bg-gradient-to-r from-white/80 to-white hover:from-white/90 hover:to-white text-black px-8 py-3 text-lg font-semibold"
                                                                        onClick={() => navigate("/signin")}
                                                                >
                                                                        Sign In
                                                                </Button>
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                        </section>

                        {/* Features Section */}
                        <section className="py-20 px-4 sm:px-6 lg:px-8">
                                <div className="max-w-7xl mx-auto">
                                        <div className="text-center mb-16">
                                                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                                                        The Future of Form Creation
                                                </h2>
                                                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                                                        Say goodbye to tedious form building forever. Our AI understands
                                                        exactly what you need and creates professional Google Forms in
                                                        mere seconds.
                                                </p>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                                {features.map((feature, index) => (
                                                        <div
                                                                key={index}
                                                                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1"
                                                        >
                                                                <div className="mb-4">{feature.icon}</div>
                                                                <h3 className="text-xl font-semibold text-white mb-3">
                                                                        {feature.title}
                                                                </h3>
                                                                <p className="text-gray-300 leading-relaxed">
                                                                        {feature.description}
                                                                </p>
                                                        </div>
                                                ))}
                                        </div>
                                </div>
                        </section>

                        {/* How It Works Section */}
                        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-black/20">
                                <div className="max-w-7xl mx-auto">
                                        <div className="text-center mb-16">
                                                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                                                        Effortless Creation Process
                                                </h2>
                                                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                                                        From idea to finished form in seconds. Our streamlined process
                                                        eliminates all the complexity of traditional form building.
                                                </p>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                                <div className="text-center">
                                                        <div className="bg-gradient-to-r from-white/30 to-white/80 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                                                                <span className="text-2xl font-bold text-black">1</span>
                                                        </div>
                                                        <h3 className="text-xl font-semibold text-white mb-3">
                                                                Describe Your Vision
                                                        </h3>
                                                        <p className="text-gray-300">
                                                                Type a natural language prompt describing exactly what
                                                                you need. Our AI understands context, purpose, and
                                                                specific requirements.
                                                        </p>
                                                </div>
                                                <div className="text-center">
                                                        <div className="bg-gradient-to-r from-white/30 to-white/80 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                                                                <span className="text-2xl font-bold text-black">2</span>
                                                        </div>
                                                        <h3 className="text-xl font-semibold text-white mb-3">
                                                                AI Magic Happens
                                                        </h3>
                                                        <p className="text-gray-300">
                                                                Our powerful AI analyzes your request and crafts the
                                                                perfect Google Form with intelligent questions, logic,
                                                                and formatting.
                                                        </p>
                                                </div>
                                                <div className="text-center">
                                                        <div className="bg-gradient-to-r from-white/30 to-white/80 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                                                                <span className="text-2xl font-bold text-black">3</span>
                                                        </div>
                                                        <h3 className="text-xl font-semibold text-white mb-3">
                                                                Instant Delivery
                                                        </h3>
                                                        <p className="text-gray-300">
                                                                Your professionally designed form appears instantly in
                                                                your Google Forms account, ready to share and collect
                                                                responses.
                                                        </p>
                                                </div>
                                        </div>
                                </div>
                        </section>

                        {/* CTA Section */}
                        <section className="py-20 px-4 sm:px-6 lg:px-8">
                                <div className="max-w-4xl mx-auto text-center">
                                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                                                Ready to Revolutionize Your Form Creation?
                                        </h2>
                                        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                                                Join thousands of users already creating amazing Google Forms with AI.
                                                Get started for free today.
                                        </p>
                                        <div className="flex flex-wrap justify-center gap-4">
                                                <Button
                                                        size="lg"
                                                        className="bg-gradient-to-r from-white/80 to-white hover:from-white/90 hover:to-white text-black px-8 py-3 text-lg font-semibold"
                                                        onClick={() => navigate("/signup")}
                                                >
                                                        Get Started Free
                                                        <ArrowRight className="ml-2 w-5 h-5" />
                                                </Button>
                                                <Button
                                                        size="lg"
                                                        variant="outline"
                                                        className="border-white text-white hover:bg-white/10 px-8 py-3 text-lg font-semibold"
                                                        onClick={() => navigate("/signin")}
                                                >
                                                        Sign In
                                                </Button>
                                        </div>
                                </div>
                        </section>
                </div>
        );
};

export default Home;

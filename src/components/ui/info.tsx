import {
        TrendingUp,
        Users,
        DollarSign,
        Zap,
        Shield,
        Globe,
        Target,
        BarChart3,
        Rocket,
        Award,
        PieChart,
        ArrowUpRight,
        Lightbulb,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Info = () => {
        const navigate = useNavigate();

        const marketStats = [
                {
                        label: "Global Form Builder Market",
                        value: "$2.8B",
                        growth: "+12.5%",
                        icon: <BarChart3 className="w-6 h-6" />,
                },
                {
                        label: "AI in Business Tools",
                        value: "$15.7B",
                        growth: "+23.1%",
                        icon: <Zap className="w-6 h-6" />,
                },
                {
                        label: "Target Addressable Market",
                        value: "$8.2B",
                        growth: "+18.3%",
                        icon: <Target className="w-6 h-6" />,
                },
        ];

        const technicalVision = [
                {
                        title: "AI-Powered Form Generation",
                        description:
                                "Advanced natural language processing to convert descriptions into functional forms",
                        tech: [
                                "OpenAI GPT-4",
                                "Custom NLP Models",
                                "Real-time Processing",
                        ],
                },
                {
                        title: "Multi-Platform Integration",
                        description:
                                "Seamless integration with popular business tools and platforms",
                        tech: [
                                "REST APIs",
                                "Webhooks",
                                "OAuth 2.0",
                                "Zapier Integration",
                        ],
                },
                {
                        title: "Advanced Analytics & Insights",
                        description:
                                "Comprehensive data analysis and form performance metrics",
                        tech: [
                                "Real-time Analytics",
                                "Machine Learning",
                                "Predictive Modeling",
                        ],
                },
                {
                        title: "Enterprise Security",
                        description:
                                "Bank-level security with compliance for enterprise requirements",
                        tech: [
                                "SOC 2 Type II",
                                "GDPR Compliance",
                                "End-to-End Encryption",
                        ],
                },
        ];

        const marketValidation = [
                {
                        metric: "Market Size",
                        value: "$2.8B",
                        description: "Global form builder market",
                },
                {
                        metric: "Growth Rate",
                        value: "12.5%",
                        description: "Annual market growth",
                },
                {
                        metric: "Pain Point",
                        value: "High",
                        description: "User frustration with existing tools",
                },
                {
                        metric: "Competition",
                        value: "Low",
                        description: "AI-powered solutions",
                },
        ];

        const competitiveAdvantages = [
                {
                        title: "First-Mover Advantage",
                        description:
                                "Pioneering AI-powered form creation with proprietary technology",
                },
                {
                        title: "Technical Vision",
                        description:
                                "Clear roadmap for advanced AI models and scalable architecture",
                },
                {
                        title: "Market Timing",
                        description:
                                "Perfect timing with growing demand for AI-powered business tools",
                },
                {
                        title: "Team Expertise",
                        description:
                                "Deep technical expertise in AI, UX, and business development",
                },
        ];

        const fundingUse = [
                {
                        category: "Product Development",
                        percentage: "40%",
                        description: "Core AI engine and platform",
                },
                {
                        category: "Team Expansion",
                        percentage: "30%",
                        description: "Engineering and product roles",
                },
                {
                        category: "Market Entry",
                        percentage: "20%",
                        description: "Marketing and customer acquisition",
                },
                {
                        category: "Operations",
                        percentage: "10%",
                        description: "Infrastructure and legal",
                },
        ];

        return (
                <div className="min-h-screen bg-black text-white">
                        {/* Hero Section */}
                        <section className="relative min-h-screen flex items-center px-4 sm:px-6 lg:px-8">
                                {/* Background Elements */}
                                <div className="absolute inset-0 overflow-hidden">
                                        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
                                        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
                                </div>

                                <div className="relative z-10 max-w-7xl mx-auto w-full">
                                        <div className="text-center">
                                                <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
                                                        <Lightbulb className="w-4 h-4 text-yellow-400" />
                                                        <span className="text-sm font-medium text-yellow-400">
                                                                Pre-Product
                                                                Investment
                                                                Opportunity
                                                        </span>
                                                </div>
                                                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-none">
                                                        Investment Opportunity
                                                </h1>
                                                <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
                                                        Formai is
                                                        revolutionizing the
                                                        $2.8B form builder
                                                        market with AI-powered
                                                        technology. We're
                                                        seeking seed funding to
                                                        build our MVP and
                                                        capture first-mover
                                                        advantage.
                                                </p>
                                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                                        <Button
                                                                size="lg"
                                                                className="bg-white text-black hover:bg-transparent hover:border-white hover:text-white border-2 border-transparent px-8 py-3 text-lg font-semibold transition-all duration-300"
                                                                onClick={() =>
                                                                        navigate(
                                                                                "/signup"
                                                                        )
                                                                }
                                                        >
                                                                Join Our Mission
                                                        </Button>
                                                        <Button
                                                                size="lg"
                                                                className="bg-white text-black hover:bg-transparent hover:border-white hover:text-white border-2 border-transparent px-8 py-3 text-lg font-semibold transition-all duration-300"
                                                        >
                                                                Download Pitch
                                                                Deck
                                                        </Button>
                                                </div>
                                        </div>
                                </div>
                        </section>

                        {/* Market Overview */}
                        <section className="py-20 px-4 sm:px-6 lg:px-8">
                                <div className="max-w-7xl mx-auto">
                                        <div className="text-center mb-16">
                                                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                                                        Market Opportunity
                                                </h2>
                                                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                                                        The form builder market
                                                        is experiencing
                                                        unprecedented growth,
                                                        driven by digital
                                                        transformation and AI
                                                        adoption
                                                </p>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                                {marketStats.map(
                                                        (stat, index) => (
                                                                <div
                                                                        key={
                                                                                index
                                                                        }
                                                                        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 text-center"
                                                                >
                                                                        <div className="flex justify-center mb-4">
                                                                                <div className="p-3 bg-white/10 rounded-full">
                                                                                        {
                                                                                                stat.icon
                                                                                        }
                                                                                </div>
                                                                        </div>
                                                                        <h3 className="text-2xl font-bold text-white mb-2">
                                                                                {
                                                                                        stat.value
                                                                                }
                                                                        </h3>
                                                                        <p className="text-gray-400 mb-2">
                                                                                {
                                                                                        stat.label
                                                                                }
                                                                        </p>
                                                                        <div className="flex items-center justify-center space-x-1 text-green-400">
                                                                                <ArrowUpRight className="w-4 h-4" />
                                                                                <span className="text-sm font-medium">
                                                                                        {
                                                                                                stat.growth
                                                                                        }{" "}
                                                                                        YoY
                                                                                </span>
                                                                        </div>
                                                                </div>
                                                        )
                                                )}
                                        </div>
                                </div>
                        </section>

                        {/* Technical Vision */}
                        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-black/20">
                                <div className="max-w-7xl mx-auto">
                                        <div className="text-center mb-16">
                                                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                                                        Technical Vision
                                                </h2>
                                                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                                                        Our roadmap for building
                                                        proprietary AI
                                                        technology and scalable
                                                        architecture
                                                </p>
                                        </div>

                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                                                {technicalVision.map(
                                                        (feature, index) => (
                                                                <div
                                                                        key={
                                                                                index
                                                                        }
                                                                        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8"
                                                                >
                                                                        <h3 className="text-2xl font-bold text-white mb-4">
                                                                                {
                                                                                        feature.title
                                                                                }
                                                                        </h3>
                                                                        <p className="text-gray-300 mb-6 leading-relaxed">
                                                                                {
                                                                                        feature.description
                                                                                }
                                                                        </p>
                                                                        <div className="flex flex-wrap gap-2">
                                                                                {feature.tech.map(
                                                                                        (
                                                                                                tech,
                                                                                                techIndex
                                                                                        ) => (
                                                                                                <span
                                                                                                        key={
                                                                                                                techIndex
                                                                                                        }
                                                                                                        className="px-3 py-1 bg-white/10 rounded-full text-sm text-gray-300"
                                                                                                >
                                                                                                        {
                                                                                                                tech
                                                                                                        }
                                                                                                </span>
                                                                                        )
                                                                                )}
                                                                        </div>
                                                                </div>
                                                        )
                                                )}
                                        </div>
                                </div>
                        </section>

                        {/* Market Validation */}
                        <section className="py-20 px-4 sm:px-6 lg:px-8">
                                <div className="max-w-7xl mx-auto">
                                        <div className="text-center mb-16">
                                                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                                                        Market Validation
                                                </h2>
                                                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                                                        Research and analysis
                                                        supporting our market
                                                        opportunity and timing
                                                </p>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                                                {marketValidation.map(
                                                        (metric, index) => (
                                                                <div
                                                                        key={
                                                                                index
                                                                        }
                                                                        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 text-center"
                                                                >
                                                                        <h3 className="text-3xl font-bold text-white mb-2">
                                                                                {
                                                                                        metric.value
                                                                                }
                                                                        </h3>
                                                                        <p className="text-gray-400 mb-4">
                                                                                {
                                                                                        metric.metric
                                                                                }
                                                                        </p>
                                                                        <p className="text-sm text-gray-500">
                                                                                {
                                                                                        metric.description
                                                                                }
                                                                        </p>
                                                                </div>
                                                        )
                                                )}
                                        </div>
                                </div>
                        </section>

                        {/* Competitive Advantages */}
                        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-black/20">
                                <div className="max-w-7xl mx-auto">
                                        <div className="text-center mb-16">
                                                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                                                        Competitive Advantages
                                                </h2>
                                                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                                                        Strategic positioning
                                                        and capabilities that
                                                        will drive our success
                                                </p>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                {competitiveAdvantages.map(
                                                        (advantage, index) => (
                                                                <div
                                                                        key={
                                                                                index
                                                                        }
                                                                        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8"
                                                                >
                                                                        <div className="flex items-start space-x-4">
                                                                                <div className="p-3 bg-white/10 rounded-full flex-shrink-0">
                                                                                        <Award className="w-6 h-6 text-white" />
                                                                                </div>
                                                                                <div>
                                                                                        <h3 className="text-xl font-bold text-white mb-3">
                                                                                                {
                                                                                                        advantage.title
                                                                                                }
                                                                                        </h3>
                                                                                        <p className="text-gray-300 leading-relaxed">
                                                                                                {
                                                                                                        advantage.description
                                                                                                }
                                                                                        </p>
                                                                                </div>
                                                                        </div>
                                                                </div>
                                                        )
                                                )}
                                        </div>
                                </div>
                        </section>

                        {/* Funding Use */}
                        <section className="py-20 px-4 sm:px-6 lg:px-8">
                                <div className="max-w-7xl mx-auto">
                                        <div className="text-center mb-16">
                                                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                                                        Use of Funds
                                                </h2>
                                                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                                                        Strategic allocation of
                                                        capital to accelerate
                                                        product development and
                                                        market entry
                                                </p>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                                                {fundingUse.map(
                                                        (item, index) => (
                                                                <div
                                                                        key={
                                                                                index
                                                                        }
                                                                        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 text-center"
                                                                >
                                                                        <div className="mb-4">
                                                                                <PieChart className="w-12 h-12 text-white mx-auto mb-3" />
                                                                                <h3 className="text-3xl font-bold text-white mb-2">
                                                                                        {
                                                                                                item.percentage
                                                                                        }
                                                                                </h3>
                                                                        </div>
                                                                        <h4 className="text-lg font-semibold text-white mb-2">
                                                                                {
                                                                                        item.category
                                                                                }
                                                                        </h4>
                                                                        <p className="text-gray-400 text-sm">
                                                                                {
                                                                                        item.description
                                                                                }
                                                                        </p>
                                                                </div>
                                                        )
                                                )}
                                        </div>
                                </div>
                        </section>
                </div>
        );
};

export default Info;

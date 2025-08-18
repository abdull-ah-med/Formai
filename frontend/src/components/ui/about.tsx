import { Users, Target, Zap, Shield, Globe, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "./button";
import { useDocumentTitle } from "../../utils/useDocumentTitle";

const About = () => {
        const navigate = useNavigate();
        useDocumentTitle("About Us");

        const values = [
                {
                        icon: <Zap className="w-8 h-8 text-white" />,
                        title: "Innovation",
                        description:
                                "Pushing the boundaries of what's possible with AI-powered form creation",
                },
                {
                        icon: <Shield className="w-8 h-8 text-white" />,
                        title: "Trust",
                        description:
                                "Building secure, reliable solutions that users can depend on",
                },
                {
                        icon: <Heart className="w-8 h-8 text-white" />,
                        title: "User-First",
                        description:
                                "Every feature designed with the user experience in mind",
                },
                {
                        icon: <Globe className="w-8 h-8 text-white" />,
                        title: "Accessibility",
                        description:
                                "Making powerful tools available to everyone, everywhere",
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
                                                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-none">
                                                        About Formai
                                                </h1>
                                                <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
                                                        We're revolutionizing
                                                        how forms are created by
                                                        combining the power of
                                                        AI with intuitive
                                                        design. Our mission is
                                                        to make form creation
                                                        accessible, intelligent,
                                                        and effortless for
                                                        everyone.
                                                </p>
                                                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
                                                        <Button
                                                                size="lg"
                                                                className="bg-white text-black hover:bg-transparent hover:border-white hover:text-white border-2 border-transparent px-8 py-3 text-lg font-semibold transition-all duration-300"
                                                                onClick={() =>
                                                                        navigate(
                                                                                "/signup"
                                                                        )
                                                                }
                                                        >
                                                                Be Part of the
                                                                Future
                                                        </Button>
                                                </div>
                                        </div>
                                </div>
                        </section>

                        {/* Mission Section */}
                        <section className="py-20 px-4 sm:px-6 lg:px-8">
                                <div className="max-w-7xl mx-auto">
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                                                <div>
                                                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                                                                Our Mission
                                                        </h2>
                                                        <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                                                                Forms are the
                                                                backbone of
                                                                digital
                                                                interaction, yet
                                                                creating them
                                                                remains a
                                                                tedious,
                                                                time-consuming
                                                                process. We
                                                                believe that
                                                                everyone should
                                                                be able to
                                                                create
                                                                professional,
                                                                effective forms
                                                                without the
                                                                technical
                                                                barriers.
                                                        </p>
                                                        <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                                                                By leveraging
                                                                cutting-edge AI
                                                                technology,
                                                                we're building a
                                                                future where
                                                                form creation is
                                                                as simple as
                                                                having a
                                                                conversation. No
                                                                more complex
                                                                interfaces, no
                                                                more technical
                                                                knowledge
                                                                required – just
                                                                describe what
                                                                you need, and
                                                                watch it come to
                                                                life.
                                                        </p>
                                                        <div className="flex items-center space-x-4">
                                                                <Target className="w-8 h-8 text-white" />
                                                                <span className="text-lg text-gray-300">
                                                                        Making
                                                                        form
                                                                        creation
                                                                        accessible
                                                                        to
                                                                        everyone
                                                                </span>
                                                        </div>
                                                </div>
                                                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8">
                                                        <h3 className="text-2xl font-bold text-white mb-6">
                                                                The Problem We
                                                                Solve
                                                        </h3>
                                                        <div className="space-y-4">
                                                                <div className="flex items-start space-x-3">
                                                                        <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                                                                        <p className="text-gray-300">
                                                                                Traditional
                                                                                form
                                                                                builders
                                                                                require
                                                                                technical
                                                                                expertise
                                                                                and
                                                                                hours
                                                                                of
                                                                                setup
                                                                        </p>
                                                                </div>
                                                                <div className="flex items-start space-x-3">
                                                                        <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                                                                        <p className="text-gray-300">
                                                                                Integration
                                                                                between
                                                                                platforms
                                                                                is
                                                                                complex
                                                                                and
                                                                                often
                                                                                requires
                                                                                custom
                                                                                development
                                                                        </p>
                                                                </div>
                                                                <div className="flex items-start space-x-3">
                                                                        <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                                                                        <p className="text-gray-300">
                                                                                Most
                                                                                solutions
                                                                                don't
                                                                                adapt
                                                                                to
                                                                                specific
                                                                                business
                                                                                needs
                                                                                or
                                                                                use
                                                                                cases
                                                                        </p>
                                                                </div>
                                                                <div className="flex items-start space-x-3">
                                                                        <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                                                                        <p className="text-gray-300">
                                                                                Time
                                                                                spent
                                                                                on
                                                                                form
                                                                                creation
                                                                                takes
                                                                                away
                                                                                from
                                                                                core
                                                                                business
                                                                                activities
                                                                        </p>
                                                                </div>
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                        </section>

                        {/* Values Section */}
                        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-black/20">
                                <div className="max-w-7xl mx-auto">
                                        <div className="text-center mb-16">
                                                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                                                        Our Values
                                                </h2>
                                                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                                                        These core principles
                                                        guide everything we do
                                                        and every decision we
                                                        make
                                                </p>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                                                {values.map((value, index) => (
                                                        <div
                                                                key={index}
                                                                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 hover:bg-white/10 transition-all duration-300 text-center"
                                                        >
                                                                <div className="mb-4 flex justify-center">
                                                                        {
                                                                                value.icon
                                                                        }
                                                                </div>
                                                                <h3 className="text-xl font-semibold text-white mb-3">
                                                                        {
                                                                                value.title
                                                                        }
                                                                </h3>
                                                                <p className="text-gray-300 leading-relaxed">
                                                                        {
                                                                                value.description
                                                                        }
                                                                </p>
                                                        </div>
                                                ))}
                                        </div>
                                </div>
                        </section>

                        {/* Founder Section */}
                        <section className="py-20 px-4 sm:px-6 lg:px-8">
                                <div className="max-w-7xl mx-auto">
                                        <div className="text-center mb-16">
                                                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                                                        Meet the Founder
                                                </h2>
                                                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                                                        The mind behind Formai's
                                                        vision and the driving
                                                        force behind our mission
                                                </p>
                                        </div>

                                        <div className="max-w-4xl mx-auto">
                                                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 text-center">
                                                        <div className="mb-6">
                                                                <Users className="w-12 h-12 text-white mx-auto mb-4" />
                                                                <h3 className="text-2xl font-bold text-white mb-2">
                                                                        Abdullah
                                                                        Ahmed
                                                                </h3>
                                                                <p className="text-gray-400 mb-4 font-medium">
                                                                        Founder
                                                                        & CEO
                                                                </p>
                                                                <p className="text-gray-300 leading-relaxed">
                                                                        A
                                                                        Computer
                                                                        Science
                                                                        senior
                                                                        at the
                                                                        University
                                                                        of
                                                                        Engineering
                                                                        and
                                                                        Technology
                                                                        (UET),
                                                                        Lahore,
                                                                        Abdullah
                                                                        is
                                                                        passionate
                                                                        about
                                                                        leveraging
                                                                        technology
                                                                        to solve
                                                                        real-world
                                                                        problems.
                                                                </p>
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                        </section>
                </div>
        );
};

export default About;

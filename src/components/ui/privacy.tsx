import { Shield, Eye, Lock, Users } from "lucide-react";
import { Link } from "react-router-dom";

const Privacy = () => {
        return (
                <div className="min-h-screen bg-black text-white">
                        <section className="relative py-20 px-4 sm:px-6 lg:px-8">
                                <div className="absolute inset-0 overflow-hidden">
                                        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
                                        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
                                </div>

                                <div className="relative z-10 max-w-4xl mx-auto">
                                        <div className="text-center mb-16">
                                                <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
                                                        <Shield className="w-4 h-4 text-blue-400" />
                                                        <span className="text-sm font-medium text-blue-400">
                                                                Privacy Policy
                                                        </span>
                                                </div>
                                                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-none">
                                                        Privacy Policy
                                                </h1>
                                                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                                                        Your privacy is
                                                        important to us. This
                                                        policy explains how we
                                                        collect, use, and
                                                        protect your
                                                        information.
                                                </p>
                                        </div>

                                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12">
                                                <div className="space-y-8">
                                                        <section>
                                                                <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                                                                        <Eye className="w-6 h-6 mr-3 text-blue-400" />
                                                                        Information
                                                                        We
                                                                        Collect
                                                                </h2>
                                                                <div className="text-gray-300 space-y-4">
                                                                        <p>
                                                                                We
                                                                                collect
                                                                                information
                                                                                you
                                                                                provide
                                                                                directly
                                                                                to
                                                                                us,
                                                                                such
                                                                                as
                                                                                when
                                                                                you:
                                                                        </p>
                                                                        <ul className="list-disc list-inside space-y-2 ml-4">
                                                                                <li>
                                                                                        Sign
                                                                                        up
                                                                                        for
                                                                                        our
                                                                                        service
                                                                                </li>
                                                                                <li>
                                                                                        Contact
                                                                                        us
                                                                                        for
                                                                                        support
                                                                                </li>
                                                                                <li>
                                                                                        Use
                                                                                        our
                                                                                        services
                                                                                </li>
                                                                                <li>
                                                                                        Subscribe
                                                                                        to
                                                                                        our
                                                                                        newsletter
                                                                                </li>
                                                                        </ul>
                                                                        <p>
                                                                                This
                                                                                may
                                                                                include
                                                                                your
                                                                                name,
                                                                                email
                                                                                address,
                                                                                and
                                                                                any
                                                                                other
                                                                                information
                                                                                you
                                                                                choose
                                                                                to
                                                                                provide.
                                                                        </p>
                                                                </div>
                                                        </section>

                                                        <section>
                                                                <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                                                                        <Lock className="w-6 h-6 mr-3 text-green-400" />
                                                                        How We
                                                                        Use Your
                                                                        Information
                                                                </h2>
                                                                <div className="text-gray-300 space-y-4">
                                                                        <p>
                                                                                We
                                                                                use
                                                                                the
                                                                                information
                                                                                we
                                                                                collect
                                                                                to:
                                                                        </p>
                                                                        <ul className="list-disc list-inside space-y-2 ml-4">
                                                                                <li>
                                                                                        Provide
                                                                                        and
                                                                                        improve
                                                                                        our
                                                                                        services
                                                                                </li>
                                                                                <li>
                                                                                        Communicate
                                                                                        with
                                                                                        you
                                                                                        about
                                                                                        updates
                                                                                        and
                                                                                        features
                                                                                </li>
                                                                                <li>
                                                                                        Send
                                                                                        you
                                                                                        marketing
                                                                                        communications
                                                                                        (with
                                                                                        your
                                                                                        consent)
                                                                                </li>
                                                                                <li>
                                                                                        Respond
                                                                                        to
                                                                                        your
                                                                                        questions
                                                                                        and
                                                                                        support
                                                                                        requests
                                                                                </li>
                                                                                <li>
                                                                                        Ensure
                                                                                        the
                                                                                        security
                                                                                        and
                                                                                        integrity
                                                                                        of
                                                                                        our
                                                                                        platform
                                                                                </li>
                                                                        </ul>
                                                                </div>
                                                        </section>

                                                        <section>
                                                                <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                                                                        <Users className="w-6 h-6 mr-3 text-purple-400" />
                                                                        Information
                                                                        Sharing
                                                                </h2>
                                                                <div className="text-gray-300 space-y-4">
                                                                        <p>
                                                                                We
                                                                                do
                                                                                not
                                                                                sell,
                                                                                trade,
                                                                                or
                                                                                otherwise
                                                                                transfer
                                                                                your
                                                                                personal
                                                                                information
                                                                                to
                                                                                third
                                                                                parties
                                                                                without
                                                                                your
                                                                                consent,
                                                                                except
                                                                                in
                                                                                the
                                                                                following
                                                                                circumstances:
                                                                        </p>
                                                                        <ul className="list-disc list-inside space-y-2 ml-4">
                                                                                <li>
                                                                                        With
                                                                                        your
                                                                                        explicit
                                                                                        consent
                                                                                </li>
                                                                                <li>
                                                                                        To
                                                                                        comply
                                                                                        with
                                                                                        legal
                                                                                        obligations
                                                                                </li>
                                                                                <li>
                                                                                        To
                                                                                        protect
                                                                                        our
                                                                                        rights
                                                                                        and
                                                                                        safety
                                                                                </li>
                                                                                <li>
                                                                                        With
                                                                                        trusted
                                                                                        service
                                                                                        providers
                                                                                        who
                                                                                        assist
                                                                                        in
                                                                                        our
                                                                                        operations
                                                                                </li>
                                                                        </ul>
                                                                </div>
                                                        </section>

                                                        <section>
                                                                <h2 className="text-2xl font-bold text-white mb-4">
                                                                        Data
                                                                        Security
                                                                </h2>
                                                                <div className="text-gray-300 space-y-4">
                                                                        <p>
                                                                                We
                                                                                implement
                                                                                appropriate
                                                                                technical
                                                                                and
                                                                                organizational
                                                                                measures
                                                                                to
                                                                                protect
                                                                                your
                                                                                personal
                                                                                information
                                                                                against
                                                                                unauthorized
                                                                                access,
                                                                                alteration,
                                                                                disclosure,
                                                                                or
                                                                                destruction.
                                                                        </p>
                                                                </div>
                                                        </section>

                                                        <section>
                                                                <h2 className="text-2xl font-bold text-white mb-4">
                                                                        Your
                                                                        Rights
                                                                </h2>
                                                                <div className="text-gray-300 space-y-4">
                                                                        <p>
                                                                                You
                                                                                have
                                                                                the
                                                                                right
                                                                                to
                                                                                access,
                                                                                correct,
                                                                                or
                                                                                delete
                                                                                your
                                                                                personal
                                                                                information
                                                                                at
                                                                                any
                                                                                time.
                                                                        </p>
                                                                </div>
                                                        </section>

                                                        <section>
                                                                <h2 className="text-2xl font-bold text-white mb-4">
                                                                        Contact
                                                                        Us
                                                                </h2>
                                                                <div className="text-gray-300 space-y-4">
                                                                        <p>
                                                                                If
                                                                                you
                                                                                have
                                                                                any
                                                                                questions
                                                                                about
                                                                                this
                                                                                Privacy
                                                                                Policy,
                                                                                please
                                                                                contact
                                                                                us
                                                                                at
                                                                                privacy@formai.com
                                                                        </p>
                                                                </div>
                                                        </section>

                                                        <section>
                                                                <h2 className="text-2xl font-bold text-white mb-4">
                                                                        Updates
                                                                        to This
                                                                        Policy
                                                                </h2>
                                                                <div className="text-gray-300">
                                                                        <p>
                                                                                We
                                                                                may
                                                                                update
                                                                                this
                                                                                Privacy
                                                                                Policy
                                                                                from
                                                                                time
                                                                                to
                                                                                time.
                                                                                We
                                                                                will
                                                                                notify
                                                                                you
                                                                                of
                                                                                any
                                                                                changes
                                                                                by
                                                                                posting
                                                                                the
                                                                                new
                                                                                Privacy
                                                                                Policy
                                                                                on
                                                                                this
                                                                                page.
                                                                        </p>
                                                                        <p className="mt-4 text-sm text-gray-400">
                                                                                Last
                                                                                Updated:
                                                                                December
                                                                                2024
                                                                        </p>
                                                                </div>
                                                        </section>
                                                </div>
                                        </div>

                                        <div className="text-center mt-12">
                                                <Link
                                                        to="/"
                                                        className="inline-flex items-center px-6 py-3 bg-white text-black hover:bg-gray-200 rounded-lg font-medium transition-colors"
                                                >
                                                        Back to Home
                                                </Link>
                                        </div>
                                </div>
                        </section>
                </div>
        );
};

export default Privacy;

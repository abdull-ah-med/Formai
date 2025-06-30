import { Cookie, Settings, Info, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const Cookies = () => {
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
                                                        <Cookie className="w-4 h-4 text-orange-400" />
                                                        <span className="text-sm font-medium text-orange-400">
                                                                Cookie Policy
                                                        </span>
                                                </div>
                                                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-none">
                                                        Cookie Policy
                                                </h1>
                                                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                                                        Learn how we use cookies
                                                        to enhance your
                                                        experience on our
                                                        platform.
                                                </p>
                                        </div>

                                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12">
                                                <div className="space-y-8">
                                                        <section>
                                                                <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                                                                        <Info className="w-6 h-6 mr-3 text-blue-400" />
                                                                        What Are
                                                                        Cookies?
                                                                </h2>
                                                                <div className="text-gray-300 space-y-4">
                                                                        <p>
                                                                                Cookies
                                                                                are
                                                                                small
                                                                                text
                                                                                files
                                                                                that
                                                                                are
                                                                                placed
                                                                                on
                                                                                your
                                                                                device
                                                                                when
                                                                                you
                                                                                visit
                                                                                our
                                                                                website.
                                                                                They
                                                                                help
                                                                                us
                                                                                provide
                                                                                you
                                                                                with
                                                                                a
                                                                                better
                                                                                experience
                                                                                by
                                                                                remembering
                                                                                your
                                                                                preferences
                                                                                and
                                                                                analyzing
                                                                                how
                                                                                you
                                                                                use
                                                                                our
                                                                                site.
                                                                        </p>
                                                                </div>
                                                        </section>

                                                        <section>
                                                                <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                                                                        <Settings className="w-6 h-6 mr-3 text-green-400" />
                                                                        How We
                                                                        Use
                                                                        Cookies
                                                                </h2>
                                                                <div className="text-gray-300 space-y-4">
                                                                        <p>
                                                                                We
                                                                                use
                                                                                cookies
                                                                                for
                                                                                the
                                                                                following
                                                                                purposes:
                                                                        </p>
                                                                        <ul className="list-disc list-inside space-y-2 ml-4">
                                                                                <li>
                                                                                        <strong>
                                                                                                Essential
                                                                                                Cookies:
                                                                                        </strong>{" "}
                                                                                        Required
                                                                                        for
                                                                                        the
                                                                                        website
                                                                                        to
                                                                                        function
                                                                                        properly
                                                                                </li>
                                                                                <li>
                                                                                        <strong>
                                                                                                Analytics
                                                                                                Cookies:
                                                                                        </strong>{" "}
                                                                                        Help
                                                                                        us
                                                                                        understand
                                                                                        how
                                                                                        visitors
                                                                                        interact
                                                                                        with
                                                                                        our
                                                                                        site
                                                                                </li>
                                                                                <li>
                                                                                        <strong>
                                                                                                Preference
                                                                                                Cookies:
                                                                                        </strong>{" "}
                                                                                        Remember
                                                                                        your
                                                                                        settings
                                                                                        and
                                                                                        preferences
                                                                                </li>
                                                                                <li>
                                                                                        <strong>
                                                                                                Marketing
                                                                                                Cookies:
                                                                                        </strong>{" "}
                                                                                        Used
                                                                                        to
                                                                                        deliver
                                                                                        relevant
                                                                                        advertisements
                                                                                </li>
                                                                        </ul>
                                                                </div>
                                                        </section>

                                                        <section>
                                                                <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                                                                        <Shield className="w-6 h-6 mr-3 text-purple-400" />
                                                                        Types of
                                                                        Cookies
                                                                        We Use
                                                                </h2>
                                                                <div className="text-gray-300 space-y-4">
                                                                        <div className="space-y-4">
                                                                                <div>
                                                                                        <h3 className="text-lg font-semibold text-white mb-2">
                                                                                                Session
                                                                                                Cookies
                                                                                        </h3>
                                                                                        <p>
                                                                                                These
                                                                                                cookies
                                                                                                are
                                                                                                temporary
                                                                                                and
                                                                                                are
                                                                                                deleted
                                                                                                when
                                                                                                you
                                                                                                close
                                                                                                your
                                                                                                browser.
                                                                                                They
                                                                                                help
                                                                                                maintain
                                                                                                your
                                                                                                session
                                                                                                while
                                                                                                you
                                                                                                navigate
                                                                                                our
                                                                                                website.
                                                                                        </p>
                                                                                </div>
                                                                                <div>
                                                                                        <h3 className="text-lg font-semibold text-white mb-2">
                                                                                                Persistent
                                                                                                Cookies
                                                                                        </h3>
                                                                                        <p>
                                                                                                These
                                                                                                cookies
                                                                                                remain
                                                                                                on
                                                                                                your
                                                                                                device
                                                                                                for
                                                                                                a
                                                                                                set
                                                                                                period
                                                                                                and
                                                                                                help
                                                                                                us
                                                                                                remember
                                                                                                your
                                                                                                preferences
                                                                                                for
                                                                                                future
                                                                                                visits.
                                                                                        </p>
                                                                                </div>
                                                                                <div>
                                                                                        <h3 className="text-lg font-semibold text-white mb-2">
                                                                                                Third-Party
                                                                                                Cookies
                                                                                        </h3>
                                                                                        <p>
                                                                                                These
                                                                                                cookies
                                                                                                are
                                                                                                set
                                                                                                by
                                                                                                third-party
                                                                                                services
                                                                                                we
                                                                                                use,
                                                                                                such
                                                                                                as
                                                                                                analytics
                                                                                                providers
                                                                                                and
                                                                                                advertising
                                                                                                networks.
                                                                                        </p>
                                                                                </div>
                                                                        </div>
                                                                </div>
                                                        </section>

                                                        <section>
                                                                <h2 className="text-2xl font-bold text-white mb-4">
                                                                        Managing
                                                                        Your
                                                                        Cookie
                                                                        Preferences
                                                                </h2>
                                                                <div className="text-gray-300 space-y-4">
                                                                        <p>
                                                                                You
                                                                                can
                                                                                control
                                                                                and
                                                                                manage
                                                                                cookies
                                                                                in
                                                                                several
                                                                                ways:
                                                                        </p>
                                                                        <ul className="list-disc list-inside space-y-2 ml-4">
                                                                                <li>
                                                                                        Browser
                                                                                        settings:
                                                                                        Most
                                                                                        browsers
                                                                                        allow
                                                                                        you
                                                                                        to
                                                                                        block
                                                                                        or
                                                                                        delete
                                                                                        cookies
                                                                                </li>
                                                                                <li>
                                                                                        Cookie
                                                                                        consent:
                                                                                        We
                                                                                        provide
                                                                                        options
                                                                                        to
                                                                                        accept
                                                                                        or
                                                                                        decline
                                                                                        non-essential
                                                                                        cookies
                                                                                </li>
                                                                                <li>
                                                                                        Third-party
                                                                                        opt-outs:
                                                                                        You
                                                                                        can
                                                                                        opt
                                                                                        out
                                                                                        of
                                                                                        third-party
                                                                                        cookies
                                                                                        through
                                                                                        their
                                                                                        respective
                                                                                        websites
                                                                                </li>
                                                                        </ul>
                                                                </div>
                                                        </section>

                                                        <section>
                                                                <h2 className="text-2xl font-bold text-white mb-4">
                                                                        Cookie
                                                                        Consent
                                                                </h2>
                                                                <div className="text-gray-300 space-y-4">
                                                                        <p>
                                                                                When
                                                                                you
                                                                                first
                                                                                visit
                                                                                our
                                                                                website,
                                                                                you'll
                                                                                see
                                                                                a
                                                                                cookie
                                                                                consent
                                                                                banner
                                                                                that
                                                                                allows
                                                                                you
                                                                                to
                                                                                choose
                                                                                which
                                                                                types
                                                                                of
                                                                                cookies
                                                                                you
                                                                                want
                                                                                to
                                                                                accept.
                                                                                You
                                                                                can
                                                                                change
                                                                                your
                                                                                preferences
                                                                                at
                                                                                any
                                                                                time
                                                                                through
                                                                                our
                                                                                cookie
                                                                                settings.
                                                                        </p>
                                                                </div>
                                                        </section>

                                                        <section>
                                                                <h2 className="text-2xl font-bold text-white mb-4">
                                                                        Updates
                                                                        to This
                                                                        Policy
                                                                </h2>
                                                                <div className="text-gray-300 space-y-4">
                                                                        <p>
                                                                                We
                                                                                may
                                                                                update
                                                                                this
                                                                                Cookie
                                                                                Policy
                                                                                from
                                                                                time
                                                                                to
                                                                                time
                                                                                to
                                                                                reflect
                                                                                changes
                                                                                in
                                                                                our
                                                                                practices
                                                                                or
                                                                                for
                                                                                other
                                                                                operational,
                                                                                legal,
                                                                                or
                                                                                regulatory
                                                                                reasons.
                                                                                We
                                                                                will
                                                                                notify
                                                                                you
                                                                                of
                                                                                any
                                                                                material
                                                                                changes
                                                                                by
                                                                                posting
                                                                                the
                                                                                new
                                                                                policy
                                                                                on
                                                                                this
                                                                                page.
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
                                                                                our
                                                                                use
                                                                                of
                                                                                cookies,
                                                                                please
                                                                                contact
                                                                                us
                                                                                at
                                                                                reachformaihere@gmail.com
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

export default Cookies;

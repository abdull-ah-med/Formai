import { FileText, CheckCircle, AlertTriangle, Scale } from "lucide-react";
import { Link } from "react-router-dom";

const Terms = () => {
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
                                                        <FileText className="w-4 h-4 text-green-400" />
                                                        <span className="text-sm font-medium text-green-400">
                                                                Terms of Service
                                                        </span>
                                                </div>
                                                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-none">
                                                        Terms of Service
                                                </h1>
                                                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                                                        Please read these terms
                                                        carefully before using
                                                        our services.
                                                </p>
                                        </div>

                                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12">
                                                <div className="space-y-8">
                                                        <section>
                                                                <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                                                                        <CheckCircle className="w-6 h-6 mr-3 text-green-400" />
                                                                        Acceptance
                                                                        of Terms
                                                                </h2>
                                                                <div className="text-gray-300 space-y-4">
                                                                        <p>
                                                                                By
                                                                                accessing
                                                                                and
                                                                                using
                                                                                Formai's
                                                                                services,
                                                                                you
                                                                                accept
                                                                                and
                                                                                agree
                                                                                to
                                                                                be
                                                                                bound
                                                                                by
                                                                                the
                                                                                terms
                                                                                and
                                                                                provision
                                                                                of
                                                                                this
                                                                                agreement.
                                                                        </p>
                                                                </div>
                                                        </section>

                                                        <section>
                                                                <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                                                                        <Scale className="w-6 h-6 mr-3 text-blue-400" />
                                                                        Use
                                                                        License
                                                                </h2>
                                                                <div className="text-gray-300 space-y-4">
                                                                        <p>
                                                                                Permission
                                                                                is
                                                                                granted
                                                                                to
                                                                                temporarily
                                                                                use
                                                                                Formai's
                                                                                services
                                                                                for
                                                                                personal,
                                                                                non-commercial
                                                                                transitory
                                                                                viewing
                                                                                only.
                                                                                This
                                                                                is
                                                                                the
                                                                                grant
                                                                                of
                                                                                a
                                                                                license,
                                                                                not
                                                                                a
                                                                                transfer
                                                                                of
                                                                                title,
                                                                                and
                                                                                under
                                                                                this
                                                                                license
                                                                                you
                                                                                may
                                                                                not:
                                                                        </p>
                                                                        <ul className="list-disc list-inside space-y-2 ml-4">
                                                                                <li>
                                                                                        Modify
                                                                                        or
                                                                                        copy
                                                                                        the
                                                                                        materials
                                                                                </li>
                                                                                <li>
                                                                                        Use
                                                                                        the
                                                                                        materials
                                                                                        for
                                                                                        any
                                                                                        commercial
                                                                                        purpose
                                                                                </li>
                                                                                <li>
                                                                                        Attempt
                                                                                        to
                                                                                        reverse
                                                                                        engineer
                                                                                        any
                                                                                        software
                                                                                </li>
                                                                                <li>
                                                                                        Remove
                                                                                        any
                                                                                        copyright
                                                                                        or
                                                                                        other
                                                                                        proprietary
                                                                                        notations
                                                                                </li>
                                                                        </ul>
                                                                </div>
                                                        </section>

                                                        <section>
                                                                <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                                                                        <AlertTriangle className="w-6 h-6 mr-3 text-yellow-400" />
                                                                        Disclaimer
                                                                </h2>
                                                                <div className="text-gray-300 space-y-4">
                                                                        <p>
                                                                                The
                                                                                materials
                                                                                on
                                                                                Formai's
                                                                                services
                                                                                are
                                                                                provided
                                                                                on
                                                                                an
                                                                                'as
                                                                                is'
                                                                                basis.
                                                                                Formai
                                                                                makes
                                                                                no
                                                                                warranties,
                                                                                expressed
                                                                                or
                                                                                implied,
                                                                                and
                                                                                hereby
                                                                                disclaims
                                                                                and
                                                                                negates
                                                                                all
                                                                                other
                                                                                warranties
                                                                                including
                                                                                without
                                                                                limitation,
                                                                                implied
                                                                                warranties
                                                                                or
                                                                                conditions
                                                                                of
                                                                                merchantability,
                                                                                fitness
                                                                                for
                                                                                a
                                                                                particular
                                                                                purpose,
                                                                                or
                                                                                non-infringement
                                                                                of
                                                                                intellectual
                                                                                property
                                                                                or
                                                                                other
                                                                                violation
                                                                                of
                                                                                rights.
                                                                        </p>
                                                                </div>
                                                        </section>

                                                        <section>
                                                                <h2 className="text-2xl font-bold text-white mb-4">
                                                                        Limitations
                                                                </h2>
                                                                <div className="text-gray-300 space-y-4">
                                                                        <p>
                                                                                In
                                                                                no
                                                                                event
                                                                                shall
                                                                                Formai
                                                                                or
                                                                                its
                                                                                suppliers
                                                                                be
                                                                                liable
                                                                                for
                                                                                any
                                                                                damages
                                                                                (including,
                                                                                without
                                                                                limitation,
                                                                                damages
                                                                                for
                                                                                loss
                                                                                of
                                                                                data
                                                                                or
                                                                                profit,
                                                                                or
                                                                                due
                                                                                to
                                                                                business
                                                                                interruption)
                                                                                arising
                                                                                out
                                                                                of
                                                                                the
                                                                                use
                                                                                or
                                                                                inability
                                                                                to
                                                                                use
                                                                                the
                                                                                materials
                                                                                on
                                                                                Formai's
                                                                                services.
                                                                        </p>
                                                                </div>
                                                        </section>

                                                        <section>
                                                                <h2 className="text-2xl font-bold text-white mb-4">
                                                                        Accuracy
                                                                        of
                                                                        Materials
                                                                </h2>
                                                                <div className="text-gray-300 space-y-4">
                                                                        <p>
                                                                                The
                                                                                materials
                                                                                appearing
                                                                                on
                                                                                Formai's
                                                                                services
                                                                                could
                                                                                include
                                                                                technical,
                                                                                typographical,
                                                                                or
                                                                                photographic
                                                                                errors.
                                                                                Formai
                                                                                does
                                                                                not
                                                                                warrant
                                                                                that
                                                                                any
                                                                                of
                                                                                the
                                                                                materials
                                                                                on
                                                                                its
                                                                                services
                                                                                are
                                                                                accurate,
                                                                                complete
                                                                                or
                                                                                current.
                                                                        </p>
                                                                </div>
                                                        </section>

                                                        <section>
                                                                <h2 className="text-2xl font-bold text-white mb-4">
                                                                        Links
                                                                </h2>
                                                                <div className="text-gray-300 space-y-4">
                                                                        <p>
                                                                                Formai
                                                                                has
                                                                                not
                                                                                reviewed
                                                                                all
                                                                                of
                                                                                the
                                                                                sites
                                                                                linked
                                                                                to
                                                                                its
                                                                                services
                                                                                and
                                                                                is
                                                                                not
                                                                                responsible
                                                                                for
                                                                                the
                                                                                contents
                                                                                of
                                                                                any
                                                                                such
                                                                                linked
                                                                                site.
                                                                                The
                                                                                inclusion
                                                                                of
                                                                                any
                                                                                link
                                                                                does
                                                                                not
                                                                                imply
                                                                                endorsement
                                                                                by
                                                                                Formai
                                                                                of
                                                                                the
                                                                                site.
                                                                        </p>
                                                                </div>
                                                        </section>

                                                        <section>
                                                                <h2 className="text-2xl font-bold text-white mb-4">
                                                                        Modifications
                                                                </h2>
                                                                <div className="text-gray-300 space-y-4">
                                                                        <p>
                                                                                Formai
                                                                                may
                                                                                revise
                                                                                these
                                                                                terms
                                                                                of
                                                                                service
                                                                                for
                                                                                its
                                                                                services
                                                                                at
                                                                                any
                                                                                time
                                                                                without
                                                                                notice.
                                                                                By
                                                                                using
                                                                                this
                                                                                service
                                                                                you
                                                                                are
                                                                                agreeing
                                                                                to
                                                                                be
                                                                                bound
                                                                                by
                                                                                the
                                                                                then
                                                                                current
                                                                                version
                                                                                of
                                                                                these
                                                                                Terms
                                                                                of
                                                                                Service.
                                                                        </p>
                                                                </div>
                                                        </section>

                                                        <section>
                                                                <h2 className="text-2xl font-bold text-white mb-4">
                                                                        Governing
                                                                        Law
                                                                </h2>
                                                                <div className="text-gray-300 space-y-4">
                                                                        <p>
                                                                                These
                                                                                terms
                                                                                and
                                                                                conditions
                                                                                are
                                                                                governed
                                                                                by
                                                                                and
                                                                                construed
                                                                                in
                                                                                accordance
                                                                                with
                                                                                the
                                                                                laws
                                                                                and
                                                                                you
                                                                                irrevocably
                                                                                submit
                                                                                to
                                                                                the
                                                                                exclusive
                                                                                jurisdiction
                                                                                of
                                                                                the
                                                                                courts
                                                                                in
                                                                                that
                                                                                location.
                                                                        </p>
                                                                </div>
                                                        </section>

                                                        <section>
                                                                <h2 className="text-2xl font-bold text-white mb-4">
                                                                        Contact
                                                                        Information
                                                                </h2>
                                                                <div className="text-gray-300 space-y-4">
                                                                        <p>
                                                                                If
                                                                                you
                                                                                have
                                                                                any
                                                                                questions
                                                                                about
                                                                                these
                                                                                Terms
                                                                                of
                                                                                Service,
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

export default Terms;

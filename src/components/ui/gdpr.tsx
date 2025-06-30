import { Shield, User, Database, Eye, Lock, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const GDPR = () => {
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
                                                        <Shield className="w-4 h-4 text-green-400" />
                                                        <span className="text-sm font-medium text-green-400">
                                                                GDPR Compliance
                                                        </span>
                                                </div>
                                                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-none">
                                                        GDPR Compliance
                                                </h1>
                                                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                                                        Your data protection
                                                        rights under the General
                                                        Data Protection
                                                        Regulation (GDPR).
                                                </p>
                                        </div>

                                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12">
                                                <div className="space-y-8">
                                                        <section>
                                                                <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                                                                        <User className="w-6 h-6 mr-3 text-blue-400" />
                                                                        Your
                                                                        Rights
                                                                        Under
                                                                        GDPR
                                                                </h2>
                                                                <div className="text-gray-300 space-y-4">
                                                                        <p>
                                                                                As
                                                                                a
                                                                                data
                                                                                subject
                                                                                under
                                                                                GDPR,
                                                                                you
                                                                                have
                                                                                the
                                                                                following
                                                                                rights:
                                                                        </p>
                                                                        <ul className="list-disc list-inside space-y-2 ml-4">
                                                                                <li>
                                                                                        <strong>
                                                                                                Right
                                                                                                to
                                                                                                Access:
                                                                                        </strong>{" "}
                                                                                        Request
                                                                                        a
                                                                                        copy
                                                                                        of
                                                                                        your
                                                                                        personal
                                                                                        data
                                                                                </li>
                                                                                <li>
                                                                                        <strong>
                                                                                                Right
                                                                                                to
                                                                                                Rectification:
                                                                                        </strong>{" "}
                                                                                        Correct
                                                                                        inaccurate
                                                                                        personal
                                                                                        data
                                                                                </li>
                                                                                <li>
                                                                                        <strong>
                                                                                                Right
                                                                                                to
                                                                                                Erasure:
                                                                                        </strong>{" "}
                                                                                        Request
                                                                                        deletion
                                                                                        of
                                                                                        your
                                                                                        personal
                                                                                        data
                                                                                </li>
                                                                                <li>
                                                                                        <strong>
                                                                                                Right
                                                                                                to
                                                                                                Restrict
                                                                                                Processing:
                                                                                        </strong>{" "}
                                                                                        Limit
                                                                                        how
                                                                                        we
                                                                                        use
                                                                                        your
                                                                                        data
                                                                                </li>
                                                                                <li>
                                                                                        <strong>
                                                                                                Right
                                                                                                to
                                                                                                Data
                                                                                                Portability:
                                                                                        </strong>{" "}
                                                                                        Receive
                                                                                        your
                                                                                        data
                                                                                        in
                                                                                        a
                                                                                        structured
                                                                                        format
                                                                                </li>
                                                                                <li>
                                                                                        <strong>
                                                                                                Right
                                                                                                to
                                                                                                Object:
                                                                                        </strong>{" "}
                                                                                        Object
                                                                                        to
                                                                                        processing
                                                                                        of
                                                                                        your
                                                                                        data
                                                                                </li>
                                                                        </ul>
                                                                </div>
                                                        </section>

                                                        <section>
                                                                <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                                                                        <Database className="w-6 h-6 mr-3 text-purple-400" />
                                                                        Data
                                                                        Processing
                                                                </h2>
                                                                <div className="text-gray-300 space-y-4">
                                                                        <p>
                                                                                We
                                                                                process
                                                                                your
                                                                                personal
                                                                                data
                                                                                based
                                                                                on
                                                                                the
                                                                                following
                                                                                legal
                                                                                grounds:
                                                                        </p>
                                                                        <ul className="list-disc list-inside space-y-2 ml-4">
                                                                                <li>
                                                                                        <strong>
                                                                                                Consent:
                                                                                        </strong>{" "}
                                                                                        When
                                                                                        you
                                                                                        explicitly
                                                                                        agree
                                                                                        to
                                                                                        data
                                                                                        processing
                                                                                </li>
                                                                                <li>
                                                                                        <strong>
                                                                                                Contract
                                                                                                Performance:
                                                                                        </strong>{" "}
                                                                                        To
                                                                                        provide
                                                                                        our
                                                                                        services
                                                                                        to
                                                                                        you
                                                                                </li>
                                                                                <li>
                                                                                        <strong>
                                                                                                Legitimate
                                                                                                Interest:
                                                                                        </strong>{" "}
                                                                                        For
                                                                                        business
                                                                                        operations
                                                                                        and
                                                                                        improvements
                                                                                </li>
                                                                                <li>
                                                                                        <strong>
                                                                                                Legal
                                                                                                Obligation:
                                                                                        </strong>{" "}
                                                                                        To
                                                                                        comply
                                                                                        with
                                                                                        applicable
                                                                                        laws
                                                                                </li>
                                                                        </ul>
                                                                </div>
                                                        </section>

                                                        <section>
                                                                <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                                                                        <Eye className="w-6 h-6 mr-3 text-green-400" />
                                                                        Transparency
                                                                </h2>
                                                                <div className="text-gray-300 space-y-4">
                                                                        <p>
                                                                                We
                                                                                are
                                                                                committed
                                                                                to
                                                                                transparency
                                                                                in
                                                                                our
                                                                                data
                                                                                processing
                                                                                activities:
                                                                        </p>
                                                                        <ul className="list-disc list-inside space-y-2 ml-4">
                                                                                <li>
                                                                                        Clear
                                                                                        information
                                                                                        about
                                                                                        what
                                                                                        data
                                                                                        we
                                                                                        collect
                                                                                </li>
                                                                                <li>
                                                                                        Explanation
                                                                                        of
                                                                                        how
                                                                                        we
                                                                                        use
                                                                                        your
                                                                                        data
                                                                                </li>
                                                                                <li>
                                                                                        Information
                                                                                        about
                                                                                        data
                                                                                        retention
                                                                                        periods
                                                                                </li>
                                                                                <li>
                                                                                        Details
                                                                                        about
                                                                                        third-party
                                                                                        data
                                                                                        sharing
                                                                                </li>
                                                                        </ul>
                                                                </div>
                                                        </section>

                                                        <section>
                                                                <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                                                                        <Lock className="w-6 h-6 mr-3 text-yellow-400" />
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
                                                                                ensure
                                                                                data
                                                                                security:
                                                                        </p>
                                                                        <ul className="list-disc list-inside space-y-2 ml-4">
                                                                                <li>
                                                                                        Encryption
                                                                                        of
                                                                                        personal
                                                                                        data
                                                                                        in
                                                                                        transit
                                                                                        and
                                                                                        at
                                                                                        rest
                                                                                </li>
                                                                                <li>
                                                                                        Regular
                                                                                        security
                                                                                        assessments
                                                                                        and
                                                                                        updates
                                                                                </li>
                                                                                <li>
                                                                                        Access
                                                                                        controls
                                                                                        and
                                                                                        authentication
                                                                                </li>
                                                                                <li>
                                                                                        Employee
                                                                                        training
                                                                                        on
                                                                                        data
                                                                                        protection
                                                                                </li>
                                                                                <li>
                                                                                        Incident
                                                                                        response
                                                                                        procedures
                                                                                </li>
                                                                        </ul>
                                                                </div>
                                                        </section>

                                                        <section>
                                                                <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                                                                        <CheckCircle className="w-6 h-6 mr-3 text-green-400" />
                                                                        Data
                                                                        Protection
                                                                        Officer
                                                                </h2>
                                                                <div className="text-gray-300 space-y-4">
                                                                        <p>
                                                                                We
                                                                                have
                                                                                appointed
                                                                                a
                                                                                Data
                                                                                Protection
                                                                                Officer
                                                                                (DPO)
                                                                                to
                                                                                oversee
                                                                                our
                                                                                GDPR
                                                                                compliance.
                                                                                You
                                                                                can
                                                                                contact
                                                                                our
                                                                                DPO
                                                                                at:
                                                                        </p>
                                                                        <div className="bg-white/5 rounded-lg p-4">
                                                                                <p className="font-medium">
                                                                                        Email:
                                                                                        dpo@formai.com
                                                                                </p>
                                                                                <p className="text-sm text-gray-400 mt-1">
                                                                                        For
                                                                                        all
                                                                                        GDPR-related
                                                                                        inquiries
                                                                                        and
                                                                                        requests
                                                                                </p>
                                                                        </div>
                                                                </div>
                                                        </section>

                                                        <section>
                                                                <h2 className="text-2xl font-bold text-white mb-4">
                                                                        Exercising
                                                                        Your
                                                                        Rights
                                                                </h2>
                                                                <div className="text-gray-300 space-y-4">
                                                                        <p>
                                                                                To
                                                                                exercise
                                                                                your
                                                                                GDPR
                                                                                rights,
                                                                                please
                                                                                contact
                                                                                us
                                                                                using
                                                                                one
                                                                                of
                                                                                the
                                                                                following
                                                                                methods:
                                                                        </p>
                                                                        <ul className="list-disc list-inside space-y-2 ml-4">
                                                                                <li>
                                                                                        Email:
                                                                                        privacy@formai.com
                                                                                </li>
                                                                                <li>
                                                                                        Postal
                                                                                        address:
                                                                                        [Your
                                                                                        Company
                                                                                        Address]
                                                                                </li>
                                                                                <li>
                                                                                        Online
                                                                                        form:
                                                                                        Available
                                                                                        in
                                                                                        your
                                                                                        account
                                                                                        settings
                                                                                </li>
                                                                        </ul>
                                                                        <p>
                                                                                We
                                                                                will
                                                                                respond
                                                                                to
                                                                                your
                                                                                request
                                                                                within
                                                                                30
                                                                                days
                                                                                of
                                                                                receipt.
                                                                        </p>
                                                                </div>
                                                        </section>

                                                        <section>
                                                                <h2 className="text-2xl font-bold text-white mb-4">
                                                                        Data
                                                                        Breach
                                                                        Notification
                                                                </h2>
                                                                <div className="text-gray-300 space-y-4">
                                                                        <p>
                                                                                In
                                                                                the
                                                                                event
                                                                                of
                                                                                a
                                                                                data
                                                                                breach
                                                                                that
                                                                                affects
                                                                                your
                                                                                personal
                                                                                data,
                                                                                we
                                                                                will:
                                                                        </p>
                                                                        <ul className="list-disc list-inside space-y-2 ml-4">
                                                                                <li>
                                                                                        Notify
                                                                                        the
                                                                                        relevant
                                                                                        supervisory
                                                                                        authority
                                                                                        within
                                                                                        72
                                                                                        hours
                                                                                </li>
                                                                                <li>
                                                                                        Inform
                                                                                        affected
                                                                                        individuals
                                                                                        without
                                                                                        undue
                                                                                        delay
                                                                                </li>
                                                                                <li>
                                                                                        Provide
                                                                                        information
                                                                                        about
                                                                                        the
                                                                                        breach
                                                                                        and
                                                                                        mitigation
                                                                                        measures
                                                                                </li>
                                                                        </ul>
                                                                </div>
                                                        </section>

                                                        <section>
                                                                <h2 className="text-2xl font-bold text-white mb-4">
                                                                        International
                                                                        Transfers
                                                                </h2>
                                                                <div className="text-gray-300 space-y-4">
                                                                        <p>
                                                                                If
                                                                                we
                                                                                transfer
                                                                                your
                                                                                personal
                                                                                data
                                                                                outside
                                                                                the
                                                                                European
                                                                                Economic
                                                                                Area
                                                                                (EEA),
                                                                                we
                                                                                ensure
                                                                                appropriate
                                                                                safeguards
                                                                                are
                                                                                in
                                                                                place,
                                                                                such
                                                                                as:
                                                                        </p>
                                                                        <ul className="list-disc list-inside space-y-2 ml-4">
                                                                                <li>
                                                                                        Adequacy
                                                                                        decisions
                                                                                        by
                                                                                        the
                                                                                        European
                                                                                        Commission
                                                                                </li>
                                                                                <li>
                                                                                        Standard
                                                                                        contractual
                                                                                        clauses
                                                                                </li>
                                                                                <li>
                                                                                        Binding
                                                                                        corporate
                                                                                        rules
                                                                                </li>
                                                                        </ul>
                                                                </div>
                                                        </section>

                                                        <section>
                                                                <h2 className="text-2xl font-bold text-white mb-4">
                                                                        Contact
                                                                        Information
                                                                </h2>
                                                                <div className="text-gray-300 space-y-4">
                                                                        <p>
                                                                                For
                                                                                any
                                                                                questions
                                                                                about
                                                                                our
                                                                                GDPR
                                                                                compliance
                                                                                or
                                                                                to
                                                                                exercise
                                                                                your
                                                                                rights,
                                                                                please
                                                                                contact
                                                                                us:
                                                                        </p>
                                                                        <div className="bg-white/5 rounded-lg p-4">
                                                                                <p className="font-medium">
                                                                                        Email:
                                                                                        privacy@formai.com
                                                                                </p>
                                                                                <p className="font-medium">
                                                                                        DPO
                                                                                        Email:
                                                                                        dpo@formai.com
                                                                                </p>
                                                                                <p className="text-sm text-gray-400 mt-1">
                                                                                        We're
                                                                                        committed
                                                                                        to
                                                                                        protecting
                                                                                        your
                                                                                        privacy
                                                                                        and
                                                                                        ensuring
                                                                                        GDPR
                                                                                        compliance.
                                                                                </p>
                                                                        </div>
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

export default GDPR;

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
                                                        Last Updated: July 12, 2025
                                                </p>
                                        </div>

                                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12">
                                                <div className="space-y-8">
                                                        <section>
                                                                <h2 className="text-2xl font-bold text-white mb-4">
                                                                        1. Introduction
                                                                </h2>
                                                                <div className="text-gray-300 space-y-4">
                                                                        <p>
                                                                                Formai ("we", "our", or "us") respects
                                                                                your privacy and is committed to
                                                                                protecting your personal data. This
                                                                                privacy policy explains how we collect,
                                                                                use, and protect your information when
                                                                                you use our application and related
                                                                                services, including Google sign-in and
                                                                                Google Forms integration.
                                                                        </p>
                                                                </div>
                                                        </section>

                                                        <section>
                                                                <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                                                                        <Eye className="w-6 h-6 mr-3 text-blue-400" />
                                                                        2. Information We Collect
                                                                </h2>
                                                                <div className="text-gray-300 space-y-4">
                                                                        <p>
                                                                                We collect limited information necessary
                                                                                to provide our services:
                                                                        </p>
                                                                        <h3 className="text-lg font-semibold text-white mt-4">
                                                                                a. Google Account Information
                                                                        </h3>
                                                                        <ul className="list-disc list-inside space-y-2 ml-4">
                                                                                <li>Google ID</li>
                                                                                <li>Name</li>
                                                                                <li>Email address</li>
                                                                                <li>Profile picture (if available)</li>
                                                                        </ul>
                                                                        <p>Used only for login and personalization.</p>

                                                                        <h3 className="text-lg font-semibold text-white mt-4">
                                                                                b. Form Metadata
                                                                        </h3>
                                                                        <ul className="list-disc list-inside space-y-2 ml-4">
                                                                                <li>Your prompts</li>
                                                                                <li>Generated form JSON</li>
                                                                                <li>
                                                                                        Form title and creation
                                                                                        timestamp
                                                                                </li>
                                                                                <li>Google Form URL</li>
                                                                                <li>User ID</li>
                                                                        </ul>
                                                                        <p>
                                                                                We do <strong>not</strong> access or
                                                                                modify your existing Google Drive files
                                                                                or forms.
                                                                        </p>

                                                                        <h3 className="text-lg font-semibold text-white mt-4">
                                                                                c. Cookies
                                                                        </h3>
                                                                        <p>
                                                                                We use secure cookies (e.g., HttpOnly)
                                                                                for:
                                                                        </p>
                                                                        <ul className="list-disc list-inside space-y-2 ml-4">
                                                                                <li>Authentication</li>
                                                                                <li>Session management</li>
                                                                        </ul>
                                                                        <p>
                                                                                We do <strong>not</strong> use cookies
                                                                                for advertising or tracking.
                                                                        </p>
                                                                </div>
                                                        </section>

                                                        <section>
                                                                <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                                                                        <Lock className="w-6 h-6 mr-3 text-green-400" />
                                                                        3. Use of Information
                                                                </h2>
                                                                <div className="text-gray-300 space-y-4">
                                                                        <p>
                                                                                We use the information we collect solely
                                                                                to:
                                                                        </p>
                                                                        <ul className="list-disc list-inside space-y-2 ml-4">
                                                                                <li>Authenticate you via Google</li>
                                                                                <li>Generate AI forms via Claude</li>
                                                                                <li>Create Google Forms</li>
                                                                                <li>
                                                                                        Store session and form history
                                                                                        securely
                                                                                </li>
                                                                        </ul>
                                                                        <p>
                                                                                We do <strong>not</strong> sell or share
                                                                                your data with third parties.
                                                                        </p>
                                                                </div>
                                                        </section>

                                                        <section>
                                                                <h2 className="text-2xl font-bold text-white mb-4">
                                                                        4. Google APIs
                                                                </h2>
                                                                <div className="text-gray-300 space-y-4">
                                                                        <p>
                                                                                Our application uses Google OAuth for
                                                                                authentication and the Google Forms API
                                                                                to create forms. We follow Google OAuth
                                                                                and API policies.
                                                                        </p>
                                                                        <p>Important limitations of our access:</p>
                                                                        <ul className="list-disc list-inside space-y-2 ml-4">
                                                                                <li>
                                                                                        We <strong>never</strong> access
                                                                                        or modify your existing Google
                                                                                        Forms or Drive files
                                                                                </li>
                                                                                <li>
                                                                                        We only create new forms based
                                                                                        on your explicit requests
                                                                                </li>
                                                                                <li>
                                                                                        We do not read responses
                                                                                        submitted to your forms
                                                                                </li>
                                                                        </ul>
                                                                        <p>
                                                                                You can revoke our access to your Google
                                                                                account at any time by visiting:{" "}
                                                                                <a
                                                                                        href="https://myaccount.google.com/permissions"
                                                                                        className="text-blue-400 hover:underline"
                                                                                        target="_blank"
                                                                                        rel="noopener noreferrer"
                                                                                >
                                                                                        https://myaccount.google.com/permissions
                                                                                </a>
                                                                        </p>
                                                                </div>
                                                        </section>

                                                        <section>
                                                                <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                                                                        <Users className="w-6 h-6 mr-3 text-purple-400" />
                                                                        5. Data Storage and Security
                                                                </h2>
                                                                <div className="text-gray-300 space-y-4">
                                                                        <p>
                                                                                Data is securely stored and encrypted.
                                                                                Only minimal necessary data is retained.
                                                                        </p>
                                                                        <ul className="list-disc list-inside space-y-2 ml-4">
                                                                                <li>
                                                                                        All data is encrypted at rest
                                                                                        and in transit
                                                                                </li>
                                                                                <li>
                                                                                        Access to our database is
                                                                                        strictly controlled
                                                                                </li>
                                                                                <li>
                                                                                        We implement industry-standard
                                                                                        security measures
                                                                                </li>
                                                                        </ul>
                                                                </div>
                                                        </section>

                                                        <section>
                                                                <h2 className="text-2xl font-bold text-white mb-4">
                                                                        6. Your Rights
                                                                </h2>
                                                                <div className="text-gray-300 space-y-4">
                                                                        <p>You have the right to:</p>
                                                                        <ul className="list-disc list-inside space-y-2 ml-4">
                                                                                <li>Revoke OAuth access</li>
                                                                                <li>Request data deletion via email</li>
                                                                        </ul>
                                                                </div>
                                                        </section>

                                                        <section>
                                                                <h2 className="text-2xl font-bold text-white mb-4">
                                                                        7. Children's Privacy
                                                                </h2>
                                                                <div className="text-gray-300 space-y-4">
                                                                        <p>
                                                                                Formai is not intended for users under
                                                                                13 years of age. We do not knowingly
                                                                                collect personal information from
                                                                                children under 13. If we learn we have
                                                                                collected personal information from a
                                                                                child under 13, we will delete that
                                                                                information promptly.
                                                                        </p>
                                                                </div>
                                                        </section>

                                                        <section>
                                                                <h2 className="text-2xl font-bold text-white mb-4">
                                                                        8. Policy Updates
                                                                </h2>
                                                                <div className="text-gray-300 space-y-4">
                                                                        <p>
                                                                                We may update this privacy policy from
                                                                                time to time. Revisions will be posted
                                                                                with updated dates.
                                                                        </p>
                                                                </div>
                                                        </section>

                                                        <section>
                                                                <h2 className="text-2xl font-bold text-white mb-4">
                                                                        9. Contact
                                                                </h2>
                                                                <div className="text-gray-300 space-y-4">
                                                                        <p>
                                                                                If you have any questions or concerns
                                                                                about this privacy policy or our data
                                                                                practices, please contact us at:
                                                                        </p>
                                                                        <p>📧 Email: reachformaihere@gmail.com</p>
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

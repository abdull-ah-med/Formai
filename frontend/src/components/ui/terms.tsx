import { FileText, CheckCircle, AlertTriangle, Scale } from "lucide-react";
import { Link } from "react-router-dom";
import { useDocumentTitle } from "../../utils/useDocumentTitle";

const Terms = () => {
        useDocumentTitle("Terms of Service");

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
                                                        Last Updated: July 12, 2025
                                                </p>
                                        </div>

                                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12">
                                                <div className="space-y-8">
                                                        <section>
                                                                <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                                                                        <CheckCircle className="w-6 h-6 mr-3 text-green-400" />
                                                                        1. Acceptance of Terms
                                                                </h2>
                                                                <div className="text-gray-300 space-y-4">
                                                                        <p>
                                                                                By accessing and using Formai, you agree
                                                                                to these Terms and all applicable laws.
                                                                                If you disagree, you may not use the
                                                                                Service.
                                                                        </p>
                                                                </div>
                                                        </section>

                                                        <section>
                                                                <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                                                                        <Scale className="w-6 h-6 mr-3 text-blue-400" />
                                                                        2. Use License
                                                                </h2>
                                                                <div className="text-gray-300 space-y-4">
                                                                        <p>
                                                                                We grant a limited, non-transferable
                                                                                license for personal, non-commercial
                                                                                use. You may not:
                                                                        </p>
                                                                        <ul className="list-disc list-inside space-y-2 ml-4">
                                                                                <li>
                                                                                        Modify, copy, or redistribute
                                                                                        the Service
                                                                                </li>
                                                                                <li>
                                                                                        Use it commercially without
                                                                                        permission
                                                                                </li>
                                                                                <li>Reverse engineer the software</li>
                                                                                <li>Remove proprietary notices</li>
                                                                        </ul>
                                                                        <p>
                                                                                Violation may result in license
                                                                                termination.
                                                                        </p>
                                                                </div>
                                                        </section>

                                                        <section>
                                                                <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                                                                        <AlertTriangle className="w-6 h-6 mr-3 text-yellow-400" />
                                                                        3. AI-Generated Content
                                                                </h2>
                                                                <div className="text-gray-300 space-y-4">
                                                                        <p>
                                                                                Forms are generated via Claude AI. Users
                                                                                are responsible for reviewing content
                                                                                before using or submitting.
                                                                        </p>
                                                                </div>
                                                        </section>

                                                        <section>
                                                                <h2 className="text-2xl font-bold text-white mb-4">
                                                                        4. Google Services
                                                                </h2>
                                                                <div className="text-gray-300 space-y-4">
                                                                        <p>Formai uses:</p>
                                                                        <ul className="list-disc list-inside space-y-2 ml-4">
                                                                                <li>Google OAuth for login</li>
                                                                                <li>
                                                                                        Google Forms API to create new
                                                                                        forms
                                                                                </li>
                                                                        </ul>
                                                                        <p>
                                                                                We do <strong>not</strong> access or
                                                                                change existing files. Revoke access
                                                                                anytime at:{" "}
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
                                                                <h2 className="text-2xl font-bold text-white mb-4">
                                                                        5. Data Handling
                                                                </h2>
                                                                <div className="text-gray-300 space-y-4">
                                                                        <p>We store:</p>
                                                                        <ul className="list-disc list-inside space-y-2 ml-4">
                                                                                <li>
                                                                                        Prompt(s), JSON, title,
                                                                                        timestamp
                                                                                </li>
                                                                                <li>Form URL and user ID</li>
                                                                        </ul>
                                                                        <p>
                                                                                This is stored securely. No third-party
                                                                                data sharing.
                                                                        </p>
                                                                </div>
                                                        </section>

                                                        <section>
                                                                <h2 className="text-2xl font-bold text-white mb-4">
                                                                        6. Cookies and Session Management
                                                                </h2>
                                                                <div className="text-gray-300 space-y-4">
                                                                        <p>We use HttpOnly, SameSite cookies for:</p>
                                                                        <ul className="list-disc list-inside space-y-2 ml-4">
                                                                                <li>Authentication</li>
                                                                                <li>Session tracking</li>
                                                                        </ul>
                                                                        <p>
                                                                                No cookies are used for tracking, ads,
                                                                                or analytics.
                                                                        </p>
                                                                </div>
                                                        </section>

                                                        <section>
                                                                <h2 className="text-2xl font-bold text-white mb-4">
                                                                        7. Disclaimer
                                                                </h2>
                                                                <div className="text-gray-300 space-y-4">
                                                                        <p>
                                                                                Formai is provided "as is." We make no
                                                                                warranties of fitness, merchantability,
                                                                                or non-infringement.
                                                                        </p>
                                                                </div>
                                                        </section>

                                                        <section>
                                                                <h2 className="text-2xl font-bold text-white mb-4">
                                                                        8. Limitation of Liability
                                                                </h2>
                                                                <div className="text-gray-300 space-y-4">
                                                                        <p>
                                                                                Formai and its creators are not liable
                                                                                for:
                                                                        </p>
                                                                        <ul className="list-disc list-inside space-y-2 ml-4">
                                                                                <li>Data loss</li>
                                                                                <li>Profit loss</li>
                                                                                <li>Business interruption</li>
                                                                                <li>Issues from using the Service</li>
                                                                        </ul>
                                                                </div>
                                                        </section>

                                                        <section>
                                                                <h2 className="text-2xl font-bold text-white mb-4">
                                                                        9. Accuracy of Materials
                                                                </h2>
                                                                <div className="text-gray-300 space-y-4">
                                                                        <p>
                                                                                Generated content may contain errors. No
                                                                                guarantee of accuracy is provided.
                                                                        </p>
                                                                </div>
                                                        </section>

                                                        <section>
                                                                <h2 className="text-2xl font-bold text-white mb-4">
                                                                        10. External Links
                                                                </h2>
                                                                <div className="text-gray-300 space-y-4">
                                                                        <p>
                                                                                Third-party links may appear. We are not
                                                                                responsible for external content or
                                                                                policies.
                                                                        </p>
                                                                </div>
                                                        </section>

                                                        <section>
                                                                <h2 className="text-2xl font-bold text-white mb-4">
                                                                        11. Modifications
                                                                </h2>
                                                                <div className="text-gray-300 space-y-4">
                                                                        <p>
                                                                                These Terms may be updated. Continued
                                                                                use means you accept the latest version.
                                                                        </p>
                                                                </div>
                                                        </section>

                                                        <section>
                                                                <h2 className="text-2xl font-bold text-white mb-4">
                                                                        12. Governing Law
                                                                </h2>
                                                                <div className="text-gray-300 space-y-4">
                                                                        <p>
                                                                                These Terms are governed by the laws of{" "}
                                                                                <strong>Pakistan</strong>. You agree to
                                                                                the jurisdiction of courts in Pakistan.
                                                                        </p>
                                                                </div>
                                                        </section>

                                                        <section>
                                                                <h2 className="text-2xl font-bold text-white mb-4">
                                                                        13. Contact
                                                                </h2>
                                                                <div className="text-gray-300 space-y-4">
                                                                        <p>
                                                                                If you have any questions about these
                                                                                Terms of Service, please contact us at:
                                                                        </p>
                                                                        <p>📧 Email: reachformaihere@gmail.com</p>
                                                                        <p className="mt-4 text-sm text-gray-400">
                                                                                Last Updated: July 12, 2025
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

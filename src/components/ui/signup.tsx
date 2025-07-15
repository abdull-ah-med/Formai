import { useState, useEffect } from "react";
import { Button } from "./button";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import signUpSchema from "../../schemas/signUpSchema";
import api from "../../api";
import GoogleSignInButton from "./GoogleSignInButton";
import ReCAPTCHA from "react-google-recaptcha";
import { useAuth } from "../../contexts/AuthContext";
import { useDocumentTitle } from "../../utils/useDocumentTitle";
/// <reference types="vite/client" />

const Signup = () => {
        const navigate = useNavigate();
        useDocumentTitle("Sign Up");
        const siteKey = (import.meta as any).env.VITE_RECAPTCHA_SITE_KEY as string;
        const [apiError, setApiError] = useState<string | null>(null);
        const { isAuthenticated, loading } = useAuth();

        // Redirect authenticated users away from signup page
        useEffect(() => {
                if (!loading && isAuthenticated) {
                        navigate("/dashboard", { replace: true });
                }
        }, [isAuthenticated, loading, navigate]);

        const initialValues = {
                fullName: "",
                email: "",
                password: "",
                confirmPassword: "",
                website: "", // honeypot
                recaptchaToken: "",
        };

        const handleSubmit = async (values: typeof initialValues, { setSubmitting }: any) => {
                if (!values.recaptchaToken) {
                        setApiError("Please complete the CAPTCHA");
                        return;
                }
                setSubmitting(true);
                setApiError(null);
                try {
                        await api.post("/auth/register", {
                                fullName: values.fullName,
                                email: values.email,
                                password: values.password,
                                website: values.website,
                                recaptchaToken: values.recaptchaToken,
                        });
                        navigate("/signin?signup=success"); // Redirect to signin with a success message
                } catch (err: any) {
                        setApiError(err.response?.data?.message || "An unexpected error occurred. Please try again.");
                } finally {
                        setSubmitting(false);
                }
        };

        if (loading) {
                return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;
        }

        return (
                <div className="min-h-screen bg-black text-white flex items-center justify-center pt-16 pb-8">
                        <div className="w-full max-w-lg p-8 space-y-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl shadow-lg">
                                <div className="text-center">
                                        <h1 className="text-3xl font-bold text-white">Sign Up</h1>
                                        <p className="mt-2 text-gray-300">
                                                Create your account to start building AI-powered forms
                                        </p>
                                </div>

                                {apiError && (
                                        <div className="bg-red-500/10 border border-red-500/50 text-red-400 text-sm rounded-lg p-3 text-center">
                                                {apiError}
                                        </div>
                                )}

                                <Formik
                                        initialValues={initialValues}
                                        validationSchema={signUpSchema}
                                        onSubmit={handleSubmit}
                                >
                                        {({ isSubmitting, errors, touched, setFieldValue }) => (
                                                <Form className="space-y-6">
                                                        {/* All form fields go here, styled with Tailwind */}
                                                        {/* Full Name */}
                                                        <div>
                                                                <label
                                                                        htmlFor="fullName"
                                                                        className="block text-sm font-medium text-gray-300"
                                                                >
                                                                        Full Name *
                                                                </label>
                                                                <Field
                                                                        type="text"
                                                                        id="fullName"
                                                                        name="fullName"
                                                                        className={`mt-1 block w-full px-3 py-2 bg-white/5 border ${errors.fullName && touched.fullName
                                                                                        ? "border-red-500"
                                                                                        : "border-white/10"
                                                                                } rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50`}
                                                                        placeholder="Jane Doe"
                                                                />
                                                                <ErrorMessage
                                                                        name="fullName"
                                                                        component="p"
                                                                        className="mt-2 text-sm text-red-500"
                                                                />
                                                        </div>

                                                        {/* Email */}
                                                        <div>
                                                                <label
                                                                        htmlFor="email"
                                                                        className="block text-sm font-medium text-gray-300"
                                                                >
                                                                        Email *
                                                                </label>
                                                                <Field
                                                                        type="email"
                                                                        id="email"
                                                                        name="email"
                                                                        className={`mt-1 block w-full px-3 py-2 bg-white/5 border ${errors.email && touched.email
                                                                                        ? "border-red-500"
                                                                                        : "border-white/10"
                                                                                } rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50`}
                                                                        placeholder="jane@example.com"
                                                                />
                                                                <ErrorMessage
                                                                        name="email"
                                                                        component="p"
                                                                        className="mt-2 text-sm text-red-500"
                                                                />
                                                        </div>

                                                        {/* Password */}
                                                        <div>
                                                                <label
                                                                        htmlFor="password"
                                                                        className="block text-sm font-medium text-gray-300"
                                                                >
                                                                        Password *
                                                                </label>
                                                                <Field
                                                                        type="password"
                                                                        id="password"
                                                                        name="password"
                                                                        className={`mt-1 block w-full px-3 py-2 bg-white/5 border ${errors.password && touched.password
                                                                                        ? "border-red-500"
                                                                                        : "border-white/10"
                                                                                } rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50`}
                                                                        placeholder="••••••••"
                                                                        autoComplete="new-password"
                                                                />
                                                                <ErrorMessage
                                                                        name="password"
                                                                        component="p"
                                                                        className="mt-2 text-sm text-red-500"
                                                                />
                                                        </div>

                                                        {/* Confirm Password */}
                                                        <div>
                                                                <label
                                                                        htmlFor="confirmPassword"
                                                                        className="block text-sm font-medium text-gray-300"
                                                                >
                                                                        Confirm Password *
                                                                </label>
                                                                <Field
                                                                        type="password"
                                                                        id="confirmPassword"
                                                                        name="confirmPassword"
                                                                        className={`mt-1 block w-full px-3 py-2 bg-white/5 border ${errors.confirmPassword &&
                                                                                        touched.confirmPassword
                                                                                        ? "border-red-500"
                                                                                        : "border-white/10"
                                                                                } rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50`}
                                                                        placeholder="••••••••"
                                                                        autoComplete="new-password"
                                                                />
                                                                <ErrorMessage
                                                                        name="confirmPassword"
                                                                        component="p"
                                                                        className="mt-2 text-sm text-red-500"
                                                                />
                                                        </div>

                                                        {/* honeypot */}
                                                        <Field
                                                                type="text"
                                                                name="website"
                                                                style={{
                                                                        display: "none",
                                                                }}
                                                        />

                                                        {/* reCAPTCHA */}
                                                        <div className="flex justify-center">
                                                                <ReCAPTCHA
                                                                        sitekey={siteKey}
                                                                        onChange={(token: string | null) =>
                                                                                setFieldValue("recaptchaToken", token)
                                                                        }
                                                                />
                                                        </div>

                                                        <Button
                                                                type="submit"
                                                                disabled={isSubmitting}
                                                                className="w-full py-2 px-4 bg-white text-black font-semibold rounded-md hover:bg-gray-200 disabled:opacity-50"
                                                        >
                                                                {isSubmitting ? "Signing Up..." : "Sign Up"}
                                                        </Button>

                                                        {/* Google Sign Up */}
                                                        <GoogleSignInButton variant="signup" />
                                                </Form>
                                        )}
                                </Formik>

                                <div className="text-center mt-6">
                                        <Link to="/" className="text-sm text-gray-300 hover:text-white">
                                                ← Back to Home
                                        </Link>
                                        <p className="mt-4 text-sm text-gray-300">
                                                Already have an account?{" "}
                                                <Link to="/signin" className="font-medium text-white hover:underline">
                                                        Sign In
                                                </Link>
                                        </p>
                                </div>
                        </div>
                </div>
        );
};

export default Signup;

import { Button } from "./button";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import loginSchema from "../../schemas/loginSchema";
import api from "../../api";
import { isAuthenticated } from "../../auth/authHelper";
import { useEffect, useState } from "react";
import GoogleSignInButton from "./GoogleSignInButton";
import React from "react";
import ReCAPTCHA from "react-google-recaptcha";

// Ensure Vite env types are available
/// <reference types="vite/client" />

// Define interface for login response
interface LoginResponse {
        message?: string;
}

const Signin = () => {
        const siteKey = (import.meta as any).env
                .VITE_RECAPTCHA_SITE_KEY as string;
        const initialValues = {
                email: "",
                password: "",
                rememberMe: false,
                website: "",
                recaptchaToken: "",
        };
        const navigate = useNavigate();
        const [loading, setLoading] = useState(true);

        // Check if user is already authenticated
        useEffect(() => {
                (async () => {
                        const auth = await isAuthenticated();
                        if (auth) {
                                navigate("/dashboard", { replace: true });
                        } else {
                                setLoading(false);
                        }
                })();
        }, [navigate]);

        if (loading) {
                return (
                        <div className="min-h-screen flex items-center justify-center">
                                Loading...
                        </div>
                );
        }

        const handleSubmit = async (
                values: typeof initialValues,
                { setSubmitting, setFieldError }: any
        ) => {
                if (!values.recaptchaToken) {
                        setFieldError("email", "Please complete the CAPTCHA");
                        return;
                }
                setSubmitting(true);
                try {
                        const res = await api.post<{ token: string } & LoginResponse>("/auth/login", {
                                email: values.email,
                                password: values.password,
                                rememberMe: values.rememberMe,
                                website: values.website,
                                recaptchaToken: values.recaptchaToken,
                        });

                        // Store the JWT in localStorage
                        setAuthToken(res.data.token);

                        // Track non-persistent session in localStorage so we can
                        // auto-logout when all tabs are closed.
                        if (values.rememberMe) {
                                localStorage.removeItem("nonPersistentAuth");
                        } else {
                                localStorage.setItem(
                                        "nonPersistentAuth",
                                        "true"
                                );
                        }

                        navigate("/dashboard", { replace: true });
                } catch (err: any) {
                        setFieldError(
                                "email",
                                err.response?.data?.message || "Login failed"
                        );
                        setSubmitting(false);
                }
        };

        return (
                <Formik
                        initialValues={initialValues}
                        validationSchema={loginSchema}
                        onSubmit={handleSubmit}
                >
                        {({
                                isSubmitting,
                                errors,
                                touched,
                                values,
                                setFieldValue,
                        }) => (
                                <div className="min-h-screen bg-black text-white flex items-center justify-center pt-16">
                                        <div className="w-full max-w-md p-8 space-y-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl shadow-lg">
                                                <div className="text-center">
                                                        <h1 className="text-3xl font-bold text-white">
                                                                Sign In
                                                        </h1>
                                                        <p className="mt-2 text-gray-300">
                                                                Access your
                                                                Formai account
                                                        </p>
                                                </div>
                                                <Form className="space-y-6">
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
                                                                        className={`mt-1 block w-full px-3 py-2 bg-white/5 border ${
                                                                                errors.email &&
                                                                                touched.email
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
                                                        <div>
                                                                <label
                                                                        htmlFor="password"
                                                                        className="block text-sm font-medium text-gray-300"
                                                                >
                                                                        Password
                                                                        *
                                                                </label>
                                                                <Field
                                                                        type="password"
                                                                        id="password"
                                                                        name="password"
                                                                        className={`mt-1 block w-full px-3 py-2 bg-white/5 border ${
                                                                                errors.password &&
                                                                                touched.password
                                                                                        ? "border-red-500"
                                                                                        : "border-white/10"
                                                                        } rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50`}
                                                                        placeholder="••••••••"
                                                                        autoComplete="current-password"
                                                                />
                                                                <ErrorMessage
                                                                        name="password"
                                                                        component="p"
                                                                        className="mt-2 text-sm text-red-500"
                                                                />
                                                        </div>
                                                        <div>
                                                                <div className="flex items-center">
                                                                        <Field
                                                                                type="checkbox"
                                                                                id="rememberMe"
                                                                                name="rememberMe"
                                                                                className="h-4 w-4 text-blue-600 bg-white/5 border-white/10 rounded focus:ring-white/50"
                                                                        />
                                                                        <label
                                                                                htmlFor="rememberMe"
                                                                                className="ml-2 block text-sm text-gray-300 select-none"
                                                                        >
                                                                                Remember
                                                                                me
                                                                        </label>
                                                                </div>
                                                        </div>
                                                        <Field
                                                                type="text"
                                                                name="website"
                                                                style={{
                                                                        display: "none",
                                                                }}
                                                        />
                                                        <div className="flex justify-center">
                                                                <ReCAPTCHA
                                                                        sitekey={
                                                                                siteKey
                                                                        }
                                                                        onChange={(
                                                                                token:
                                                                                        | string
                                                                                        | null
                                                                        ) =>
                                                                                setFieldValue(
                                                                                        "recaptchaToken",
                                                                                        token
                                                                                )
                                                                        }
                                                                />
                                                        </div>
                                                        <Button
                                                                type="submit"
                                                                disabled={
                                                                        isSubmitting
                                                                }
                                                                className="w-full py-2 px-4 bg-white text-black font-semibold rounded-md hover:bg-gray-200 disabled:opacity-50"
                                                        >
                                                                {isSubmitting
                                                                        ? "Signing In..."
                                                                        : "Sign In"}
                                                        </Button>

                                                        {/* Google Sign In */}
                                                        <GoogleSignInButton
                                                                variant="signin"
                                                        />
                                                </Form>
                                                <div className="text-center mt-6">
                                                        <Link
                                                                to="/"
                                                                className="text-sm text-gray-300 hover:text-white"
                                                        >
                                                                ← Back to Home
                                                        </Link>
                                                        <p className="mt-4 text-sm text-gray-300">
                                                                Don't have an
                                                                account?{" "}
                                                                <Link
                                                                        to="/signup"
                                                                        className="font-medium text-white hover:underline"
                                                                >
                                                                        Sign Up
                                                                </Link>
                                                        </p>
                                                </div>
                                        </div>
                                </div>
                        )}
                </Formik>
        );
};

export default Signin;

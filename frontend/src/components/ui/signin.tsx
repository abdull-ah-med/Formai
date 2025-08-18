import { Button } from "./button";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import loginSchema from "../../schemas/loginSchema";
import api from "../../api";
import { useEffect } from "react";
import GoogleSignInButton from "./GoogleSignInButton";
import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useAuth } from "../../hooks/useAuth";
import { Loader } from "./loader";
import { useDocumentTitle } from "../../utils/useDocumentTitle";

// Define interface for login response
interface LoginResponse {
  message?: string;
}

// Define interface for form actions
interface FormActions {
  setSubmitting: (isSubmitting: boolean) => void;
  setFieldError: (field: string, message: string) => void;
}

const Signin = () => {
  useDocumentTitle("Sign In");
  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY as string;
  const initialValues = {
    email: "",
    password: "",
    recaptchaToken: "",
  };
  const navigate = useNavigate();
  const { isAuthenticated, loading, login } = useAuth();
  const [error, setError] = useState<string | null>(null);

  // Check if user is already authenticated
  useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader variant="pulse" size="lg" />
      </div>
    );
  }

  const handleSubmit = async (
    values: typeof initialValues,
    { setFieldError }: FormActions
  ) => {
    if (!values.recaptchaToken) {
      setFieldError("email", "Please complete the CAPTCHA");
      return;
    }
    setError(null);
    try {
      const res = await api.post<{ token: string } & LoginResponse>(
        "/auth/login",
        {
          email: values.email,
          password: values.password,
          recaptchaToken: values.recaptchaToken,
        }
      );

      await login(res.data.token);

      navigate("/dashboard", { replace: true });
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      const backendMsg = error.response?.data?.message;
      if (
        backendMsg ===
        "This account is linked with Google. Please sign in with Google."
      ) {
        setError(backendMsg);
      } else {
        setFieldError("email", backendMsg || "Login failed");
      }
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={loginSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, errors, touched, setFieldValue }) => (
        <div className="min-h-screen bg-black text-white flex items-center justify-center pt-16">
          <div className="w-full max-w-md p-8 space-y-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl shadow-lg">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-white">Sign In</h1>
              <p className="mt-2 text-gray-300">Access your Formai account</p>
            </div>
            {error && (
              <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-center">
                {error}
              </div>
            )}
            <Form className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm text-gray-400 mb-1"
                >
                  Email Address
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className={`mt-1 block w-full px-3 py-2 bg-white/5 border ${
                    errors.email && touched.email
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
                  Password *
                </label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  className={`mt-1 block w-full px-3 py-2 bg-white/5 border ${
                    errors.password && touched.password
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
              {/* Removed "Remember me" checkbox */}
              <Field
                type="text"
                name="website"
                style={{
                  display: "none",
                }}
              />
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
                {isSubmitting ? "Signing In..." : "Sign In"}
              </Button>

              {/* Google Sign In */}
              <GoogleSignInButton variant="signin" />
            </Form>
            <div className="text-center mt-6">
              <Link to="/" className="text-sm text-gray-300 hover:text-white">
                ← Back to Home
              </Link>
              <p className="mt-4 text-sm text-gray-300">
                Don't have an account?{" "}
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

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { generateForm, reviseForm, finalizeForm } from "../../api";
import { FormSchema, GenerateFormResponse, ReviseFormResponse, FinalizeFormResponse } from "../../types/form";
import FormBuilder from "./FormBuilder";
import GoogleSignInButton from "./GoogleSignInButton";

const FormCreator: React.FC = () => {
        const { user } = useAuth();
        const navigate = useNavigate();

        const [prompt, setPrompt] = useState("");
        const [isGenerating, setIsGenerating] = useState(false);
        const [isProcessing, setIsProcessing] = useState(false);
        const [error, setError] = useState("");
        const [formSchema, setFormSchema] = useState<FormSchema | null>(null);
        const [formId, setFormId] = useState<string | null>(null);
        const [revisionsRemaining, setRevisionsRemaining] = useState(3);
        const [needsGoogleAuth, setNeedsGoogleAuth] = useState(false);

        const handleGenerate = async (e: React.FormEvent) => {
                e.preventDefault();
                if (!prompt.trim()) return;

                setIsGenerating(true);
                setError("");

                try {
                        const response = (await generateForm(prompt.trim())) as GenerateFormResponse;
                        if (response.success) {
                                setFormSchema(response.data.schema);
                                setFormId(response.data.formId);
                        } else {
                                setError(response.error || "Failed to generate form");
                        }
                } catch (err: any) {
                        if (err.response?.status === 429) {
                                setError("Daily form generation limit reached. Try again tomorrow.");
                        } else {
                                setError(err.response?.data?.error || "An error occurred while generating the form");
                        }
                } finally {
                        setIsGenerating(false);
                }
        };

        const handleRevise = async (revisionPrompt: string) => {
                if (!formId) return;

                setIsProcessing(true);
                setError("");

                try {
                        const response = (await reviseForm(formId, revisionPrompt)) as ReviseFormResponse;
                        if (response.success) {
                                setFormSchema(response.data.schema);
                                setRevisionsRemaining(response.data.revisionsRemaining);
                        } else {
                                setError(response.error || "Failed to revise form");
                        }
                } catch (err: any) {
                        setError(err.response?.data?.error || "An error occurred while revising the form");
                } finally {
                        setIsProcessing(false);
                }
        };

        const handleAccept = async () => {
                if (!formId) return;

                setIsProcessing(true);
                setError("");

                try {
                        const response = (await finalizeForm(formId)) as FinalizeFormResponse;
                        if (response.success) {
                                // Successfully created Google Form
                                navigate("/forms/success", {
                                        state: {
                                                formUrl: response.data.googleFormUrl,
                                                formTitle: response.data.schema.title,
                                        },
                                });
                        } else {
                                // Handle specific errors
                                if (response.error === "CONNECT_GOOGLE") {
                                        setNeedsGoogleAuth(true);
                                } else if (response.error === "GOOGLE_TOKEN_EXPIRED") {
                                        setError("Your Google authorization has expired. Please reconnect to Google.");
                                        setNeedsGoogleAuth(true);
                                } else {
                                        setError(response.error || "Failed to create form");
                                }
                        }
                } catch (err: any) {
                        if (
                                err.response?.data?.error === "CONNECT_GOOGLE" ||
                                err.response?.data?.error === "GOOGLE_TOKEN_EXPIRED"
                        ) {
                                setNeedsGoogleAuth(true);
                        } else {
                                setError(err.response?.data?.error || "An error occurred while finalizing the form");
                        }
                } finally {
                        setIsProcessing(false);
                }
        };

        const handleGoogleAuthSuccess = async () => {
                setNeedsGoogleAuth(false);
                // Retry form finalization
                if (formId) {
                        await handleAccept();
                }
        };

        return (
                <div className="min-h-screen bg-black text-white pt-16">
                        <div className="container mx-auto px-4 py-8">
                                <h1 className="text-3xl font-bold mb-6 text-center">Create a Form</h1>

                                {needsGoogleAuth ? (
                                        <div className="max-w-md mx-auto bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                                                <h2 className="text-xl font-semibold mb-4">Connect Google Account</h2>
                                                <p className="text-gray-300 mb-6">
                                                        To create Google Forms, you need to connect your Google account
                                                        first.
                                                </p>
                                                <GoogleSignInButton
                                                        variant="signup"
                                                        label="Connect Google Account"
                                                        onSuccess={() => setNeedsGoogleAuth(false)}
                                                />
                                        </div>
                                ) : !formSchema ? (
                                        <div className="max-w-2xl mx-auto">
                                                <form onSubmit={handleGenerate} className="mb-8">
                                                        <div className="mb-4">
                                                                <label
                                                                        htmlFor="prompt"
                                                                        className="block mb-2 font-medium"
                                                                >
                                                                        What kind of form do you need?
                                                                </label>
                                                                <textarea
                                                                        id="prompt"
                                                                        rows={4}
                                                                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                                                        placeholder="E.g., Create a feedback form for a tech meetup with fields for rating the speakers and venue"
                                                                        value={prompt}
                                                                        onChange={(e) => setPrompt(e.target.value)}
                                                                        disabled={isGenerating}
                                                                />
                                                        </div>

                                                        <button
                                                                type="submit"
                                                                className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 disabled:opacity-50"
                                                                disabled={!prompt.trim() || isGenerating}
                                                        >
                                                                {isGenerating ? "Generating..." : "Generate Form"}
                                                        </button>

                                                        {error && (
                                                                <p className="mt-4 text-red-400 text-center">{error}</p>
                                                        )}
                                                </form>

                                                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                                                        <h2 className="text-xl font-semibold mb-4">How It Works</h2>
                                                        <ol className="list-decimal pl-5 space-y-2 text-gray-300">
                                                                <li>
                                                                        Describe the form you need in plain English
                                                                        (e.g., "Create a job application form with
                                                                        fields for work experience")
                                                                </li>
                                                                <li>
                                                                        Our AI will generate a form based on your
                                                                        description
                                                                </li>
                                                                <li>
                                                                        Review the form and make revisions if needed (up
                                                                        to 3 times)
                                                                </li>
                                                                <li>
                                                                        When you're satisfied, click "Create Google
                                                                        Form" to publish it to your Google account
                                                                </li>
                                                        </ol>
                                                </div>
                                        </div>
                                ) : (
                                        <>
                                                {error && (
                                                        <div className="p-4 mb-6 bg-red-50 border-l-4 border-red-500 text-red-700">
                                                                {error}
                                                        </div>
                                                )}
                                                <FormBuilder
                                                        schema={formSchema}
                                                        onAccept={handleAccept}
                                                        onRevise={handleRevise}
                                                        revisionsRemaining={revisionsRemaining}
                                                        isLoading={isProcessing}
                                                        formId={formId || undefined}
                                                />
                                        </>
                                )}
                        </div>
                </div>
        );
};

export default FormCreator;

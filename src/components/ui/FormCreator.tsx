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
                <div className="container mx-auto px-4 py-8">
                        {!formSchema ? (
                                <div className="max-w-2xl mx-auto">
                                        <h1 className="text-3xl font-bold mb-6">Create a Form with AI</h1>
                                        <p className="text-gray-600 mb-8">
                                                Describe the form you want to create, and our AI will generate it for
                                                you.
                                        </p>

                                        <form onSubmit={handleGenerate} className="mb-8">
                                                <div className="mb-4">
                                                        <label htmlFor="prompt" className="block mb-2 font-medium">
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
                                                        disabled={!prompt.trim() || isGenerating}
                                                        className={`w-full py-3 px-6 rounded-lg font-medium ${
                                                                !prompt.trim() || isGenerating
                                                                        ? "bg-blue-300 text-white"
                                                                        : "bg-blue-600 hover:bg-blue-700 text-white"
                                                        }`}
                                                >
                                                        {isGenerating ? "Generating..." : "Generate Form"}
                                                </button>
                                        </form>

                                        {error && (
                                                <div className="p-4 mb-4 bg-red-50 border-l-4 border-red-500 text-red-700">
                                                        {error}
                                                </div>
                                        )}
                                </div>
                        ) : (
                                <div>
                                        {needsGoogleAuth ? (
                                                <div className="max-w-md mx-auto text-center p-6 bg-white rounded-lg shadow-lg">
                                                        <h2 className="text-2xl font-bold mb-4">
                                                                Connect to Google Forms
                                                        </h2>
                                                        <p className="mb-6 text-gray-600">
                                                                Please connect your Google account to create the form in
                                                                Google Forms
                                                        </p>
                                                        <GoogleSignInButton onSuccess={handleGoogleAuthSuccess} />
                                                        {error && (
                                                                <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md">
                                                                        {error}
                                                                </div>
                                                        )}
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
                                                        />
                                                </>
                                        )}
                                </div>
                        )}
                </div>
        );
};

export default FormCreator;

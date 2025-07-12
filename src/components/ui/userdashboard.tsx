import { BarChart, CheckSquare, Flag, Home, MessageSquare, Settings, Users } from "lucide-react";
import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { generateForm, reviseForm, finalizeForm } from "../../api";
import { FormSchema, GenerateFormResponse, ReviseFormResponse, FinalizeFormResponse } from "../../types/form";
import { useNavigate } from "react-router-dom";
import FormBuilder from "./FormBuilder";
import FormFinalizeButton from "./FormFinalizeButton";

const UserDashboard: React.FC = () => {
        const { user } = useAuth();
        const navigate = useNavigate();
        const [prompt, setPrompt] = useState("");
        const [response, setResponse] = useState("");
        const [isLoading, setIsLoading] = useState(false);
        const [formSchema, setFormSchema] = useState<FormSchema | null>(null);
        const [formId, setFormId] = useState<string | null>(null);
        const [error, setError] = useState("");

        const handleSubmit = async (e: React.FormEvent) => {
                e.preventDefault();
                if (!prompt.trim()) return;

                setIsLoading(true);
                setError("");
                setResponse(`Creating a form for: "${prompt}"`);

                try {
                        const response = (await generateForm(prompt.trim())) as GenerateFormResponse;
                        if (response.success) {
                                setFormSchema(response.data.schema);
                                setFormId(response.data.formId);
                                setResponse(""); // Clear response when form is displayed
                        } else {
                                setError(response.error || "Failed to generate form");
                                setResponse(`Error: ${response.error || "Failed to generate form"}`);
                        }
                } catch (err: any) {
                        if (err.response?.status === 429) {
                                setError("Daily form generation limit reached. Try again tomorrow.");
                                setResponse("Error: Daily form generation limit reached. Try again tomorrow.");
                        } else {
                                setError(err.response?.data?.error || "An error occurred while generating the form");
                                setResponse(
                                        `Error: ${
                                                err.response?.data?.error ||
                                                "An error occurred while generating the form"
                                        }`
                                );
                        }
                } finally {
                        setIsLoading(false);
                }
        };

        const handleRevise = async (revisionPrompt: string) => {
                if (!formId) return;

                setIsLoading(true);
                setError("");

                try {
                        const response = (await reviseForm(formId, revisionPrompt)) as ReviseFormResponse;

                        if (response.success) {
                                setFormSchema(response.data.schema);
                        } else {
                                setError(response.error || "Failed to revise form");
                        }
                } catch (err: any) {
                        setError(err.response?.data?.error || "An error occurred while revising the form");
                } finally {
                        setIsLoading(false);
                }
        };

        const handleFormSuccess = (googleFormUrl: string) => {
                navigate("/forms/success", {
                        state: {
                                formUrl: googleFormUrl,
                                formTitle: formSchema?.title || "Your Form",
                        },
                });
        };

        const resetForm = () => {
                setFormSchema(null);
                setFormId(null);
                setResponse("");
                setPrompt("");
        };

        return (
                <div className="min-h-screen bg-black text-white flex flex-col pt-16">
                        <main className="flex-1 p-4 md:p-6 lg:p-8">
                                <div className="max-w-4xl mx-auto">
                                        <div className="text-center mb-8">
                                                <h1 className="text-4xl font-bold">
                                                        Welcome back, {user?.fullName || "User"}!
                                                </h1>
                                                <p className="text-gray-400 mt-2">What can I help you create today?</p>
                                        </div>

                                        {/* Response Display Area */}
                                        {!formSchema && (
                                                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 min-h-[200px] mb-6 shadow-lg">
                                                        {isLoading ? (
                                                                <div className="flex items-center justify-center h-full">
                                                                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                                                                </div>
                                                        ) : response ? (
                                                                <p className="text-gray-200">{response}</p>
                                                        ) : (
                                                                <p className="text-gray-500 text-center">
                                                                        Type a prompt like "create a form for swe role"
                                                                        to get started
                                                                </p>
                                                        )}
                                                </div>
                                        )}

                                        {/* Form Builder when a form is generated */}
                                        {formSchema && formId && (
                                                <div className="mb-6">
                                                        <div className="flex justify-between items-center mb-4">
                                                                <h2 className="text-2xl font-bold">Your Form</h2>
                                                                <button
                                                                        onClick={resetForm}
                                                                        className="text-gray-400 hover:text-white"
                                                                >
                                                                        Create New Form
                                                                </button>
                                                        </div>

                                                        {error && (
                                                                <div className="p-4 mb-4 bg-red-900/50 border border-red-500/50 rounded-lg text-red-200">
                                                                        {error}
                                                                </div>
                                                        )}

                                                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 mb-6">
                                                                <h3 className="text-xl font-semibold mb-2">
                                                                        {formSchema.title}
                                                                </h3>
                                                                <p className="text-gray-400 mb-4">
                                                                        {formSchema.description}
                                                                </p>

                                                                <div className="space-y-4 mb-6">
                                                                        {formSchema.fields.map((field, index) => (
                                                                                <div
                                                                                        key={index}
                                                                                        className="p-3 bg-white/5 rounded-lg"
                                                                                >
                                                                                        <p className="font-medium">
                                                                                                {field.label}
                                                                                                {field.required && (
                                                                                                        <span className="text-red-400 ml-1">
                                                                                                                *
                                                                                                        </span>
                                                                                                )}
                                                                                        </p>
                                                                                        <p className="text-xs text-gray-400">
                                                                                                Type: {field.type}
                                                                                        </p>
                                                                                </div>
                                                                        ))}
                                                                </div>

                                                                <div className="flex justify-between items-center mt-6">
                                                                        <button
                                                                                onClick={() => setFormSchema(null)}
                                                                                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-white"
                                                                                disabled={isLoading}
                                                                        >
                                                                                Edit Prompt
                                                                        </button>

                                                                        <FormFinalizeButton
                                                                                formId={formId}
                                                                                onSuccess={handleFormSuccess}
                                                                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white"
                                                                        />
                                                                </div>
                                                        </div>
                                                </div>
                                        )}

                                        {/* Prompt Input Form - Only show if no form is displayed or there's an error */}
                                        {!formSchema && (
                                                <form onSubmit={handleSubmit} className="relative">
                                                        <textarea
                                                                value={prompt}
                                                                onChange={(e) => setPrompt(e.target.value)}
                                                                placeholder="e.g., Create a survey for customer satisfaction..."
                                                                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 pr-24 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-inner"
                                                                rows={3}
                                                        />
                                                        <button
                                                                type="submit"
                                                                className="absolute right-4 bottom-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md disabled:opacity-50"
                                                                disabled={isLoading || !prompt}
                                                        >
                                                                {isLoading ? "Generating..." : "Generate"}
                                                        </button>
                                                </form>
                                        )}
                                </div>
                        </main>
                </div>
        );
};

export default UserDashboard;

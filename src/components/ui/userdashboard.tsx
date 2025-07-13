import { BarChart, CheckSquare, Flag, Home, MessageSquare, Settings, Users, Send, Edit2 } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useForm } from "../../contexts/FormContext";
import { generateForm, reviseForm, finalizeForm } from "../../api";
import {
        FormSchema,
        FormSection,
        FormQuestion,
        GenerateFormResponse,
        ReviseFormResponse,
        FinalizeFormResponse,
} from "../../types/form";
import { useNavigate } from "react-router-dom";
import FormBuilder from "./FormBuilder";
import FormFinalizeButton from "./FormFinalizeButton";
import DOMPurify from "dompurify";

const UserDashboard: React.FC = () => {
        const { user } = useAuth();
        const { formSchema, formId, setFormData, clearFormData } = useForm();
        const navigate = useNavigate();
        const [prompt, setPrompt] = useState("");
        const [response, setResponse] = useState("");
        const [isLoading, setIsLoading] = useState(false);
        const [error, setError] = useState("");
        const [showRevisionForm, setShowRevisionForm] = useState(false);
        const [revisionPrompt, setRevisionPrompt] = useState("");
        const [revisionsRemaining, setRevisionsRemaining] = useState(3);

        useEffect(() => {
                if (
                        formSchema &&
                        formSchema.questions &&
                        Array.isArray(formSchema.questions) &&
                        (!formSchema.fields || !formSchema.fields.length) &&
                        (!formSchema.sections || !formSchema.sections.length)
                ) {
                        let processedSchema = { ...formSchema };
                        // Convert questions to fields format
                        processedSchema.fields = formSchema.questions.map((question: FormQuestion) => ({
                                label: question.label,
                                type: question.type === "dropdown" ? "select" : "text",
                                required: false,
                                options: question.options?.map((opt) => opt.text),
                        }));

                        // Create a section as well for compatibility
                        processedSchema.sections = [
                                {
                                        title: formSchema.title,
                                        description: formSchema.description,
                                        fields: processedSchema.fields,
                                },
                        ];
                        if (formId) {
                                setFormData(processedSchema, formId);
                        }
                }
        }, [formSchema, formId, setFormData]);

        const handleSubmit = async (e: React.FormEvent) => {
                e.preventDefault();
                if (!prompt.trim()) return;

                // Sanitize user input
                const sanitizedPrompt = DOMPurify.sanitize(prompt.trim());

                setIsLoading(true);
                setError("");
                setResponse(`Creating a form for: "${sanitizedPrompt}"`);

                try {
                        const response = (await generateForm(sanitizedPrompt)) as GenerateFormResponse;
                        if (response.success) {
                                setFormData(response.data.schema, response.data.formId);
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

                // Sanitize user input
                const sanitizedPrompt = DOMPurify.sanitize(revisionPrompt);

                setIsLoading(true);
                setError("");

                try {
                        const response = (await reviseForm(formId, sanitizedPrompt)) as ReviseFormResponse;

                        if (response.success) {
                                setFormData(response.data.schema, formId);
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
                // Reset form state
                setResponse("");
                setPrompt("");
                clearFormData();

                // Show success message
                alert("Form creation successful!");
        };

        const resetForm = () => {
                setResponse("");
                setPrompt("");
                clearFormData();
        };

        const handleRevisionSubmit = (e: React.FormEvent) => {
                e.preventDefault();
                if (!revisionPrompt.trim() || !formId) return;

                // Sanitize user input
                const sanitizedPrompt = DOMPurify.sanitize(revisionPrompt.trim());

                setIsLoading(true);
                setError("");

                reviseForm(formId, sanitizedPrompt)
                        .then((response: any) => {
                                const typedResponse = response as ReviseFormResponse;
                                if (typedResponse.success) {
                                        setFormData(typedResponse.data.schema, formId);
                                        if (typedResponse.data.revisionsRemaining !== null) {
                                                setRevisionsRemaining(typedResponse.data.revisionsRemaining);
                                        }
                                        setRevisionPrompt("");
                                        setShowRevisionForm(false);
                                } else {
                                        setError(typedResponse.error || "Failed to revise form");
                                }
                        })
                        .catch((err: any) => {
                                setError(err.response?.data?.error || "An error occurred while revising the form");
                        })
                        .finally(() => {
                                setIsLoading(false);
                        });
        };

        // Render form content with sections support
        const renderFormContent = () => {
                if (!formSchema) return null;

                if (formSchema.sections && formSchema.sections.length > 0) {
                        // Render sections
                        return (
                                <div className="space-y-4">
                                        {formSchema.sections.map((section, sectionIndex) => {
                                                const isDefaultSection =
                                                        formSchema.sections &&
                                                        formSchema.sections.length === 1 &&
                                                        section.title === formSchema.title &&
                                                        section.description === formSchema.description;

                                                return (
                                                        <div key={sectionIndex}>
                                                                {!isDefaultSection && (
                                                                        <div className="pt-6">
                                                                                <h3 className="text-xl font-semibold mb-2">
                                                                                        {DOMPurify.sanitize(
                                                                                                section.title
                                                                                        )}
                                                                                </h3>
                                                                                {section.description && (
                                                                                        <p className="text-gray-400 mb-4">
                                                                                                {DOMPurify.sanitize(
                                                                                                        section.description
                                                                                                )}
                                                                                        </p>
                                                                                )}
                                                                        </div>
                                                                )}
                                                                <div className="space-y-4">
                                                                        {section.fields.map((field, fieldIndex) => (
                                                                                <div
                                                                                        key={fieldIndex}
                                                                                        className="p-3 bg-white/5 rounded-lg"
                                                                                >
                                                                                        <p className="font-medium">
                                                                                                {DOMPurify.sanitize(
                                                                                                        field.label
                                                                                                )}
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
                                                        </div>
                                                );
                                        })}
                                </div>
                        );
                } else if (formSchema.fields && formSchema.fields.length > 0) {
                        // Fallback to old fields array for backward compatibility
                        return (
                                <div className="space-y-4 mb-6">
                                        {formSchema.fields.map((field, index) => (
                                                <div key={index} className="p-3 bg-white/5 rounded-lg">
                                                        <p className="font-medium">
                                                                {DOMPurify.sanitize(field.label)}
                                                                {field.required && (
                                                                        <span className="text-red-400 ml-1">*</span>
                                                                )}
                                                        </p>
                                                        <p className="text-xs text-gray-400">Type: {field.type}</p>
                                                </div>
                                        ))}
                                </div>
                        );
                } else {
                        return <p className="text-gray-400">No form fields found.</p>;
                }
        };

        return (
                <div className="min-h-screen bg-black text-white flex flex-col pt-16">
                        <main className="flex-1 p-4 md:p-6 lg:p-8 pb-32">
                                <div className="max-w-4xl mx-auto">
                                        {/* Response Display Area - only show if not displaying a form */}
                                        {!formSchema && (
                                                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 min-h-[200px] mb-6 shadow-lg">
                                                        {isLoading ? (
                                                                <div className="flex items-center justify-center h-full">
                                                                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                                                                </div>
                                                        ) : response ? (
                                                                <p className="text-gray-200">{response}</p>
                                                        ) : (
                                                                <p></p>
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
                                                                        {DOMPurify.sanitize(formSchema.title)}
                                                                </h3>
                                                                <p className="text-gray-400 mb-4">
                                                                        {DOMPurify.sanitize(formSchema.description)}
                                                                </p>

                                                                {renderFormContent()}

                                                                <div className="flex justify-end items-center mt-6">
                                                                        <FormFinalizeButton
                                                                                formId={formId}
                                                                                onSuccess={handleFormSuccess}
                                                                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white"
                                                                        />
                                                                </div>
                                                        </div>
                                                </div>
                                        )}
                                </div>
                        </main>

                        {/* Input Box - Sticky to content, not fixed */}
                        <div className="sticky bottom-0 left-0 right-0 bg-gradient-to-t from-black to-black/90 backdrop-blur-lg border-t border-white/10 p-4 shadow-lg">
                                <div className="max-w-4xl mx-auto">
                                        <form
                                                onSubmit={formSchema ? handleRevisionSubmit : handleSubmit}
                                                className="relative"
                                        >
                                                <div className="flex items-center bg-white/5 border border-white/10 rounded-xl overflow-hidden shadow-inner transition-all duration-200 focus-within:ring-2 focus-within:ring-blue-500/50 focus-within:border-blue-500/50">
                                                        <textarea
                                                                value={formSchema ? revisionPrompt : prompt}
                                                                onChange={(e) =>
                                                                        formSchema
                                                                                ? setRevisionPrompt(e.target.value)
                                                                                : setPrompt(e.target.value)
                                                                }
                                                                placeholder={
                                                                        formSchema
                                                                                ? "Describe changes you want to make to the form..."
                                                                                : "Describe the form you want to create..."
                                                                }
                                                                className="flex-grow bg-transparent p-4 text-white placeholder-gray-400 focus:outline-none h-[72px] resize-none scrollbar-hide"
                                                        />
                                                        <button
                                                                type="submit"
                                                                className="h-[72px] w-[72px] flex-shrink-0 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-medium disabled:opacity-50 transition-all duration-200 flex items-center justify-center"
                                                                disabled={
                                                                        isLoading ||
                                                                        (formSchema ? !revisionPrompt : !prompt)
                                                                }
                                                        >
                                                                {isLoading ? (
                                                                        <span className="animate-spin h-5 w-5 border-2 border-white/30 border-t-white rounded-full"></span>
                                                                ) : formSchema ? (
                                                                        <Edit2 className="h-6 w-6" />
                                                                ) : (
                                                                        <Send className="h-6 w-6" />
                                                                )}
                                                        </button>
                                                </div>
                                        </form>
                                </div>
                        </div>
                </div>
        );
};

export default UserDashboard;

import React, { useState } from "react";
import { FormSchema } from "../../types/form";

// Component Signature
interface FormBuilderProps {
        schema: FormSchema;
        onAccept: () => void;
        onRevise: (prompt: string) => void;
        revisionsRemaining: number;
        isLoading?: boolean;
}

const FormBuilder: React.FC<FormBuilderProps> = ({
        schema,
        onAccept,
        onRevise,
        revisionsRemaining,
        isLoading = false,
}) => {
        const [revisionPrompt, setRevisionPrompt] = useState("");

        const handleRevise = (e: React.FormEvent) => {
                e.preventDefault();
                if (revisionPrompt.trim()) {
                        onRevise(revisionPrompt);
                        setRevisionPrompt("");
                }
        };

        // Render field based on type
        const renderField = (field: any, index: number) => {
                switch (field.type) {
                        case "text":
                                return (
                                        <input
                                                type="text"
                                                disabled
                                                placeholder="Short text answer"
                                                className="w-full p-2 bg-gray-100 border rounded-md"
                                        />
                                );
                        case "textarea":
                                return (
                                        <textarea
                                                disabled
                                                placeholder="Long text answer"
                                                className="w-full p-2 bg-gray-100 border rounded-md h-24"
                                        />
                                );
                        case "rating":
                                return (
                                        <div className="flex gap-2">
                                                {[...Array(field.scale || 5)].map((_, i) => (
                                                        <button
                                                                key={i}
                                                                disabled
                                                                className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"
                                                        >
                                                                {i + 1}
                                                        </button>
                                                ))}
                                        </div>
                                );
                        case "checkbox":
                        case "radio":
                                return (
                                        <div className="space-y-2">
                                                {field.options?.map((option: any, i: number) => (
                                                        <div key={i} className="flex items-center">
                                                                <input
                                                                        type={
                                                                                field.type === "checkbox"
                                                                                        ? "checkbox"
                                                                                        : "radio"
                                                                        }
                                                                        disabled
                                                                        className="mr-2"
                                                                />
                                                                <span className="text-gray-700">
                                                                        {typeof option === "string"
                                                                                ? option
                                                                                : option.text || option.label}
                                                                </span>
                                                        </div>
                                                ))}
                                        </div>
                                );
                        case "dropdown":
                                return (
                                        <select disabled className="w-full p-2 bg-gray-100 border rounded-md">
                                                <option>Select an option</option>
                                                {field.options?.map((option: any, i: number) => (
                                                        <option key={i}>
                                                                {typeof option === "string"
                                                                        ? option
                                                                        : option.text || option.label}
                                                        </option>
                                                ))}
                                        </select>
                                );
                        default:
                                return (
                                        <input
                                                type="text"
                                                disabled
                                                placeholder="Text input"
                                                className="w-full p-2 bg-gray-100 border rounded-md"
                                        />
                                );
                }
        };

        return (
                <div className="bg-white rounded-lg shadow-lg max-w-4xl mx-auto">
                        <div className="p-6">
                                <h1 className="text-3xl font-bold mb-2">{schema.title}</h1>
                                <p className="text-gray-600 mb-6">{schema.description}</p>

                                {/* Form Preview */}
                                <div className="border rounded-lg p-6 bg-gray-50 mb-8">
                                        <h2 className="text-lg font-medium text-gray-700 mb-4">Form Preview</h2>
                                        {schema.fields?.map((field, index) => (
                                                <div key={index} className="mb-6 p-4 bg-white border rounded-md">
                                                        <label className="block text-lg font-medium mb-2">
                                                                {field.label}
                                                                {field.required && (
                                                                        <span className="text-red-500 ml-1">*</span>
                                                                )}
                                                        </label>
                                                        {renderField(field, index)}
                                                </div>
                                        ))}
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-col gap-4">
                                        <button
                                                onClick={onAccept}
                                                disabled={isLoading}
                                                className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md 
              transition-colors disabled:bg-green-400"
                                        >
                                                {isLoading ? "Processing..." : "Accept and Create Form"}
                                        </button>

                                        {revisionsRemaining > 0 && (
                                                <form onSubmit={handleRevise} className="mt-4">
                                                        <p className="text-sm text-gray-600 mb-2">
                                                                {revisionsRemaining}{" "}
                                                                {revisionsRemaining === 1 ? "revision" : "revisions"}{" "}
                                                                remaining
                                                        </p>
                                                        <div className="flex gap-2">
                                                                <input
                                                                        type="text"
                                                                        value={revisionPrompt}
                                                                        onChange={(e) =>
                                                                                setRevisionPrompt(e.target.value)
                                                                        }
                                                                        placeholder="What would you like to change?"
                                                                        className="flex-1 p-2 border rounded-md"
                                                                        disabled={isLoading}
                                                                />
                                                                <button
                                                                        type="submit"
                                                                        disabled={!revisionPrompt.trim() || isLoading}
                                                                        className="py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md 
                    transition-colors disabled:bg-blue-400"
                                                                >
                                                                        Revise
                                                                </button>
                                                        </div>
                                                </form>
                                        )}

                                        {revisionsRemaining === 0 && (
                                                <p className="text-sm text-amber-600 mt-2">
                                                        You've used all available revisions for this form.
                                                </p>
                                        )}
                                </div>
                        </div>
                </div>
        );
};

export default FormBuilder;

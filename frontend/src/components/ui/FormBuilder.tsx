import React, { useState } from "react";
import { FormSchema, FormSection, FormCondition, FormField } from "../../types/form";
import FormFinalizeButton from "./FormFinalizeButton";
import DOMPurify from "dompurify";
import { getValidationRequirements, hasValidationRequirements } from "../../utils/formValidation";

interface FormBuilderProps {
        schema: FormSchema;
        onAccept: () => void;
        onRevise: (prompt: string) => void;
        revisionsRemaining: number | null;
        isLoading: boolean;
        formId?: string;
}

const FormBuilder: React.FC<FormBuilderProps> = ({
        schema,
        onAccept,
        onRevise,
        revisionsRemaining,
        isLoading,
        formId,
}) => {
        const [revisionPrompt, setRevisionPrompt] = useState("");
        const [showRevisionForm, setShowRevisionForm] = useState(false);

        const handleRevisionSubmit = (e: React.FormEvent) => {
                e.preventDefault();
                if (!revisionPrompt.trim()) return;

                // Sanitize user input
                const sanitizedPrompt = DOMPurify.sanitize(revisionPrompt.trim());

                onRevise(sanitizedPrompt);
                setRevisionPrompt("");
                setShowRevisionForm(false);
        };

        const renderValidationRequirements = (field: FormField) => {
                if (!hasValidationRequirements(field)) return null;

                const requirements = getValidationRequirements(field);
                return (
                        <div className="mt-1 text-sm text-blue-600">
                                <span className="font-medium">Validation:</span> {requirements}
                        </div>
                );
        };

        const renderField = (field: any, index: number) => {
                switch (field.type) {
                        case "text":
                                return (
                                        <>
                                                <input type="text" className="w-full p-2 border rounded" disabled />
                                                {renderValidationRequirements(field)}
                                        </>
                                );
                        case "textarea":
                                return (
                                        <>
                                                <textarea className="w-full p-2 border rounded" rows={3} disabled></textarea>
                                                {renderValidationRequirements(field)}
                                        </>
                                );
                        case "email":
                                return (
                                        <>
                                                <input type="email" className="w-full p-2 border rounded" disabled />
                                                {renderValidationRequirements(field)}
                                        </>
                                );
                        case "number":
                                return (
                                        <>
                                                <input type="number" className="w-full p-2 border rounded" disabled />
                                                {renderValidationRequirements(field)}
                                        </>
                                );
                        case "tel":
                                return (
                                        <>
                                                <input type="tel" className="w-full p-2 border rounded" disabled />
                                                {renderValidationRequirements(field)}
                                        </>
                                );
                        case "date":
                                return (
                                        <>
                                                <input type="date" className="w-full p-2 border rounded" disabled />
                                                {renderValidationRequirements(field)}
                                        </>
                                );
                        case "time":
                                return (
                                        <>
                                                <input type="time" className="w-full p-2 border rounded" disabled />
                                                {renderValidationRequirements(field)}
                                        </>
                                );
                        case "url":
                                return (
                                        <>
                                                <input type="url" className="w-full p-2 border rounded" disabled />
                                                {renderValidationRequirements(field)}
                                        </>
                                );
                        case "checkbox":
                                return (
                                        <div className="flex items-center">
                                                <input type="checkbox" className="mr-2" disabled />
                                                <span>Yes</span>
                                        </div>
                                );
                        case "radio":
                                return (
                                        <div className="space-y-2">
                                                {field.options?.map((option: any, i: number) => {
                                                        const label =
                                                                typeof option === "string"
                                                                        ? option
                                                                        : option.label || option.text;
                                                        return (
                                                                <div key={i} className="flex items-center">
                                                                        <input
                                                                                type="radio"
                                                                                name={`field-${index}`}
                                                                                className="mr-2"
                                                                                disabled
                                                                        />
                                                                        <span>{DOMPurify.sanitize(label)}</span>
                                                                </div>
                                                        );
                                                })}
                                        </div>
                                );
                        case "select":
                                return (
                                        <div>
                                                <select className="w-full p-2 border rounded" disabled>
                                                        <option value="" disabled>
                                                                Select an option
                                                        </option>
                                                        {field.options?.map((option: any, i: number) => {
                                                                const label =
                                                                        typeof option === "string"
                                                                                ? option
                                                                                : option.label || option.text;
                                                                return (
                                                                        <option key={i} value={i}>
                                                                                {DOMPurify.sanitize(label)}
                                                                        </option>
                                                                );
                                                        })}
                                                </select>
                                        </div>
                                );
                        case "rating":
                                return (
                                        <div className="flex space-x-2">
                                                {[...Array(field.scale || 5)].map((_, i) => (
                                                        <button
                                                                key={i}
                                                                className="w-8 h-8 border rounded-full flex items-center justify-center"
                                                                disabled
                                                        >
                                                                {i + 1}
                                                        </button>
                                                ))}
                                        </div>
                                );
                        default:
                                return <input type="text" className="w-full p-2 border rounded" disabled />;
                }
        };

        // Sanitize form title and description
        const sanitizedTitle = DOMPurify.sanitize(schema.title);
        const sanitizedDescription = DOMPurify.sanitize(schema.description);

        // Add a notice about validation requirements if any exist
        const hasValidationRules = () => {
                if (schema.sections && schema.sections.length > 0) {
                        return schema.sections.some(section =>
                                section.fields.some(field => hasValidationRequirements(field))
                        );
                }
                return schema.fields?.some(field => hasValidationRequirements(field)) || false;
        };

        // Render form sections or fallback to fields if no sections
        const renderFormContent = () => {
                // Show validation notice at the top of the form
                const showValidationNotice = hasValidationRules();

                return (
                        <>
                                {showValidationNotice && (
                                        <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
                                                <h3 className="font-medium text-blue-700 flex items-center">
                                                        <svg className="w-5 h-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                                        </svg>
                                                        Form Validation
                                                </h3>
                                                <p className="mt-1 text-sm text-gray-700">
                                                        This form contains fields with validation requirements.
                                                        Fields with validation rules are highlighted with blue validation details.
                                                        These requirements will be preserved in the generated Google Form.
                                                </p>
                                        </div>
                                )}

                                {schema.sections && schema.sections.length > 0 ? (
                                        <>
                                                {schema.sections.map((section, sectionIndex) => {
                                                        // Check if this section has conditions
                                                        const hasConditions = section.conditions && section.conditions.length > 0;

                                                        return (
                                                                <div key={sectionIndex} className="mb-8 border-b pb-6">
                                                                        <h3 className="text-xl font-semibold mb-3">
                                                                                {DOMPurify.sanitize(section.title)}
                                                                        </h3>
                                                                        {section.description && (
                                                                                <p className="text-gray-600 mb-4">
                                                                                        {DOMPurify.sanitize(section.description)}
                                                                                </p>
                                                                        )}

                                                                        {/* Display condition information if this section is conditional */}
                                                                        {hasConditions && section.conditions && (
                                                                                <div className="bg-blue-50 border border-blue-200 rounded-md p-3 mb-4 text-sm">
                                                                                        <p className="text-blue-700 flex items-center font-medium">
                                                                                                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                                        <path d="M12 16V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                                                </svg>
                                                                                                Conditional Section
                                                                                        </p>
                                                                                        {section.conditions.map((condition: FormCondition, i: number) => (
                                                                                                <p key={i} className="text-gray-700 ml-6 mt-1">
                                                                                                        Shows when: "{condition.fieldId}" {condition.equals ? "is" : "is not"} "{condition.equals || condition.notEquals}"
                                                                                                </p>
                                                                                        ))}
                                                                                </div>
                                                                        )}

                                                                        <div className="space-y-4">
                                                                                {section.fields.map((field, fieldIndex) => (
                                                                                        <div
                                                                                                key={fieldIndex}
                                                                                                className="p-4 bg-white border rounded-md"
                                                                                        >
                                                                                                <label className="block text-lg font-medium mb-2">
                                                                                                        {DOMPurify.sanitize(
                                                                                                                field.label
                                                                                                        )}
                                                                                                        {field.required && (
                                                                                                                <span className="text-red-500 ml-1">
                                                                                                                        *
                                                                                                                </span>
                                                                                                        )}
                                                                                                </label>
                                                                                                {renderField(field, fieldIndex)}
                                                                                        </div>
                                                                                ))}
                                                                        </div>
                                                                </div>
                                                        );
                                                })}
                                        </>
                                ) : (
                                        // Fallback to the old fields array for backward compatibility
                                        <>
                                                {schema.fields?.map((field, index) => (
                                                        <div key={index} className="mb-6 p-4 bg-white border rounded-md">
                                                                <label className="block text-lg font-medium mb-2">
                                                                        {DOMPurify.sanitize(field.label)}
                                                                        {field.required && (
                                                                                <span className="text-red-500 ml-1">*</span>
                                                                        )}
                                                                </label>
                                                                {renderField(field, index)}
                                                        </div>
                                                ))}
                                        </>
                                )}
                        </>
                );
        };

        return (
                <div className="bg-white rounded-lg shadow-lg max-w-4xl mx-auto">
                        <div className="p-6">
                                <h1 className="text-3xl font-bold mb-2">{sanitizedTitle}</h1>
                                <p className="text-gray-600 mb-6">{sanitizedDescription}</p>

                                {/* Form Preview */}
                                <div className="border rounded-lg p-6 bg-gray-50 mb-8">
                                        <h2 className="text-lg font-medium text-gray-700 mb-4">Form Preview</h2>
                                        {renderFormContent()}
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                                        <div>
                                                {!showRevisionForm && (
                                                        <button
                                                                onClick={() => setShowRevisionForm(true)}
                                                                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                                                                disabled={isLoading}
                                                        >
                                                                {revisionsRemaining === null
                                                                        ? "Revise Form"
                                                                        : `Revise Form (${revisionsRemaining} left)`}
                                                        </button>
                                                )}
                                        </div>
                                        <div className="flex gap-4">
                                                {formId ? (
                                                        <FormFinalizeButton
                                                                formId={formId}
                                                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                                        />
                                                ) : (
                                                        <button
                                                                onClick={onAccept}
                                                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                                                disabled={isLoading}
                                                        >
                                                                {isLoading ? "Processing..." : "Create Google Form"}
                                                        </button>
                                                )}
                                        </div>
                                </div>

                                {/* Revision Form */}
                                {showRevisionForm && (
                                        <div className="mt-6 border-t pt-6">
                                                <h3 className="text-lg font-medium mb-2">Make changes</h3>
                                                <form onSubmit={handleRevisionSubmit}>
                                                        <textarea
                                                                className="w-full p-3 border rounded mb-4"
                                                                rows={3}
                                                                value={revisionPrompt}
                                                                onChange={(e) => setRevisionPrompt(e.target.value)}
                                                                placeholder="Describe the changes you want to make to the form"
                                                        ></textarea>
                                                        <div className="flex justify-end gap-2">
                                                                <button
                                                                        type="button"
                                                                        onClick={() => setShowRevisionForm(false)}
                                                                        className="px-4 py-2 border rounded"
                                                                >
                                                                        Cancel
                                                                </button>
                                                                <button
                                                                        type="submit"
                                                                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                                                        disabled={!revisionPrompt.trim()}
                                                                >
                                                                        Submit Revision
                                                                </button>
                                                        </div>
                                                </form>
                                        </div>
                                )}
                        </div>
                </div>
        );
};

export default FormBuilder;

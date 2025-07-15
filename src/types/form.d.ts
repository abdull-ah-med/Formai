declare module "@/components/ui/button";
declare module "@/auth/authHelper";

// Form field option type
type FormOption = string | { text?: string; label?: string };

// Condition interface for conditional logic
export interface FormCondition {
        fieldId: string;
        equals?: string;
        notEquals?: string;
}

// Form field interface
export interface FormField {
        label: string;
        type: string;
        required?: boolean;
        scale?: number;
        options?: FormOption[];
        // Validation properties
        minLength?: number;
        maxLength?: number;
        min?: number;
        max?: number;
}

// Form section interface
export interface FormSection {
        title: string;
        description?: string;
        fields: FormField[];
        conditions?: FormCondition[];
}

// Question interface for history form schemas
export interface FormQuestion {
        id: string;
        type: "short_answer" | "dropdown";
        label: string;
        options?: {
                id: string;
                text: string;
        }[];
        conditions?: {
                dependsOn: string; // id of the question this depends on
                operator: string;  // equals or notEquals
                value: string;     // value to compare
        }[];
}

// Complete form schema
export interface FormSchema {
        title: string;
        description: string;
        fields: FormField[]; // For backward compatibility
        sections?: FormSection[]; // New sections structure
        questions?: FormQuestion[]; // For history items
}

// API response interfaces
export interface GenerateFormResponse {
        success: boolean;
        data: {
                formId: string;
                schema: FormSchema;
        };
        error?: string;
}

export interface ReviseFormResponse {
        success: boolean;
        data: {
                formId: string;
                schema: FormSchema;
                revisionsRemaining: number | null;
        };
        error?: string;
}

export interface FinalizeFormResponse {
        success: boolean;
        data: {
                formId: string;
                googleFormUrl: string;
                schema: FormSchema;
        };
        error?: string;
}

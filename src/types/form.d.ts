declare module "@/components/ui/button";
declare module "@/auth/authHelper";

// Form field option type
type FormOption = string | { text?: string; label?: string };

// Form field interface
interface FormField {
        label: string;
        type: string;
        required?: boolean;
        scale?: number;
        options?: FormOption[];
}

// Complete form schema
export interface FormSchema {
        title: string;
        description: string;
        fields: FormField[];
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

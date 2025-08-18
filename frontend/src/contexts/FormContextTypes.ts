import { FormSchema } from "../types/form";

export interface FormContextType {
        formSchema: FormSchema | null;
        formId: string | null;
        setFormData: (schema: FormSchema | null, id: string | null) => void;
        clearFormData: () => void;
}

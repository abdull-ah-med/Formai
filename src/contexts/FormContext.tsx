import React, { createContext, useState, useContext, ReactNode } from "react";
import { FormSchema } from "../types/form";

interface FormContextType {
        formSchema: FormSchema | null;
        formId: string | null;
        setFormData: (schema: FormSchema | null, id: string | null) => void;
        clearFormData: () => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
        const [formSchema, setFormSchema] = useState<FormSchema | null>(null);
        const [formId, setFormId] = useState<string | null>(null);

        const setFormData = (schema: FormSchema | null, id: string | null) => {
                setFormSchema(schema);
                setFormId(id);

                // Save to localStorage for persistence
                if (schema && id) {
                        localStorage.setItem("formSchema", JSON.stringify(schema));
                        localStorage.setItem("formId", id);
                }
        };

        const clearFormData = () => {
                setFormSchema(null);
                setFormId(null);
                localStorage.removeItem("formSchema");
                localStorage.removeItem("formId");
        };

        // Load from localStorage on initial render
        React.useEffect(() => {
                try {
                        const savedSchema = localStorage.getItem("formSchema");
                        const savedId = localStorage.getItem("formId");

                        if (savedSchema && savedId) {
                                setFormSchema(JSON.parse(savedSchema));
                                setFormId(savedId);
                        }
                } catch (error) {
                        console.error("Error loading form data from localStorage:", error);
                }
        }, []);

        return (
                <FormContext.Provider value={{ formSchema, formId, setFormData, clearFormData }}>
                        {children}
                </FormContext.Provider>
        );
};

export const useForm = (): FormContextType => {
        const context = useContext(FormContext);
        if (context === undefined) {
                throw new Error("useForm must be used within a FormProvider");
        }
        return context;
};

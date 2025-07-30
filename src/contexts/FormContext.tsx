import React, { ReactNode, useState, useEffect } from "react";
import { FormSchema } from "../types/form";
import { useAuth } from "../hooks/useAuth";
import { FormContext } from "./FormContextDefinition";

export const FormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
        const [formSchema, setFormSchema] = useState<FormSchema | null>(null);
        const [formId, setFormId] = useState<string | null>(null);
        const { user } = useAuth();

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
                } catch {
                        // Ignore errors loading form data from localStorage
                }
        }, []);

        // Clear form data when user changes
        useEffect(() => {
                clearFormData();
        }, [user?._id]);

        return (
                <FormContext.Provider value={{ formSchema, formId, setFormData, clearFormData }}>
                        {children}
                </FormContext.Provider>
        );
};

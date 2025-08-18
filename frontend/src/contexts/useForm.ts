import { useContext } from "react";
import { FormContext } from "./FormContextDefinition";
import { FormContextType } from "./FormContextTypes";

export const useForm = (): FormContextType => {
        const context = useContext(FormContext);
        if (context === undefined) {
                throw new Error("useForm must be used within a FormProvider");
        }
        return context;
};

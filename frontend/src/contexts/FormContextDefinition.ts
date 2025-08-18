import { createContext } from "react";
import { FormContextType } from "./FormContextTypes";

export const FormContext = createContext<FormContextType | undefined>(undefined);

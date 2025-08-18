import { FormField } from "../types/form";

/**
 * Validates a form field value based on its type and validation rules
 * 
 * @param field The form field definition with validation rules
 * @param value The value to validate
 * @returns An object with isValid flag and error message if invalid
 */
export function validateField(field: FormField, value: any): { isValid: boolean; errorMessage?: string } {
  // Handle empty values for required fields
  if (field.required && (value === undefined || value === null || value === "")) {
    return { isValid: false, errorMessage: "This field is required" };
  }

  // Skip validation if value is empty and field is not required
  if (value === undefined || value === null || value === "") {
    return { isValid: true };
  }

  switch (field.type) {
    case "text":
    case "textarea": {
      const stringValue = String(value);
      
      if (field.minLength !== undefined && stringValue.length < field.minLength) {
        return { 
          isValid: false, 
          errorMessage: `Must be at least ${field.minLength} characters` 
        };
      }
      
      if (field.maxLength !== undefined && stringValue.length > field.maxLength) {
        return { 
          isValid: false, 
          errorMessage: `Cannot exceed ${field.maxLength} characters` 
        };
      }
      
      return { isValid: true };
    }
    
    case "email": {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(String(value))) {
        return { isValid: false, errorMessage: "Please enter a valid email address" };
      }
      return { isValid: true };
    }
    
    case "number": {
      const numValue = Number(value);
      
      if (isNaN(numValue)) {
        return { isValid: false, errorMessage: "Please enter a valid number" };
      }
      
      if (field.min !== undefined && numValue < field.min) {
        return { isValid: false, errorMessage: `Value must be at least ${field.min}` };
      }
      
      if (field.max !== undefined && numValue > field.max) {
        return { isValid: false, errorMessage: `Value cannot exceed ${field.max}` };
      }
      
      return { isValid: true };
    }
    
    case "tel": {
      // Basic phone validation - can be customized based on regional requirements
      const phoneRegex = /^\+?[0-9]{10,15}$/;
      if (!phoneRegex.test(String(value).replace(/\s+/g, ''))) {
        return { isValid: false, errorMessage: "Please enter a valid phone number" };
      }
      return { isValid: true };
    }
    
    case "url": {
      try {
        new URL(String(value));
        return { isValid: true };
      } catch {
        return { isValid: false, errorMessage: "Please enter a valid URL" };
      }
    }
    
    // For checkbox, radio, select, date, time - basic presence validation is enough
    default:
      return { isValid: true };
  }
}

/**
 * Extracts validation requirements from a field as human-readable text
 * 
 * @param field The form field to extract validation requirements from
 * @returns A string describing the validation requirements or empty string if none
 */
export function getValidationRequirements(field: FormField): string {
  const requirements: string[] = [];
  
  if (field.required) {
    requirements.push("Required");
  }
  
  if (field.minLength !== undefined) {
    requirements.push(`Min length: ${field.minLength}`);
  }
  
  if (field.maxLength !== undefined) {
    requirements.push(`Max length: ${field.maxLength}`);
  }
  
  if (field.min !== undefined) {
    requirements.push(`Min value: ${field.min}`);
  }
  
  if (field.max !== undefined) {
    requirements.push(`Max value: ${field.max}`);
  }
  
  return requirements.join(" | ");
}

/**
 * Checks if a field has any validation requirements
 */
export function hasValidationRequirements(field: FormField): boolean {
  return field.required === true || 
         field.minLength !== undefined || 
         field.maxLength !== undefined ||
         field.min !== undefined ||
         field.max !== undefined;
} 
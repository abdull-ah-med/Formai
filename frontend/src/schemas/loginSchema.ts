import * as yup from "yup";

// Improved login schema with better validation
const loginSchema = yup.object().shape({
        email: yup
                .string()
                .email("Invalid email format")
                .required("Email is required")
                .trim()
                .lowercase()
                .max(100, "Email must be less than 100 characters")
                .matches(
                        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        "Invalid email address format"
                ),
        password: yup
                .string()
                .required("Password is required")
                .min(8, "Password must be at least 8 characters")
                .max(100, "Password too long")
                .matches(/\S+/, "Password cannot contain only whitespace"),
        rememberMe: yup.boolean().optional(),
});

export default loginSchema;

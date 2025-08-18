import * as yup from "yup";
const signUpSchema = yup.object().shape({
        fullName: yup
                .string()
                .required("Full name is required")
                .min(3, "Full name must be at least 3 characters long")
                .matches(
                        /^[a-zA-Z\s]+$/,
                        "Full name must contain only letters and spaces"
                ),
        email: yup
                .string()
                .email("Invalid email")
                .required("Email is required")
                .min(3, "Email must be at least 3 characters long")
                .max(50, "Email must be less than 50 characters long")
                .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address"),
        password: yup
                .string()
                .required("Password is required")
                .min(8, "Password must be at least 8 characters long")
                .max(50, "Password must be less than 50 characters long")
                .matches(
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
                        "Password must contain at least one uppercase letter, one lowercase letter and one number"
                ),
        confirmPassword: yup
                .string()
                .oneOf([yup.ref("password")], "Passwords must match")
                .required("Confirm password is required"),
});
export default signUpSchema;

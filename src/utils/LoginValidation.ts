import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address. Please enter a valid email address.")
    .required("Email is required."),
  password: yup.string().min(8).required("Password is required."),
});

export type LoginCredentials = yup.InferType<typeof loginSchema>;

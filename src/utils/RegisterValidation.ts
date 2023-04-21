import * as yup from "yup";

export const registerSchema = yup.object().shape({
  name: yup.string().min(3).max(20).required("Name is required"),
  email: yup.string().email().required("Email is required"),
  password: yup.string().min(8).max(15).required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

export type RegisterCredentials = yup.InferType<typeof registerSchema>;

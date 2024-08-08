import { z } from "zod";

/**
 * login form validation schema
 */
const LoginSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string().min(1, {
        message: "Password is required"
    })
})

/**
 * register form validation schema
 */
const RegisterSchema = z.object({
    name: z.string().min(1, {
        message: "Name is required"
    }),
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string().min(6, {
        message: "A min of 6 characters is required"
    })
})

/**
 * register form validation schema
 */
const ResetSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    }),
})

export default {
    LoginSchema,
    RegisterSchema,
    ResetSchema,
}

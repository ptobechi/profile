"use server";

import { signIn } from "@/auth";
import { getUserEmail } from "@/data/user";
import { sendVerificationToken } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import Schemas from "@/schema";
import { AuthError } from "next-auth";
import * as z from "zod";

export const login = async (values: z.infer<typeof
    Schemas.LoginSchema>) => {
    const validatedValues = Schemas.LoginSchema.safeParse(values);

    if (!validatedValues.success)
        return {error: "Invalid fields!"}

    const {email, password} = validatedValues.data;

    const existingUser = await getUserEmail(email);

    if (!existingUser || !existingUser.email || !existingUser.password)
        return {error: "User does not exists"}

    if (!existingUser.emailVerified) {
        const verificationToken = await generateVerificationToken(
            existingUser.email
        )

        await sendVerificationToken(
            email,
            verificationToken.token
        )

        return {success: "Email verification sent!"}
    }

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT
        })


    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return {error: "Invalid credentials"}
                default:
                    return {error: "Login Failed"}
            }
        }
        throw error
    }

    return {error: "Unknown error occured!"}

}

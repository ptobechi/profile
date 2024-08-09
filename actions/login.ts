"use server";

import { signIn } from "@/auth";
import { getUserEmail } from "@/data/user";
import { getTwoFactorConfirmationByUserId, getTwoFactorTokenByEmail } from "@/data/verification-token";
import { db } from "@/lib/db";
import { sendTwoFactorTokenEmail, sendVerificationToken } from "@/lib/mail";
import { generateTwoFactorToken, generateVerificationToken } from "@/lib/tokens";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import Schemas from "@/schema";
import { AuthError } from "next-auth";
import * as z from "zod";

export const login = async (values: z.infer<typeof
    Schemas.LoginSchema>) => {
    const validatedValues = Schemas.LoginSchema.safeParse(values);

    if (!validatedValues.success)
        return {error: "Invalid fields!"}

    const {email, password, code} = validatedValues.data;

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

    if (existingUser.isTwoFactorEnabled && existingUser.email) {
        if (code) {
            const _2fa = await getTwoFactorTokenByEmail(existingUser.email);

            if (!_2fa) return {error: "Invalid Code"}

            if (_2fa.token !== code) return {error: "Invalid Code"}

            const hasExpired = new Date(_2fa.expires) < new Date();

            if (hasExpired) return {error: "Code expired"};

            const _2faConfirmation = await getTwoFactorConfirmationByUserId(
                existingUser.id
            )

            if (_2faConfirmation) {
                await db.twoFactorConfirmation.delete({
                    where:{
                        id: _2faConfirmation.id
                    }
                })
            }

            await db.twoFactorConfirmation.create({
                data: {
                    userId: existingUser.id
                }
            })
        } else {
            const _2fa = await generateTwoFactorToken(existingUser.email);

            await sendTwoFactorTokenEmail(
                _2fa.email,
                _2fa.token
            );
    
            return {twoFactorEnabled: true}
        }
    }

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT
        })

    } catch (error) {
        if (error instanceof AuthError) {
            console.log(error.type)
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

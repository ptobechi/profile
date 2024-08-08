"use server";

import { getUserEmail } from "@/data/user";
import { db } from "@/lib/db";
import { sendVerificationToken } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import Schemas from "@/schema";
import * as z from "zod";

export const register = async (values: z.infer<typeof
    Schemas.RegisterSchema>) => {
    const validatedValues = Schemas.RegisterSchema.safeParse(values);

    if (!validatedValues.success)
        return {error: "Invalid fields!"}

    const {email, name, password} = validatedValues.data;

    const existingUser = await getUserEmail(email);

    if (existingUser)
        return {error: "User already exist!"}


    await db.user.create({
        data: {
            email,
            name,
            password,
        },
    })

    //send verification link use resend.com
    const verificationToken = await generateVerificationToken(email);

    await sendVerificationToken(
        email,
        verificationToken.token
    )

    return {success: "Registration Successful, check inbox for confirmation link!"}
}

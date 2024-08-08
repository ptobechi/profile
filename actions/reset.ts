"use server"

import { getUserEmail } from "@/data/user";
import { sendResetPassworLink } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import schema from "@/schema"
import * as z from "zod"

export const reset = async (values: z.infer<typeof
    schema.ResetSchema>
) => {
    const validatedValues = schema.ResetSchema.safeParse(values);

    if (!validatedValues.success) return {error: "Invalid Email"}

    const {email} = validatedValues.data

    const existingUser = await getUserEmail(email);

    if (!existingUser) return {error: "Email does not exist"}

    const token = generateVerificationToken(email);

    await sendResetPassworLink(email, token)

    return {success: "Verification link sent"}

}

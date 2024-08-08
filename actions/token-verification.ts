"use server"

import { getUserEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token"
import { db } from "@/lib/db";

/**
 * tokenVerification - email login or registration verify user token
 * @param {String} token 
 * @returns {Object}
 */
export const tokenVerification = async (token: string) => {
    // get existing token from db where token match
    const existingToken = await getVerificationTokenByToken(token);

    // return if token does not exist
    if (!existingToken) return {error: "Token does not exist!"}

    // check for if token is expired.
    const hasExpired = new Date(existingToken.expires) < new Date();

    // return if token is expired
    if (hasExpired) return {error: "Expired token!"}

    // check is user associated to the token is a valid email
    const existingUser = getUserEmail(existingToken.email);

    // return if email change
    if (!existingUser) return {error: "Email does not exist!"}

    await db.user.update({
        where:{
            email: existingToken.email
        },
        data:{
            emailVerified: new Date(),
            email: existingToken.email
        }
    })

    await db.verificationToken.delete({
        where:{id: existingToken.id}
    })

    return {success: "Token verified!"}
}

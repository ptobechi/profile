import { db } from "@/lib/db"

/**
 * getVerificationTokenByEmail - search for user verification token
 * on db
 * @param email: string to search for in email fiend
 * @return verification token | null
 */
export const getVerificationTokenByEmail = async (
    email: string
) => {
    try {
        const verificationToken = await db.verificationToken.findFirst({
            where: {
              email 
            }
        })
        return verificationToken;
    } catch {
        return null
    }
}

/**
 * getVerificationTokenByToken - search for user verification token
 * on db
 * @param token: string to search for in token fiend
 * @return verification token | null
 */
export const getVerificationTokenByToken = async (
    token: string
) => {
    try {
        const verificationToken = await db.verificationToken.findUnique({
            where: {
              token 
            }
        })
        return verificationToken;
    } catch {
        return null
    }
}
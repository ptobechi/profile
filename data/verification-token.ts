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

/**
 * getTwoFactorTokenByToken - search db for 2fa token
 * where token match the arg
 * @param {String} token 
 * @returns {String}
 */
export const getTwoFactorTokenByToken = async (
    token: string
) => {
    try {
        const twoFactorToken = await db.twoFactorToken.findUnique({
            where: {
              token 
            }
        })
        return twoFactorToken;
    } catch {
        return null
    }
}

/**
 * getTwoFactorTokenByEmail - search db for where 2fa
 * matches email arg
 * 
 * @param {String} email 
 * @returns {String}
 */
export const getTwoFactorTokenByEmail = async (
    email: string
) => {
    try {
        const twoFactorToken = await db.twoFactorToken.findFirst({
            where: {
              email 
            }
        })
        return twoFactorToken;
    } catch {
        return null
    }
}

/**
 * getTwoFactorConfirmationByUserId - returns token where userid
 * @param {String} userId 
 * @returns {String} 
 */
export const getTwoFactorConfirmationByUserId = async (
    userId: string
) => {
    try {
        const twoFactorToken = await db.twoFactorConfirmation.findUnique({
            where: {
              userId 
            }
        })
        return twoFactorToken;
    } catch {
        return null
    }
}
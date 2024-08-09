import { getTwoFactorTokenByEmail, getVerificationTokenByEmail } from "@/data/verification-token";
import {v4 as uuidv4} from "uuid"
import { db } from "@/lib/db";
import crypto from "crypto"
/**
 * generateVerificationToken - generate random tokens for verification
 * purposes
 * @param email 
 */
export const generateVerificationToken = async (
    email: string
) => {
    const token = uuidv4();

    // expires in 30 mins
    const expires = new Date(new Date().getTime() + 30 * 60 * 10000);

    const existingToken = await getVerificationTokenByEmail(email);

    if (existingToken) {
        await db.verificationToken.delete({
            where: {
                id: existingToken.id
            }
        })
    }

    const verificationToken = await db.verificationToken.create({
        data: {
            email,
            token,
            expires
        }
    })

    return verificationToken
}

/**
 * generateTwoFactorToken - generate token for 2fa auth
 * @param {String} email
 * @returns {String}
 */
export const generateTwoFactorToken = async (
    email: string
) => {
    const token = crypto.randomInt(100_00, 1_000_000).toString();

    // expires in 5 mins
    const expires = new Date(new Date().getTime() + 5 * 60 * 1000);

    const existingToken = await getTwoFactorTokenByEmail(email);

    if (existingToken) {
        await db.twoFactorToken.delete({
            where: {
                id: existingToken.id
            }
        })
    }

    const twoFactorToken = await db.twoFactorToken.create({
        data: {
            email,
            token,
            expires
        }
    })

    return twoFactorToken
}

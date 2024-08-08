import { getVerificationTokenByEmail } from "@/data/verification-token";
import {v4 as uuidv4} from "uuid"
import { db } from "@/lib/db";
/**
 * generateVerificationToken - generate random tokens for verification
 * purposes
 * @param email 
 */
export const generateVerificationToken = async (
    email: string
) => {
    const token = uuidv4();

    const expires = new Date(new Date().getTime() + 36000 * 10000);

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

import { db } from "@/lib/db";

/**
 * getUserEmail - returns user information from db
 * @param email: email to lookup in db
 * @returns user || null
 */
export const getUserEmail = async (email: string) => {
    try {
        const user = await db.user.findFirst({
            where: {
                email
            }
        })
        return user;
    } catch {
        return null;
    }
}

/**
 * getUserByID - returns user information from db
 * @param id: id to lookuo in the db
 * @returns user || null
 */
export const getUserByID = async (id: string) => {
    try {
        const user = await db.user.findUnique({
            where: {
                id
            }
        })
        return user;
    } catch {
        return null;
    }
}

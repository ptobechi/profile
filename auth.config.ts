import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import schema from "@/schema"
import { getUserEmail } from "@/data/user"
import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"


export default { 
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        GitHub({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET
        }),
        Credentials({
            async authorize(credentials) {
                const validatedFields 
                    = schema.LoginSchema.safeParse(credentials)

                if (validatedFields.success) {
                    const {email, password} = validatedFields.data;

                    const user = await getUserEmail(email);

                    if (!user || !user.password) return null

                    if (password === user.password) return user;
                }
                return null
            }
        })
    ] 
} satisfies NextAuthConfig

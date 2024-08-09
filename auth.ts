import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import authConfig from "@/auth.config"
import { db } from "@/lib/db"
import { getUserByID } from "@/data/user"
import { UserRole } from "@prisma/client"
import { getTwoFactorConfirmationByUserId } from "./data/verification-token"



export const {
  auth,
  signIn,
  signOut,
  handlers,
} = NextAuth({
  pages: {
    signIn: '/login',
    error: '/error'
  },
  events: {
    async linkAccount({user}) {
      await db.user.update({
        where: {id: user.id},
        data: {emailVerified: new Date()}
      })
    },
  },
  callbacks: {
    async signIn({user, account}) {
      //Allow OAUTH if without email verification
      if (account?.provider !== 'credentials') return true

      if (!user.id) return false

      const existingUser = await getUserByID(user.id)

      if (!existingUser) return false

      // prevent login without email verification
      if (!existingUser.emailVerified) return false

      // TODO: Add 2FA authentication
      if (existingUser.isTwoFactorEnabled) {
        const _2fa =  await getTwoFactorConfirmationByUserId(existingUser.id)

        if (!_2fa) return false

        // Delete 2fa for next login
        await db.twoFactorConfirmation.delete({
          where:{
            id: _2fa.id
          }
        })
      }
      return true
    },
    async jwt({token}) {
      if (!token.sub) return token;

      const existingUser = await getUserByID(token.sub);

      if (existingUser)
          token.role = existingUser.role

      return token;
    },
    async session({token, session}) {
      if (token.sub && session.user)
          session.user.id = token.sub
      
      if (token.role && session.user)
          session.user.role = token.role as UserRole

      return session
    }
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
})

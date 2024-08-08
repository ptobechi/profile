import NextAuth, {type DefaultSession} from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import authConfig from "@/auth.config"
import { db } from "@/lib/db"
import { getUserByID } from "@/data/user"
import { UserRole } from "@prisma/client"

type ExtendedUser = DefaultSession["user"] & {
  role: UserRole,
}
declare module "next-auth" {
  interface Session {
    user: ExtendedUser
  }
}

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

      // Generate Token
      const existingUser = await getUserByID(user.id)

      if (!existingUser?.emailVerified) return false

      // TODO: Add 2FA authentication
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
import NextAuth from "next-auth";
import "next-auth/jwt";
import Google from "next-auth/providers/google";
import { queries } from "./lib/server/db";

export const { handlers, auth, signIn, signOut } = NextAuth({
    debug: process.env.NODE_ENV !== "production",
    providers: [Google],
    session: { strategy: "jwt" },
    callbacks: {
        async signIn({ user, account }) {
            if (!user.email || !account?.providerAccountId) {
                return false
            }
            const existingUser = await queries.getUserByEmail({email: user.email});
            if (!existingUser) {
                // If the user doesn't exist, create a new user
                user.id = await queries.createUser({
                    email: user.email,
                    googleId: account.providerAccountId,
                    passwordHash: null,
                });

                await queries.createPlan({userId: user.id})
                await queries.createUserPreferences({userId: user.id})
            } else {
                user.id = existingUser.id
            }
            return true;
        },
        authorized({ request, auth }) {
            const { pathname } = request.nextUrl
            if (pathname === "/middleware-example") return !!auth
            return true
        },
        jwt({ token, user }) {
            if (user) {
                token.id = user.id
            }
            return token
        },
        async session({ session, token }) {
            session.user.id = token.id as string
            if (token?.accessToken) session.accessToken = token.accessToken
            return session
        },
    },
})

declare module "next-auth" {
    interface Session {
        accessToken?: string
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        accessToken?: string
    }
}
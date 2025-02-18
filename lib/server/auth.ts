import "server-only"
import { db, queries } from "@/lib/server/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { createAuthMiddleware, } from "better-auth/api";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
        usePlural: true
    }),
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }
    },
    hooks: {
        after: createAuthMiddleware(async (ctx) => {
            const newSession = ctx.context.newSession;
            if (newSession) {
                const userId = newSession.user.id;
                const plan = await queries.getUserPlan({ userId })
                if (!plan) {
                    await queries.createUserPlan({ userId: newSession.user.id })
                }
                const preferences = await queries.getUserPreferences({ userId })
                if (!preferences) {
                    await queries.createUserPreferences({ userId: newSession.user.id })
                }
            }
        }),
    },
    advanced: {
        useSecureCookies: process.env.NODE_ENV !== "development",
    },
    plugins: [nextCookies()]
});
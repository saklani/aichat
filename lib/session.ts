"use server"

import * as auth from "@/lib/auth";

export async function getSession(): Promise<{id:string; email: string} | null> {
    const sessionToken = await auth.getSession()
    if (sessionToken) {
        const { user } = await auth.validateSessionToken(sessionToken.value)
        return user
    }
    return null
}
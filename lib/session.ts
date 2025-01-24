import * as auth from "@/lib/auth";
import { NextRequest } from "next/server";

export async function getSession(): Promise<{id:string; email: string} | null> {
    const sessionCookie = await auth.getSession()
    if (sessionCookie) {
        const { user } = await auth.validateSessionToken(sessionCookie.value)
        return user
    }
    return null
}

export async function getSessionFromRequest(request: NextRequest): Promise<{id:string; email: string} | null> {
    const sessionCookie = request.cookies.get(auth.sessionCookieName)
    if (sessionCookie) {
        const { user } = await auth.validateSessionToken(sessionCookie.value)
        return user
    }
    return null
}
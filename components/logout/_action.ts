"use server"
import * as auth from "@/lib/auth";
import { redirect } from "next/navigation";

type LogoutResponse = { error: string }

export async function logout(): Promise<LogoutResponse> {
    const sessionToken = await auth.getSession()
    if (sessionToken) {
        const { session } = await auth.validateSessionToken(sessionToken.value)
        if (session) {
            await auth.invalidateSession(session.id);
            auth.deleteSessionTokenCookie();
            return redirect("/login")
        }
    }

    return {error: "failed"}
}
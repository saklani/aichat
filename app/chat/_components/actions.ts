"use server"
import { checkSession } from "@/lib/server/auth";
import * as auth from "@/lib/server/auth"
import { queries } from "@/lib/db";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function getChats() {
    const session = await checkSession()
    if (!session) {
        return []
    }
    const { id: userId } = session
    const { response, error } = await queries.getChatsByUserId({ userId })
    if (error) {
        console.error(error)
        return []
    }
    return response
}


export async function getUserEmail() {
    const session = await checkSession()
    if (!session) {
        return null
    }
    const { id: userId } = session
    const { response, error } = await queries.getUser({ id: userId })
    if (error || !response) {
        return null
    }
    return response.email
}

export async function deleteChat({ id }: { id: string }) {
    const session = await checkSession()
    if (!session) {
        return { error: "Unauthorized" }
    }
    const { id: userId } = session
    const { error } = await queries.deleteChat({ id, userId })
    if (error) {
        console.error(error)
        return { error: "Internal server error" }
    }
    return
}


type ActionResponse = Promise<{ error: string }>

export async function logout(): ActionResponse {
    const sessionToken = await auth.getSession()
    if (sessionToken) {
        const { session } = await auth.validateSessionToken(sessionToken.value)
        if (session) {
            await auth.invalidateSession(session.id);
            auth.deleteSessionTokenCookie();
            revalidatePath("/")
            return redirect("/login")
        }
    }

    return { error: "failed" }
}
"use server"

import * as auth from "@/lib/auth";
import { queries } from "@/lib/db";
import { getSession } from "@/lib/session";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type ActionResponse = Promise<{ error: string }>

export async function getChats() {
    const session = await getSession()
    if (!session) {
        return []
    }
    const { id: userId } = session
    const { response } = await queries.getChatsByUserId({ userId })
    return response
}


export async function getChat({ id }: { id: string }) {
    const session = await getSession()
    if (!session) {
        return []
    }
    const { id: userId } = session
    const { response, error } = await queries.getMessagesByChatId({ chatId: id })
    if (error) {
        console.error(error)
        return []
    }
    return response
}


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
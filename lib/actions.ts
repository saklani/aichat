import { getSession } from "./session"
import * as db from "@/lib/db/queries"

export async function getMessagesById(id: string) {
    const session = await getSession()
    if (!session) {
        return []
    }
    const { id: _ } = session

    return await db.getMessagesByAgentId({ id })
}

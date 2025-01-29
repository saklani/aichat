import { getSession } from "@/lib/session";
import * as db from "@/lib/db/queries"

export async function getAgents() {
    const session = await getSession()
    if (!session) {
        return []
    }
    const { id: userId } = session
    return await db.getAgentsByUserId({ userId })
}

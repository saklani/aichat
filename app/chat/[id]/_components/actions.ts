import { checkSession, getSession } from "@/lib/server/auth"
import { queries } from "@/lib/server/db"

export async function getChat({ id }: { id: string }) {
    const session = await getSession()
    if (!session) {
        return []
    }
    return queries.getMessagesByChatId({ chatId: id })
}
import { checkSession } from "@/lib/server/auth"
import { queries } from "@/lib/db"

export async function getChat({ id }: { id: string }) {
    const session = await checkSession()
    if (!session) {
        return []
    }
    const { response, error } = await queries.getMessagesByChatId({ chatId: id })
    if (error) {
        console.error(error)
        return []
    }
    return response
}
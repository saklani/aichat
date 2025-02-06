import { queries, schema } from '@/lib/db';
import { checkSession } from '@/lib/server/auth';
import { generateTitleFromUserMessage } from '@/lib/utils';
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { randomUUID } from 'crypto';

export const maxDuration = 60;

export async function POST(req: Request) {
    const session = await checkSession()
    if (!session) {
        return new Response("Unauthorized", { status: 401 })
    }
    const { id: userId } = session
    const { id, messages }: { id: string, messages: schema.Message[] } = await req.json()

    const message = messages.at(-1)!
    const getChatResult = await queries.getChat({ id, userId })
    if (getChatResult.error) {
        return new Response("Internal server error", { status: 500 })
    }
    if (getChatResult.response?.length === 0) {
        const title = await generateTitleFromUserMessage({ message: message.content })
        const createChatResult = await queries.createChat({ id, title, userId })
        if (createChatResult.error) {
            return new Response("Internal server error", { status: 500 })
        }
    }

    const createMessageResult = await queries.createMessage({ ...messages[messages.length - 1], chatId: id, id: randomUUID() })
    if (createMessageResult.error) {
        return new Response("Internal server error", { status: 500 })
    }

    const result = streamText({
        model: openai('gpt-4o-mini'),
        messages,
        onFinish: ({ text }) => {
            queries.createMessage({ content: text, role: "assistant", chatId: id, id: randomUUID() })
        }
    })
    return result.toDataStreamResponse()
}

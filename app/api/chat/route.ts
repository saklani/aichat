import { queries, schema } from '@/lib/db';
import { search } from '@/lib/pinecone';
import { getSession } from '@/lib/session';
import { openai } from '@ai-sdk/openai';
import {
    streamText,
    tool
} from 'ai';
import { randomUUID } from 'crypto';
import { z } from 'zod';

export const maxDuration = 60;

export async function POST(req: Request) {
    const session = await getSession()
    if (!session) {
        return new Response("Unauthorized", { status: 401 })
    }
    const { id: userId } = session
    const { id, messages }: { id: string, messages: Omit<schema.Message, "id">[] } = await req.json()

    const getChatResult = await queries.upsertChat({ id, name: "", userId })
    if (getChatResult.error) {
        return new Response("Internal server error", { status: 500 })
    }

    const createMessageResult = await queries.createMessage({ ...messages[messages.length - 1], chatId: id, id: randomUUID() })
    if (createMessageResult.error) {
        return new Response("Internal server error", { status: 500 })
    }

    const result = streamText({
        model: openai('gpt-4o-mini'),
        messages,
        tools: {
            addResource: tool({
                description: `add a resource to your knowledge base.
                  If the user provides a random piece of knowledge unprompted, use this tool without asking for confirmation.`,
                parameters: z.object({
                    content: z
                        .string()
                        .describe('the content or resource to add to the knowledge base'),
                }),
                execute: async ({ content }) => search({ content }),
            }),
        },
        onFinish: ({ text }) => {
            queries.createMessage({  content: text, role: "assistant" , chatId: id, id: randomUUID() })
        }
    })

    return result.toDataStreamResponse()
}
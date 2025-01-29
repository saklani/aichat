import { search } from '@/lib/pinecone';
import { getSession } from '@/lib/session';
import { openai } from '@ai-sdk/openai';
import {
    streamText,
    tool
} from 'ai';
import { z } from 'zod';
import * as db from "@/lib/db/queries"

export const maxDuration = 60;

export async function POST(req: Request) {
    const session = await getSession()
    if (!session) {
        return []
    }
    const { id: _ } = session
    const { id, messages } = await req.json()

    await db.saveMessage({ message: messages[messages.length - 1], agentId: id })

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
            db.saveMessage({ message: { content: text, role: "assistant" }, agentId: id })
        }
    })

    return result.toDataStreamResponse()
}
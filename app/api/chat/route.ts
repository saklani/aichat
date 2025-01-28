import {
    streamText,
    tool
} from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';
import { search, vectorStore } from '@/lib/pinecone';

export const maxDuration = 60;

export async function POST(req: Request) {
    const { messages } = await req.json();

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
        }
    });

    return result.toDataStreamResponse();
}
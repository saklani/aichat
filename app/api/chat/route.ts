import { auth } from "@/auth";
import { withAuth } from "@/lib/server/api/middleware";
import { HTTP_401, HTTP_500 } from "@/lib/server/api/response";
import { GetChatsResponseSchema, PostRequestSchema } from "@/lib/server/api/schema";
import { queries } from "@/lib/server/db";
import { generateTitleFromUserMessage } from '@/lib/utils';
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { randomUUID } from "crypto";
import { NextRequest } from "next/server";

export const maxDuration = 60;

/**
 * GET /api/chats
 * Retrieves all chats for the current user
 */
export async function GET(request: NextRequest) {
    return withAuth(async (userId) => {
        const chats = await queries.getChatsByUserId({ userId });
        const validatedChats = GetChatsResponseSchema.safeParse(chats);
        if (!validatedChats.success) {
            console.error("[Chats Validation Error]", {
                userId,
                errors: validatedChats.error.toString()
            });
            return {
                error: "Invalid chats data format",
                status: 500
            };
        }

        return {
            data: validatedChats.data,
            status: 200
        };
    });
}

/**
 * POST /api/chats
 * Creates a new chat or adds a message to an existing chat
 */
export async function POST(request: NextRequest) {
    const session = await auth()
    if (!session?.user?.id) {
        return HTTP_401;
    }

    try {
        const userId = session.user.id
        const body = await request.json();
        const validatedInput = PostRequestSchema.safeParse(body);

        if (!validatedInput.success) {
            console.error("[Chat Creation Validation Error]", {
                userId,
                errors: validatedInput.error.flatten()
            });
            return {
                error: "Invalid request data",
                status: 400
            };
        }

        const { id, messages } = validatedInput.data;
        const chat = await queries.getChat({ id, userId });
        const lastMessage = messages.at(-1);

        if (!lastMessage) {
            return {
                error: "No message provided",
                status: 400
            };
        }

        // Create new chat if it doesn't exist
        if (!chat) {
            const title = await generateTitleFromUserMessage({
                message: lastMessage.content
            });
            await queries.createChat({ id, title, userId });
        }

        // Save user message
        const messageId = randomUUID();
        await queries.createMessage({
            ...lastMessage,
            chatId: id,
            id: messageId
        });

        // Stream AI response
        const result = streamText({
            model: openai('gpt-4o-mini'),
            messages,
            onFinish: async ({ text }) => {
                await queries.createMessage({
                    content: text,
                    role: "assistant",
                    chatId: id,
                    id: randomUUID()
                });
            }
        });

        return result.toDataStreamResponse();
    } catch (error) {
        console.error(error)
        return HTTP_500
    }
}
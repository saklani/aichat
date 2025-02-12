import { checkSession } from '@/lib/server/auth';
import { queries, schema } from '@/lib/server/db';
import { generateTitleFromUserMessage } from '@/lib/utils';
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { randomUUID } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { INTERNAL_SERVER_ERROR, UNAUTHORIZED } from '../next-response';

export const maxDuration = 60;

export async function GET(request: NextRequest) {
    try {
        const session = await checkSession(request)
        if (!session) {
            return UNAUTHORIZED
        }
        const { id: userId } = session
        const chats = await queries.getChatsByUserId({ userId })
        return NextResponse.json(chats)
    } catch (error) {
        console.error(error)
        return INTERNAL_SERVER_ERROR
    }
}

export async function POST(request: NextRequest) {
    try {
        const session = await checkSession(request)
        if (!session) {
            return UNAUTHORIZED
        }
        const { id: userId } = session
        const { id, messages }: { id: string, messages: schema.Message[] } = await request.json()

        const chat = await queries.getChat({ id, userId })
        const message = messages.at(-1)

        if (!chat) {
            const title = await generateTitleFromUserMessage({ message: message!.content })
            await queries.createChat({ id, title, userId })
        }
        await queries.createMessage({ ...messages[messages.length - 1], chatId: id, id: randomUUID() })
        const result = streamText({
            model: openai('gpt-4o-mini'),
            messages,
            onFinish: ({ text }) => {
                queries.createMessage({ content: text, role: "assistant", chatId: id, id: randomUUID() })
            }
        })
        return result.toDataStreamResponse()
    } catch (error) {
        console.error(error)
        return INTERNAL_SERVER_ERROR
    }
}

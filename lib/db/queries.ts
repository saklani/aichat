import { asc, desc, eq } from 'drizzle-orm';
import { db } from "./db";
import { chat, Message, message, object } from "./schema";


export async function saveChat({
    id,
    userId,
    title,
}: {
    id: string;
    userId: string;
    title: string;
}) {
    try {
        return await db.insert(chat).values({
            id,
            userId,
            title,
        });
    } catch (error) {
        console.error('Failed to save chat in database');
        throw error;
    }
}

export async function getChatsByUserId({ id }: { id: string }) {
    try {
        return await db
            .select()
            .from(chat)
            .where(eq(chat.userId, id))
            .orderBy(desc(chat.createdAt));
    } catch (error) {
        console.error('Failed to get chats by user from database');
        throw error;
    }
}


export async function saveDocument({
    id,
    name,
    userId,
}: {
    id: string;
    name: string;
    userId: string;
}) {
    try {
        return await db.insert(object).values({
            id,
            name,
            userId,
        });
    } catch (error) {
        console.error('Failed to save document in database');
        throw error;
    }
}



export async function saveMessages({ messages }: { messages: Array<Message> }) {
    try {
        return await db.insert(message).values(messages);
    } catch (error) {
        console.error('Failed to save messages in database', error);
        throw error;
    }
}

export async function getMessagesByChatId({ id }: { id: string }) {
    try {
        return await db
            .select()
            .from(message)
            .where(eq(message.chatId, id))
            .orderBy(asc(message.createdAt));
    } catch (error) {
        console.error('Failed to get messages by chat id from database', error);
        throw error;
    }
}

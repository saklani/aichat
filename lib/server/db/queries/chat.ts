import { and, desc, eq, inArray, lt } from "drizzle-orm";
import { db } from "../db";
import * as schema from "../schema";
import { execute } from "./utils";


export async function createChat({ id, ...rest }: Pick<schema.Chat, "id" | "title" | "userId" | "fileIds">) {
    return execute(`create chat: ${id}`, async () => db.insert(schema.chats).values({ id, ...rest }).returning().then(res => res.at(0)))
}

export async function upsertChat({ id, ...rest }: Omit<schema.Chat, "createdAt">) {
    return execute(`create chat: ${id}`, async () => db.insert(schema.chats).values({ id, ...rest }).onConflictDoUpdate({ target: schema.chats.id, set: { ...rest } }).returning().then(res => res.at(0)))
}

export async function updateChat({ id, userId, ...rest }: Partial<schema.Chat>) {
    return execute(`update chat ${id}`, async () => db.update(schema.chats).set(rest).where(and(eq(schema.chats.id, id ?? ""), eq(schema.chats.userId, userId ?? ""))).returning().then(res => res.at(0)))
}

export async function deleteChat({ id, userId }: Pick<schema.Chat, "id" | "userId">) {
    return execute(`delete chat ${id} of user ${userId}`, async () => db.delete(schema.chats).where(and(eq(schema.chats.id, id), eq(schema.chats.userId, userId))))
}

export async function getChat({ id, userId }: Pick<schema.Chat, "id" | "userId">) {
    return execute(
        `get chat ${id} of user ${userId}`,
        () => db.query.chats.findFirst({ where: and(eq(schema.chats.id, id), eq(schema.chats.userId, userId)) })
    )
}

export async function getChatsByUserId({ userId, cursor, limit = 25 }: Pick<schema.Chat, "userId"> & { cursor?: { lastMessageAt: Date }, limit?: number }) {
    return execute(
        `get all chat of user ${userId}`,
        async () => {
            const chats = await db.select()
                .from(schema.chats)
                .where(
                    and(
                        eq(schema.chats.userId, userId),
                        cursor ? lt(schema.chats.lastMessageAt, cursor.lastMessageAt) : undefined
                    )
                )
                .orderBy(desc(schema.chats.lastMessageAt))
                .limit(limit);

            const aggregatedChats: Record<string, schema.Chat & { messages: schema.Message[] }> = {}
            for (const chat of chats) {
                aggregatedChats[chat.id] = {
                    ...chat,
                    messages: []
                }
            }

            const messages = await db.select()
                .from(schema.messages)
                .where(inArray(schema.messages.chatId, chats.map(chat => chat.id)));

            for (const message of messages) {
                aggregatedChats[message.chatId].messages.push(message);
            }

            return Object.values(aggregatedChats);
        });
}


export async function getChatsExport({ userId }: Pick<schema.Chat, "userId">) {
    return execute(
        `get all chat of user with messages ${userId}`,
        async () => {
            const chats = await db.select().from(schema.chats).where(eq(schema.chats.userId, userId)).leftJoin(schema.messages, eq(schema.messages.chatId, schema.chats.id)).orderBy(desc(schema.chats.lastMessageAt))
            const aggregatedChats: Record<string, schema.Chat & { messages: schema.Message[] }> = {}
            for (const { chats: chat, messages } of chats) {
                if (aggregatedChats[chat.id] === undefined) {
                    aggregatedChats[chat.id] = {
                        ...chat,
                        messages: []
                    }
                }
                if (messages) {
                    aggregatedChats[chat.id].messages.push(messages)
                }
            }
            return Object.values(aggregatedChats)
        }
    )

}
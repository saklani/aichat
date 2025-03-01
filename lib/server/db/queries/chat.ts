import { and, desc, eq, gt, like } from "drizzle-orm";
import { db } from "../db";
import * as schema from "../schema";
import { execute } from "./utils";


export async function createChat({ id, ...rest }: Pick<schema.Chat, "id" | "title" | "userId" | "collectionId">) {
    return execute(`create chat: ${id}`, async () => db.insert(schema.chats).values({ id, ...rest }).returning().then(res => res.at(0)))
}

export async function upsertChat({ id, ...rest }: Omit<schema.Chat, "createdAt">) {
    return execute(`create chat: ${id}`, async () => {
        return await db.insert(schema.chats).values({ id, ...rest }).onConflictDoUpdate({ target: schema.chats.id, set: { ...rest } }).returning()
    })
}

export async function updateChat({ id, userId, ...rest }: schema.Chat) {
    return execute(`update chat ${id}`, async () => {
        await db.update(schema.chats).set(rest).where(and(eq(schema.chats.id, id), eq(schema.chats.userId, userId)))
        return id
    })
}

export async function deleteChat({ id, userId }: Pick<schema.Chat, "id" | "userId">) {
    return execute(`delete chat ${id} of user ${userId}`, async () => {
        await db.delete(schema.chats).where(and(eq(schema.chats.id, id), eq(schema.chats.userId, userId)))
    })
}

export async function getChat({ id, userId }: Pick<schema.Chat, "id" | "userId">) {
    return execute(
        `get chat ${id} of user ${userId}`,
        () => db.query.chats.findFirst({ where: and(eq(schema.chats.id, id), eq(schema.chats.userId, userId)) })
    )
}

export async function getChatsByUserId({ userId, cursor }: Pick<schema.Chat, "userId"> & { cursor?: string }) {
    return execute(
        `get all chat of user ${userId}`,
        () => db.query.chats.findMany({ where: and(eq(schema.chats.userId, userId), cursor ? gt(schema.chats.id, cursor) : undefined), orderBy: desc(schema.chats.lastMessageAt) })
    )
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
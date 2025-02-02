import { and, eq } from "drizzle-orm";
import { db } from "../db";
import * as schema from "../schema";
import { executeDbOperation } from "./utils";


export async function createChat({ id, ...rest }: Omit<schema.Chat, "createdAt">) {
    return executeDbOperation(`Failed to create chat: ${id}`, async () => {
        await db.insert(schema.chat).values({ id, ...rest })
        return id
    })
}

export async function upsertChat({ id, ...rest }: Omit<schema.Chat, "createdAt">) {
    return executeDbOperation(`Failed to create chat: ${id}`, async () => {
        return await db.insert(schema.chat).values({ id, ...rest }).onConflictDoUpdate({ target: schema.chat.id, set: { ...rest } }).returning()
    })
}

export async function updateChat({ id, userId, ...rest }: schema.Chat) {
    return executeDbOperation(`Failed to update chat ${id}`, async () => {
        await db.update(schema.chat).set(rest).where(and(eq(schema.chat.id, id), eq(schema.user.id, userId)))
        return id
    })
}

export async function deleteChat({ id, userId }: Pick<schema.Chat, "id" | "userId">) {
    return executeDbOperation(`Failed to delete chat ${id}`, async () => {
        await db.delete(schema.chat).where(and(eq(schema.chat.id, id), eq(schema.user.id, userId)))
    })
}

export async function getChat({ id, userId }: Pick<schema.Chat, "id" | "userId">) {
    return executeDbOperation(`Failed to get chat of user ${userId}`, async () => {
        return db.select().from(schema.chat).where(and(eq(schema.chat.id, id), eq(schema.chat.userId, userId)))
    })
}

export async function getChatsByUserId({ userId }: Pick<schema.Chat, "userId">) {
    return executeDbOperation(`Failed to get chat of user ${userId}`, async () => {
        return db.select().from(schema.chat).where(eq(schema.chat.userId, userId))
    })
}
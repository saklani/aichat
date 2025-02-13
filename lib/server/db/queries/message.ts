import { and, eq, sql } from "drizzle-orm";
import { db } from "../db";
import * as schema from "../schema";
import { execute } from "./utils";


export async function createMessage({chatId, ...rest}: Pick<schema.Message, "id" | "role" | "chatId" | "content">) {
    return execute('create message', async () => {
        const res = await db.insert(schema.message).values({chatId, ...rest}).returning()
        await db.update(schema.chat).set({lastMessageAt: new Date()}).where(eq(schema.chat.id, chatId))
        await db.update(schema.plan).set({messageUsage: sql`${schema.plan.messageUsage} + 1`})
        return res[0].id
    })
}

export async function deleteMessage({ id }: Pick<schema.Message, "id">) {
    return execute(`delete message ${id}`, async () => {
        await db.delete(schema.message).where(and(eq(schema.message.id, id)))
    })
}

export async function getMessagesByChatId({ chatId }: Pick<schema.Message, "chatId">) {
    return execute(`get messages of chat ${chatId}`, async () => {
        return db.select().from(schema.message).where(eq(schema.message.chatId, chatId))
    })
}
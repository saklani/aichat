import { and, eq, sql } from "drizzle-orm";
import { db } from "../db";
import * as schema from "../schema";
import { execute } from "./utils";


export async function createMessage({chatId, ...rest}: Pick<schema.Message, "id" | "role" | "chatId" | "content">) {
    return execute('create message', async () => {
        const res = await db.insert(schema.messages).values({chatId, ...rest}).returning()
        return res[0].id
    })
}

export async function deleteMessage({ id }: Pick<schema.Message, "id">) {
    return execute(`delete message ${id}`, async () => {
        await db.delete(schema.messages).where(and(eq(schema.messages.id, id)))
    })
}

export async function getMessagesByChatId({ chatId }: Pick<schema.Message, "chatId">) {
    return execute(`get messages of chat ${chatId}`, async () => {
        return db.select().from(schema.messages).where(eq(schema.messages.chatId, chatId))
    })
}
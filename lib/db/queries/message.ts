import { and, eq } from "drizzle-orm";
import { db } from "../db";
import * as schema from "../schema";
import { executeDbOperation } from "./utils";


export async function createMessage(data: Omit<schema.Message, "createdAt">) {
    return executeDbOperation('Failed to create message', async () => {
        const res = await db.insert(schema.message).values(data).returning()
        return res[0].id
    })
}

export async function deleteMessage({ id }: Pick<schema.Message, "id">) {
    return executeDbOperation(`Failed to delete message ${id}`, async () => {
        await db.delete(schema.message).where(and(eq(schema.message.id, id)))
    })
}

export async function getMessagesByChatId({ chatId }: Pick<schema.Message, "chatId">) {
    return executeDbOperation(`Failed to get messages of chat ${chatId}`, async () => {
        return db.select().from(schema.message).where(eq(schema.message.chatId, chatId))
    })
}
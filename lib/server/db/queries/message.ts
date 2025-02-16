import { and, eq, sql } from "drizzle-orm";
import { db } from "../db";
import * as schema from "../schema";
import { execute } from "./utils";


export async function createMessage({chatId, ...rest}: Pick<schema.Message, "id" | "role" | "chatId" | "content">) {
    return execute('create message', () => db.insert(schema.messages).values({chatId, ...rest}).returning().then(res => res.at(0)))
}

export async function deleteMessage({ id }: Pick<schema.Message, "id">) {
    return execute(`delete message ${id}`, () => db.delete(schema.messages).where(and(eq(schema.messages.id, id))))
}

export async function getMessagesByChatId({ chatId }: Pick<schema.Message, "chatId">) {
    return execute(`get messages of chat ${chatId}`, () => db.select().from(schema.messages).where(eq(schema.messages.chatId, chatId)))
}
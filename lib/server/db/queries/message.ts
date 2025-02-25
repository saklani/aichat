import { aliasedTable, and, eq } from "drizzle-orm";
import { db } from "../db";
import * as schema from "../schema";
import { execute } from "./utils";


export async function createMessage({ chatId, ...rest }: Pick<schema.Message, "id" | "role" | "chatId" | "content" | "parentId">) {
    return execute('create message', () => db.insert(schema.messages).values({ chatId, ...rest }).returning().then(res => res.at(0)))
}

export async function deleteMessage({ id }: Pick<schema.Message, "id">) {
    return execute(`delete message ${id}`, () => db.delete(schema.messages).where(and(eq(schema.messages.id, id))))
}

export async function getMessagesByChatId({ chatId }: Pick<schema.Message, "chatId">) {
    return execute(`get messages of chat ${chatId}`, async () => {
        const parent = aliasedTable(schema.messages, "parent");
        const result: { messages: schema.Message, parent: schema.Message | null }[] = await db.select({
            messages: schema.messages,
            parent: parent
        }).from(schema.messages)
            .leftJoin(parent, eq(parent.id, schema.messages.parentId))
            .where(eq(schema.messages.chatId, chatId))
            .orderBy(schema.messages.createdAt);
        return result.map(r => ({ ...r.messages, parent: r.parent }));
    })
}

export async function getMessage({ id }: Pick<schema.Message, "id">) {
    return execute(`get message ${id}`, () => db.select().from(schema.messages).where(eq(schema.messages.id, id)).then(res => res.at(0)))
}
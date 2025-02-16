import { and, eq, inArray, sql } from "drizzle-orm";
import { db } from "../db";
import * as schema from "../schema";
import { execute } from "./utils";

export async function createEmbedding(data: schema.Embedding) {
    return execute(`create embedding: ${data.id}`, () => db.insert(schema.embedding).values(data).returning().then(res => res.at(0)))
}

export async function updateEmbedding(data: schema.Embedding) {
    return execute(`update embedding: ${data.id}`, () => db.update(schema.embedding).set(data).where(eq(schema.embedding.id, data.id)).returning().then(res => res.at(0)))
}

export async function deleteEmbedding({ id }: Pick<schema.Embedding, "id">) {
    return execute(`delete embedding ${id}`, () => db.delete(schema.embedding).where(and(eq(schema.embedding.id, id))))
}

export async function getEmbedding({ id }: Pick<schema.Embedding, "id">) {
    return execute(`get embedding ${id}`, () => db.select().from(schema.embedding).where(eq(schema.embedding.id, id)))
}

// TODO: Make less confusing
export async function getEmbeddingsByCollectionId({ id, userId }: Pick<schema.Collection, "id" | "userId">) {
    return execute(`get all embedding of collection ${id}`, async () => {
        const collection = await db.query.collection.findFirst({ where: and(eq(schema.collection.id, id), eq(schema.collection.userId, userId)) })
        if (!collection) {
            return []
        }
        return db.select().from(schema.embedding).where(inArray(schema.embedding.id, collection.fileIds ?? []))
    })
}
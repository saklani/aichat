import { and, eq, inArray, sql } from "drizzle-orm";
import { db } from "../db";
import * as schema from "../schema";
import { execute } from "./utils";

export async function createEmbedding(data: Omit<schema.Embedding, "id">) {
    return execute(`create embedding: ${data.objectId}`, () => db.insert(schema.embeddings).values(data).returning().then(res => res.at(0)))
}

export async function updateEmbedding(data: schema.Embedding) {
    return execute(`update embedding: ${data.id}`, () => db.update(schema.embeddings).set(data).where(eq(schema.embeddings.id, data.id)).returning().then(res => res.at(0)))
}

export async function deleteEmbedding({ id }: Pick<schema.Embedding, "id">) {
    return execute(`delete embedding ${id}`, () => db.delete(schema.embeddings).where(and(eq(schema.embeddings.id, id))))
}

export async function getEmbedding({ id }: Pick<schema.Embedding, "id">) {
    return execute(`get embedding ${id}`, () => db.select().from(schema.embeddings).where(eq(schema.embeddings.id, id)))
}

// TODO: Make less confusing
export async function getEmbeddingsByCollectionId({ id, userId }: Pick<schema.Collection, "id" | "userId">) {
    return execute(`get all embedding of collection ${id}`, async () => {
        const collection = await db.query.collections.findFirst({ where: and(eq(schema.collections.id, id), eq(schema.collections.userId, userId)) })
        if (!collection) {
            return []
        }
        return db.select().from(schema.embeddings).where(inArray(schema.embeddings.objectId, collection.fileIds ?? []))
    })
}
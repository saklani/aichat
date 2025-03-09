import { and, eq, inArray } from "drizzle-orm";
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

import { and, desc, eq, inArray } from "drizzle-orm";
import { db } from "../db";
import * as schema from "../schema";
import { execute } from "./utils";


export async function createObject({ id, ...rest }: Omit<schema.Object, "createdAt" | "status" | "updatedAt" | "url">) {
    return execute(`create object: ${id}`, () => db.insert(schema.objects).values({ id, ...rest }).returning().then(res => res.at(0)))
}

export async function updateObject({ id, ...rest }: Pick<schema.Object, "id"> & Partial<schema.Object>) {
    return execute(`update object: ${id}`, () => db.update(schema.objects).set({ ...rest }).where(eq(schema.objects.id, id)).returning().then(res => res.at(0)))
}

export async function deleteObject({ id, userId }: Pick<schema.Object, "id" | "userId">) {
    return execute(`delete object ${id} of user ${userId}`, () => db.delete(schema.objects).where(and(eq(schema.objects.id, id), eq(schema.objects.userId, userId))))
}

export async function getObject({ id, userId }: Pick<schema.Object, "id" | "userId">) {
    return execute(`get object ${id} of user ${userId}`, () => db.select().from(schema.objects).where(and(eq(schema.objects.id, id), eq(schema.objects.userId, userId))))
}

export async function getObjectsByUserId({ userId }: Pick<schema.Object, "userId">) {
    return execute(`get all object of user ${userId}`, () => db.select().from(schema.objects).where(eq(schema.objects.userId, userId)).orderBy(desc(schema.objects.createdAt)))
}

// TODO: Make less confusing
export async function getObjectsByCollectionId({ id, userId }: Pick<schema.Collection, "id" | "userId">) {
    return execute(`get all object of collection ${id}`, async () => {
        const collection = await db.query.collections.findFirst({ where: and(eq(schema.collections.id, id), eq(schema.collections.userId, userId)) })
        if (!collection) {
            return []
        }
        return db.select().from(schema.objects).where(inArray(schema.objects.id, collection.fileIds ?? [])).orderBy(desc(schema.objects.createdAt))
    })
}
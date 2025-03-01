import { eq } from 'drizzle-orm';
import * as schema from '../schema';
import { db } from "../db";
import { execute } from "./utils";

export async function createUserPreferences({ userId }: Pick<schema.UserPreferences, "userId">) {
    return execute('insert user preference', () => db.insert(schema.userPreferences).values({ userId }).returning().then(res => res.at(0)))
}

export async function updateUserPreferences({ userId, defaultModel }: schema.UserPreferences) {
    return execute(`update user ${userId}`, () => db.update(schema.userPreferences).set({ defaultModel }).where(eq(schema.userPreferences.userId, userId)).returning().then(res => res.at(0)))
}

export async function getUserPreferences({ userId }: Pick<schema.UserPreferences, "userId">) {
    return execute(`get user ${userId}`, () => db.query.userPreferences.findFirst({ where: eq(schema.userPreferences.userId, userId), columns: { defaultModel: true } }))
}


// user.test.ts
import { sql } from 'drizzle-orm';
import { seed } from "drizzle-seed";
import { beforeAll, describe, it, vi, expect } from 'vitest';
import * as schema from '../lib/server/db/schema';
import { setTestDatabase } from './db';

// Mock server-only before any imports
vi.mock("server-only", () => ({
    __esModule: true,
    default: () => ({})
}));

// Mock the db module

vi.mock("../lib/server/db/db", async () => {
    const db = await setTestDatabase()
    return { db };
});


describe('User Preferences database functions', async () => {

    beforeAll(async () => {
        const { db } = await import('../lib/server/db/db')
        await db.execute(sql`DROP SCHEMA IF EXISTS public CASCADE`);
        await db.execute(sql`CREATE SCHEMA public`);
        await db.execute(sql`CREATE TABLE IF NOT EXISTS "public"."users" ("id" TEXT PRIMARY KEY, "email" TEXT NOT NULL, "name" TEXT NOT NULL, "email_verified" BOOLEAN NOT NULL, "image" TEXT, "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL)`);
        await db.execute(sql`CREATE TABLE IF NOT EXISTS "public"."user_preferences" ("user_id" TEXT PRIMARY KEY REFERENCES users (id) ON DELETE CASCADE, "default_model" TEXT NOT NULL DEFAULT 'gpt-4o-mini')`);
        seed(db, { users: schema.users, userPreferences: schema.userPreferences }, { seed: 13 }).refine((f) => ({
            users: { count: 5, with: { userPreferences: 1 } },
        }))
    })

    it('getUserPreferences should return user preferences by id', async () => {
        const { getUserPreferences } = await import('../lib/server/db/queries/preferences');
        const userPreferences = await getUserPreferences({ userId: '4Feg6Da5lrV9fHbC4' });
        expect(userPreferences).toEqual({
            defaultModel: 'PbfjDQRWg4FdA0Yz'
        })
    });

    it('updateUserPreferences should return user preferences by id',
        async () => {
            const { getUserPreferences, updateUserPreferences } = await import('../lib/server/db/queries/preferences');
            await updateUserPreferences({ userId: '4Feg6Da5lrV9fHbC4', defaultModel: 'gpt-4o' });
            const userPreferences = await getUserPreferences({ userId: '4Feg6Da5lrV9fHbC4' });
            expect(userPreferences).toEqual({
                defaultModel: 'gpt-4o',
            })
        });
});
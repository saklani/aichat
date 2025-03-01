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


describe('User database functions', async () => {

    beforeAll(async () => {
        const { db } = await import('../lib/server/db/db')
        await db.execute(sql`DROP SCHEMA IF EXISTS public CASCADE`);
        await db.execute(sql`CREATE SCHEMA public`);
        await db.execute(sql`CREATE TABLE IF NOT EXISTS "public"."users" ("id" TEXT PRIMARY KEY, "email" TEXT NOT NULL, "name" TEXT NOT NULL, "email_verified" BOOLEAN NOT NULL, "image" TEXT, "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL)`);
        seed(db, { users: schema.users }, { seed: 13 }).refine((f) => ({
            users: { count: 5 }
        }))
    })

    it('getUser should return user by id with only id and email fields', async () => {
        const { getUser } = await import('../lib/server/db/queries/user');
        const user = await getUser({ id: '4Feg6Da5lrV9fHbC4' });
        expect(user).toEqual({
            id: '4Feg6Da5lrV9fHbC4',
            email: 'appropriate_ariona@libero.it'
        })
    });

    it('updateUser should return user by email with only id and email fields',
        async () => {
            const { updateUser } = await import('../lib/server/db/queries/user');
            const createdAt = new Date();
            const updatedAt = new Date();
            const user = await updateUser({ id: '4Feg6Da5lrV9fHbC4', email: 'test@test.com', name: 'test', emailVerified: true, image: 'test', createdAt, updatedAt });
            expect(user).toEqual({
                id: '4Feg6Da5lrV9fHbC4',
                email: 'test@test.com', name: 'test',
                emailVerified: true,
                image: 'test',
                createdAt,
                updatedAt
            })
        });

    it('deleteUser should delete user', async () => {
        const { deleteUser, getUser } = await import('../lib/server/db/queries/user');
        const user = await deleteUser({ id: '4Feg6Da5lrV9fHbC4' });
        if (!user) {
            throw new Error('User not found');
        }
        expect(user.id).toEqual('4Feg6Da5lrV9fHbC4');
        const user2 = await getUser({ id: '4Feg6Da5lrV9fHbC4' });
        expect(user2).toBeUndefined();
    });
});
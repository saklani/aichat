// user.test.ts
import { describe, expect, it, vi } from 'vitest';
import { setTestDatabase } from './db';
import { fakeUsers } from './fake_data';

// Mock server-only before any imports
vi.mock("server-only", () => ({
    __esModule: true,
    default: () => ({})
}));

// Mock the db module

vi.mock("../../lib/server/db/db", async () => {
    const db = await setTestDatabase()
    return { db };
});


describe('User database functions', async () => {

    it('getUser should return user by id with only id and email fields', async () => {
        const { getUser } = await import('../../lib/server/db/queries/user');
        const user = await getUser({ id: fakeUsers[0].id });

        expect(user).toEqual({
            id: fakeUsers[0].id,
            email: fakeUsers[0].email
        })
    });

    it('updateUser should return user by email with only id and email fields',
        async () => {
            const { updateUser } = await import('../../lib/server/db/queries/user');
            const createdAt = new Date();
            const updatedAt = new Date();
            const user = await updateUser({ id: fakeUsers[0].id, email: 'test@test.com', name: 'test', emailVerified: true, image: 'test', createdAt, updatedAt });
            expect(user).toEqual({
                id: fakeUsers[0].id,
                email: 'test@test.com', name: 'test',
                emailVerified: true,
                image: 'test',
                createdAt,
                updatedAt
            })
        });

    it('deleteUser should delete user', async () => {
        const { deleteUser, getUser } = await import('../../lib/server/db/queries/user');
        const user = await deleteUser({ id: fakeUsers[0].id });
        if (!user) {
            throw new Error('User not found');
        }
        expect(user.id).toEqual(fakeUsers[0].id);
        const user2 = await getUser({ id: fakeUsers[0].id });
        expect(user2).toBeUndefined();
    });
});
// user.test.ts
import { describe, expect, it, vi } from 'vitest';
import { setTestDatabase } from './db';
import { fakeUserPreferences } from "./fake_data";

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


describe('User Preferences database functions', async () => {

    it('getUserPreferences should return user preferences by id', async () => {
        const { getUserPreferences } = await import('../../lib/server/db/queries/preferences');
        const userPreferences = await getUserPreferences({ userId: fakeUserPreferences[0].userId });
        expect(userPreferences).toEqual({ defaultModel: fakeUserPreferences[0].defaultModel });
    });

    it('updateUserPreferences should return user preferences by id', async () => {
        const { getUserPreferences, updateUserPreferences } = await import('../../lib/server/db/queries/preferences');
        await updateUserPreferences({ userId: fakeUserPreferences[0].userId, defaultModel: 'gpt-4o' });
        const userPreferences = await getUserPreferences({ userId: fakeUserPreferences[0].userId });
        expect(userPreferences).toEqual({ defaultModel: 'gpt-4o' });
    });
});
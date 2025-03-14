// objects.test.ts
import { reset, seed } from "drizzle-seed";
import { beforeAll, describe, expect, it, vi } from 'vitest';
import * as schema from '../../lib/server/db/schema';
import { setTestDatabase } from './db';
import { fakeUsers, fakeObjects } from "./fake_data";

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


describe('Objects queries', async () => {

    it('getObjectsByUserId should return objects by user id no page number', async () => {
        const { getObjectsByUserId } = await import('../../lib/server/db/queries/objects');
        const objects = await getObjectsByUserId({ userId: fakeUsers[0].id });
        expect(objects.length).toEqual(25);
        for (const object of objects) {
            expect(object.id).toBeDefined();
            expect(object.createdAt).toBeInstanceOf(Date);
            expect(object.updatedAt).toBeInstanceOf(Date);
            expect(object.userId).toEqual(fakeUsers[0].id);
            expect(object.name).toBeDefined();
        }
    });

    it('getObjectsByUserId should return objects by user id page number', async () => {
        const { getObjectsByUserId } = await import('../../lib/server/db/queries/objects');
        const objects = await getObjectsByUserId({ userId: fakeUsers[0].id, page: 2 });
        expect(objects.length).toEqual(4);
        for (const object of objects) {
            expect(object.id).toBeDefined();
            expect(object.createdAt).toBeInstanceOf(Date);
            expect(object.updatedAt).toBeInstanceOf(Date);
            expect(object.userId).toEqual(fakeUsers[0].id);
            expect(object.name).toBeDefined();
        }
    });

    it('updateObject should return object by id',
        async () => {
            const { updateObject } = await import('../../lib/server/db/queries/objects');
            const object = await updateObject({ id: fakeObjects[0].id, name: 'test', userId: fakeUsers[0].id });
            if (!object) {
                throw new Error('Object not found');
            }
            expect(object.id).toEqual(fakeObjects[0].id);
            expect(object.name).toEqual('test');
            expect(object.userId).toEqual(fakeUsers[0].id);
        });

    it('deleteCollection should delete collection', async () => {
        const { deleteObject, getObject } = await import('../../lib/server/db/queries/objects');
        const object = await deleteObject({ id: fakeObjects[0].id, userId: fakeUsers[0].id });
        if (!object) {
            throw new Error('Object not found');
        }
        expect(object.id).toEqual(fakeObjects[0].id);
        const object2 = await getObject({ id: fakeObjects[0].id, userId: fakeUsers[0].id });
        expect(object2).toBeUndefined();
    });

    it("createObject should create object", async () => {
        const { createObject } = await import('../../lib/server/db/queries/objects');
        const object = await createObject({ id: '3d03b838-6dab-46d2-3f53-b65e19144c2f', name: 'test', userId: fakeUsers[0].id, type: 'text/plain', size: 100, url: 'https://www.google.com', metadata: null });
        if (!object) {
            throw new Error('Object not found');
        }
        expect(object.id).toEqual('3d03b838-6dab-46d2-3f53-b65e19144c2f');
        expect(object.createdAt).toBeInstanceOf(Date);
        expect(object.updatedAt).toBeInstanceOf(Date);
        expect(object.userId).toEqual(fakeUsers[0].id);
        expect(object.name).toEqual('test');
        expect(object.type).toEqual('text/plain');
        expect(object.size).toEqual(100);
        expect(object.url).toEqual('https://www.google.com');
        expect(object.metadata).toBeNull();
    });
});
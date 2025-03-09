// chats.test.ts
import { describe, expect, it, vi } from 'vitest';
import { setTestDatabase } from './db';
import { fakeChats, fakeUsers } from './fake_data';


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

describe('Chat database functions', async () => {

    it('should get a chat', async () => {
        const { getChat } = await import('../../lib/server/db/queries/chat');
        const response = await getChat({ id: fakeChats[0].id, userId: fakeChats[0].userId });
        expect(response).toBeDefined();
    });

    it('should get chats by user id', async () => {
        const { getChatsByUserId } = await import('../../lib/server/db/queries/chat');
        const chats = await getChatsByUserId({ userId: fakeUsers[1].id });
        expect(chats.length).toBe(fakeChats.filter(chat => chat.userId === fakeUsers[1].id).length);
    });

    it('should get chats by user id with pagination', async () => {
        const { getChatsByUserId } = await import('../../lib/server/db/queries/chat');
        const chats = await getChatsByUserId({ userId: fakeUsers[0].id });
        expect(chats.length).toBe(25);

        const lastChat = chats.at(-1);
        const chats2 = await getChatsByUserId({ userId: fakeChats[0].userId, cursor: lastChat && lastChat.lastMessageAt ? { lastMessageAt: lastChat.lastMessageAt } : undefined });
        expect(chats2.length).toBe(10);
    });

    it('should create a chat', async () => {
        const { createChat } = await import('../../lib/server/db/queries/chat');
        const createdChat = await createChat({ ...fakeChats[0], id: 'b3ede905-c833-454a-98b6-8164bf332be2' });
        expect(createdChat).toBeDefined();
        expect(createdChat?.id).toBe('b3ede905-c833-454a-98b6-8164bf332be2');
        expect(createdChat?.userId).toBe(fakeChats[0].userId);
        expect(createdChat?.title).toBe(fakeChats[0].title);
    });


    it('should delete a chat', async () => {
        const { deleteChat, getChat } = await import('../../lib/server/db/queries/chat');
        const deletedChat = await deleteChat({ id: fakeChats[0].id, userId: fakeChats[0].userId });
        expect(deletedChat).toBeDefined();
        const response = await getChat({ id: fakeChats[0].id, userId: fakeChats[0].userId });
        expect(response).toBeUndefined();
    });



});

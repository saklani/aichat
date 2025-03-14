import { faker } from '@faker-js/faker';

const fakeUsers = Array.from({ length: 5 }, (_, i) => ({
    id: faker.string.nanoid(),
    email: faker.internet.email(),
    name: faker.person.fullName(),
    emailVerified: faker.datatype.boolean(),
    image: faker.image.url(),
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent()
}));


const fakeUserPreferences = Array.from({ length: 5 }, (_, i) => ({
    id: faker.string.uuid(),
    userId: fakeUsers[i].id,
    defaultModel: `gpt-4o-mini` as 'gpt-4o-mini' | 'gpt-4o' | 'gpt-o1-mini',
}));

const fakeObjects = fakeUsers.map((user) => (
    Array.from({ length: 29 }, () => ({
        id: faker.string.uuid(),
        userId: user.id,
        name: faker.lorem.word(),
        description: faker.lorem.sentence(),
        url: faker.internet.url(),
        createdAt: faker.date.recent(),
        updatedAt: faker.date.recent()
    }))
)).flat();


const fakeChats = fakeUsers.map((user, i) => (
    Array.from({ length: i == 0 ? 35 : faker.number.int({ min: 1, max: 10 }) }, () => ({
        id: faker.string.uuid(),
        title: faker.lorem.sentence(),
        userId: user.id,
        fileIds: Array.from({ length: faker.number.int({ min: 1, max: 10 }) }, () => faker.string.uuid()),
        isArchived: faker.datatype.boolean(),
        messageCount: faker.number.int({ min: 1, max: 25 }),
        lastMessageAt: faker.date.recent(),
        systemPrompt: faker.lorem.sentence(),
        parentId: faker.string.uuid(),
        createdAt: faker.date.recent(),
        updatedAt: faker.date.recent(),
    }))
)).flat();

const fakeMessages = fakeChats.map((chat) => (
    Array.from({ length: chat.messageCount }, () => ({
        id: faker.string.uuid(),
        chatId: chat.id,
        content: faker.lorem.sentence(),
        role: faker.helpers.arrayElement(['user', 'assistant', 'system', 'data']),
        tokens: faker.number.int({ min: 1, max: 1000 }),
        metadata: faker.lorem.sentence(),
        parentId: faker.string.uuid(),
        createdAt: faker.date.recent(),
        updatedAt: faker.date.recent()
    }))
)).flat();



export { fakeUsers, fakeUserPreferences, fakeObjects, fakeChats, fakeMessages };
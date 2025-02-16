import { randomUUID } from 'crypto'
import { boolean, index, integer, json, pgTable, text, timestamp, uniqueIndex, vector } from 'drizzle-orm/pg-core'
import { sql } from 'drizzle-orm/sql'

// Type definitions
type UserRole = 'admin' | 'user'
type MessageRole = 'system' | 'user' | 'assistant' | 'data'
type ObjectStatus = 'created' | 'processing' | 'ready' | 'failed'
type PlanType = 'free' | 'pro' | 'enterprise'
type ModelProvider = 'anthropic' | 'openai' | 'google' | 'custom'
type ModelStatus = 'active' | 'deprecated' | 'maintenance'
type ModelName = "gpt-4o-mini" | "gpt-4o" | "gpt-o1-mini"

export const user = pgTable('users', {
    id: text('id').notNull().primaryKey(),
    email: text('email').notNull().unique(),
    name: text('name'),
    passwordHash: text('password_hash'),
    googleId: text('google_id'),
    role: text('role').$type<UserRole>().notNull().default('user'),
    createdAt: timestamp('created_at').notNull().default(sql`(now())`),
    updatedAt: timestamp('updated_at').notNull().default(sql`(now())`),
})

export const userPreferences = pgTable('user_preferences', {
    userId: text('user_id')
        .notNull()
        .references(() => user.id, { onDelete: 'cascade' }),
    defaultModel: text('default_model').$type<ModelName>().notNull().default('gpt-4o-mini'),
});

// Chat and Messages
export const chat = pgTable('chats', {
    id: text('id').notNull().primaryKey(),
    title: text('title').notNull(),
    userId: text('user_id')
        .notNull()
        .references(() => user.id, { onDelete: 'cascade' }),
    modelId: text('model_id')
        .references(() => model.id),
    collectionId: text("collection_id").notNull().references(() => collection.id),
    systemPrompt: text('system_prompt'),
    lastMessageAt: timestamp('last_message_at'),
    messageCount: integer('message_count').notNull().default(0),
    isArchived: boolean('is_archived').notNull().default(false),
    createdAt: timestamp('created_at').notNull().default(sql`(now())`),
    updatedAt: timestamp('updated_at').notNull().default(sql`(now())`).$onUpdate(() => new Date())
},
    (table) =>
        [
            index('chat_user_id_idx').on(table.userId),
            index('chat_last_message_idx').on(table.lastMessageAt),
        ]
)

export const message = pgTable('messages', {
    id: text('id').notNull().primaryKey(),
    chatId: text('chat_id')
        .notNull()
        .references(() => chat.id, { onDelete: 'cascade' }),
    content: text('content').notNull(),
    role: text('role').$type<MessageRole>().notNull().default('user'),
    tokens: integer('tokens'),
    modelId: text('model_id')
        .references(() => model.id),
    metadata: text('metadata'), // JSON string for additional data
    createdAt: timestamp('created_at').notNull().default(sql`(now())`),
}, (table) => [
    index('message_chat_id_idx').on(table.chatId)
])

// Models and Configuration
export const model = pgTable('model', {
    id: text('id').notNull().primaryKey(),
    name: text('name').$type<ModelName>().notNull(),
    provider: text('provider').$type<ModelProvider>().notNull(),
    url: text('url'),
    key: text('key'),
    status: text('status').$type<ModelStatus>().notNull().default('active'),
    config: text('config'), // JSON string for model-specific settings
    contextWindow: integer('context_window'),
    costPer1kTokens: integer('cost_per_1k_tokens'),
    createdAt: timestamp('created_at').notNull().default(sql`(now())`),
    updatedAt: timestamp('updated_at').notNull().default(sql`(now())`),
})

// File Objects
export const object = pgTable('objects', {
    id: text('id').notNull().primaryKey(),
    name: text('name').notNull(),
    type: text('type'), // MIME type
    size: integer('size'), // in bytes
    url: text('url'),
    status: text('status').$type<ObjectStatus>().notNull().default('created'),
    userId: text('user_id')
        .notNull()
        .references(() => user.id, { onDelete: 'cascade' }),
    metadata: text('metadata'), // JSON string for additional data
    createdAt: timestamp('created_at').notNull().default(sql`(now())`),
    updatedAt: timestamp('updated_at').notNull().default(sql`(now())`),
}, (table) => [index('object_user_id_idx').on(table.userId)])

// Subscription and Usage
export const plan = pgTable('plans', {
    id: text('id').notNull().primaryKey().default(sql`(gen_random_uuid())`),
    userId: text('user_id')
        .notNull()
        .references(() => user.id, { onDelete: 'cascade' }),
    type: text('type').$type<PlanType>().notNull().default('free'),
    messageUsage: integer('message_usage').notNull().default(0),
    messageLimit: integer('message_limit').notNull().default(200),
    storageUsage: integer('storage_usage').notNull().default(0), // in bytes
    storageLimit: integer('storage_limit').notNull().default(104857600), // 100MB in bytes
    startDate: timestamp('start_date').notNull().default(sql`(now())`),
    endDate: timestamp('end_date').notNull().default(sql`(now() + interval '28 day')`),
    isActive: boolean('is_active').notNull().default(true),
    createdAt: timestamp('created_at').notNull().default(sql`(now())`),
    updatedAt: timestamp('updated_at').notNull().default(sql`(now())`),
}, (table) => [
    index('plan_user_id_idx').on(table.userId),
    uniqueIndex('plan_user_id_unique').on(table.userId),
])


export const collection = pgTable('collections', {
    id: text('id').notNull().primaryKey().$defaultFn(() => randomUUID()),
    userId: text('user_id')
        .notNull()
        .references(() => user.id, { onDelete: 'cascade' }),
    name: text("name"),
    fileIds: json("file_ids").$type<string[]>(),
    createdAt: timestamp('created_at').notNull().default(sql`(now())`),
    updatedAt: timestamp('updated_at').notNull().default(sql`(now())`),
}, (table) => [
    index('collection_user_id_idx').on(table.userId),
])


export const embedding = pgTable("embeddings", {
    id: text("id").primaryKey(),
    vector: vector("vector", { dimensions: 1536 }).notNull(),
    content: text('content').notNull(),
},
    (table) => [index('embeddingIndex').using(
        'hnsw',
        table.vector.op('vector_cosine_ops'),
    ),
    ]
);

// Type exports
export type User = typeof user.$inferSelect
export type UserPreferences = typeof userPreferences.$inferSelect
export type Chat = typeof chat.$inferSelect
export type Message = typeof message.$inferSelect
export type Model = typeof model.$inferSelect
export type Object = typeof object.$inferSelect
export type Plan = typeof plan.$inferSelect
export type Collection = typeof collection.$inferSelect
export type Embedding = typeof embedding.$inferSelect

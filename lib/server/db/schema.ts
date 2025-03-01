import { boolean, index, integer, json, pgTable, serial, text, timestamp, uniqueIndex, uuid, vector } from 'drizzle-orm/pg-core'
import { sql } from 'drizzle-orm/sql'

// Type definitions
type MessageRole = 'system' | 'user' | 'assistant' | 'data'
type ObjectStatus = 'created' | 'processing' | 'ready' | 'failed'
type PlanType = 'free' | 'pro' | 'enterprise'
type ModelProvider = 'anthropic' | 'openai' | 'google' | 'custom'
type ModelStatus = 'active' | 'deprecated' | 'maintenance'
type ModelName = 'gpt-4o-mini' | 'gpt-4o' | 'gpt-o1-mini'

export const users = pgTable("users", {
    id: text("id").primaryKey(),
    name: text('name').notNull(),
    email: text('email').notNull().unique(),
    emailVerified: boolean('email_verified').notNull(),
    image: text('image'),
    createdAt: timestamp('created_at').notNull(),
    updatedAt: timestamp('updated_at').notNull()
});

export const sessions = pgTable("sessions", {
    id: text("id").primaryKey(),
    expiresAt: timestamp('expires_at').notNull(),
    token: text('token').notNull().unique(),
    createdAt: timestamp('created_at').notNull(),
    updatedAt: timestamp('updated_at').notNull(),
    ipAddress: text('ip_address'),
    userAgent: text('user_agent'),
    userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' })
});

export const accounts = pgTable("accounts", {
    id: text("id").primaryKey(),
    accountId: text('account_id').notNull(),
    providerId: text('provider_id').notNull(),
    userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    accessToken: text('access_token'),
    refreshToken: text('refresh_token'),
    idToken: text('id_token'),
    accessTokenExpiresAt: timestamp('access_token_expires_at'),
    refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
    scope: text('scope'),
    password: text('password'),
    createdAt: timestamp('created_at').notNull(),
    updatedAt: timestamp('updated_at').notNull()
});

export const verifications = pgTable("verifications", {
    id: text("id").primaryKey(),
    identifier: text('identifier').notNull(),
    value: text('value').notNull(),
    expiresAt: timestamp('expires_at').notNull(),
    createdAt: timestamp('created_at'),
    updatedAt: timestamp('updated_at')
});

export const userPreferences = pgTable('user_preferences', {
    userId: text('user_id')
        .notNull()
        .references(() => users.id, { onDelete: 'cascade' }),
    defaultModel: text('default_model').$type<ModelName>().notNull().default('gpt-4o-mini'),
});

// Chat and Messages
export const chats = pgTable('chats', {
    id: uuid('id').notNull().primaryKey().defaultRandom(),
    title: text('title').notNull(),
    userId: text('user_id')
        .notNull()
        .references(() => users.id, { onDelete: 'cascade' }),
    collectionId: uuid('collection_id').notNull().references(() => collections.id),
    systemPrompt: text('system_prompt'),
    parentId: uuid('parent_id'),
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
            index('chat_title_idx').using('gin', sql`to_tsvector('english', ${table.title})`),
            index('chat_title_trgm_idx').using('gin', table.title, sql`${table.title} gin_trgm_ops`)
        ]
)

export const messages = pgTable('messages', {
    id: uuid('id').notNull().primaryKey().defaultRandom(),
    chatId: uuid('chat_id')
        .notNull()
        .references(() => chats.id, { onDelete: 'cascade' }),
    content: text('content').notNull(),
    role: text('role').$type<MessageRole>().notNull().default('user'),
    tokens: integer('tokens'),
    modelId: uuid('model_id')
        .references(() => models.id),
    metadata: text('metadata'), // JSON string for additional data
    parentId: uuid('parent_id'),
    createdAt: timestamp('created_at').notNull().default(sql`(now())`),
}, (table) => [
    index('message_chat_id_idx').on(table.chatId),
    index('message_content_idx').using('gin', sql`to_tsvector('english', ${table.content})`),
    index('message_content_trgm_idx').using('gin', table.content, sql`${table.content} gin_trgm_ops`),
])

// Models and Configuration
export const models = pgTable('model', {
    id: uuid('id').notNull().primaryKey().defaultRandom(),
    name: text('name').$type<ModelName>().notNull(),
    provider: text('provider').$type<ModelProvider>().notNull(),
    url: text('url'),
    key: text('key'),
    status: text('status').$type<ModelStatus>().notNull().default('active'),
    config: text('config'), // JSON string for model-specific settings
    contextWindow: integer('context_window'),
    costPer1kTokens: integer('cost_per_1k_tokens'),
    createdAt: timestamp('created_at').notNull().default(sql`(now())`),
    updatedAt: timestamp('updated_at').notNull().default(sql`(now())`).$onUpdate(() => new Date())
})

// File Objects
export const objects = pgTable('objects', {
    id: uuid('id').notNull().primaryKey().defaultRandom(),
    name: text('name').notNull(),
    type: text('type'), // MIME type
    size: integer('size'), // in bytes
    url: text('url'),
    status: text('status').$type<ObjectStatus>().notNull().default('created'),
    userId: text('user_id')
        .notNull()
        .references(() => users.id, { onDelete: 'cascade' }),
    metadata: text('metadata'), // JSON string for additional data
    createdAt: timestamp('created_at').notNull().default(sql`(now())`),
    updatedAt: timestamp('updated_at').notNull().default(sql`(now())`).$onUpdate(() => new Date())
}, (table) => [index('object_user_id_idx').on(table.userId)])

// Subscription and Usage
export const plans = pgTable('plans', {
    id: uuid('id').notNull().primaryKey().defaultRandom(),
    userId: text('user_id')
        .notNull()
        .references(() => users.id, { onDelete: 'cascade' }),
    type: text('type').$type<PlanType>().notNull().default('free'),
    messageUsage: integer('message_usage').notNull().default(0),
    messageLimit: integer('message_limit').notNull().default(200),
    storageUsage: integer('storage_usage').notNull().default(0), // in bytes
    storageLimit: integer('storage_limit').notNull().default(104857600), // 100MB in bytes
    startDate: timestamp('start_date').notNull().default(sql`(now())`),
    endDate: timestamp('end_date').notNull().default(sql`(now() + interval '28 day')`),
    isActive: boolean('is_active').notNull().default(true),
    createdAt: timestamp('created_at').notNull().default(sql`(now())`),
    updatedAt: timestamp('updated_at').notNull().default(sql`(now())`).$onUpdate(() => new Date()),
}, (table) => [
    index('plan_user_id_idx').on(table.userId),
    uniqueIndex('plan_user_id_unique').on(table.userId),
])


export const collections = pgTable('collections', {
    id: uuid('id').notNull().primaryKey().defaultRandom(),
    userId: text('user_id')
        .notNull()
        .references(() => users.id, { onDelete: 'cascade' }),
    name: text('name'),
    fileIds: json('file_ids').$type<string[]>(),
    createdAt: timestamp('created_at').notNull().default(sql`(now())`),
    updatedAt: timestamp('updated_at').notNull().default(sql`(now())`).$onUpdate(() => new Date()),
}, (table) => [
    index('collection_user_id_idx').on(table.userId),
])


export const embeddings = pgTable('embeddings', {
    id: serial('id').primaryKey(),
    objectId: uuid('object_id').notNull().references(() => objects.id, { onDelete: 'cascade' }),
    vector: vector('vector', { dimensions: 1536 }).notNull(),
    content: text('content').notNull(),
},
    (table) => [index('embeddingIndex').using(
        'hnsw',
        table.vector.op('vector_cosine_ops'),
    ),
    ]
);

// Type exports
export type User = typeof users.$inferSelect
export type UserPreferences = typeof userPreferences.$inferSelect
export type Chat = typeof chats.$inferSelect
export type Message = typeof messages.$inferSelect
export type Model = typeof models.$inferSelect
export type Object = typeof objects.$inferSelect
export type Plan = typeof plans.$inferSelect
export type Collection = typeof collections.$inferSelect
export type Embedding = typeof embeddings.$inferSelect

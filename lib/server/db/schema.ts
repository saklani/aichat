import { sql } from 'drizzle-orm/sql'
import { integer, sqliteTable, text, unique, index, uniqueIndex } from 'drizzle-orm/sqlite-core'

// Type definitions
type UserRole = 'admin' | 'user'
type MessageRole = 'system' | 'user' | 'assistant' | 'data'
type ObjectStatus = 'created' | 'processing' | 'ready' | 'failed'
type PlanType = 'free' | 'pro' | 'enterprise'
type ModelProvider = 'anthropic' | 'openai' | 'google' | 'custom'
type ModelStatus = 'active' | 'deprecated' | 'maintenance'


export const user = sqliteTable('users', {
    id: text('id').notNull().primaryKey(),
    email: text('email').notNull().unique(),
    name: text('name'),
    passwordHash: text('password_hash'),
    googleId: text('google_id'),
    role: text('role').$type<UserRole>().notNull().default('user'),
    createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
    updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
})


// Chat and Messages
export const chat = sqliteTable('chats', {
    id: text('id').notNull().primaryKey(),
    title: text('title').notNull(),
    userId: text('user_id')
        .notNull()
        .references(() => user.id, { onDelete: 'cascade' }),
    modelId: text('model_id')
        .references(() => model.id),
    systemPrompt: text('system_prompt'),
    lastMessageAt: integer('last_message_at', { mode: 'timestamp' }),
    messageCount: integer('message_count').notNull().default(0),
    isArchived: integer('is_archived', { mode: 'boolean' }).notNull().default(false),
    createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
    updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`).$onUpdate(() => new Date())},
    (table) => 
        [
            index('chat_user_id_idx').on(table.userId),
            index('chat_last_message_idx').on(table.lastMessageAt),
        ]
)

export const message = sqliteTable('messages', {
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
    createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
}, (table) => [
    index('message_chat_id_idx').on(table.chatId)
])

// Models and Configuration
export const model = sqliteTable('model', {
    id: text('id').notNull().primaryKey(),
    name: text('name').notNull(),
    provider: text('provider').$type<ModelProvider>().notNull(),
    url: text('url'),
    key: text('key'),
    status: text('status').$type<ModelStatus>().notNull().default('active'),
    config: text('config'), // JSON string for model-specific settings
    contextWindow: integer('context_window'),
    costPer1kTokens: integer('cost_per_1k_tokens'),
    createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
    updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
})

// File Objects
export const object = sqliteTable('objects', {
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
    createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
    updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
}, (table) => [index('object_user_id_idx').on(table.userId)])

// Subscription and Usage
export const plan = sqliteTable('plans', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    userId: text('user_id')
        .notNull()
        .references(() => user.id, { onDelete: 'cascade' }),
    type: text('type').$type<PlanType>().notNull().default('free'),
    messageUsage: integer('message_usage').notNull().default(0),
    messageLimit: integer('message_limit').notNull().default(200),
    storageUsage: integer('storage_usage').notNull().default(0), // in bytes
    storageLimit: integer('storage_limit').notNull().default(104857600), // 100MB in bytes
    startDate: integer('start_date', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
    endDate: integer('end_date', { mode: 'timestamp' }),
    isActive: integer('is_active', { mode: 'boolean' }).notNull().default(true),
    createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
    updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
}, (table) => [
    index('plan_user_id_idx').on(table.userId),
    uniqueIndex('plan_user_id_unique').on(table.userId),
])

// Type exports
export type User = typeof user.$inferSelect
export type Chat = typeof chat.$inferSelect
export type Message = typeof message.$inferSelect
export type Model = typeof model.$inferSelect
export type Object = typeof object.$inferSelect
export type Plan = typeof plan.$inferSelect
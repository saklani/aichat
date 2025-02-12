import { sql } from 'drizzle-orm/sql'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const user = sqliteTable('user', {
    id: text('id').notNull().primaryKey(),
    email: text('email').notNull().unique(),
    passwordHash: text('password_hash').notNull(),
})

export const session = sqliteTable("session", {
    id: text('id').notNull().primaryKey(),
    userId: text('user_id').notNull().references(() => user.id, { onDelete: "cascade" }),
    expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull()
})

export const passwordReset = sqliteTable("password_reset", {
    id: integer('id').primaryKey({ autoIncrement: true }),
    userId: text('user_id').notNull().references(() => user.id, { onDelete: "cascade" }),
    code: text('code').notNull(),
})

export const chat = sqliteTable("chat", {
    id: text('id').notNull().primaryKey(),
    title: text('title'),
    userId: text('user_id').notNull().references(() => user.id, { onDelete: "cascade" }),
    createdAt: integer("created_at", { mode: "timestamp" }).notNull().default(sql`(unixepoch())`),
})

type Role = 'system' | 'user' | 'assistant' | 'data'

export const message = sqliteTable('messages', {
    id: text('id').notNull().primaryKey(),
    chatId: text('chat_id')
        .notNull()
        .references(() => chat.id, { onDelete: "cascade" }),
    content: text('content').notNull(),
    role: text("role").notNull().default("user").$type<Role>(),
    createdAt: integer('created_at', { mode: "timestamp" }).notNull().default(sql`(unixepoch())`),
})

export const models = sqliteTable("model", {
    id: text('id').notNull().primaryKey(),
    name: text("name"),
    url: text("url"),
    key: text("key"),
})

type Status = "created" | "processing" | "ready"

export const object = sqliteTable("objects", {
    id: text("id").primaryKey(),
    name: text("name"),
    url: text("url"),
    status: text("status").$type<Status>().default("created"),
    userId: text('user_id').notNull().references(() => user.id, { onDelete: "cascade" }),
    createdAt: integer('created_at', { mode: "timestamp" }).notNull().default(sql`(unixepoch())`),
})

export const plan = sqliteTable("plan", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    name: text("name").default("Free").$type<"Free" | "Paid">(),
    userId: text('user_id').notNull().references(() => user.id, { onDelete: "cascade" }),
    message_usage: integer("message_usage").notNull().default(0),
    message_limit: integer("message_limit").notNull().default(200)
})

export type Session = typeof session.$inferSelect
export type User = typeof user.$inferSelect
export type Chat = typeof chat.$inferSelect
export type Message = typeof message.$inferSelect
export type Object = typeof object.$inferSelect
export type Plan = typeof plan.$inferSelect
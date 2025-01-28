import { sql } from 'drizzle-orm/sql';
import { customType, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const user = sqliteTable('user', {
    id: text('id').primaryKey(),
    email: text('email').notNull().unique(),
    passwordHash: text('password_hash').notNull()
});

export const session = sqliteTable("session", {
    id: text('id').primaryKey(),
    userId: text('user_id').notNull().references(() => user.id),
    expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull()
});

export const passwordReset = sqliteTable("password_reset", {
    id: integer('id').primaryKey({ autoIncrement: true }),
    userId: text('user_id').notNull().references(() => user.id),
    code: text('code').notNull(),
});

export const object = sqliteTable("object", {
    id: text('id').primaryKey(),
    name: text("name"),
    url: text("url"),
    raw: text("raw"),
    userId: text('user_id').notNull().references(() => user.id),
    source: text("source").default("aisearch").notNull(),
    status: text("status").default("not-indexed").notNull(),
});

export const chat = sqliteTable("chat", {
    id: text("id").primaryKey(),
    title: text("title"),
    fileIds: text("file_ids", { mode: "json" }).default([]),
    userId: text('user_id').notNull().references(() => user.id),
    createdAt: integer("created_at", { mode: "timestamp" })
})

export const message = sqliteTable('messages', {
    id: text('id').primaryKey(),
    chatId: text('chatId')
        .notNull()
        .references(() => chat.id),
    content: text('content', { mode: "json" }).notNull(),
    createdAt: integer('createdAt', { mode: "timestamp" }).notNull(),
});

const float32Array = customType<{
    data: number[];
    config: { dimensions: number };
    configRequired: true;
    driverData: Buffer;
}>({
    dataType(config) {
        return `F32_BLOB(${config.dimensions})`;
    },
    fromDriver(value: Buffer) {
        return Array.from(new Float32Array(value.buffer));
    },
    toDriver(value: number[]) {
        return sql`vector32(${JSON.stringify(value)})`;
    },
});

export const embeddings = sqliteTable("embeddings", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    vector: float32Array("vector", { dimensions: 3 }),
    objectId: text('objectId').notNull().references(() => object.id, { onDelete: "cascade" })
});

export type Session = typeof session.$inferSelect;

export type User = typeof user.$inferSelect;

export type Object = typeof object.$inferSelect;

export type Message = typeof message.$inferSelect
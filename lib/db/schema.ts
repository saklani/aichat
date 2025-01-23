import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

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
    id: integer('id').primaryKey({autoIncrement: true}),
    userId: text('user_id').notNull().references(() => user.id),
    code: text('code').notNull(),
});

export const file = sqliteTable("file", {
    id: integer('id').primaryKey({autoIncrement: true}),
    userId: text('user_id').notNull().references(() => user.id),
});


export type Session = typeof session.$inferSelect;

export type User = typeof user.$inferSelect;
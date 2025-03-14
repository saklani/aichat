import { sql } from "drizzle-orm";
import { drizzle, PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from 'postgres';
import * as schema from '../../lib/server/db/schema';
import { fakeChats, fakeMessages, fakeObjects, fakeUserPreferences, fakeUsers } from "./fake_data";


export async function seedTestDatabase(db: PostgresJsDatabase<typeof schema>) {
    try {
        for (const table of [schema.users, schema.userPreferences, schema.objects]) {
            await db.execute(sql`TRUNCATE TABLE ${table} CASCADE`);
        }
        await db.insert(schema.users).values(fakeUsers);
        await db.insert(schema.userPreferences).values(fakeUserPreferences);
        await db.insert(schema.objects).values(fakeObjects);
        await db.insert(schema.chats).values(fakeChats);
        await db.insert(schema.messages).values(fakeMessages);
    } catch (error) {
        console.error("error", error);
    }
}

export async function setTestDatabase() {
    const client = postgres(process.env.DRIZZLE_DATABASE_URL!, { prepare: false });
    const db = drizzle(client, { schema });
    await seedTestDatabase(db);
    return db;
}
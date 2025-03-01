
import { PGlite } from '@electric-sql/pglite';
import { drizzle } from "drizzle-orm/pglite";
import * as schema from '../lib/server/db/schema';

export async function setTestDatabase() {
    const client = new PGlite()
    const db = drizzle(client, { schema })
    return db
}

import { defineConfig } from 'drizzle-kit';
if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

export default defineConfig({
  schema: './lib/server/db/schema.ts',
  dbCredentials: {
    url: process.env.DRIZZLE_DATABASE_URL!,
  },
  strict: true,
  verbose: true,
  dialect: 'postgresql',
  out: "drizzle"
});

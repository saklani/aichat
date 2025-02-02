"use server"
import * as auth from "@/lib/auth";
import { db, queries, schema } from "@/lib/db";
import { hash } from '@node-rs/argon2';
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect, RedirectType } from "next/navigation";
import { formSchema, type FormSchema } from "./form-schema";

export async function register(data: FormSchema) {
    const result = formSchema.safeParse(data)
    if (!result.success) {
        return { error: "Invalid request" }
    }

    const { email, password } = result.data
    const user = await db.query.user.findFirst({ where: eq(schema.user.email, email) })

    if (user) {
        return {
            error: "Already exists"
        }
    }

    const passwordHash = await hash(password, {
        // recommended minimum parameters
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1,
    });

    const { response: userId, error } = await queries.createUser({ email, passwordHash })
    if (error || !userId) {
        console.error(error, userId)
        return {
            error: "Internal server error"
        }
    }
    const sessionToken = auth.generateSessionToken();
    const session = await auth.createSession(sessionToken, userId);
    auth.setSessionTokenCookie(sessionToken, session.expiresAt);
    revalidatePath("/")
    return redirect('/', RedirectType.replace);
}
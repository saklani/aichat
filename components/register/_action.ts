"use server"
import * as auth from "@/lib/auth";
import { db, schema } from "@/lib/db";
import { hash } from '@node-rs/argon2';
import { encodeBase32LowerCase } from '@oslojs/encoding';
import { eq } from "drizzle-orm";
import { redirect, RedirectType } from "next/navigation";
import { formSchema, type FormSchema } from "./form-schema";
import { revalidatePath } from "next/cache";

function generateUserId() {
    // ID with 120 bits of entropy, or about the same as UUID v4.
    const bytes = crypto.getRandomValues(new Uint8Array(15));
    const id = encodeBase32LowerCase(bytes);
    return id;
}

export async function register(data: FormSchema) {
    const result = formSchema.safeParse(data)
    if (!result.success) {
        return {
            error: "Invalid request",
            status: 400
        }
    }

    const { email, password } = result.data
    const user = await db.query.user.findFirst({ where: eq(schema.user.email, email) })

    if (user) {
        return {
            error: "Already exists",
            status: 400
        }
    }

    const userId = generateUserId();
    const passwordHash = await hash(password, {
        // recommended minimum parameters
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1,
    });

    try {
        await db.insert(schema.user).values({ id: userId, email, passwordHash });
    } catch (e) {
        console.error(e)
        return {
            error: "something went wrong",
            status: 500
        }
    }

    const sessionToken = auth.generateSessionToken();
    const session = await auth.createSession(sessionToken, userId);
    auth.setSessionTokenCookie(sessionToken, session.expiresAt);
      revalidatePath("/")
    return redirect('/', RedirectType.replace);
}
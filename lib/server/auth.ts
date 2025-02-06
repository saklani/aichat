import { eq } from 'drizzle-orm';
import { sha256 } from '@oslojs/crypto/sha2';
import { encodeBase64url, encodeHexLowerCase } from '@oslojs/encoding';
import { db, schema } from '../db';
import { cookies } from 'next/headers'

const DAY_IN_MS = 1000 * 60 * 60 * 24;

export const sessionCookieName = 'auth-session';

export function generateSessionToken() {
    const bytes = crypto.getRandomValues(new Uint8Array(18));
    const token = encodeBase64url(bytes);
    return token;
}

export async function getSession() {
    const cookieStore = await cookies()
    return cookieStore.get(sessionCookieName);
}

export async function createSession(token: string, userId: string) {
    const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
    const session: schema.Session = {
        id: sessionId,
        userId,
        expiresAt: new Date(Date.now() + DAY_IN_MS * 30)
    };
    await db.insert(schema.session).values(session);
    return session;
}

export async function validateSessionToken(token: string) {
    const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
    const [result] = await db
        .select({
            user: { id: schema.user.id, email: schema.user.email },
            session: schema.session
        })
        .from(schema.session)
        .innerJoin(schema.user, eq(schema.session.userId, schema.user.id))
        .where(eq(schema.session.id, sessionId));

    if (!result) {
        return { session: null, user: null };
    }
    const { session, user } = result;

    const sessionExpired = Date.now() >= session.expiresAt.getTime();
    if (sessionExpired) {
        await db.delete(schema.session).where(eq(schema.session.id, session.id));
        return { session: null, user: null };
    }

    const renewSession = Date.now() >= session.expiresAt.getTime() - DAY_IN_MS * 15;
    if (renewSession) {
        session.expiresAt = new Date(Date.now() + DAY_IN_MS * 30);
        await db
            .update(schema.session)
            .set({ expiresAt: session.expiresAt })
            .where(eq(schema.session.id, session.id));
    }

    return { session, user };
}

export async function invalidateSession(sessionId: string) {
    await db.delete(schema.session).where(eq(schema.session.id, sessionId));
}

export async function setSessionTokenCookie(token: string, expiresAt: Date) {
    const cookieStore = await cookies()
    cookieStore.set(sessionCookieName, token, {
        expires: expiresAt,
        path: '/',
        secure: process.env.NODE_ENV === "production",
    });
}

export async function deleteSessionTokenCookie() {
    const cookieStore = await cookies()
    cookieStore.delete(sessionCookieName);
}


export type SessionValidationResult = Awaited<ReturnType<typeof validateSessionToken>>;



export async function checkSession(): Promise<{ id: string; email: string } | null> {
    const sessionCookie = await getSession()
    if (sessionCookie) {
        const { user } = await validateSessionToken(sessionCookie.value)
        return user
    }
    return null
}
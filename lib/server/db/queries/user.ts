import { encodeBase32LowerCase } from '@oslojs/encoding';
import { eq } from 'drizzle-orm';
import { schema } from '..';
import { db } from "../db";
import { execute } from "./utils";


function generateUserId() {
    // ID with 120 bits of entropy, or about the same as UUID v4.
    const bytes = crypto.getRandomValues(new Uint8Array(15))
    const id = encodeBase32LowerCase(bytes)
    return id
}

export async function createUser(data: Pick<schema.User, "googleId" | "email" | "passwordHash">) {
    const id = generateUserId()
    return execute('insert user', async () => {
        await db.insert(schema.users).values({ ...data, id })
        return id
    })
}

export async function updateUser({ id, ...rest }: schema.User) {
    return execute(`update user ${id}`, async () => {
        await db.update(schema.users).set(rest).where(eq(schema.users.id, id))
        return id
    })
}

export async function deleteUser({ id }: Pick<schema.User, "id">) {
    return execute(`delete user ${id}`, async () => {
        await db.delete(schema.users).where(eq(schema.users.id, id))
    })
}


export async function getUser({ id }: Pick<schema.User, "id">) {
    return execute(`get user ${id}`, async () => {
        return await db.query.users.findFirst({ where: eq(schema.users.id, id), columns: { id: true, email: true } })
    })
}

export async function getUserByGoogleId({ googleId }: Pick<schema.User, "googleId">) {
    return execute(`get user ${googleId}`, async () => {
        return await db.query.users.findFirst({ where: eq(schema.users.googleId, googleId!), columns: { id: true, email: true } })
    })
}

export async function getUserByEmail({ email }: Pick<schema.User, "email">) {
    return execute(`get user by email ${email}`, async () => {
        return await db.query.users.findFirst({ where: eq(schema.users.email, email) })
    })
}
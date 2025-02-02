import { encodeBase32LowerCase } from '@oslojs/encoding';
import { eq } from 'drizzle-orm';
import { schema } from '..';
import { db } from "../db";
import { executeDbOperation } from "./utils";


function generateUserId() {
    // ID with 120 bits of entropy, or about the same as UUID v4.
    const bytes = crypto.getRandomValues(new Uint8Array(15))
    const id = encodeBase32LowerCase(bytes)
    return id
}

export async function createUser(data: Omit<schema.User, "id">) {
    const id = generateUserId()
    return executeDbOperation('Failed to insert user', async () => {
        await db.insert(schema.user).values({ ...data, id })
        return id
    })
}

export async function updateUser({ id, ...rest }: schema.User) {
    return executeDbOperation(`Failed to update user ${id}`, async () => {
        await db.update(schema.user).set(rest).where(eq(schema.user.id, id))
        return id
    })
}

export async function deleteUser({ id }: Pick<schema.User, "id">) {
    return executeDbOperation(`Failed to delete user ${id}`, async () => {
        await db.delete(schema.user).where(eq(schema.user.id, id))
    })
}


export async function getUserByEmail({ email }: Pick<schema.User, "email">) {
    return executeDbOperation(`Failed to get user ${email}`, async () => {
        return await db.query.user.findFirst({ where: eq(schema.user.email, email) })
    })
}
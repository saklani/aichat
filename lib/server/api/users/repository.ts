import { eq } from 'drizzle-orm';
import * as schema from '../../db/schema';
import { db } from "@/lib/server/db";
import { execute } from "../../db/queries/utils";

export async function getUser({ id }: Pick<schema.User, "id">) {
    return execute(`get user ${id}`, () => db.query.users.findFirst({ where: eq(schema.users.id, id), columns: { id: true, email: true } }))
}

export async function getUserByEmail({ email }: Pick<schema.User, "email">) {
    return execute(`get user by email ${email}`, () => db.query.users.findFirst({ where: eq(schema.users.email, email) }))
}

export async function updateUser({ id, ...rest }: schema.User) {
    return execute(`update user ${id}`, () => db.update(schema.users).set(rest).where(eq(schema.users.id, id)).returning().then(res => res.at(0)))
}

export async function deleteUser({ id }: Pick<schema.User, "id">) {
    return execute(`delete user ${id}`, () => db.delete(schema.users).where(eq(schema.users.id, id)))
}
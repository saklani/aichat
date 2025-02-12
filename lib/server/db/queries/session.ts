import { eq } from "drizzle-orm";
import { db } from "../db";
import * as schema from "../schema";
import { execute } from "./utils";



export async function createSession({ id, ...rest }: schema.Session) {
    return execute('create session', async () => {
        await db.insert(schema.session).values({ id, ...rest })
        return id
    })
}


export async function updateSession({ id, ...rest }: schema.Session) {
    return execute(`update session ${id}`, async () => {
        await db.update(schema.session).set(rest).where(eq(schema.session.id, id))
        return id
    })
}


export async function deleteSession({ id }: Pick<schema.Session, "id">) {
    return execute(`delete session ${id}`, async () => {
        await db.delete(schema.session).where(eq(schema.session.id, id))
    })
}


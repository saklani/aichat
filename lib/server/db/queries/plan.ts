import { eq } from "drizzle-orm";
import { db } from "../db";
import * as schema from "../schema";
import { execute } from "./utils";


export async function createPlan({ userId }: Pick<schema.Plan, "userId">) {
    return execute(`create plan of user ${userId}`, async () => {
        await db.insert(schema.plan).values({ userId })
    })
}

export async function updatePlan({ userId, ...rest }: schema.Plan) {
    return execute(`update plan of user ${userId}`, async () => {
        await db.update(schema.plan).set(rest).where(eq(schema.user.id, userId))
    })
}

export async function deletePlan({ userId }: Pick<schema.Plan, "id" | "userId">) {
    return execute(`delete plan of user ${userId}`, async () => {
        await db.delete(schema.plan).where(eq(schema.plan.userId, userId))
    })
}

export async function getPlan({ userId }: Pick<schema.Plan, "userId">) {
    return execute(
        `get plan of user ${userId}`,
        async () => db.query.plan.findFirst({ where: eq(schema.plan.userId, userId) })
    )
}
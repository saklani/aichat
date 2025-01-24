import { db, schema } from "@/lib/db";
import { getSession } from "@/lib/session";
import { randomUUID } from "crypto";
import { and, eq } from "drizzle-orm";
import { NextRequest } from "next/server";
import { z } from "zod";

export async function GET() {
    const session = await getSession()
    if (!session) {
        return new Response("Unauthorized", {
            status: 401,
        });
    }
    const { id } = session
    const data = await db.query.data.findMany({ where: eq(schema.data.userId, id) })
    return data
}

const postValidate = z.object({
    name: z.string(),
    url: z.string(),
    raw: z.string().optional(),
});

export async function POST(request: NextRequest) {
    const session = await getSession()
    if (!session) {
        return new Response("Unauthorized", {
            status: 401,
        });
    }
    const { id: userId } = session
    const res = postValidate.safeParse(request.body)

    if (!res.success) {
        return new Response("Bad request", {
            status: 400,
        });
    }
    const id = randomUUID()
    await db.insert(schema.data).values({ ...res.data, id, userId })
    return { id }
}


const putValidate = z.object({
    id: z.string(),
    name: z.string().optional(),
    url: z.string().optional(),
    raw: z.string().optional(),
});

export async function PUT(request: NextRequest) {
    const session = await getSession()
    if (!session) {
        return new Response("Unauthorized", {
            status: 401,
        });
    }
    const { id: userId } = session
    const res = putValidate.safeParse(request.body)

    if (!res.success) {
        return new Response("Bad request", {
            status: 400,
        });
    }
    const { id } = res.data

    await db.update(schema.data).set({ ...res.data }).where(and(eq(schema.data.id, id), eq(schema.data.userId, userId)))
    return new Response(JSON.stringify({ id }), { status: 200 })
}

// export async function DELETE(request: NextRequest) {

// }
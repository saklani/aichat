import { db, schema } from "@/lib/db";
import { getSession } from "@/lib/session";
import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const session = await getSession()
    if (!session) {
        return new Response("Unauthorized", {
            status: 401,
        });
    }
    const { id } = session
    const user = await db.query.user.findFirst({ where: eq(schema.user.id, id) })
    if (!user) {
        return new Response("Not found", {
            status: 404,
        });
    }
    return user
}

// export async function POST(request: NextRequest) {

// }

// export async function PUT(request: NextRequest) {

// }

// export async function DELETE(request: NextRequest) {

// }
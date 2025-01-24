import { db, schema } from "@/lib/db";
import { getSessionFromRequest } from "@/lib/session";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const session = await getSessionFromRequest(request)
    if (!session) {
        return NextResponse.json("Unauthorized", {
            status: 401,
        });
    }
    const { id } = session
    const user = await db.query.user.findFirst({ where: eq(schema.user.id, id) })
    if (!user) {
        return NextResponse.json("Not found", {
            status: 404,
        });
    }
    return NextResponse.json(user)
}

// export async function POST(request: NextRequest) {

// }

// export async function PUT(request: NextRequest) {

// }

// export async function DELETE(request: NextRequest) {

// }
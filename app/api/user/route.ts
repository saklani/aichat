import { checkSession } from "@/lib/server/auth";
import { NextRequest, NextResponse } from "next/server";
import { INTERNAL_SERVER_ERROR, NOT_FOUND, UNAUTHORIZED } from "../next-response";
import { queries } from "@/lib/server/db";

export async function GET(request: NextRequest) {
    try {
        const session = await checkSession(request)
        if (!session) {
            return UNAUTHORIZED
        }
        const { id: userId } = session
        const user = await queries.getUser({ id: userId })
        if (!user) {
            return NOT_FOUND
        }
        return NextResponse.json(user, { status: 200 })
    } catch (error) {
        console.error(error)
        return INTERNAL_SERVER_ERROR
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const session = await checkSession(request)
        if (!session) {
            return UNAUTHORIZED
        }
        const { id: userId } = session
        await queries.deleteUser({ id: userId })
        return NextResponse.json({}, { status: 200 })
    } catch (error) {
        console.error(error)
        return INTERNAL_SERVER_ERROR
    }
}
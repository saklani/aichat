import { checkSession } from "@/lib/server/auth";
import { queries } from "@/lib/server/db";
import { NextRequest, NextResponse } from "next/server";
import { INTERNAL_SERVER_ERROR, NOT_FOUND, UNAUTHORIZED } from "../next-response";

export async function GET(request: NextRequest) {
    try {
        const session = await checkSession(request)
        if (!session) {
            return UNAUTHORIZED
        }
        const { id: userId } = session
        const plan = await queries.getPlan({ userId })
        if (!plan) {
            return NOT_FOUND
        }
        return NextResponse.json(plan, { status: 200 })
    } catch (error) {
        console.error(error)
        return INTERNAL_SERVER_ERROR
    }
}
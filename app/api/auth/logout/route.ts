import { checkSession } from "@/lib/server/auth"
import { NextRequest, NextResponse } from "next/server"
import { INTERNAL_SERVER_ERROR, UNAUTHORIZED } from "../../next-response"


export async function POST(request: NextRequest) {
    try {
        const session = await checkSession(request)
        if (!session) {
            return UNAUTHORIZED
        }
        return NextResponse.json({},
            {
                status: 200,
                headers: { 'Set-Cookie': `auth-session=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT` },
            }
        );
    } catch (error) {
        console.error(error)
        return INTERNAL_SERVER_ERROR
    }

}
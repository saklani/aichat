import { queries } from "@/lib/server/db"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { BAD_REQUEST, INTERNAL_SERVER_ERROR, NOT_FOUND } from "../../next-response"

const formSchema = z.object({
    email: z.string().email(),
})

export async function POST(request: NextRequest) {
    const data = await request.json()
    const result = formSchema.safeParse(data)
    if (!result.success) {
        return BAD_REQUEST(result.error)
    }

    const { email } = result.data
    try {
        const user = await queries.getUserByEmail({ email })
        if (!user) {
            return NOT_FOUND
        }

        return NextResponse.json({ "message": "An email has been sent to your account" }, { status: 200 });
    } catch (error) {
        console.error(error)
        return INTERNAL_SERVER_ERROR
    }
}
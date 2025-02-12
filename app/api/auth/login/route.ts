import { auth } from "@/lib/server"
import { queries } from "@/lib/server/db"
import { verify } from '@node-rs/argon2'
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { BAD_REQUEST, INTERNAL_SERVER_ERROR, NOT_FOUND } from "../../next-response"

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
})

export async function POST(request: NextRequest) {
    const data = await request.json()
    const result = formSchema.safeParse(data)
    if (!result.success) {
        return BAD_REQUEST(result.error)
    }

    const { email, password } = result.data
    try {
        const user = await queries.getUserByEmail({ email })
        if (!user) {
            return NOT_FOUND
        }

        const validPassword = await verify(user.passwordHash, password, {
            memoryCost: 19456,
            timeCost: 2,
            outputLen: 32,
            parallelism: 1,
        })

        if (!validPassword) {
            return BAD_REQUEST({ message: "Invalid email or password" })
        }
        const sessionToken = auth.generateSessionToken();
        const session = await auth.createSession(sessionToken, user.id)
     
        return NextResponse.json({},
            {
                status: 200,
                headers: { 'Set-Cookie': `auth-session=${sessionToken};expires=${session.expiresAt};path=/;same-site=strict;HttpOnly;${process.env.NODE_ENV === "production" ? "secure" : ""}` },
            }
        );
    } catch (error) {
        console.error(error)
        return INTERNAL_SERVER_ERROR
    }

}
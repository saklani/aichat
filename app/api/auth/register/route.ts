import { auth } from "@/lib/server"
import { db, queries, schema } from "@/lib/server/db"
import { hash } from '@node-rs/argon2'
import { eq } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { BAD_REQUEST, CONFLICT, INTERNAL_SERVER_ERROR } from "../../next-response"

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
})

export async function POST(request: NextRequest) {
    try {
        const data = await request.json()
        const result = formSchema.safeParse(data)
        if (!result.success) {
            return BAD_REQUEST(result.error)
        }
    
        const { email, password } = result.data
        const user = await db.query.user.findFirst({ where: eq(schema.user.email, email) })
        if (user) {
            return CONFLICT
        }


        const passwordHash = await hash(password, {
            memoryCost: 19456,
            timeCost: 2,
            outputLen: 32,
            parallelism: 1,
        });

        const userId = await queries.createUser({ email, passwordHash })
        if (!userId) {
            return INTERNAL_SERVER_ERROR
        }

        await queries.createPlan({ userId })

        const sessionToken = auth.generateSessionToken();
        const session = await auth.createSession(sessionToken, userId)

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
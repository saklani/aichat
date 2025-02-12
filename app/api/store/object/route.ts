import { s3 } from "@/lib/server";
import { checkSession } from "@/lib/server/auth";
import { queries } from "@/lib/server/db";
import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR, UNAUTHORIZED } from "../../next-response";

export const formSchema = z.object({
    file: z.instanceof(File).refine((file) => file.size < 7000000, {
        message: 'Your file must be less than 7MB.',
    }),
});

export async function POST(request: NextRequest) {
    try {
        const session = await checkSession(request)
        if (!session) {
            return UNAUTHORIZED
        }
        const { id: userId } = session

        const { data, error, success } = formSchema.safeParse(request)
        if (!success) {
            return BAD_REQUEST(error)
        }
        const { file } = data
        const id = randomUUID()

        const url = await s3.uploadObject({ id, file, userId })
        await queries.createObject({ id, name: file.name, url, userId })
        return NextResponse.json({ url })
    } catch (error) {
        console.error(error)
        return INTERNAL_SERVER_ERROR
    }
}

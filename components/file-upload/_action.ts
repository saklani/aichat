"use server"

import { db, schema } from "@/lib/db";
import { bucketName, s3 } from "@/lib/s3";
import { getSession } from "@/lib/session";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";


export async function upload(file: File) {
    const session = await getSession()
    if (!session) {
        return {};
    }
    const { id: userId } = session

    const id = randomUUID()

    const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: id,
        Body: await file.bytes(),
    })

    await s3.send(command)
    await db.insert(schema.object).values({ id, userId, name: file.name, url: `https://aisearch2.s3.us-east-1.amazonaws.com/${id}` })
    revalidatePath("/")
    return { id }
}
"use server"

import { db, schema } from "@/lib/db";
import { bucketName, s3 } from "@/lib/s3";
import { getSession } from "@/lib/session";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { vectorStore } from "@/lib/pinecone";



async function parse(file: File) {
    const loader = new PDFLoader(file, {
        parsedItemSeparator: "",
    });
    const docs = await loader.load();
    const documentIds = await vectorStore.addDocuments(docs);
    return documentIds;
}

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
    const documentIds = await parse(file);
    await db.insert(schema.object).values({ id, userId, name: file.name, url: `https://aisearch2.s3.us-east-1.amazonaws.com/${id}`, vectorStoreId: documentIds[0] })

    revalidatePath("/")
    return { id }
}
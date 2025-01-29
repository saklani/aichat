"use server"

import * as db from "@/lib/db/queries";
import { getSession } from "@/lib/session";
import { z } from "zod";
import { formSchema } from "./form-schema";
import { revalidatePath } from "next/cache";


export async function getModels() {
    const session = await getSession()
    if (!session) {
        return []
    }
    const { id: _ } = session
    return await db.getModels()
}


export async function createAgent(data: z.infer<typeof formSchema>): Promise<{ error?: string; status: number; id?: string; }> {
    const session = await getSession()
    if (!session) {
        return {
            error: "Not authorized",
            status: 401
        }
    }
    const { id: userId } = session

    const result = formSchema.safeParse(data)
    if (!result.success) {
        return {
            error: "Invalid request",
            status: 400
        }
    }

    const { name, modelId } = result.data;

    const id = await db.createAgent({ name, modelId: parseInt(modelId), userId });
    if (!id) {
        return {
            error: "Internal Server Error",
            status: 500
        }
    }
    revalidatePath("/")
    return {
        id,
        status: 201
    }
}
"use server"
import { db, schema } from "@/lib/db";
import { getSession } from "@/lib/session";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getObjects() {
  const session = await getSession()
  if (!session) {
    return [];
  }
  const { id: userId } = session
  return await db.query.object.findMany({ where: eq(schema.object.userId, userId) })
}


export async function deleteObjects(id: string) {
  const session = await getSession()
  if (!session) {
    return
  }
  const { id: userId } = session
  await db.delete(schema.object).where(and(eq(schema.object.userId, userId), eq(schema.object.id, id)))
  revalidatePath("/")
}
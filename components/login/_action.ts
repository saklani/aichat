"use server"

import { db, schema } from "@/lib/db";
import { formSchema } from "./form-schema"
import { eq } from "drizzle-orm";
import { redirect, RedirectType } from "next/navigation";
import { z } from "zod";
import { verify } from '@node-rs/argon2';
import * as auth from "@/lib/auth"
import { revalidatePath } from "next/cache";

type LoginResponse = { error: string; status: number }

export async function login(data: z.infer<typeof formSchema>): Promise<LoginResponse> {
  const result = formSchema.safeParse(data)
  if (!result.success) {
    return {
      error: "Invalid request",
      status: 400
    }
  }

  const { email, password } = result.data
  const user = await db.query.user.findFirst({ where: eq(schema.user.email, email) })

  if (!user) {
    return {
      error: "Not found",
      status: 404
    }
  }

  const validPassword = await verify(user.passwordHash, password, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  })

  if (!validPassword) {
    return {
      error: "Invalid email or password",
      status: 400
    }
  }
  const sessionToken = auth.generateSessionToken();
  const session = await auth.createSession(sessionToken, user.id);
  auth.setSessionTokenCookie(sessionToken, session.expiresAt);
  revalidatePath("/")
  return redirect("/", RedirectType.replace);
}
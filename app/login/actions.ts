"use server"

import * as auth from "@/lib/auth";
import { queries } from "@/lib/db";
import { verify } from '@node-rs/argon2';
import { revalidatePath } from "next/cache";
import { redirect, RedirectType } from "next/navigation";
import { z } from "zod";
import { formSchema } from "./form-schema";

export type ActionResponse = Promise<{ error: string; }>

export async function login(data: z.infer<typeof formSchema>): ActionResponse {
  const result = formSchema.safeParse(data)
  if (!result.success) {
    return { error: "Invalid request" }
  }

  const { email, password } = result.data
  const { response: user, error } = await queries.getUserByEmail({ email })
  if (error) {
    return { error: "Internal server error" }
  }
  if (!user) {
    return { error: "Not found" }
  }

  const validPassword = await verify(user.passwordHash, password, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  })

  if (!validPassword) {
    return { error: "Invalid email or password" }
  }
  const sessionToken = auth.generateSessionToken();
  const session = await auth.createSession(sessionToken, user.id);
  auth.setSessionTokenCookie(sessionToken, session.expiresAt);
  revalidatePath("/")
  return redirect("/", RedirectType.replace);
}
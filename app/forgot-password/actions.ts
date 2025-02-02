"use server"

import { queries } from "@/lib/db";
import { z } from "zod";
import { formSchema } from "./form-schema";

export type ActionResponse = Promise<{ error?: string; }>

export async function forgotPassword(data: z.infer<typeof formSchema>): ActionResponse {
  const result = formSchema.safeParse(data)
  if (!result.success) {
    return { error: "Invalid request" }
  }

  const { email } = result.data
  const { response: user, error } = await queries.getUserByEmail({ email })
  if (error) {
    return { error: "Internal server error" }
  }
  if (user) {
    
  }
  return { error: "Reset link has been sent if a user account exists" };
}
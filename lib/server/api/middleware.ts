import { auth } from "@/auth"
import { NextResponse } from "next/server"
import { createResponse, HTTP_401, HTTP_500 } from "./response"
import { Result } from "./types"


/**
 * Middleware to check authentication and extract user ID
 */
export async function withAuth<T>(handler: (userId: string) => Promise<Result<T>>): Promise<NextResponse> {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return HTTP_401
    }
    const result = await handler(session.user.id)
    return createResponse({ ...result })
  } catch (error) {
    console.error("[API Error]", error)
    return HTTP_500
  }
}


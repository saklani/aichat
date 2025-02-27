import { withAuth } from "@/lib/server/api/middleware";
import { queries } from "@/lib/server/db";
import { GetChatResponseSchema } from "@/lib/server/api/schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    return withAuth(async (userId) => {
        const chats = await queries.getChatsByUserId({ userId })
        const validatedPlan = GetChatResponseSchema.safeParse(chats);
        if (!validatedPlan.success) {
            console.error("[Plan Validation Error]", {
                userId,
                errors: validatedPlan.error.toString()
            });
            return {
                error: "Invalid plan data format",
                status: 500
            };
        }

        return { data: validatedPlan.data, status: 200 };
    })
    
}
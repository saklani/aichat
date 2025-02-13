import { withAuth } from "@/lib/server/api/middleware";
import { GetChatResponseSchema } from "@/lib/server/api/schema";
import { queries } from "@/lib/server/db";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest,{ params }: { params: Promise<{ id: string }> }) {
    return withAuth(async (userId) => {
        const id = (await params).id
        if (!id) {
            return { error: "Invalid request data", status: 400 }
        }
        const chat = await queries.getChat({ id, userId });
        const validatedChat = GetChatResponseSchema.safeParse(chat);
        if (!validatedChat.success) {
            console.error("[Chats Validation Error]", {
                userId,
                errors: validatedChat.error.toString()
            });
            return {
                error: "Invalid chats data format",
                status: 500
            };
        }

        return {
            data: validatedChat.data,
            status: 200
        };
    });
}

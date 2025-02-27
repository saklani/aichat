import { withAuth } from "@/lib/server/api/middleware";
import { queries } from "@/lib/server/db";
import { GetChatExportResponseSchema } from "@/lib/server/api/schema";
import { NextRequest } from "next/server";

export async function GET(_: NextRequest) {
    return withAuth(async (userId) => {
        const chats = await queries.getChatsExport({ userId })
        const validatedChats = GetChatExportResponseSchema.safeParse(chats);
        if (!validatedChats.success) {
            console.error("[Chats Validation Error]", {
                userId,
                errors: validatedChats.error.toString()
            });
            return {
                error: "Invalid chat data format",
                status: 500
            };
        }

        return { data: validatedChats.data, status: 200 };
    })
    
}
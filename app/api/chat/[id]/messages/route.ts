import { withAuth } from "@/lib/server/api/middleware";
import { GetMessagesResponseSchema } from "@/lib/server/api/schema";
import { queries } from "@/lib/server/db";
import { NextRequest } from "next/server";

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    return withAuth(async (userId) => {
        const chatId = (await params).id
        if (!chatId) {
            return { error: "Invalid request data", status: 400 }
        }
        const messages = await queries.getMessagesByChatId({ chatId });
        const validatedMessages = GetMessagesResponseSchema.safeParse(messages);
        if (!validatedMessages.success) {
            console.error("[Messages Validation Error]", {
                userId,
                errors: validatedMessages.error.toString()
            });
            return {
                error: "Invalid chats data format",
                status: 500
            };
        }

        return {
            data: validatedMessages.data,
            status: 200
        };
    });
}
